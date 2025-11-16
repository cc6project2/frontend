import { VStack, FormControl, FormLabel, Input, Select, Button, HStack } from '@chakra-ui/react'
import { useState } from 'react'

const PatientForm = ({ patient, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    nombre: patient?.nombre || '',
    dpi: patient?.dpi || '',
    edad: patient?.edad || '',
    genero: patient?.genero || '',
    telefono: patient?.telefono || '',
    direccion: patient?.direccion || '',
    email: patient?.email || ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Nombre Completo</FormLabel>
          <Input name="nombre" value={formData.nombre} onChange={handleChange} />
        </FormControl>

        <HStack w="full" spacing={4}>
          <FormControl isRequired>
            <FormLabel>DPI</FormLabel>
            <Input name="dpi" value={formData.dpi} onChange={handleChange} maxLength={13} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Edad</FormLabel>
            <Input name="edad" type="number" value={formData.edad} onChange={handleChange} />
          </FormControl>
        </HStack>

        <HStack w="full" spacing={4}>
          <FormControl isRequired>
            <FormLabel>Género</FormLabel>
            <Select name="genero" value={formData.genero} onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Teléfono</FormLabel>
            <Input name="telefono" value={formData.telefono} onChange={handleChange} maxLength={8} />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Dirección</FormLabel>
          <Input name="direccion" value={formData.direccion} onChange={handleChange} />
        </FormControl>

        <HStack w="full" justify="flex-end" spacing={3} pt={4}>
          <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" colorScheme="primary" isLoading={isLoading}>
            {patient ? 'Actualizar' : 'Guardar'}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}

export default PatientForm