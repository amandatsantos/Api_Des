"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import PurchaseModal from "@/app/components/NewPurchase/purchasemodal";

type Cliente = {
  id: number;
  name: string;
  email: string;
};

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
};

type Purchase = {
  id: number;
  client: Cliente;
  items: { product: Product; quantity: number }[];
  total: number;
};

const clientesMock: Cliente[] = [
  { id: 1, name: "Maria da Silva", email: "email@email.com" },
  { id: 2, name: "João Souza", email: "joao@email.com" },
];

const productsMock: Product[] = [
  { id: 1, name: "biscoito", brand: "piraque", price: 2.5 },
  { id: 2, name: "molho de tomate", brand: "olé", price: 7.99 },
  { id: 3, name: "suco de laranja", brand: "delvalle", price: 9.99 },
];

const purchasesMock: Purchase[] = [
  {
    id: 1,
    client: clientesMock[0],
    items: [
      { product: productsMock[0], quantity: 2 },
      { product: productsMock[1], quantity: 1 },
    ],
    total: 12.99,
  },
  {
    id: 2,
    client: clientesMock[1],
    items: [{ product: productsMock[2], quantity: 3 }],
    total: 29.97,
  },
];

const PurchasesPage: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>(purchasesMock);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPurchase = (newPurchase: {
    clientId: number;
    items: { productId: number; quantity: number }[];
  }) => {
    const client = clientesMock.find((c) => c.id === newPurchase.clientId);
    const items = newPurchase.items.map((item) => {
      const product = productsMock.find((p) => p.id === item.productId);
      return { product: product!, quantity: item.quantity };
    });
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const newId = purchases.length + 1;
    setPurchases([...purchases, { id: newId, client: client!, items, total }]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.newPurchase}
          onClick={() => setIsModalOpen(true)}
        >
          Nova Compra
        </button>
      </div>
      <div className={styles.grid}>
        {purchases.map((purchase) => (
          <div className={styles.card} key={purchase.id}>
            <h3 className={styles.title}>Compra #{purchase.id}</h3>
            <p className={styles.subtitle}>Cliente: {purchase.client.name}</p>
            <p className={styles.subtitle}>Email: {purchase.client.email}</p>
            <ul>
              {purchase.items.map((item, index) => (
                <li key={index} className={styles.item}>
                  {item.quantity}x {item.product.name} - R$
                  {(item.product.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total: R${purchase.total.toFixed(2)}</strong>
            </p>
          </div>
        ))}
      </div>
      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPurchase}
      />
    </div>
  );
};

export default PurchasesPage;
