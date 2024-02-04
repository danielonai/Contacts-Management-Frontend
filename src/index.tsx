import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import {  ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import theme from "./theme/theme.js";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<Flex flexDirection={"column"} alignItems={"center"} mx="auto" px={6} pt={16} fontSize="sm">
					<Heading mx="auto" mb={10}>Conatacts Management App</Heading>
					<RouterProvider router={router} />
				</Flex>
			</QueryClientProvider>
		</ChakraProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
