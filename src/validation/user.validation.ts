import {z} from 'zod';

export const userValidation = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
    telefone: z.string().nullable().optional(),
    master_id: z.number().nullable().optional(),
    master: z.boolean().default(false),

})
//nome: string;
//email: string;
//senha: string;
//telefone?: string | null;
//master_id?: number | null;