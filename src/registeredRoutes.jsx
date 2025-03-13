import Index from "./pages/Index";
import Accueil from "./pages/Accueil";
import Medecins from "./pages/accueil/Medecins";
import Rapports from "./pages/accueil/Rapports";
import FicheMedecin from "./components/fiches/medecin/FicheMedecin";
import AjouterRapport from "./components/fiches/rapport/AjouterRapport";
import ModifierRapport from "./components/fiches/rapport/ModifierRapport";

/**
 * Ensemble de chemins accessibles pour les utilisateurs.
 */
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
				element: <Medecins />,
				children: [
					{
						path: ":id",
						element: <FicheMedecin />
					}
				]
			}, {
				path: "rapports",
				element: <Rapports />,
				children: [{
						path: ":id/ajouter",
						element: <AjouterRapport />
					}, {
						path: ":id/modifier",
						element: <ModifierRapport />
					}
				]
			}
		]
	}
]
