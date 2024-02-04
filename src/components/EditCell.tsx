import React from "react";
import { Button } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Contact } from "../types/contact";
import { useNavigate } from "react-router-dom";

type EditCellProps = {
  contact: Contact;
};

const EditCell: React.FC<EditCellProps> = ({ contact }) => {

	const navigate = useNavigate();


  return (
    <Flex  justifyContent="center" alignItems="center" h="100%">
      <Button
        w="80%"
        id="mobilebtn"
        colorScheme="blue"
        bg="blue.300"
        h="2vh"
        _hover={{
          bg: "blue.100",
        }}
        onClick={() => navigate('contactForm', { state: { contactToUpdate: contact } })}
        borderRadius="md"
        textColor={"black"}
      >
        Edit
      </Button>
    </Flex>
  );
};

export default EditCell;
