const { z } = require("zod");

const productSchema = z.object({
  name: z
    .string()
    .min(1, "O nome do produto é obrigatório")
    .max(255, "O nome do produto não pode ter mais de 255 caracteres"),
  brand: z.string().max(255).optional(),
  price: z.number().positive("O preço deve ser maior que zero"),
  quantity: z.number().int().nonnegative("A quantidade deve ser um número inteiro não negativo"),
});

function validateProduct(data) {
  const result = productSchema.safeParse(data);

  if (!result.success) {
    const errorMessages = result.error.errors.map((err) => err.message).join(", ");
    throw new Error(`Erro de validação: ${errorMessages}`);
  }

  return result.data; 
}

module.exports = { validateProduct };
