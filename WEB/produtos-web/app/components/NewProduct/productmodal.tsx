import React, { useState } from "react";
import styles from "./productmodal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    brand: string;
    price: number;
    quantity: number;
  }) => void;
  existingIDs: number[];
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");

  /*************  ✨ Codeium Command 🌟  *************/
  const handleValidation = () => {
    if (!name || !brand || !price || !quantity) {
      return false;
    }

    setError("");
    return true;
  };
  /******  d446a3f6-7989-44d3-a4f4-aabb4b184e71  *******/ const handleSubmit =
    () => {
      if (handleValidation()) {
        onSubmit({ name, brand, price, quantity });
        setName("");
        setBrand("");
        setPrice(0);
        setQuantity(0);
        onClose();
      }
    };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Adicionar Produto</h2>
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
            <label className={styles.label}>Marca</label>
            <input
              className={styles.input}
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Preço</label>
            <input
              className={styles.input}
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Quantidade</label>
            <input
              className={styles.input}
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
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

export default ProductModal;
