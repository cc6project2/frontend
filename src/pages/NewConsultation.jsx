import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Heading, Button, VStack, FormControl, FormLabel, Input,
  Textarea, SimpleGrid, HStack, useToast
} from '@chakra-ui/react'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import Card from '../components/common/Card'

const NewConsultation = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [formData, setFormData] = useState({
    motivo: '',
    presionArterial: '',
    frecuenciaCardiaca: '',
    temperatura: '',
    peso: '',
    talla: '',
    examenFisico: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: '',
    proximaCita: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      toast({
        title: 'Consulta guardada',
        description: 'La consulta se ha registrado correctamente',
        status: 'success',
        duration: 3000,
      })
      setIsLoading(false)
      navigate(`/patients/${patientId}`)
    }, 1000)
  }

  return (
    <Box>
      <HStack mb={6}>
        <Button leftIcon={<FiArrowLeft />} variant="ghost" onClick={() => navigate(`/patients/${patientId}`)}>
          Volver
        </Button>
        <Heading size="lg">Nueva Consulta Médica</Heading>
      </HStack>

      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          {/* Motivo de Consulta */}
          <Card>
            <Heading size="md" mb={4}>Motivo de Consulta</Heading>
            <FormControl isRequired>
              <Textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                placeholder="Describa el motivo de la consulta..."
                rows={3}
              />
            </FormControl>
          </Card>

          {/* Signos Vitales */}
          <Card>
            <Heading size="md" mb={4}>Signos Vitales</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Presión Arterial</FormLabel>
                <Input
                  name="presionArterial"
                  value={formData.presionArterial}
                  onChange={handleChange}
                  placeholder="120/80"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Frecuencia Cardíaca</FormLabel>
                <Input
                  name="frecuenciaCardiaca"
                  value={formData.frecuenciaCardiaca}
                  onChange={handleChange}
                  placeholder="72 lpm"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Temperatura</FormLabel>
                <Input
                  name="temperatura"
                  value={formData.temperatura}
                  onChange={handleChange}
                  placeholder="36.5°C"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Peso (kg)</FormLabel>
                <Input
                  name="peso"
                  type="number"
                  value={formData.peso}
                  onChange={handleChange}
                  placeholder="70"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Talla (cm)</FormLabel>
                <Input
                  name="talla"
                  type="number"
                  value={formData.talla}
                  onChange={handleChange}
                  placeholder="170"
                />
              </FormControl>
            </SimpleGrid>
          </Card>

          {/* Examen Físico */}
          <Card>
            <Heading size="md" mb={4}>Examen Físico</Heading>
            <FormControl isRequired>
              <Textarea
                name="examenFisico"
                value={formData.examenFisico}
                onChange={handleChange}
                placeholder="Describa los hallazgos del examen físico..."
                rows={4}
              />
            </FormControl>
          </Card>

          {/* Diagnóstico */}
          <Card>
            <Heading size="md" mb={4}>Diagnóstico</Heading>
            <FormControl isRequired>
              <Textarea
                name="diagnostico"
                value={formData.diagnostico}
                onChange={handleChange}
                placeholder="Diagnóstico médico..."
                rows={3}
              />
            </FormControl>
          </Card>

          {/* Plan Terapéutico */}
          <Card>
            <Heading size="md" mb={4}>Plan Terapéutico</Heading>
            <FormControl isRequired>
              <FormLabel>Tratamiento</FormLabel>
              <Textarea
                name="tratamiento"
                value={formData.tratamiento}
                onChange={handleChange}
                placeholder="Medicamentos, dosis, indicaciones..."
                rows={4}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Observaciones</FormLabel>
              <Textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                placeholder="Observaciones adicionales..."
                rows={2}
              />
            </FormControl>
          </Card>

          {/* Próxima Cita */}
          <Card>
            <Heading size="md" mb={4}>Seguimiento</Heading>
            <FormControl>
              <FormLabel>Fecha de Próxima Cita</FormLabel>
              <Input
                name="proximaCita"
                type="date"
                value={formData.proximaCita}
                onChange={handleChange}
              />
            </FormControl>
          </Card>

          {/* Botones */}
          <HStack justify="flex-end" spacing={4}>
            <Button variant="ghost" onClick={() => navigate(`/patients/${patientId}`)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              leftIcon={<FiSave />}
              colorScheme="primary"
              isLoading={isLoading}
            >
              Guardar Consulta
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  )
}

export default NewConsultation