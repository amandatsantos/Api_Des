import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:5265/",
});


export class ClientService {
  static clientService: any;

  getAllClients() {
    return axiosInstance.get("api/clients");
  }

  createClient(clientData: { name: string; email: string; bornDate: string }) {
    return axiosInstance.post("api/clients", clientData);
  }

  updateClient(id: string, updateData: { name?: string; email?: string; bornDate?: string; status?: string }) {
    return axiosInstance.put(`api/clients/${id}`, updateData);
  }

  inactivateClient(id: string) {
  return axiosInstance.delete(`http://localhost:5265/api/clients/${id}/inactivate`)
    .then(response => {
      console.log('Cliente inativado com sucesso:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Erro ao inativar cliente:', error.response ? error.response.data : error.message);
      throw error;
    });
}



  deleteClient(clientId: string) {
    return axiosInstance.delete(`api/clients/delete/${clientId}`);
  }
}
