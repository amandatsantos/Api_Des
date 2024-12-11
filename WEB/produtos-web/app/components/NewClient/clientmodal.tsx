import React, { useState } from "react";
import styles from "./clientmodal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; bornDate: string; email: string }) => void;
  existingEmails: string[];
}

const ClientModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  existingEmails,
}) => {
  const [name, setName] = useState("");
  const [bornDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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

    if (existingEmails.includes(email)) {
      setError("O email já está cadastrado.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      onSubmit({ name, bornDate, email });
      setName("");
      setBirthDate("");
      setEmail("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Adicionar Cliente</h2>
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
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;
