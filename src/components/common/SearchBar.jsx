import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

const SearchBar = ({ placeholder = "Buscar...", value, onChange }) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FiSearch color="gray.400" />
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        bg="white"
      />
    </InputGroup>
  )
}

export default SearchBar