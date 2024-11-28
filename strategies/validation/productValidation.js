const { z } = require("zod");

const productSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  brand: z.string().min(2, "A marca deve ter pelo menos 2 caracteres"),
  price: z.number().positive("O preço deve ser um número positivo"),
  quantity: z.number().int().min(0, "A quantidade deve ser um número inteiro não negativo"),
});

function validateProduct(data) {
  productSchema.parse(data); // Valida e lança erro se os dados forem inválidos
}

module.exports = { validateProduct };
