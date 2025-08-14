import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/services/cnx-mysql";

export async function GET() {
  try {
    const db = getDB();

    // Teste simples de conexão
    const result = await db.selectExecute("SELECT 1 as test_connection");

    return NextResponse.json({
      success: true,
      message: "Conexão com banco estabelecida",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao testar conexão:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}
