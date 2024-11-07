import Index from "./pages/Index";
import Accueil from "./pages/Accueil";
import Medecins from "./pages/accueil/Medecins";
import Rapports from "./pages/accueil/Rapports";

export const routes = [
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/accueil",
        element: <Accueil />,
		children: [
			{
				path: "medecins",
				element: <Medecins />
			}, {
				path: "rapports",
				element: <Rapports />
			}
		]
    }
]
