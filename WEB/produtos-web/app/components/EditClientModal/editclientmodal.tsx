import React, { useState, useEffect } from "react";
import styles from "./editclientmodal.module.css";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    id: string;
    name: string;
    bornDate: string;
    email: string;
  }) => void;
  clientData: { id: string; name: string; bornDate: string; email: string };
  existingEmails: string[];
}

const EditClientModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  clientData,
  existingEmails,
}) => {
  const [name, setName] = useState(clientData.name);
  const [bornDate, setBirthDate] = useState(clientData.bornDate);
  const [email, setEmail] = useState(clientData.email);
  const [error, setError] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (isOpen) {
      setName(clientData.name);
      setBirthDate(formatDate(clientData.bornDate));
      setEmail(clientData.email);
    }
  }, [isOpen, clientData]);

  const handleValidation = () => {
    const birthYear = new Date(bornDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (!name || !bornDate || !email) {
      setError("Todos os campos são obrigatórios.");
      return false;
    }

    if (age < 18) {
      setError("O cliente deve ter mais de 18 anos.");
      return false;
    }

    if (existingEmails.includes(email) && email !== clientData.email) {
      setError("O email já está cadastrado.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      onSubmit({ id: clientData.id, name, bornDate, email });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Editar Cliente</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Nome</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Data de Nascimento</label>
            <input
              className={styles.input}
              type="date"
              value={bornDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onClose}>
              Cancelar
            </button>
            <button
              type="button"
              className={styles.submit}
              onClick={handleSubmit}
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;
