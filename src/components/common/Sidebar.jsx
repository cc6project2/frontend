import { Box, VStack, Link, Icon, Text } from '@chakra-ui/react'
import { FiHome, FiUsers, FiFileText, FiUserPlus } from 'react-icons/fi'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ROLES } from '../../utils/constants'

const Sidebar = () => {
  const location = useLocation()
  const { user } = useAuth()

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard', roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.ASSISTANT] },
    { name: 'Pacientes', icon: FiUsers, path: '/patients', roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.ASSISTANT] },
    { name: 'Consultas', icon: FiFileText, path: '/consultations', roles: [ROLES.ADMIN, ROLES.DOCTOR] },
    { name: 'Usuarios', icon: FiUserPlus, path: '/users', roles: [ROLES.ADMIN] },
  ]

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.rol))

  return (
    <Box w="250px" bg="white" borderRight="1px" borderColor="gray.200" h="100vh" py={6}>
      <VStack spacing={2} align="stretch" px={4}>
        {filteredMenu.map((item) => (
          <Link
            key={item.path}
            as={RouterLink}
            to={item.path}
            _hover={{ textDecoration: 'none' }}
          >
            <Box
              px={4}
              py={3}
              borderRadius="md"
              bg={location.pathname === item.path ? 'primary.50' : 'transparent'}
              color={location.pathname === item.path ? 'primary.600' : 'gray.600'}
              _hover={{ bg: 'gray.50' }}
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Icon as={item.icon} boxSize={5} />
              <Text fontWeight="medium">{item.name}</Text>
            </Box>
          </Link>
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar