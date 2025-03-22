import { z } from 'zod'

export const schema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido, ex: (99) 99999-9999'),
  endereco: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  pais: z.string().min(2, 'Informe o país'),
  estado: z.string().min(2, 'Informe o estado'),
  cidade: z.string().min(2, 'Informe a cidade'),
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  lote: z.string().length(4, 'Lote deve ter exatamente 4 dígitos').optional(),
})

export type FormRegisterData = z.infer<typeof schema>
