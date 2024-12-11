export type RoutesParams = {
    Profile: {
      id: string;
      nome: string;
      email: string;
      data: string;
    };

    Clientes: undefined;
    // Outras rotas...
    Produtos: {
      id: string,
      name: string,
      brand: string,
      price: number,
      quantity: number,
      status: string,
    };

    Compras: undefined;

    AdicionarCliente: undefined;

    AdicionarCompra: undefined;

    AdicionarProduto: undefined;
    ClienteDetalhes: { cliente: { id: string; name: string; email: string; bornDate: string; status: string } }; // Adapte conforme os campos do cliente
    EditarCliente: { cliente: { id: string; name: string; status: string } };
  };
  