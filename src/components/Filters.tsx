import React from "react";
import {
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import SearchIcon from "./icons/SearchIcon";

type FiltersProps = {
  columnFilters: { id: string; value: string }[];
  setColumnFilters: React.Dispatch<
    React.SetStateAction<{ id: string; value: string }[]>
  >;
};

const Filters: React.FC<FiltersProps> = ({ columnFilters, setColumnFilters }) => {
  const firstName =
    columnFilters.find((f) => f.id === "firstName")?.value || "";
  const lastName =
    columnFilters.find((f) => f.id === "lastName")?.value || "";

  const onFilterChange = (id: string, value: string) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <HStack mb={6} spacing={3}>
      <InputGroup size="sm" maxW="12rem">
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          type="text"
          variant="filled"
          placeholder="Contact first name"
          borderRadius={5}
          value={firstName}
          onChange={(e) => onFilterChange("firstName", e.target.value)}
          bg="#252730"
        />
      </InputGroup>
      <InputGroup size="sm" maxW="12rem" bg={" #252730"}>
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          type="text"
          variant="filled"
          placeholder="Contact last name"
          borderRadius={5}
          value={lastName}
          onChange={(e) => onFilterChange("lastName", e.target.value)}
          bg="#252730"
        />
      </InputGroup>
    </HStack>
  );
};

export default Filters;
