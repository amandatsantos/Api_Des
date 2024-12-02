const { z } = require("zod");

const purchaseSchema = z.object({
    id_client: z.string().uuid({ message: "O ID do cliente deve ser um UUID válido." }),
    id_product: z.string().uuid({ message: "O ID do produto deve ser um UUID válido." }),
    total: z.number().positive("O VALORtOTAL deve ser maior que zero"),
    status: z.enum(["finished", "canceled"]).optional(),
});

function validatePurchase(data) {
    const result = purchaseSchema.safeParse(data);

    if (!result.success) {
        const errorMessages = result.error.errors.map((err) => err.message).join(", ");
        throw new Error(`Erro de validação: ${errorMessages}`);
    }

    return result.data;
}

module.exports = { validatePurchase };
