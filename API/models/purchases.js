class Purchase {
    constructor(id_client, id_product, total, status = "finished") {
        this.id_client = id_client;
        this.id_product = id_product;
        this.total = total;
        this.status = status;
    }
}

module.exports = Purchase;
