import { queryClient } from "../lib/react-query";
import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import { Contact } from "../types/contact";

export interface serverResponse {
	data: {
		message: string;
		contact: Contact;
	};
}

const UpdateContact = async (credentials: Contact): Promise<serverResponse> => {
	return axiosInstance.put(`/${credentials.id}`, credentials);
};

export const useUpdateContact = () => {
	return useMutation<serverResponse, unknown, Contact>({
		mutationFn: UpdateContact,
		onSuccess: ({ data }: serverResponse) => {
			queryClient.invalidateQueries({ queryKey: ["contact", data.contact.id], refetchType: "all" });
		},
		onError: (error) => {
			console.log("🚀 ~ file: useUpdateContact.ts:25 ~ useUpdateContact ~ error:", error);
		},
	});
};
