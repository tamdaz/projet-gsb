import Index from "./pages/Index";
import Accueil from "./pages/Accueil";
import Medecins from "./pages/accueil/Medecins";
import Rapports from "./pages/accueil/Rapports";
import FicheMedecin from "./components/fiches/medecin/FicheMedecin";
import FormulaireRapport from "./components/fiches/rapport/FormulaireRapport";

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
				children: [
					{
						path: ":id",
						element: <FormulaireRapport />
					}
				]
			}
		]
	}
]
