import { Box, Flex } from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'

const MainLayout = ({ children }) => {
  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar />
      <Box flex="1" overflow="auto">
        <Navbar />
        <Box p={6} bg="gray.50" minH="calc(100vh - 64px)">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default MainLayout