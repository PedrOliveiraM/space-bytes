'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Stepper, { Step } from '@/blocks/Components/Stepper/Stepper'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TYPE_ADDRESSES } from '@/constants/typeAddresses'
import { div } from 'framer-motion/client'
import SpaceSwitch from './space-switch'

const schema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  telefone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
  endereco: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  pais: z.string().min(2, 'Informe o país'),
  estado: z.string().min(2, 'Informe o estado'),
  cidade: z.string().min(2, 'Informe a cidade'),
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  lote: z.string().length(4, 'Lote deve ter exatamente 4 dígitos').optional(),
})

type FormData = z.infer<typeof schema>

export function FormRegister() {
  const [checked, setChecked] = useState('Terra')
  const [currentStep, setCurrentStep] = useState(0)

  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
  })

  const handleStepChange = async (currentStep: number, nextStep: number) => {
    if (currentStep === 2) {
      const isValid = await trigger() // Valida todos os campos

      if (!isValid) return false // Impede a mudança de etapa se inválido
    }

    return true
  }

  const onSubmit = (data: FormData) => {
    localStorage.setItem('formData', JSON.stringify(data))
    alert('Dados salvos com sucesso!')
  }

  return (
    <div className="mx-auto h-auto w-full max-w-md">
      <Stepper
        initialStep={1}
        onFinalStepCompleted={handleSubmit(onSubmit)}
        backButtonText="Voltar"
        nextButtonText="Avançar"
        color="blue"
        className="mx-auto h-auto w-full"
      >
        <Step>
          <div className="flex flex-col items-center justify-center gap-5">
            <h2 className="text-xl font-bold">
              Onde está localizado o endereço?
            </h2>
            <p>Escolha se o endereço está na Terra ou em Marte.</p>
            <SpaceSwitch
              leftPlanet="Terra"
              rightPlanet="Marte"
              onChange={(checked) => setChecked(checked)}
            />
          </div>
        </Step>

        <Step>
          <div className="flex flex-col items-center justify-center gap-5">
            <h2 className="text-2xl font-bold">Selecione o tipo de endereço</h2>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione o Tipo de Endereço" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TYPE_ADDRESSES.map((type, index) => (
                    <SelectItem
                      key={index}
                      value={type}
                      className="font-semibold"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Step>

        <Step>
          {checked === 'Terra' ? (
            <div className="flex w-full max-w-md flex-col gap-3">
              <h2 className="text-xl font-bold">Endereço na Terra</h2>

              <Label>Nome Completo</Label>
              <Input
                {...register('nome')}
                placeholder="Digite seu nome completo"
              />
              {errors.nome && (
                <p className="text-red-500">{errors.nome.message}</p>
              )}

              <Label>Telefone</Label>
              <Input {...register('telefone')} placeholder="(99) 99999-9999" />
              {errors.telefone && (
                <p className="text-red-500">{errors.telefone.message}</p>
              )}

              <Label>Endereço</Label>
              <Input
                {...register('endereco')}
                placeholder="Rua, número, complemento"
              />
              {errors.endereco && (
                <p className="text-red-500">{errors.endereco.message}</p>
              )}

              <Label>País</Label>
              <Input {...register('pais')} placeholder="Digite seu país" />
              {errors.pais && (
                <p className="text-red-500">{errors.pais.message}</p>
              )}

              <Label>Estado</Label>
              <Input {...register('estado')} placeholder="Digite seu estado" />
              {errors.estado && (
                <p className="text-red-500">{errors.estado.message}</p>
              )}

              <Label>Cidade</Label>
              <Input {...register('cidade')} placeholder="Digite sua cidade" />
              {errors.cidade && (
                <p className="text-red-500">{errors.cidade.message}</p>
              )}

              <Label>CEP</Label>
              <Input {...register('cep')} placeholder="XXXXX-XXX" />
              {errors.cep && (
                <p className="text-red-500">{errors.cep.message}</p>
              )}
            </div>
          ) : (
            <div className="flex w-full max-w-md flex-col gap-3">
              <h2 className="text-xl font-bold">Endereço em Marte</h2>

              <Label>Lote</Label>
              <Input
                {...register('lote')}
                placeholder="Digite o número do lote (4 dígitos)"
              />
              {errors.lote && (
                <p className="text-red-500">{errors.lote.message}</p>
              )}
            </div>
          )}
        </Step>

        <Step>
          <div className="flex w-full max-w-md flex-col gap-5">
            <h2 className="text-xl font-bold">Revisão do Endereço</h2>
            <p>Confira os dados preenchidos antes de confirmar.</p>

            <div className="flex flex-col gap-3 rounded-lg border p-4">
              {checked === 'Terra' ? (
                <>
                  <p>
                    <strong>Nome:</strong> <span id="review-nome"></span>
                  </p>
                  <p>
                    <strong>Telefone:</strong>{' '}
                    <span id="review-telefone"></span>
                  </p>
                  <p>
                    <strong>Endereço:</strong>{' '}
                    <span id="review-endereco"></span>
                  </p>
                  <p>
                    <strong>País:</strong> <span id="review-pais"></span>
                  </p>
                  <p>
                    <strong>Estado:</strong> <span id="review-estado"></span>
                  </p>
                  <p>
                    <strong>Cidade:</strong> <span id="review-cidade"></span>
                  </p>
                  <p>
                    <strong>CEP:</strong> <span id="review-cep"></span>
                  </p>
                </>
              ) : (
                <p>
                  <strong>Lote:</strong> <span id="review-lote"></span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white"
            >
              Confirmar e Enviar
            </button>
          </div>
        </Step>
      </Stepper>
    </div>
  )
}
