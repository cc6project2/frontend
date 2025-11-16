import { Box, Flex } from '@chakra-ui/react'

const AuthLayout = ({ children }) => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box w="full" maxW="md" p={8}>
        {children}
      </Box>
    </Flex>
  )
}

export default AuthLayout