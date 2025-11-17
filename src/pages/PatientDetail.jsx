// src/pages/PatientDetail.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Heading,
  HStack,
  Button,
  VStack,
  Text,
  Badge,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Spinner,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Textarea
} from '@chakra-ui/react'
import { FiArrowLeft, FiEdit, FiFileText, FiPaperclip } from 'react-icons/fi'
import Card from '../components/common/Card'
import Modal from '../components/common/Modal'
import { formatDate, formatPhone, formatDPI } from '../utils/formatters'
import { patientService } from '../services/patientService'
import { consultationService } from '../services/consultationService'
import { clinicalDocumentService } from '../services/clinicalDocumentService'
import { fileToBase64 } from '../utils/fileUtils'

const PatientDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [patient, setPatient] = useState(null)
  const [consultas, setConsultas] = useState([])
  const [loading, setLoading] = useState(true)

  // Estado para documentos por consulta
  const [docModalOpen, setDocModalOpen] = useState(false)
  const [docConsultation, setDocConsultation] = useState(null)
  const [docList, setDocList] = useState([])
  const [docLoading, setDocLoading] = useState(false)
  const [docSaving, setDocSaving] = useState(false)
  const [docForm, setDocForm] = useState({
    title: '',
    description: '',
    documentDate: '',
    file: null
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        const patientData = await patientService.getById(id)
        setPatient(patientData)

        const consultationsData = await consultationService.getByPatientId(id)

        const mapped = consultationsData.map((c) => ({
          id: c.id,
          fecha: c.fecha,
          motivo: c.motivo,
          diagnostico: c.diagnostico,
          medico: 'Médico responsable',
          proximaCita: null
        }))

        setConsultas(mapped)
      } catch (err) {
        console.error(err)
        toast({
          title: 'Error al cargar paciente',
          description: err.message || 'Intenta de nuevo más tarde',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id, toast])

  const handleNewConsultation = () => {
    navigate(`/consultations/new/${id}`)
  }

  const handleBack = () => {
    navigate('/patients')
  }

  // ---- Documentos por consulta ----

  const openDocumentsModal = async (consulta) => {
    setDocConsultation(consulta)
    setDocModalOpen(true)
    setDocForm({
      title: '',
      description: '',
      documentDate: '',
      file: null
    })

    try {
      setDocLoading(true)
      const docs = await clinicalDocumentService.getByConsultation(consulta.id)
      setDocList(docs)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error al cargar documentos',
        description: err.message || 'Intenta de nuevo más tarde',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setDocLoading(false)
    }
  }

  const handleDocFormChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'file') {
      setDocForm((prev) => ({
        ...prev,
        file: files && files[0] ? files[0] : null
      }))
    } else {
      setDocForm((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleUploadDocument = async (e) => {
    e.preventDefault()
    if (!docConsultation || !docForm.file) {
      toast({
        title: 'Falta archivo',
        description: 'Selecciona un archivo para subir',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
      return
    }

    try {
      setDocSaving(true)
      const base64Content = await fileToBase64(docForm.file)

      await clinicalDocumentService.uploadForConsultation({
        patientId: Number(id),
        consultationId: docConsultation.id,
        title: docForm.title || docForm.file.name,
        description: docForm.description || null,
        documentDate: docForm.documentDate || null,
        fileName: docForm.file.name,
        mimeType: docForm.file.type,
        base64Content
      })

      toast({
        title: 'Documento subido',
        status: 'success',
        duration: 3000,
        isClosable: true
      })

      // recargar lista
      const docs = await clinicalDocumentService.getByConsultation(
        docConsultation.id,
      )
      setDocList(docs)

      // limpiar solo el archivo
      setDocForm((prev) => ({
        ...prev,
        file: null
      }))
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error al subir documento',
        description: err.message || 'Intenta de nuevo más tarde',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setDocSaving(false)
    }
  }
const handleDownloadDocument = async (doc) => {
  try {
    const data = await clinicalDocumentService.downloadContent(doc.id)

    if (!data || !data.base64Content) {
      toast({
        title: 'No se pudo descargar',
        description: 'El documento no tiene contenido disponible',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
      return
    }

    const byteCharacters = atob(data.base64Content)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], {
      type: data.mimeType || 'application/octet-stream'
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = data.fileName || 'documento'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error(err)
    toast({
      title: 'Error al descargar documento',
      description: err.message || 'Intenta de nuevo más tarde',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
}
  // --------------------------------

  if (loading) {
    return (
      <Box>
        <HStack justify="space-between" mb={6}>
          <HStack>
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              onClick={handleBack}
            >
              Volver
            </Button>
            <Heading size="lg">Expediente del Paciente</Heading>
          </HStack>
        </HStack>
        <HStack justify="center" py={10}>
          <Spinner size="lg" />
        </HStack>
      </Box>
    )
  }

  if (!patient) {
    return (
      <Box>
        <HStack justify="space-between" mb={6}>
          <HStack>
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              onClick={handleBack}
            >
              Volver
            </Button>
            <Heading size="lg">Expediente del Paciente</Heading>
          </HStack>
        </HStack>
        <Text>Paciente no encontrado.</Text>
      </Box>
    )
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <HStack>
          <Button leftIcon={<FiArrowLeft />} variant="ghost" onClick={handleBack}>
            Volver
          </Button>
          <Heading size="lg">Expediente del Paciente</Heading>
        </HStack>
        <HStack>
          <Button leftIcon={<FiEdit />} colorScheme="green" variant="outline">
            Editar
          </Button>
          <Button
            leftIcon={<FiFileText />}
            colorScheme="primary"
            onClick={handleNewConsultation}
          >
            Nueva consulta
          </Button>
        </HStack>
      </HStack>

      <Tabs colorScheme="primary">
        <TabList>
          <Tab>Información Personal</Tab>
          <Tab>Historial Médico</Tab>
          <Tab>Antecedentes</Tab>
        </TabList>

        <TabPanels>
          {/* Información Personal */}
          <TabPanel px={0}>
            <Card>
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Nombre completo
                    </Text>
                    <Heading size="md">{patient.nombre}</Heading>
                  </Box>
                  <Badge colorScheme="green">Activo</Badge>
                </HStack>

                <Divider />

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      DPI
                    </Text>
                    <Text fontWeight="medium">{formatDPI(patient.dpi)}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Edad
                    </Text>
                    <Text fontWeight="medium">{patient.edad} años</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Género
                    </Text>
                    <Text fontWeight="medium">
                      {patient.genero === 'M' ? 'Masculino' : 'Femenino'}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Teléfono
                    </Text>
                    <Text fontWeight="medium">
                      {formatPhone(patient.telefono)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Email
                    </Text>
                    <Text fontWeight="medium">{patient.email}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Dirección
                    </Text>
                    <Text fontWeight="medium">{patient.direccion}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Fecha de Registro
                    </Text>
                    <Text fontWeight="medium">
                      {formatDate(patient.fechaRegistro)}
                    </Text>
                  </Box>
                </SimpleGrid>
              </VStack>
            </Card>
          </TabPanel>

          {/* Historial Médico */}
          <TabPanel px={0}>
            <VStack spacing={4} align="stretch">
              {consultas.length === 0 ? (
                <Text color="gray.500">
                  No hay consultas registradas para este paciente.
                </Text>
              ) : (
                consultas.map((consulta) => (
                  <Card key={consulta.id}>
                    <HStack justify="space-between" mb={3}>
                      <Badge colorScheme="blue">
                        {formatDate(consulta.fecha)}
                      </Badge>
                      <Text fontSize="sm" color="gray.600">
                        {consulta.medico}
                      </Text>
                    </HStack>
                    <Text fontWeight="bold" mb={2}>
                      {consulta.motivo}
                    </Text>
                    <Text color="gray.700" mb={3}>
                      {consulta.diagnostico}
                    </Text>
                    <HStack justify="space-between">
                      <HStack>
                        {consulta.proximaCita && (
                          <>
                            <Text fontSize="sm" color="gray.600">
                              Próxima cita:
                            </Text>
                            <Badge colorScheme="orange">
                              {formatDate(consulta.proximaCita)}
                            </Badge>
                          </>
                        )}
                      </HStack>
                      <Button
                        size="sm"
                        leftIcon={<FiPaperclip />}
                        variant="outline"
                        onClick={() => openDocumentsModal(consulta)}
                      >
                        Documentos
                      </Button>
                    </HStack>
                  </Card>
                ))
              )}
            </VStack>
          </TabPanel>

          {/* Antecedentes */}
          <TabPanel px={0}>
            <Card>
              <VStack align="stretch" spacing={4}>
                <Text fontWeight="bold">Antecedentes personales</Text>
                <Text color="gray.600">
                  Información sobre enfermedades previas, cirugías, alergias y
                  otros antecedentes relevantes del paciente.
                </Text>

                <Divider />

                <Text fontWeight="bold">Antecedentes familiares</Text>
                <Text color="gray.600">
                  Antecedentes de enfermedades crónicas en familiares directos,
                  como hipertensión, diabetes, cáncer, etc.
                </Text>

                <Divider />

                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Medicación actual
                  </Text>
                  <Text color="gray.600">
                    Esta sección se puede llenar en futuras versiones a partir
                    de las recetas y documentos clínicos.
                  </Text>
                </Box>
              </VStack>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal de documentos por consulta */}
      <Modal
        isOpen={docModalOpen}
        onClose={() => {
          setDocModalOpen(false)
          setDocConsultation(null)
          setDocList([])
        }}
        title={
          docConsultation
            ? `Documentos de la consulta del ${formatDate(docConsultation.fecha)}`
            : 'Documentos'
        }
      >
        <VStack align="stretch" spacing={4}>
          {/* Lista de documentos existentes */}
          <Box>
            <Text fontWeight="bold" mb={2}>
              Documentos existentes
            </Text>
            {docLoading ? (
              <HStack justify="center" py={4}>
                <Spinner size="sm" />
              </HStack>
            ) : docList.length === 0 ? (
              <Text color="gray.500" fontSize="sm">
                No hay documentos asociados a esta consulta.
              </Text>
            ) : (
              <VStack align="stretch" spacing={3}>
                {docList.map((doc) => (
                  <Card key={doc.id}>
                    <HStack justify="space-between" align="flex-start">
                      <VStack align="stretch" spacing={1}>
                        <Text fontWeight="medium">{doc.titulo}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {doc.tipoNombre} ·{' '}
                          {doc.fechaDocumento
                            ? formatDate(doc.fechaDocumento)
                            : 'Sin fecha'}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {doc.fileName} ({doc.mimeType}) ·{' '}
                          {doc.fileSizeBytes
                            ? `${Math.round(doc.fileSizeBytes / 1024)} KB`
                            : ''}
                        </Text>
                      </VStack>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadDocument(doc)}
                      >
                        Descargar
                      </Button>
                    </HStack>
                  </Card>
                ))}
              </VStack>
            )}
          </Box>

          <Divider />

          {/* Formulario para subir nuevo documento */}
          <Box as="form" onSubmit={handleUploadDocument}>
            <VStack align="stretch" spacing={3}>
              <FormControl>
                <FormLabel>Título</FormLabel>
                <Input
                  name="title"
                  value={docForm.title}
                  onChange={handleDocFormChange}
                  placeholder="Ej. Resultado laboratorio, RX tórax, etc."
                />
              </FormControl>

              <FormControl>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  name="description"
                  value={docForm.description}
                  onChange={handleDocFormChange}
                  placeholder="Notas sobre el examen o estudio"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Fecha del documento</FormLabel>
                <Input
                  type="date"
                  name="documentDate"
                  value={docForm.documentDate}
                  onChange={handleDocFormChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Archivo</FormLabel>
                <Input
                  type="file"
                  name="file"
                  accept="application/pdf,image/*"
                  onChange={handleDocFormChange}
                />
              </FormControl>

              <HStack justify="flex-end" mt={2}>
                <Button
                  type="submit"
                  colorScheme="primary"
                  isLoading={docSaving}
                >
                  Subir documento
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Modal>
    </Box>
  )
}

export default PatientDetail
