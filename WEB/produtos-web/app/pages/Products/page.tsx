"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProductModal from "@/app/components/NewProduct/productmodal";
import { ProductService } from "@/service/ProductService";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
};

const ProductsPage: React.FC = () => {
  const productService = new ProductService();
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    productService
      .getAllProducts()
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });
  }, []);

  const handleAddProduct = async (NewProduct: {
    name: string;
    brand: string;
    price: number;
    quantity: number;
  }) => {
    try {
      const createProduct = await productService.createProduct(NewProduct);
      setProducts((prevProduct) => [...prevProduct, createProduct.data]);
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  const handleEditProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.newClient}
          onClick={() => setIsModalOpen(true)}
        >
          Novo produto
        </button>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <p>
              <strong>{product.name}</strong>
            </p>
            <p>Marca: {product.brand}</p>
            <p>Preço: R${product.price}</p>
            <p>Quantidade: {product.quantity}</p>
            <div className={styles.actions}>
              <button
                className={styles.edit}
                onClick={() =>
                  handleEditProduct(product.id, {
                    quantity: product.quantity + 1,
                  })
                }
              >
                Adicionar Estoque
              </button>
              <button
                className={styles.delete}
                onClick={() =>
                  handleEditProduct(product.id, {
                    quantity: Math.max(product.quantity - 1, 0),
                  })
                }
              >
                Remover Estoque
              </button>
            </div>
          </div>
        ))}
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
        existingIDs={[]}
      />
    </div>
  );
};

export default ProductsPage;
