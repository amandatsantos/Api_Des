"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProductModal from "@/app/components/NewProduct/productmodal";
import { ProductService } from "@/service/ProductService";
import EditProductModal from "@/app/components/EditProductModal/editproductmodal";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  useEffect(() => {
    productService
      .getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const handleAddProduct = async (newProduct: {
    name: string;
    brand: string;
    price: number;
    quantity: number;
  }) => {
    try {
      const createProduct = await productService.createProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, createProduct.data]);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const handleEditProduct = async (
    id: number,
    updatedProduct: Partial<Product>
  ) => {
    try {
      await productService.updateProduct(id, updatedProduct);
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error("Erro ao editar produto:", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await productService.deleteProduct(id.toString());
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.newClient}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Produto
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
                onClick={() => {
                  setProductToEdit(product);
                  setIsEditModalOpen(true);
                }}
              >
                Editar
              </button>
              <button
                className={styles.delete}
                onClick={() => handleDeleteProduct(product.id)}
              >
                Excluir
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
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={productToEdit}
        onSubmit={handleEditProduct}
      />
    </div>
  );
};

export default ProductsPage;
