import React from 'react';
import {  Button, Center, Modal,  ModalContent, ModalFooter, ModalOverlay, Text } from '@chakra-ui/react';

type Props = {
  onClose: () => void;
  title: string;
  message?: string;
};

const CustomModal: React.FC<Props> = ({ onClose, title , message}) => {
  return (
    <Modal isOpen onClose={()=>{}} isCentered>
      <ModalOverlay />
      <ModalContent p={4} borderRadius="md" maxW="sm">
        <Center flexDir="column" alignItems="center">
          <Text color={"black"} fontSize="xl" fontWeight="bold" mb={4}>
            {title}
          </Text>
          {message &&  <Text color={"black"} mb={4}>{message}</Text>}
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              OK
            </Button>
          </ModalFooter>
        </Center>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
