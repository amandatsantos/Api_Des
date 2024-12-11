import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5265/",
});

export class ClientService {
  static clientService: any;
  static getAllClients() {
    throw new Error("Method not implemented.");
  }
  getAllClients() {
    return axiosInstance.get("api/clients");
  }

  createClient(clientData: { name: string; email: string; bornDate: string }) {
    return axiosInstance.post("api/clients", clientData);
  }

  deleteClient(clientId: string) {
    return axiosInstance.delete(`api/clients/delete/${clientId}`);
  }
}
