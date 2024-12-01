const { z } = require("zod");

const clientSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
    bornDate: z.string().min(1, "A data de nascimento é obrigatória").refine(val => !isNaN(Date.parse(val)), {
        message: "Data de nascimento inválida"
    })
});

function validateClient(data) {
    const result = clientSchema.safeParse(data);
    if (!result.success) {
        const errorMessages = result.error.errors.map((err) => err.message).join(", ");
        throw new Error(`Erro de validação: ${errorMessages}`);
    }

    return result.data;
}

module.exports = { validateClient };
