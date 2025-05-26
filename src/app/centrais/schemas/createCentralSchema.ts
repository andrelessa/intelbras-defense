import { z } from "zod";

export const createCentralSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  mac: z
    .string()
    .regex(/^([0-9A-F]{2}:){5}[0-9A-F]{2}$/, "Formato de MAC inválido"),
  modelId: z.string().min(1, "Selecione um modelo"),
});

export type CreateCentralData = z.infer<typeof createCentralSchema>;
