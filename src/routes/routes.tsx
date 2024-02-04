import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage";
import ContactForm from "../pages/ContactFormPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/contactForm",
		element: <ContactForm />, 
	},
]);

export default router;
