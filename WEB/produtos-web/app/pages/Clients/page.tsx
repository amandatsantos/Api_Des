"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ClientModal from "@/app/components/NewClient/clientmodal";
import { ClientService } from "@/service/ClientService";

type Client = {
  id: string;
  name: string;
  email: string;
  bornDate: string; // A propriedade foi renomeada para bornDate
  status: boolean;
};

const ClientsComponent: React.FC = () => {
  const clientService = new ClientService();
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    clientService
      .getAllClients()
      .then((response) => {
        console.log(response.data);
        setClients(response.data);
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
      setClients((prevClients) => [...prevClients, createdClient.data]);
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
            <div className={styles.actions}>
              <button className={styles.edit}>Editar</button>
              <button
                className={cliente.status ? styles.inativar : styles.ativar}
              >
                {cliente.status ? "Inativar" : "Ativar"}
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
    </div>
  );
};

export default ClientsComponent;
