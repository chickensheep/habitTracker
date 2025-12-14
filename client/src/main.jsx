import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./Routes";

const router = createHashRouter(routes);

createRoot(document.getElementById("root")).render(
	<>
		<RouterProvider router={router} />
	</>
);
