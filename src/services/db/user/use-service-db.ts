import { MySQLConnection, getDB } from "../../cnx-mysql";
import { User, Role } from "../../../types/tables-type";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

// Interface para dados de criação de usuário (sem campos auto-gerados)
export interface CreateUserData {
  id?: string;
  name: string;
  email: string;
  picture: string;
  role?: Role;
}

// Interface para dados de atualização de usuário (todos os campos opcionais)
export interface UpdateUserData {
  name?: string;
  email?: string;
  picture?: string;
  role?: Role;
}

// Interface para filtros de busca
export interface UserFilters {
  role?: Role;
  email?: string;
  name?: string;
  limit?: number;
  offset?: number;
}

// Interface estendida do User para retorno do banco
interface UserRow extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export class UserService {
  private db: MySQLConnection;

  constructor() {
    this.db = getDB();
  }

  // Criar um novo usuário
  async createUser(
    userData: CreateUserData,
  ): Promise<{ id: string; user: User }> {
    try {
      // Gerar ID se não fornecido
      const userId = userData.id || this.generateId();
      const role = userData.role || Role.USER;

      const query = `
        INSERT INTO users (id, name, email, picture, role, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const params = [
        userId,
        userData.name,
        userData.email,
        userData.picture,
        role,
      ];

      const result = await this.db.modifyExecute(query, params);

      if (result.affectedRows === 0) {
        throw new Error("Falha ao criar usuário");
      }

      // Buscar o usuário criado
      const createdUser = await this.getUserById(userId);
      if (!createdUser) {
        throw new Error("Usuário criado mas não encontrado");
      }

      return { id: userId, user: createdUser };
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }

  // Buscar usuário por ID
  async getUserById(id: string): Promise<User | null> {
    try {
      const query = `
        SELECT id, name, email, picture, role, createdAt, updatedAt
        FROM users
        WHERE id = ?
      `;

      const results = await this.db.selectExecute<UserRow>(query, [id]);

      if (results.length === 0) {
        return null;
      }

      return this.mapRowToUser(results[0]);
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      throw error;
    }
  }

  // Buscar usuário por email
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const query = `
        SELECT id, name, email, picture, role, createdAt, updatedAt
        FROM users
        WHERE email = ?
      `;

      const results = await this.db.selectExecute<UserRow>(query, [email]);

      if (results.length === 0) {
        return null;
      }

      return this.mapRowToUser(results[0]);
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw error;
    }
  }

  // Listar usuários com filtros
  async getUsers(
    filters: UserFilters = {},
  ): Promise<{ users: User[]; total: number }> {
    try {
      let query = `
        SELECT id, name, email, picture, role, createdAt, updatedAt
        FROM users
        WHERE 1 = 1
      `;

      const params: (string | number)[] = [];
      const conditions: string[] = [];

      // Aplicar filtros
      if (filters.role) {
        conditions.push("role = ?");
        params.push(filters.role);
      }

      if (filters.email) {
        conditions.push("email LIKE ?");
        params.push(`%${filters.email}%`);
      }

      if (filters.name) {
        conditions.push("name LIKE ?");
        params.push(`%${filters.name}%`);
      }

      // Adicionar condições à query
      if (conditions.length > 0) {
        query += " AND " + conditions.join(" AND ");
      }

      // Query para contar total
      const countQuery =
        `SELECT COUNT(*) as total FROM users WHERE 1 = 1` +
        (conditions.length > 0 ? " AND " + conditions.join(" AND ") : "");

      // Buscar total
      const countResult = await this.db.selectExecute<
        RowDataPacket & { total: number }
      >(countQuery, params);
      const total = countResult[0]?.total || 0;

      // Adicionar ordenação
      query += " ORDER BY createdAt DESC";

      // Adicionar paginação
      if (filters.limit) {
        query += " LIMIT ?";
        params.push(filters.limit);

        if (filters.offset) {
          query += " OFFSET ?";
          params.push(filters.offset);
        }
      }

      const results = await this.db.selectExecute<UserRow>(query, params);
      const users = results.map((row) => this.mapRowToUser(row));

      return { users, total };
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  }

  // Atualizar usuário
  async updateUser(
    id: string,
    updateData: UpdateUserData,
  ): Promise<User | null> {
    try {
      const fields: string[] = [];
      const params: (string | Role)[] = [];

      // Construir campos dinâmicos para atualização
      if (updateData.name !== undefined) {
        fields.push("name = ?");
        params.push(updateData.name);
      }

      if (updateData.email !== undefined) {
        fields.push("email = ?");
        params.push(updateData.email);
      }

      if (updateData.picture !== undefined) {
        fields.push("picture = ?");
        params.push(updateData.picture);
      }

      if (updateData.role !== undefined) {
        fields.push("role = ?");
        params.push(updateData.role);
      }

      if (fields.length === 0) {
        throw new Error("Nenhum campo para atualizar fornecido");
      }

      // Adicionar updatedAt
      fields.push("updatedAt = NOW()");
      params.push(id);

      const query = `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = ?
      `;

      const result = await this.db.modifyExecute(query, params);

      if (result.affectedRows === 0) {
        return null; // Usuário não encontrado
      }

      // Retornar o usuário atualizado
      return await this.getUserById(id);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  // Deletar usuário
  async deleteUser(id: string): Promise<boolean> {
    try {
      const query = "DELETE FROM users WHERE id = ?";
      const result = await this.db.modifyExecute(query, [id]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  }

  // Verificar se email já existe
  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    try {
      let query = "SELECT COUNT(*) as count FROM users WHERE email = ?";
      const params: string[] = [email];

      if (excludeId) {
        query += " AND id != ?";
        params.push(excludeId);
      }

      const result = await this.db.selectExecute<
        RowDataPacket & { count: number }
      >(query, params);

      return result[0]?.count > 0;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      throw error;
    }
  }

  // Buscar usuários por role
  async getUsersByRole(role: Role): Promise<User[]> {
    try {
      const query = `
        SELECT id, name, email, picture, role, createdAt, updatedAt
        FROM users
        WHERE role = ?
        ORDER BY createdAt DESC
      `;

      const results = await this.db.selectExecute<UserRow>(query, [role]);
      return results.map((row) => this.mapRowToUser(row));
    } catch (error) {
      console.error("Erro ao buscar usuários por role:", error);
      throw error;
    }
  }

  // Contar usuários por role
  async countUsersByRole(): Promise<Record<Role, number>> {
    try {
      const query = `
        SELECT role, COUNT(*) as count
        FROM users
        GROUP BY role
      `;

      const results = await this.db.selectExecute<
        RowDataPacket & { role: Role; count: number }
      >(query);

      const counts: Record<Role, number> = {
        [Role.USER]: 0,
        [Role.ADMIN]: 0,
        [Role.SELLER]: 0,
      };

      results.forEach((row) => {
        counts[row.role] = row.count;
      });

      return counts;
    } catch (error) {
      console.error("Erro ao contar usuários por role:", error);
      throw error;
    }
  }

  // Operação UPSERT - atualizar se existir, criar se não existir (baseado em email)
  async upsertUser(userData: CreateUserData): Promise<User> {
    try {
      // Primeiro, tentar buscar o usuário por email
      const existingUser = await this.getUserByEmail(userData.email);

      if (existingUser) {
        // Usuário existe, atualizar
        const updateData: UpdateUserData = {
          name: userData.name,
          picture: userData.picture,
          role: userData.role,
        };

        const updatedUser = await this.updateUser(existingUser.id, updateData);
        if (!updatedUser) {
          throw new Error("Falha ao atualizar usuário existente");
        }
        return updatedUser;
      } else {
        // Usuário não existe, criar novo
        const { user } = await this.createUser(userData);
        return user;
      }
    } catch (error) {
      console.error("Erro no upsert do usuário:", error);
      throw error;
    }
  }

  // Operação em lote - criar múltiplos usuários
  async createUsersInBatch(usersData: CreateUserData[]): Promise<string[]> {
    return await this.db.runInTransaction(async (connection) => {
      const createdIds: string[] = [];

      for (const userData of usersData) {
        const userId = userData.id || this.generateId();
        const role = userData.role || Role.USER;

        const query = `
          INSERT INTO users (id, name, email, picture, role, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, NOW(), NOW())
        `;

        const params = [
          userId,
          userData.name,
          userData.email,
          userData.picture,
          role,
        ];

        await connection.execute(query, params);
        createdIds.push(userId);
      }

      return createdIds;
    });
  }

  // Método auxiliar para mapear linha do banco para objeto User
  private mapRowToUser(row: UserRow): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      picture: row.picture,
      role: row.role,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  // Método auxiliar para gerar ID único
  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Exportar instância singleton do serviço
export const userService = new UserService();

// Funções de conveniência para uso direto
export const createUser = (userData: CreateUserData) =>
  userService.createUser(userData);
export const getUserById = (id: string) => userService.getUserById(id);
export const getUserByEmail = (email: string) =>
  userService.getUserByEmail(email);
export const getUsers = (filters?: UserFilters) =>
  userService.getUsers(filters);
export const updateUser = (id: string, updateData: UpdateUserData) =>
  userService.updateUser(id, updateData);
export const deleteUser = (id: string) => userService.deleteUser(id);
export const emailExists = (email: string, excludeId?: string) =>
  userService.emailExists(email, excludeId);
export const getUsersByRole = (role: Role) => userService.getUsersByRole(role);
export const countUsersByRole = () => userService.countUsersByRole();
export const createUsersInBatch = (usersData: CreateUserData[]) =>
  userService.createUsersInBatch(usersData);
export const upsertUser = (userData: CreateUserData) =>
  userService.upsertUser(userData);
