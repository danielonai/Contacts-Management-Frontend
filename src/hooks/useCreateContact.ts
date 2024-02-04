import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import { serverResponse } from "./useUpdateContact";
import { queryClient } from "../lib/react-query";


const CreateContact = async (credentials: any ): Promise<serverResponse> => {
	return axiosInstance.post(`/`, credentials);
};

export const useCreateContact = () => { 
	return useMutation<serverResponse, unknown, any>({
		mutationFn: CreateContact,
		onSuccess: (data: serverResponse) => {
			queryClient.invalidateQueries({ queryKey: ["contacts"], refetchType: "all" });
		},
        onError: (error) => {
            console.log("🚀 ~ file: useCreateContact.ts:17 ~ useCreateContact ~ error:", error)
        }
	});
};
