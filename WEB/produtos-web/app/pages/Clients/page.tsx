"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ClientModal from "@/app/components/NewClient/clientmodal";
import { ClientService } from "@/service/ClientService";
import EditClientModal from "@/app/components/EditClientModal/editclientmodal";

type Client = {
  id: string;
  name: string;
  email: string;
  bornDate: string;
  status: string; // Aceita "active" ou "inactive"
};

const ClientsComponent: React.FC = () => {
  const clientService = new ClientService();
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEditClick = (client: Client) => {
    setClientToEdit(client);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (updatedClient: {
    id: string;
    name: string;
    bornDate: string;
    email: string;
  }) => {
    try {
      await clientService.updateClient(updatedClient.id, updatedClient);
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === updatedClient.id
            ? { ...client, ...updatedClient }
            : client
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
    }
  };

  useEffect(() => {
    clientService
      .getAllClients()
      .then((response) => {
        const formattedClients = response.data.map((client: Client) => ({
          ...client,
          bornDate: formatDate(client.bornDate),
        }));
        setClients(formattedClients);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });
  }, []);

  const handleAddClient = async (newClient: {
    name: string;
    bornDate: string;
    email: string;
  }) => {
    try {
      const createdClient = await clientService.createClient(newClient);
      setClients((prevClients) => [
        ...prevClients,
        {
          ...createdClient.data,
          bornDate: formatDate(createdClient.data.bornDate),
        },
      ]);
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    try {
      await clientService.deleteClient(clientId);
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== clientId)
      );
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  const handleToggleStatus = async (
    clientId: string,
    currentStatus: string
  ) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await clientService.updateClient(clientId, { status: newStatus });

      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === clientId ? { ...client, status: newStatus } : client
        )
      );
    } catch (error) {
      console.error(`Erro ao atualizar status do cliente:`, error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.newClient}
          onClick={() => setIsModalOpen(true)}
        >
          Novo cliente
        </button>
      </div>
      <div className={styles.grid}>
        {clients.map((cliente) => (
          <div className={styles.card} key={cliente.id}>
            <p>
              <strong>{cliente.name}</strong>
            </p>
            <p>{cliente.email}</p>
            <p>{cliente.bornDate}</p>
            <p>Status: {cliente.status === "active" ? "Ativo" : "Inativo"}</p>
            <div className={styles.actions}>
              <button
                className={styles.edit}
                onClick={() => handleEditClick(cliente)}
              >
                Editar
              </button>
              <button
                className={
                  cliente.status === "active" ? styles.inativar : styles.ativar
                }
                onClick={() => handleToggleStatus(cliente.id, cliente.status)}
              >
                {cliente.status === "active" ? "Inativar" : "Ativar"}
              </button>
              <button
                className={styles.delete}
                onClick={() => handleDeleteClient(cliente.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddClient}
        existingEmails={clients.map((cliente) => cliente.email)}
      />
      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        clientData={
          clientToEdit || { id: "", name: "", bornDate: "", email: "" }
        }
        existingEmails={clients.map((c) => c.email)}
      />
    </div>
  );
};

export default ClientsComponent;
