import { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, useToast, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aquí irá la llamada al API real
      // Por ahora simulamos un login exitoso
      const mockUser = { nombre: 'Dr. Admin', rol: 'administrador', correo: email }
      const mockToken = 'mock-jwt-token'
      
      login(mockUser, mockToken)
      navigate('/dashboard')
      
      toast({
        title: 'Bienvenido',
        description: 'Has iniciado sesión correctamente',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Credenciales incorrectas',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" color="primary.600">Mi Clínica</Heading>
          <Text color="gray.600" mt={2}>Sistema de Gestión Clínica</Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@clinica.com"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="primary"
              width="full"
              isLoading={loading}
              mt={4}
            >
              Iniciar Sesión
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  )
}

export default Login    