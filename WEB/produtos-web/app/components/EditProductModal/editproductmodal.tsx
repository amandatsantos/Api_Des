import React, { useState, useEffect } from "react";
import styles from "./editproductmodal.module.css";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    brand: string;
    price: number;
    quantity: number;
  } | null;
  onSubmit: (
    id: number,
    updatedData: {
      name?: string;
      brand?: string;
      price?: number;
      quantity?: number;
    }
  ) => void;
}

const EditProductModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
      setQuantity(product.quantity);
    }
  }, [product]);

  const handleSubmit = () => {
    if (product) {
      // Convertendo os valores para o tipo correto
      onSubmit(product.id, {
        name,
        brand,
        price: parseFloat(price.toString()), // Certificando-se de que price é um número
        quantity: parseInt(quantity.toString(), 10), // Certificando-se de que quantity é um número inteiro
      });
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Editar Produto</h2>
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
