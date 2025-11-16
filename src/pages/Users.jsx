import { useState } from 'react'
import { Box, Button, Heading, HStack, useDisclosure, useToast, Badge } from '@chakra-ui/react'
import { FiUserPlus } from 'react-icons/fi'
import Modal from '../components/common/Modal'
import Table from '../components/common/Table'
import { VStack, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import { ROLES } from '../utils/constants'

const UserForm = ({ user, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    correo: user?.correo || '',
    rol: user?.rol || '',
    password: ''
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

        <FormControl isRequired>
          <FormLabel>Correo Electrónico</FormLabel>
          <Input name="correo" type="email" value={formData.correo} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Rol</FormLabel>
          <Select name="rol" value={formData.rol} onChange={handleChange}>
            <option value="">Seleccionar rol</option>
            <option value={ROLES.ADMIN}>Administrador</option>
            <option value={ROLES.DOCTOR}>Médico</option>
            <option value={ROLES.ASSISTANT}>Asistente</option>
          </Select>
        </FormControl>

        {!user && (
          <FormControl isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} />
          </FormControl>
        )}

        <HStack w="full" justify="flex-end" spacing={3} pt={4}>
          <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" colorScheme="primary" isLoading={isLoading}>
            {user ? 'Actualizar' : 'Guardar'}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, nombre: 'Dr. Juan García', correo: 'juan@clinica.com', rol: 'medico', activo: true },
    { id: 2, nombre: 'Dr. María López', correo: 'maria@clinica.com', rol: 'medico', activo: true },
    { id: 3, nombre: 'Admin Principal', correo: 'admin@clinica.com', rol: 'administrador', activo: true },
    { id: 4, nombre: 'Ana Martínez', correo: 'ana@clinica.com', rol: 'asistente', activo: true },
  ])

  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const getRoleBadge = (rol) => {
    const colors = {
      administrador: 'purple',
      medico: 'blue',
      asistente: 'green'
    }
    return <Badge colorScheme={colors[rol]}>{rol}</Badge>
  }

  const formatUserData = (users) => {
    return users.map(user => ({
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      rol: getRoleBadge(user.rol),
      estado: user.activo ? (
        <Badge colorScheme="green">Activo</Badge>
      ) : (
        <Badge colorScheme="red">Inactivo</Badge>
      )
    }))
  }

  const handleNew = () => {
    setSelectedUser(null)
    onOpen()
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    onOpen()
  }

  const handleSubmit = (formData) => {
    setIsLoading(true)

    setTimeout(() => {
      if (selectedUser) {
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u))
        toast({ title: 'Usuario actualizado', status: 'success', duration: 3000 })
      } else {
        const newUser = { id: users.length + 1, ...formData, activo: true }
        setUsers([...users, newUser])
        toast({ title: 'Usuario creado', status: 'success', duration: 3000 })
      }

      setIsLoading(false)
      onClose()
    }, 1000)
  }

  const headers = ['ID', 'Nombre', 'Correo', 'Rol', 'Estado']

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Gestión de Usuarios</Heading>
        <Button leftIcon={<FiUserPlus />} colorScheme="primary" onClick={handleNew}>
          Nuevo Usuario
        </Button>
      </HStack>

      <Box bg="white" borderRadius="lg" boxShadow="sm">
        <Table
          headers={headers}
          data={formatUserData(users)}
          onRowClick={handleEdit}
        />
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </Modal>
    </Box>
  )
}

export default Users