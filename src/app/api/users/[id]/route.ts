import { NextRequest, NextResponse } from "next/server";
import { clerkUserService } from "@/services/db/user/use-service-clerk-db";
import { ClerkUserData } from "@/services/db/user/use-service-clerk-db";

// GET - Buscar usuário por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const user = await clerkUserService.getUserById(id);

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Usuário encontrado",
        user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

// PUT - Atualizar usuário
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userData }: { userData: ClerkUserData } = body;

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const user = await clerkUserService.updateUser(id, userData);

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Usuário atualizado com sucesso",
        user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

// DELETE - Deletar usuário
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const success = await clerkUserService.deleteUser(id);

    if (!success) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Usuário deletado com sucesso" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
