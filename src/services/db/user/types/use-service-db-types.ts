import { Role } from "../../../../types/tables-type";
import { RowDataPacket } from "mysql2/promise";

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
export interface UserRow extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
