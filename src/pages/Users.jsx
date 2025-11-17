// src/pages/Users.jsx
import { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  HStack,
  Button,
  useDisclosure,
  useToast,
  Spinner,
  VStack,
  Text,
  Badge,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch
} from '@chakra-ui/react'
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'
import Card from '../components/common/Card'
import Modal from '../components/common/Modal'
import { userService } from '../services/userService'
import { ROLES } from '../utils/constants'

const roleLabels = {
  [ROLES.ADMIN]: 'Administrador',
  [ROLES.DOCTOR]: 'Médico',
  [ROLES.ASSISTANT]: 'Asistente'
}

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    username: '',
    password: '',
    rol: ROLES.DOCTOR,
    activo: true
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await userService.getAll()
      setUsers(data)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error al cargar usuarios',
        description: err.message || 'Intenta de nuevo más tarde',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const openNewUserModal = () => {
    setSelectedUser(null)
    setFormData({
      nombre: '',
      correo: '',
      username: '',
      password: '',
      rol: ROLES.DOCTOR,
      activo: true
    })
    onOpen()
  }

  const openEditUserModal = (user) => {
    setSelectedUser(user)
    setFormData({
      nombre: user.nombre || '',
      correo: user.correo || '',
      username: user.username || '',
      password: '',
      rol: user.rol,
      activo: user.activo !== false
    })
    onOpen()
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (selectedUser) {
        // Update
        const payload = {
          nombre: formData.nombre,
          correo: formData.correo,
          username: formData.username,
          rol: formData.rol,
          activo: formData.activo
        }

        // Solo incluir password si el admin escribió algo
        if (formData.password && formData.password.trim() !== '') {
          payload.password = formData.password
        }

        await userService.update(selectedUser.id, payload)

        toast({
          title: 'Usuario actualizado',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      } else {
        // Create
        const payload = {
          nombre: formData.nombre,
          correo: formData.correo,
          username: formData.username,
          password: formData.password,
          rol: formData.rol
        }

        if (!payload.password) {
          toast({
            title: 'La contraseña es requerida para crear usuario',
            status: 'warning',
            duration: 3000,
            isClosable: true
          })
          setSaving(false)
          return
        }

        await userService.create(payload)

        toast({
          title: 'Usuario creado',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      }

      onClose()
      setSelectedUser(null)
      await loadUsers()
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error al guardar usuario',
        description: err.message || 'Intenta de nuevo más tarde',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar/desactivar al usuario "${user.nombre}"?`
    )
    if (!confirmed) return

    try {
      setSaving(true)
      await userService.delete(user.id)
      toast({
        title: 'Usuario eliminado/desactivado',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      await loadUsers()
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error al eliminar usuario',
        description: err.message || 'Intenta de nuevo más tarde',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Usuarios</Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="primary"
          onClick={openNewUserModal}
          isLoading={saving}
        >
          Nuevo usuario
        </Button>
      </HStack>

      {loading ? (
        <HStack justify="center" py={10}>
          <Spinner size="lg" />
        </HStack>
      ) : (
        <VStack spacing={4} align="stretch">
          {users.map((user) => (
            <Card key={user.id}>
              <HStack justify="space-between" align="flex-start">
                <Box>
                  <Text fontWeight="bold">{user.nombre}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {user.correo}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Usuario: {user.username}
                  </Text>
                  <HStack mt={2} spacing={2}>
                    <Badge colorScheme="blue">
                      {roleLabels[user.rol] || user.rol}
                    </Badge>
                    <Badge colorScheme={user.activo ? 'green' : 'red'}>
                      {user.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </HStack>
                </Box>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    leftIcon={<FiEdit />}
                    variant="outline"
                    onClick={() => openEditUserModal(user)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<FiTrash2 />}
                    variant="outline"
                    colorScheme="red"
                    onClick={() => handleDelete(user)}
                    isLoading={saving}
                  >
                    Eliminar
                  </Button>
                </HStack>
              </HStack>
            </Card>
          ))}

          {users.length === 0 && (
            <Card textAlign="center" py={8}>
              <Text color="gray.500">
                No hay usuarios registrados. Crea el primero.
              </Text>
            </Card>
          )}
        </VStack>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setSelectedUser(null)
        }}
        title={selectedUser ? 'Editar usuario' : 'Nuevo usuario'}
      >
        <form onSubmit={handleSubmit}>
          <VStack align="stretch" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nombre completo</FormLabel>
              <Input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Correo</FormLabel>
              <Input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired={!selectedUser}>
              <FormLabel>
                Contraseña {selectedUser && '(deja vacío para no cambiar)'}
              </FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Rol</FormLabel>
              <Select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
              >
                <option value={ROLES.ADMIN}>Administrador</option>
                <option value={ROLES.DOCTOR}>Médico</option>
                <option value={ROLES.ASSISTANT}>Asistente</option>
              </Select>
            </FormControl>

            {selectedUser && (
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Activo</FormLabel>
                <Switch
                  name="activo"
                  isChecked={formData.activo}
                  onChange={handleChange}
                />
              </FormControl>
            )}

            <HStack justify="flex-end">
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                colorScheme="primary"
                isLoading={saving}
              >
                Guardar
              </Button>
            </HStack>
          </VStack>
        </form>
      </Modal>
    </Box>
  )
}

export default Users
