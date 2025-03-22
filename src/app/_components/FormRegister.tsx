'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
import { FormRegisterData, schema } from '@/schemas/FormSchema'
import StatusModal from './Modal'
import SpaceSwitch from './space-switch'

export function FormRegister() {
  const [checked, setChecked] = useState('Terra')
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined,
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalStatus, setModalStatus] = useState<'success' | 'error' | null>(
    null,
  )
  const [modalMessage, setModalMessage] = useState('')

  const showSuccessModal = () => {
    setModalStatus('success')
    setModalMessage('Parabens! Seu endereço foi cadastrado com sucesso.')
    setIsModalOpen(true)
  }

  const showErrorModal = () => {
    setModalStatus('error')
    setModalMessage(
      'Houve um erro ao cadastrar o endereço. Tente novamente mais tarde.',
    )
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const onSubmit = (data: FormRegisterData) => {
    try {
      if (!isValid) showErrorModal()
      console.log('Form data:', data)
      localStorage.setItem('formData', JSON.stringify(data))
      showSuccessModal()
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Error saving data:', error)
      showErrorModal()
    }
  }

  return (
    <div className="mx-auto h-auto w-full max-w-md">
      <Stepper
        color="blue"
        initialStep={1}
        onStepChange={(step) => {
          console.log('Step changed to:', step)
        }}
        backButtonText="Voltar"
        nextButtonText="Avançar"
        className="mx-auto h-auto w-full"
        onFinalStepCompleted={handleSubmit(onSubmit)}
        validateBeforeNext={() => isValid}
        validateStep={3}
        onSubmit={handleSubmit(onSubmit)}
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
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
              defaultValue="TRABALHO"
            >
              <SelectTrigger className="w-[240px]">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full max-w-md flex-col gap-3">
              <h2 className="text-xl font-bold">Detalhes do Endereço</h2>

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

              {checked === 'Terra' ? (
                <div className="flex flex-col gap-3">
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
                  <Input
                    {...register('estado')}
                    placeholder="Digite seu estado"
                  />
                  {errors.estado && (
                    <p className="text-red-500">{errors.estado.message}</p>
                  )}

                  <Label>Cidade</Label>
                  <Input
                    {...register('cidade')}
                    placeholder="Digite sua cidade"
                  />
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
                <div className="flex flex-col gap-3">
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
            </div>
          </form>
        </Step>
      </Stepper>
      <StatusModal
        status={modalStatus}
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={closeModal}
        autoCloseDelay={5000}
      />
    </div>
  )
}
