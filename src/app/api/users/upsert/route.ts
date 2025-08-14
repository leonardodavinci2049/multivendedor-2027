import { NextRequest, NextResponse } from "next/server";
import { clerkUserService } from "@/services/db/user/use-service-clerk-db";
import { ClerkUserData } from "@/services/db/user/use-service-clerk-db";

// POST - Upsert usuário (criar ou atualizar)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, userData }: { id: string; userData: ClerkUserData } = body;

    if (!id || !userData.name || !userData.email) {
      return NextResponse.json(
        { error: "ID, nome e email são obrigatórios" },
        { status: 400 },
      );
    }

    const user = await clerkUserService.upsertUserById(id, userData);

    return NextResponse.json(
      {
        message: "Operação upsert realizada com sucesso",
        user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Erro na operação upsert:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
