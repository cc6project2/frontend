import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

const Table = ({ headers, data, onRowClick }) => {
  return (
    <TableContainer>
      <ChakraTable variant="simple">
        <Thead bg="gray.50">
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr 
              key={rowIndex} 
              _hover={{ bg: 'gray.50', cursor: onRowClick ? 'pointer' : 'default' }}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {Object.values(row).map((cell, cellIndex) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  )
}

export default Table