import { z } from 'zod'

export const schema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido, ex: (99) 99999-9999'),
  endereco: z
    .string()
    .min(5, 'Endereço deve ter pelo menos 5 caracteres')
    .optional(),
  pais: z.string().min(2, 'Informe o país').optional(),
  estado: z.string().min(2, 'Informe o estado').optional(),
  cidade: z.string().min(2, 'Informe a cidade').optional(),
  cep: z
    .string()
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido')
    .optional(),
  lote: z.string().length(4, 'Lote deve ter exatamente 4 dígitos').optional(),
})

export type FormRegisterData = z.infer<typeof schema>
