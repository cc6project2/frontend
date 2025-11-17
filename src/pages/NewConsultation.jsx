// src/pages/NewConsultation.jsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Heading,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  SimpleGrid,
  HStack,
  useToast
} from '@chakra-ui/react'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import Card from '../components/common/Card'
import { consultationService } from '../services/consultationService'

const NewConsultation = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [formData, setFormData] = useState({
    motivo: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: '',
    examenFisico: '',
    presionArterial: '',
    frecuenciaCardiaca: '',
    temperatura: '',
    peso: '',
    talla: '',
    proximaCita: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Construimos el payload esperado por el backend
      const payload = {
        patientId: Number(patientId),
        motivo: formData.motivo || null,
        diagnostico: formData.diagnostico || null,
        tratamiento: formData.tratamiento || null,
        observaciones: formData.observaciones || null,
        examenFisico: formData.examenFisico || null,
        presionArterial: formData.presionArterial || null,
        frecuenciaCardiaca: formData.frecuenciaCardiaca
          ? Number(formData.frecuenciaCardiaca)
          : null,
        temperatura: formData.temperatura
          ? Number(formData.temperatura)
          : null,
        peso: formData.peso ? Number(formData.peso) : null,
        talla: formData.talla ? Number(formData.talla) : null,
        proximaCita: formData.proximaCita || null
      }

      await consultationService.create(payload)

      toast({
        title: 'Consulta guardada',
        description: 'La consulta se ha registrado correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true
      })

      // Volvemos al detalle del paciente
      navigate(`/patients/${patientId}`)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error al guardar consulta',
        description: err.message || 'Intenta de nuevo más tarde',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate(`/patients/${patientId}`)
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <HStack>
          <Button leftIcon={<FiArrowLeft />} variant="ghost" onClick={handleBack}>
            Volver
          </Button>
          <Heading size="lg">Nueva consulta</Heading>
        </HStack>
      </HStack>

      <form onSubmit={handleSubmit}>
        <VStack align="stretch" spacing={6}>
          {/* Motivo y diagnóstico */}
          <Card>
            <VStack align="stretch" spacing={4}>
              <FormControl isRequired>
                <FormLabel>Motivo de consulta</FormLabel>
                <Textarea
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  placeholder="Describa el motivo principal de la consulta"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Diagnóstico</FormLabel>
                <Textarea
                  name="diagnostico"
                  value={formData.diagnostico}
                  onChange={handleChange}
                  placeholder="Diagnóstico clínico"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Tratamiento</FormLabel>
                <Textarea
                  name="tratamiento"
                  value={formData.tratamiento}
                  onChange={handleChange}
                  placeholder="Medicamentos, dosis y recomendaciones"
                />
              </FormControl>
            </VStack>
          </Card>

          {/* Signos vitales */}
          <Card>
            <Heading size="md" mb={4}>
              Signos vitales
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <FormControl>
                <FormLabel>Presión arterial (mmHg)</FormLabel>
                <Input
                  name="presionArterial"
                  value={formData.presionArterial}
                  onChange={handleChange}
                  placeholder="120/80"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Frecuencia cardíaca (lpm)</FormLabel>
                <Input
                  name="frecuenciaCardiaca"
                  type="number"
                  value={formData.frecuenciaCardiaca}
                  onChange={handleChange}
                  placeholder="80"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Temperatura (°C)</FormLabel>
                <Input
                  name="temperatura"
                  type="number"
                  step="0.1"
                  value={formData.temperatura}
                  onChange={handleChange}
                  placeholder="36.5"
                />
              </FormControl>
            </SimpleGrid>
          </Card>

          {/* Medidas antropométricas */}
          <Card>
            <Heading size="md" mb={4}>
              Medidas antropométricas
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
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

          {/* Examen físico y observaciones */}
          <Card>
            <Heading size="md" mb={4}>
              Examen físico y observaciones
            </Heading>
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel>Examen físico</FormLabel>
                <Textarea
                  name="examenFisico"
                  value={formData.examenFisico}
                  onChange={handleChange}
                  placeholder="Descripción de hallazgos físicos"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Observaciones</FormLabel>
                <Textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                  placeholder="Notas adicionales sobre el caso"
                />
              </FormControl>
            </VStack>
          </Card>

          {/* Próxima cita */}
          <Card>
            <FormControl>
              <FormLabel>Próxima cita (opcional)</FormLabel>
              <Input
                name="proximaCita"
                type="date"
                value={formData.proximaCita}
                onChange={handleChange}
              />
            </FormControl>
          </Card>

          {/* Botones */}
          <HStack justify="flex-end">
            <Button variant="ghost" onClick={handleBack}>
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
