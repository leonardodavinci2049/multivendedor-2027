import { Role } from "../../../../types/tables-type";
import { RowDataPacket } from "mysql2/promise";

// Interface para dados de criação de usuário do Clerk
export interface ClerkUserData {
  name: string;
  email: string;
  picture: string;
  role?: Role;
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
