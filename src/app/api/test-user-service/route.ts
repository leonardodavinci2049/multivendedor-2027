import { NextRequest, NextResponse } from "next/server";
import {
  clerkUserService,
  ClerkUserData,
} from "@/services/db/user/use-service-clerk-db";
import { Role } from "@/types/tables-type";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const operation = searchParams.get("operation");

    if (!userId) {
      return NextResponse.json(
        { error: "userId é obrigatório" },
        { status: 400 },
      );
    }

    switch (operation) {
      case "getUserById":
        const user = await clerkUserService.getUserById(userId);
        return NextResponse.json({ success: true, data: user });

      case "deleteUser":
        const deleted = await clerkUserService.deleteUser(userId);
        return NextResponse.json({ success: true, data: deleted });

      default:
        return NextResponse.json(
          { error: "Operação não suportada via GET" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Erro na API test-user-service (GET):", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, userId, userData } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId é obrigatório" },
        { status: 400 },
      );
    }

    switch (operation) {
      case "createUser":
        if (!userData) {
          return NextResponse.json(
            { error: "userData é obrigatório para createUser" },
            { status: 400 },
          );
        }
        const createdUser = await clerkUserService.createUser(userId, userData);
        return NextResponse.json({ success: true, data: createdUser });

      case "updateUser":
        if (!userData) {
          return NextResponse.json(
            { error: "userData é obrigatório para updateUser" },
            { status: 400 },
          );
        }
        const updatedUser = await clerkUserService.updateUser(userId, userData);
        return NextResponse.json({ success: true, data: updatedUser });

      case "upsertUser":
        if (!userData) {
          return NextResponse.json(
            { error: "userData é obrigatório para upsertUser" },
            { status: 400 },
          );
        }
        const upsertedUser = await clerkUserService.upsertUserById(
          userId,
          userData,
        );
        return NextResponse.json({ success: true, data: upsertedUser });

      default:
        return NextResponse.json(
          { error: "Operação não reconhecida" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Erro na API test-user-service (POST):", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId é obrigatório" },
        { status: 400 },
      );
    }

    const deleted = await clerkUserService.deleteUser(userId);
    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    console.error("Erro na API test-user-service (DELETE):", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}
