const { z } = require("zod");

const purchaseSchema = z.object({

    total: z.number().int().positive({ message: "O total deve ser um número inteiro positivo." }),
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

