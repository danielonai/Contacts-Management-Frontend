import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";



const DeleteContact = async (credentials: number): Promise<number> => {
	return axiosInstance.delete(`/${credentials}`);
};

export const useDeleteContact = () => {
	return useMutation<number, unknown, number>({
		mutationFn: DeleteContact,
		onSuccess: (data:any) => {
			queryClient.invalidateQueries({ queryKey: ["contacts"], refetchType: "all" });
		},
        onError: (error) => {
            console.log("🚀 ~ file: useDeleteContact.ts:19 ~ useDeleteContact ~ error:", error)
        }
	});
};
