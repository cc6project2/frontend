import { Box, HStack, IconButton, Badge } from '@chakra-ui/react'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi'
import Table from '../common/Table'
import { formatPhone, formatDPI } from '../../utils/formatters'

const PatientList = ({ patients, onView, onEdit, onDelete }) => {
  const formatPatientData = (patients) => {
    return patients.map(patient => ({
      id: patient.id,
      nombre: patient.nombre,
      dpi: formatDPI(patient.dpi),
      edad: `${patient.edad} años`,
      telefono: formatPhone(patient.telefono),
      genero: patient.genero === 'M' ? 'Masculino' : 'Femenino',
      acciones: (
        <HStack spacing={2}>
          <IconButton
            size="sm"
            icon={<FiEye />}
            colorScheme="blue"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onView(patient)
            }}
          />
          <IconButton
            size="sm"
            icon={<FiEdit />}
            colorScheme="green"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(patient)
            }}
          />
          <IconButton
            size="sm"
            icon={<FiTrash2 />}
            colorScheme="red"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(patient)
            }}
          />
        </HStack>
      )
    }))
  }

  const headers = ['ID', 'Nombre', 'DPI', 'Edad', 'Teléfono', 'Género', 'Acciones']

  return (
    <Box>
      <Table 
        headers={headers} 
        data={formatPatientData(patients)}
        onRowClick={onView}
      />
    </Box>
  )
}

export default PatientList