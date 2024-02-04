import React from "react";
import { Button } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useDeleteContact } from "../hooks/useDeleteContact";

type DeleteCellProps = {
  contactId: number;
  onOpenModal: (modalTitle: string,modalMessage: string ) => void
};

const DeleteCell: React.FC<DeleteCellProps> = ({ contactId, onOpenModal }) => {

	const { mutateAsync: deleteMutateAsync } = useDeleteContact();

  const onDelete = async () => {
    try {
      await deleteMutateAsync(contactId, {
        onSuccess: async () => {
          onOpenModal("Contact Deleted Successfully","")
        },
        onError: (err) => {
          console.log("🚀 ~ onDelete ~ err:", err)
          onOpenModal("Something Went Wrong","Please try again later")
        },
      });
    } catch (error) {
      console.log("🚀 ~ onDelete ~ error:", error)
    }
  }

  return (
    <Flex justifyContent="center" alignItems="center" h="100%">
      <Button
        w="80%"
        h="2vh"
        bg="red.600"
        onClick={onDelete}
        borderRadius="md"
        _hover={{
          bg: "red.300",
        }}
        textColor={"white"}
        id="mobilebtn"
      >
        Delete
      </Button>
    </Flex>
  );
};

export default DeleteCell;
