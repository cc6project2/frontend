import { Flex, Box, Text, Button, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Flex bg="white" px={6} py={4} align="center" justify="space-between" borderBottom="1px" borderColor="gray.200">
      <Text fontSize="xl" fontWeight="bold" color="primary.600">
        Mi Clínica
      </Text>
      
      <Menu>
        <MenuButton>
          <Flex align="center" gap={3} cursor="pointer">
            <Box textAlign="right">
              <Text fontSize="sm" fontWeight="medium">{user?.nombre}</Text>
              <Text fontSize="xs" color="gray.500">{user?.rol}</Text>
            </Box>
            <Avatar size="sm" name={user?.nombre} />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiUser />}>Mi Perfil</MenuItem>
          <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Cerrar Sesión</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default Navbar