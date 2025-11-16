import { Box } from '@chakra-ui/react'

const Card = ({ children, ...props }) => {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="sm" {...props}>
      {children}
    </Box>
  )
}

export default Card