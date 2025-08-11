import { MySQLConnection, getDB } from "../../cnx-mysql";
import { User, Role } from "../../../types/tables-type";
import { ClerkUserData, UserRow } from "./types/use-service-clerk-db-types";

export class ClerkUserService {
  private db: MySQLConnection;

  constructor() {
    this.db = getDB();
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

  // Criar um novo usuário com ID específico do Clerk
  async createUser(id: string, userData: ClerkUserData): Promise<User> {
    try {
      const role = userData.role || Role.USER;

      const query = `
        INSERT INTO users (id, name, email, picture, role, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const params = [
        id,
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
      const createdUser = await this.getUserById(id);
      if (!createdUser) {
        throw new Error("Usuário criado mas não encontrado");
      }

      return createdUser;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }

  // Atualizar usuário
  async updateUser(
    id: string,
    updateData: ClerkUserData,
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

  // Operação UPSERT baseada em ID (para Clerk webhooks)
  async upsertUserById(id: string, userData: ClerkUserData): Promise<User> {
    try {
      // Primeiro, tentar buscar o usuário por ID
      const existingUser = await this.getUserById(id);

      if (existingUser) {
        // Usuário existe, atualizar
        const updatedUser = await this.updateUser(id, userData);
        if (!updatedUser) {
          throw new Error("Falha ao atualizar usuário existente");
        }
        return updatedUser;
      } else {
        // Usuário não existe, criar novo com ID específico
        return await this.createUser(id, userData);
      }
    } catch (error) {
      console.error("Erro no upsert do usuário por ID:", error);
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
}

// Exportar instância singleton do serviço
export const clerkUserService = new ClerkUserService();

// Funções de conveniência específicas para Clerk webhooks
export const upsertUserById = (id: string, userData: ClerkUserData) =>
  clerkUserService.upsertUserById(id, userData);

export const deleteUser = (id: string) => clerkUserService.deleteUser(id);

export const getUserById = (id: string) => clerkUserService.getUserById(id);

// Re-exportar types para facilitar o uso
export type {
  ClerkUserData,
  UserRow,
} from "./types/use-service-clerk-db-types";
