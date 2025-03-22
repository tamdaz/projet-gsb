import { StrictMode } from 'react'
import { routes } from './registeredRoutes';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import './css/index.css'

const router = createHashRouter(routes, {
	future: {
		v7_relativeSplatPath: true
	}
});

/**
 * Point d'entrée de l'application.
 */
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} future={{
			v7_startTransition: true
		}} />
	</StrictMode>
)
