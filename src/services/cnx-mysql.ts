import {
  createPool,
  Pool,
  PoolConnection,
  ResultSetHeader,
  RowDataPacket,
  PoolOptions,
} from "mysql2/promise";

// Configuração do banco de dados (você pode ajustar conforme suas variáveis de ambiente)
const dbConfig: PoolOptions = {
  host: process.env.DB_MYSQL_HOST || "localhost",
  port: parseInt(process.env.DB_MYSQL_PORT || "3306"),
  database: process.env.DB_MYSQL_DATABASE,
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export class MySQLConnection {
  private static instance: MySQLConnection;
  private poolConnection!: Pool;

  private constructor() {
    this.connect();
  }

  // Singleton pattern para garantir uma única instância
  public static getInstance(): MySQLConnection {
    if (!MySQLConnection.instance) {
      MySQLConnection.instance = new MySQLConnection();
    }
    return MySQLConnection.instance;
  }

  private connect() {
    try {
      this.poolConnection = createPool(dbConfig);
      console.log("Conectado ao banco de dados MySQL");
    } catch (error) {
      console.error(
        "Erro ao conectar ao banco de dados MySQL com mysql2",
        error
      );
      throw error;
    }
  }

  // Método para SELECT (sem transação)
  async selectQuery<T extends RowDataPacket>(
    queryString: string,
    params?: (string | number | boolean | null)[]
  ): Promise<T[]> {
    try {
      const [results] = await this.poolConnection.query<T[]>(
        queryString,
        params
      );
      return results;
    } catch (error) {
      console.error("Erro na consulta SELECT:", error);
      throw error;
    }
  }

  // Método para SELECT com segurança reforçada
  async selectExecute<T extends RowDataPacket>(
    queryString: string,
    params?: (string | number | boolean | null)[]
  ): Promise<T[]> {
    try {
      const [results] = await this.poolConnection.execute<T[]>(
        queryString,
        params
      );
      return results;
    } catch (error) {
      console.error("Erro na execução SELECT:", error);
      throw error;
    }
  }

  // Insert/Update/Delete usando execute
  async modifyExecute(
    queryString: string,
    params?: (string | number | boolean | null)[]
  ): Promise<ResultSetHeader> {
    try {
      const [results] = await this.poolConnection.execute(queryString, params);
      return results as ResultSetHeader;
    } catch (error) {
      console.error("Erro na execução de modificação:", error);
      throw error;
    }
  }

  // Insert/Update/Delete usando query
  async modifyQuery(
    queryString: string,
    params?: (string | number | boolean | null)[]
  ): Promise<ResultSetHeader> {
    try {
      const [results] = await this.poolConnection.query(queryString, params);
      return results as ResultSetHeader;
    } catch (error) {
      console.error("Erro na consulta de modificação:", error);
      throw error;
    }
  }

  // Operações com transação
  async runInTransaction<T>(
    callback: (connection: PoolConnection) => Promise<T>
  ): Promise<T> {
    const connection = await this.getConnection();

    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      console.error("Transação falhou. Revertida.", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Exemplo de uso com transação
  /*
  const db = MySQLConnection.getInstance();
  await db.runInTransaction(async (conn) => {
    await conn.execute('UPDATE users SET balance = balance - ? WHERE id = ?', [100, 1]);
    await conn.execute('UPDATE users SET balance = balance + ? WHERE id = ?', [100, 2]);
  });
  */

  async getConnection(): Promise<PoolConnection> {
    try {
      return await this.poolConnection.getConnection();
    } catch (error) {
      console.error(
        `Falha ao obter conexão com o banco de dados: ${error}`,
        error
      );
      throw error;
    }
  }

  // Para procedimentos armazenados que retornam múltiplos conjuntos de resultados
  async chamarProcedimento<T extends RowDataPacket>(
    nomeProcedimento: string,
    params?: (string | number | boolean | null)[]
  ): Promise<T[][]> {
    try {
      const query = `CALL ${nomeProcedimento}(${
        params ? params.map(() => "?").join(",") : ""
      })`;
      const [results] = await this.poolConnection.execute<T[][]>(query, params);
      return results;
    } catch (error) {
      console.error("Erro ao executar procedimento armazenado:", error);
      throw error;
    }
  }

  // Método para fechar o pool de conexões
  async closePool(): Promise<void> {
    try {
      await this.poolConnection.end();
      console.log("Pool de conexões MySQL fechado");
    } catch (error) {
      console.error("Erro ao fechar pool de conexões:", error);
      throw error;
    }
  }

  // Método para testar a conexão
  async testConnection(): Promise<boolean> {
    try {
      const connection = await this.getConnection();
      await connection.ping();
      connection.release();
      console.log("Conexão com MySQL testada com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao testar conexão:", error);
      return false;
    }
  }
}

// Classes de erro personalizadas
export class ErroConexaoBancoDados extends Error {
  constructor(mensagem: string, public readonly erroOriginal: Error) {
    super(mensagem);
    this.name = "ErroConexaoBancoDados";
  }
}

export class ErroExecucaoConsulta extends Error {
  constructor(
    mensagem: string,
    public readonly consulta: string,
    public readonly erroOriginal: Error
  ) {
    super(mensagem);
    this.name = "ErroExecucaoConsulta";
  }
}

// Função helper para obter a instância da conexão (mais conveniente para uso em API routes)
export const getDB = () => MySQLConnection.getInstance();

// Exemplo de uso em API routes do Next.js:
/*
// Em pages/api/users.ts ou app/api/users/route.ts
import { getDB } from '@/services/cnx-mysql';

export async function GET() {
  try {
    const db = getDB();
    const users = await db.selectExecute('SELECT * FROM users WHERE active = ?', [true]);
    return Response.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = getDB();
    
    const result = await db.modifyExecute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [data.name, data.email]
    );
    
    return Response.json({ id: result.insertId, message: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
*/
