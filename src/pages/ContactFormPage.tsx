import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Box, Heading, Input, InputGroup, InputLeftAddon, Button, Flex } from "@chakra-ui/react";
import { Contact } from "../types/contact";
import { useCreateContact } from "../hooks/useCreateContact";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateContact } from "../hooks/useUpdateContact";
import CustomModal from "../components/CustomModal";

const ContactForm: React.FC = () => {
	const [formData, setFormData] = useState<Contact>({
		firstName: "",
		lastName: "",
		country: "",
		city: "",
		street: "",
		zipCode: "",
		phone: "",
		email: "",
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalMessage, setmodalMessage] = useState("");

	const { mutateAsync: createMutateAsync } = useCreateContact();
	const { mutateAsync: updateMutateAsync } = useUpdateContact();

	const navigate = useNavigate();

	const contactToUpdate = useLocation().state?.contactToUpdate;

	const openModal = () => {
		setIsModalOpen(true);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (contactToUpdate) {
			setFormData(contactToUpdate);
		}
	}, [contactToUpdate]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		for (const value of Object.values(formData)) {
			if (value.toString().length === 0 ||value.toString().length > 100 ) return;
		}
		if (contactToUpdate)
			try {
				await updateMutateAsync(formData, {
					onSuccess: async () => {
						setModalTitle("Contact Updated Successfully");
						openModal();
					},
					onError: () => {
						setModalTitle("Something Went Wrong");
						setmodalMessage("Please try again later");
						openModal();
					},
				});
			} catch (error) {
				console.log("🚀 ~ handleSubmit ~ error:", error)
				setModalTitle("Something Went Wrong");
				setmodalMessage("Please try again later");
				openModal();
			}
		else {
			try {
				await createMutateAsync(formData, {
					onSuccess: async () => {
						setModalTitle("Contact Created Successfully");
						openModal();
					},
					onError: () => {
						setModalTitle("Something Went Wrong");
						setmodalMessage("Please try again later");
						openModal();
					},
				});
			} catch (error) {
				console.log("🚀 ~ handleSubmit ~ error:", error)
				setModalTitle("Something Went Wrong");
				setmodalMessage("Please try again later");
				openModal();
			}
		}
	};

	return (
		<Box maxW="400px" mx="auto" mt="8">
			<Heading mb="4" textAlign="center" fontSize="xl">
				{contactToUpdate ? "Update Contact" : "Create New Contact"}
			</Heading>
			<form onSubmit={handleSubmit}>
				<InputGroup mb="3">
					<InputLeftAddon w="37%" textColor="black" children="First Name" />
					<Input
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						bg="silver"
						textColor="black"
					/>
				</InputGroup>
				<InputGroup mb="3">
					<InputLeftAddon w="37%" textColor="black" children="Last Name" />
					<Input
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						bg="silver"
						textColor="black"
					/>
				</InputGroup>
				<InputGroup mb="3">
					<InputLeftAddon w="37%" textColor="black" children="Country" />
					<Input
						type="text"
						name="country"
						value={formData.country}
						onChange={handleChange}
						bg="silver"
						textColor="black"
					/>
				</InputGroup>
				<InputGroup mb="3">
					<InputLeftAddon w="37%" textColor="black" children="City" />
					<Input
						type="text"
						name="city"
						value={formData.city}
						onChange={handleChange}
						bg="silver"
						textColor="black"
					/>
				</InputGroup>
				<InputGroup mb="3">
					<InputLeftAddon w="37%" textColor="black" children="Street" />
					<Input
						type="text"
						name="street"
						value={formData.street}
						onChange={handleChange}
						bg="silver"
						textColor="black"
					/>
				</InputGroup>
				<InputGroup mb="3">
					<InputLeftAddon w="37%" textColor="black" children="Zip Code" />
					<Input
						type="text"
						name="zipCode"
						value={formData.zipCode}
						onChange={handleChange}
						bg="silver"
						textColor="black"
					/>
				</InputGroup>
				<InputGroup mb="3">
					<InputLeftAddon w="37%" textColor="black" children="Email" />
					<Input
						type="text"
						name="email"
						value={formData.email}
						onChange={handleChange}
						bg="silver"
						textColor="black"
					/>
				</InputGroup>
				<InputGroup mb="3">
					<InputLeftAddon w="37%" textColor="black" children="Phone Number" />
					<Input
						type="text"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						bg="silver"
						textColor="black"
					/>
				</InputGroup>
				<Flex flexDirection={"column"} gap={5} justifyContent="center">
					<Button onClick={handleSubmit} colorScheme="teal" type="submit" w="100%">
						{contactToUpdate ? "Update Contact" : "Create Contact"}
					</Button>
					<Button onClick={() => navigate("/")} colorScheme="red">
						Back
					</Button>
				</Flex>
			</form>
			{isModalOpen && (
				<CustomModal
					onClose={() => navigate("/")}
					title={modalTitle}
					message={modalMessage}
				/>
			)}
		</Box>
	);
};

export default ContactForm;
