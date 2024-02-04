import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { Contact } from "../types/contact";

export const useGetContacts = () => {
	return useQuery<{contacts:Contact[]}, Error>({
		queryKey: ["contacts"],
		queryFn: async () =>
			axiosInstance
				.get<{contacts:Contact[]}>(`/`)
				.then((response) => {
					return response?.data;
				})
				.catch((error) => {
					throw new Error(error?.message);
				}),
	});
};
