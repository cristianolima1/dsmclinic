import {z} from 'zod';

export const authValidation = z.object ({
    email: z.string().email(),
    senha: z.string().min(6),
})

export const tokenValidation = z.object({
    token: z.string(),
})