import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText = "Guardar", isLoading }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          {onConfirm && (
            <Button colorScheme="primary" onClick={onConfirm} isLoading={isLoading}>
              {confirmText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal