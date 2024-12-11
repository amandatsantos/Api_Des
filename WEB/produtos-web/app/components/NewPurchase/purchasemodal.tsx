import React, { useState } from "react";
import styles from "./purchasemodal.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    clientId: number;
    items: { productId: number; quantity: number }[];
  }) => void;
};

type Cliente = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

const clientesMock: Cliente[] = [
  { id: 1, name: "Maria da Silva" },
  { id: 2, name: "João Souza" },
];

const productsMock: Product[] = [
  { id: 1, name: "biscoito", price: 2.5 },
  { id: 2, name: "molho de tomate", price: 7.99 },
  { id: 3, name: "suco de laranja", price: 9.99 },
];

const PurchaseModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [clientId, setClientId] = useState<number | null>(null);
  const [cart, setCart] = useState<{ productId: number; quantity: number }[]>(
    []
  );

  const handleAddToCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { productId, quantity: 1 }];
    });
  };

  const handleSubmit = () => {
    if (!clientId || cart.length === 0) {
      alert("Selecione um cliente e adicione produtos ao carrinho.");
      return;
    }
    onSubmit({ clientId, items: cart });
    onClose();
    setCart([]);
    setClientId(null);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Nova Compra</h2>
        <label className={styles.label}>
          Cliente:
          <select
            className={styles.select}
            value={clientId ?? ""}
            onChange={(e) => setClientId(Number(e.target.value))}
          >
            <option value="">Selecione um cliente</option>
            {clientesMock.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>
        <h3 className={styles.label}>Produtos:</h3>
        <div className={styles.products}>
          {productsMock.map((product) => (
            <div key={product.id}>
              <p className={styles.product}>
                {product.name} - R${product.price.toFixed(2)}
              </p>
              <button
                className={styles.button}
                onClick={() => handleAddToCart(product.id)}
              >
                Adicionar
              </button>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.submit} onClick={handleSubmit}>
            Registrar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
