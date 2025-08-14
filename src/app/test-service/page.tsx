"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Role } from "@/types/tables-type";

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

interface ClerkUserData {
  name: string;
  email: string;
  picture: string;
  role?: Role;
}

const TestUserServicePage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info",
  );

  // Estados para formulários
  const [getUserId, setGetUserId] = useState("");
  const [createUserData, setCreateUserData] = useState({
    id: "",
    name: "",
    email: "",
    picture: "",
    role: Role.USER as Role,
  });
  const [updateUserData, setUpdateUserData] = useState({
    id: "",
    name: "",
    email: "",
    picture: "",
    role: Role.USER as Role,
  });
  const [deleteUserId, setDeleteUserId] = useState("");
  const [upsertUserData, setUpsertUserData] = useState({
    id: "",
    name: "",
    email: "",
    picture: "",
    role: Role.USER as Role,
  });

  const showMessage = (
    msg: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 5000);
  };

  // Buscar usuário por ID
  const handleGetUser = async () => {
    if (!getUserId.trim()) {
      showMessage("Por favor, insira um ID de usuário", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${getUserId}`);
      const data = await response.json();

      if (response.ok) {
        setSelectedUser(data.user);
        showMessage("Usuário encontrado com sucesso!", "success");
      } else {
        setSelectedUser(null);
        showMessage(data.error || "Usuário não encontrado", "error");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      showMessage("Erro ao buscar usuário", "error");
      setSelectedUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Criar novo usuário
  const handleCreateUser = async () => {
    if (
      !createUserData.id.trim() ||
      !createUserData.name.trim() ||
      !createUserData.email.trim()
    ) {
      showMessage("Por favor, preencha todos os campos obrigatórios", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: createUserData.id,
          userData: {
            name: createUserData.name,
            email: createUserData.email,
            picture:
              createUserData.picture || "https://via.placeholder.com/150",
            role: createUserData.role,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSelectedUser(data.user);
        showMessage("Usuário criado com sucesso!", "success");
        setCreateUserData({
          id: "",
          name: "",
          email: "",
          picture: "",
          role: Role.USER,
        });
      } else {
        showMessage(data.error || "Erro ao criar usuário", "error");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      showMessage("Erro ao criar usuário", "error");
    } finally {
      setLoading(false);
    }
  };

  // Atualizar usuário
  const handleUpdateUser = async () => {
    if (!updateUserData.id.trim()) {
      showMessage("Por favor, insira um ID de usuário", "error");
      return;
    }

    const updatePayload: Partial<ClerkUserData> = {};
    if (updateUserData.name.trim()) updatePayload.name = updateUserData.name;
    if (updateUserData.email.trim()) updatePayload.email = updateUserData.email;
    if (updateUserData.picture.trim())
      updatePayload.picture = updateUserData.picture;
    if (updateUserData.role) updatePayload.role = updateUserData.role;

    if (Object.keys(updatePayload).length === 0) {
      showMessage(
        "Por favor, preencha pelo menos um campo para atualizar",
        "error",
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${updateUserData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData: updatePayload }),
      });

      const data = await response.json();

      if (response.ok) {
        setSelectedUser(data.user);
        showMessage("Usuário atualizado com sucesso!", "success");
        setUpdateUserData({
          id: "",
          name: "",
          email: "",
          picture: "",
          role: Role.USER,
        });
      } else {
        showMessage(data.error || "Erro ao atualizar usuário", "error");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      showMessage("Erro ao atualizar usuário", "error");
    } finally {
      setLoading(false);
    }
  };

  // Deletar usuário
  const handleDeleteUser = async () => {
    if (!deleteUserId.trim()) {
      showMessage("Por favor, insira um ID de usuário", "error");
      return;
    }

    if (!confirm("Tem certeza que deseja deletar este usuário?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${deleteUserId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Usuário deletado com sucesso!", "success");
        setDeleteUserId("");
        if (selectedUser?.id === deleteUserId) {
          setSelectedUser(null);
        }
      } else {
        showMessage(data.error || "Erro ao deletar usuário", "error");
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      showMessage("Erro ao deletar usuário", "error");
    } finally {
      setLoading(false);
    }
  };

  // Upsert usuário
  const handleUpsertUser = async () => {
    if (
      !upsertUserData.id.trim() ||
      !upsertUserData.name.trim() ||
      !upsertUserData.email.trim()
    ) {
      showMessage("Por favor, preencha todos os campos obrigatórios", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/users/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: upsertUserData.id,
          userData: {
            name: upsertUserData.name,
            email: upsertUserData.email,
            picture:
              upsertUserData.picture || "https://via.placeholder.com/150",
            role: upsertUserData.role,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSelectedUser(data.user);
        showMessage("Operação upsert realizada com sucesso!", "success");
        setUpsertUserData({
          id: "",
          name: "",
          email: "",
          picture: "",
          role: Role.USER,
        });
      } else {
        showMessage(data.error || "Erro na operação upsert", "error");
      }
    } catch (error) {
      console.error("Erro na operação upsert:", error);
      showMessage("Erro na operação upsert", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Teste de Serviço de Usuário - CRUD
      </h1>

      {/* Mensagem de feedback */}
      {message && (
        <div
          className={`mb-6 rounded-lg p-4 ${
            messageType === "success"
              ? "border border-green-300 bg-green-100 text-green-700"
              : messageType === "error"
                ? "border border-red-300 bg-red-100 text-red-700"
                : "border border-blue-300 bg-blue-100 text-blue-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Seção de Operações CRUD */}
        <div className="space-y-8">
          {/* Buscar Usuário */}
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-blue-600">
              1. Buscar Usuário
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="getUserId">ID do Usuário</Label>
                <Input
                  id="getUserId"
                  type="text"
                  value={getUserId}
                  onChange={(e) => setGetUserId(e.target.value)}
                  placeholder="Digite o ID do usuário"
                />
              </div>
              <Button
                onClick={handleGetUser}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Buscando..." : "Buscar Usuário"}
              </Button>
            </div>
          </div>

          {/* Criar Usuário */}
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-green-600">
              2. Criar Usuário
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="createId">ID do Usuário *</Label>
                <Input
                  id="createId"
                  type="text"
                  value={createUserData.id}
                  onChange={(e) =>
                    setCreateUserData((prev) => ({
                      ...prev,
                      id: e.target.value,
                    }))
                  }
                  placeholder="ID único do usuário"
                />
              </div>
              <div>
                <Label htmlFor="createName">Nome *</Label>
                <Input
                  id="createName"
                  type="text"
                  value={createUserData.name}
                  onChange={(e) =>
                    setCreateUserData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Nome do usuário"
                />
              </div>
              <div>
                <Label htmlFor="createEmail">Email *</Label>
                <Input
                  id="createEmail"
                  type="email"
                  value={createUserData.email}
                  onChange={(e) =>
                    setCreateUserData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="createPicture">URL da Foto</Label>
                <Input
                  id="createPicture"
                  type="text"
                  value={createUserData.picture}
                  onChange={(e) =>
                    setCreateUserData((prev) => ({
                      ...prev,
                      picture: e.target.value,
                    }))
                  }
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>
              <div>
                <Label htmlFor="createRole">Função</Label>
                <select
                  id="createRole"
                  value={createUserData.role}
                  onChange={(e) =>
                    setCreateUserData((prev) => ({
                      ...prev,
                      role: e.target.value as Role,
                    }))
                  }
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value={Role.USER}>USER</option>
                  <option value={Role.ADMIN}>ADMIN</option>
                  <option value={Role.SELLER}>SELLER</option>
                </select>
              </div>
              <Button
                onClick={handleCreateUser}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Criando..." : "Criar Usuário"}
              </Button>
            </div>
          </div>

          {/* Atualizar Usuário */}
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-yellow-600">
              3. Atualizar Usuário
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="updateId">ID do Usuário *</Label>
                <Input
                  id="updateId"
                  type="text"
                  value={updateUserData.id}
                  onChange={(e) =>
                    setUpdateUserData((prev) => ({
                      ...prev,
                      id: e.target.value,
                    }))
                  }
                  placeholder="ID do usuário a ser atualizado"
                />
              </div>
              <div>
                <Label htmlFor="updateName">Novo Nome</Label>
                <Input
                  id="updateName"
                  type="text"
                  value={updateUserData.name}
                  onChange={(e) =>
                    setUpdateUserData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Novo nome (deixe vazio para não alterar)"
                />
              </div>
              <div>
                <Label htmlFor="updateEmail">Novo Email</Label>
                <Input
                  id="updateEmail"
                  type="email"
                  value={updateUserData.email}
                  onChange={(e) =>
                    setUpdateUserData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Novo email (deixe vazio para não alterar)"
                />
              </div>
              <div>
                <Label htmlFor="updatePicture">Nova URL da Foto</Label>
                <Input
                  id="updatePicture"
                  type="text"
                  value={updateUserData.picture}
                  onChange={(e) =>
                    setUpdateUserData((prev) => ({
                      ...prev,
                      picture: e.target.value,
                    }))
                  }
                  placeholder="Nova URL da foto (deixe vazio para não alterar)"
                />
              </div>
              <div>
                <Label htmlFor="updateRole">Nova Função</Label>
                <select
                  id="updateRole"
                  value={updateUserData.role}
                  onChange={(e) =>
                    setUpdateUserData((prev) => ({
                      ...prev,
                      role: e.target.value as Role,
                    }))
                  }
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value={Role.USER}>USER</option>
                  <option value={Role.ADMIN}>ADMIN</option>
                  <option value={Role.SELLER}>SELLER</option>
                </select>
              </div>
              <Button
                onClick={handleUpdateUser}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Atualizando..." : "Atualizar Usuário"}
              </Button>
            </div>
          </div>

          {/* Deletar Usuário */}
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-red-600">
              4. Deletar Usuário
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deleteId">ID do Usuário</Label>
                <Input
                  id="deleteId"
                  type="text"
                  value={deleteUserId}
                  onChange={(e) => setDeleteUserId(e.target.value)}
                  placeholder="ID do usuário a ser deletado"
                />
              </div>
              <Button
                onClick={handleDeleteUser}
                disabled={loading}
                variant="destructive"
                className="w-full"
              >
                {loading ? "Deletando..." : "Deletar Usuário"}
              </Button>
            </div>
          </div>

          {/* Upsert Usuário */}
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-purple-600">
              5. Upsert Usuário
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Cria um novo usuário ou atualiza se já existir
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="upsertId">ID do Usuário *</Label>
                <Input
                  id="upsertId"
                  type="text"
                  value={upsertUserData.id}
                  onChange={(e) =>
                    setUpsertUserData((prev) => ({
                      ...prev,
                      id: e.target.value,
                    }))
                  }
                  placeholder="ID do usuário"
                />
              </div>
              <div>
                <Label htmlFor="upsertName">Nome *</Label>
                <Input
                  id="upsertName"
                  type="text"
                  value={upsertUserData.name}
                  onChange={(e) =>
                    setUpsertUserData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Nome do usuário"
                />
              </div>
              <div>
                <Label htmlFor="upsertEmail">Email *</Label>
                <Input
                  id="upsertEmail"
                  type="email"
                  value={upsertUserData.email}
                  onChange={(e) =>
                    setUpsertUserData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="upsertPicture">URL da Foto</Label>
                <Input
                  id="upsertPicture"
                  type="text"
                  value={upsertUserData.picture}
                  onChange={(e) =>
                    setUpsertUserData((prev) => ({
                      ...prev,
                      picture: e.target.value,
                    }))
                  }
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>
              <div>
                <Label htmlFor="upsertRole">Função</Label>
                <select
                  id="upsertRole"
                  value={upsertUserData.role}
                  onChange={(e) =>
                    setUpsertUserData((prev) => ({
                      ...prev,
                      role: e.target.value as Role,
                    }))
                  }
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value={Role.USER}>USER</option>
                  <option value={Role.ADMIN}>ADMIN</option>
                  <option value={Role.SELLER}>SELLER</option>
                </select>
              </div>
              <Button
                onClick={handleUpsertUser}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Processando..." : "Upsert Usuário"}
              </Button>
            </div>
          </div>
        </div>

        {/* Seção de Exibição de Dados */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Dados do Usuário</h2>
            {selectedUser ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium text-gray-600">ID:</Label>
                    <p className="text-sm break-all">{selectedUser.id}</p>
                  </div>
                  <div>
                    <Label className="font-medium text-gray-600">Nome:</Label>
                    <p className="text-sm">{selectedUser.name}</p>
                  </div>
                  <div>
                    <Label className="font-medium text-gray-600">Email:</Label>
                    <p className="text-sm break-all">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label className="font-medium text-gray-600">Função:</Label>
                    <p className="text-sm">
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          selectedUser.role === Role.ADMIN
                            ? "bg-red-100 text-red-800"
                            : selectedUser.role === Role.SELLER
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedUser.role}
                      </span>
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="font-medium text-gray-600">Foto:</Label>
                    <div className="mt-2">
                      {selectedUser.picture ? (
                        <img
                          src={selectedUser.picture}
                          alt="Foto do usuário"
                          className="h-20 w-20 rounded-full border-2 border-gray-300 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://via.placeholder.com/80?text=Foto";
                          }}
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-500">
                          Sem foto
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium text-gray-600">
                      Criado em:
                    </Label>
                    <p className="text-sm">
                      {new Date(selectedUser.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <Label className="font-medium text-gray-600">
                      Atualizado em:
                    </Label>
                    <p className="text-sm">
                      {new Date(selectedUser.updatedAt).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="py-8 text-center text-gray-500">
                Nenhum usuário selecionado. <br />
                Use as operações ao lado para buscar ou criar um usuário.
              </p>
            )}
          </div>

          {/* Informações de Teste */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-blue-800">
              Instruções de Teste
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>
                <strong>1. Buscar:</strong> Digite um ID existente para ver os
                dados do usuário.
              </p>
              <p>
                <strong>2. Criar:</strong> Crie um novo usuário com ID único.
              </p>
              <p>
                <strong>3. Atualizar:</strong> Modifique dados de um usuário
                existente.
              </p>
              <p>
                <strong>4. Deletar:</strong> Remove um usuário da base de dados.
              </p>
              <p>
                <strong>5. Upsert:</strong> Cria ou atualiza baseado no ID
                fornecido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestUserServicePage;
