import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5265/",
});

export class ProductService {
  static getAllProducts() {
    throw new Error("Method not implemented.");
  }
  getAllProducts() {
    return axiosInstance.get("api/products");
    }
    
    createProduct(productData: { name: string; brand: string; price: number; quantity: number }) {
      return axiosInstance.post("api/products", productData);
    }   

    deleteProduct(productId: string) {
      return axiosInstance.delete(`api/products/delete/${productId}`);
    }

    
}