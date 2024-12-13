export type RoutesParams = {
    Profile: {
      id: string;
      nome: string;
      email: string;
      data: string;
    };

    Clientes: undefined;
    
    Produto: undefined;
    Compras: undefined;

    AdicionarCliente: undefined;

    AdicionarCompra: undefined;

    AdicionarProduto: undefined;
    ClienteDetalhes: { cliente: { id: string; name: string; email: string; bornDate: string; status: string } }; 

    ProdutoDetalhes: {produto: {id: string; name: string; brand: string; price: number; quantity: number; status: string}}
    EditarCliente: { cliente: { id: string; name: string; status: string } };
  };
  