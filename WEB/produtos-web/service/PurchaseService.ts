import { axiosInstance } from "./ProductService";

export class PurchaseService {
  static createPurchase(purchaseData: {
    id_client: string;
    id_product: string;
    total: number;
  }) {
    return axiosInstance.post("api/purchases", purchaseData);
  }

  static getAllPurchases() {
    return axiosInstance.get("api/purchases");
  }

  static getPurchasesByStatus(status: "finished" | "canceled") {
    return axiosInstance.get(`api/purchases/status?status=${status}`);
  }

  static getPurchasesByClient(clientId: string) {
    return axiosInstance.get(`api/purchases/${clientId}`);
  }

  static updatePurchase(purchaseId: string, updatedData: { status?: string; total?: number }) {
    return axiosInstance.put(`api/purchases/${purchaseId}`, updatedData);
  }

  static deletePurchase(purchaseId: string) {
    return axiosInstance.delete(`api/purchases/delete/${purchaseId}`);
  }

  static cancelPurchase(purchaseId: string) {
    return axiosInstance.delete(`api/purchases/${purchaseId}`);
  }
}
