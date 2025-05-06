import React from 'react'
import Navbar from "../components/Navbar";
import { getVisiteur } from '../api/visiteur';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/**
 * Page qui représente la page d'accueil.
 */
export default function Accueil() {
	// Stocker les données de l'utilisateur qui s'est connecté.
	const [dataVisiteur, setDataVisiteur] = React.useState({});

	// Récupérer les états qui ont été envoyées par le précédent composant.
	const { state } = useLocation();

	// Utilisé pour être redirigé instantanément.
	const navigateTo = useNavigate();

	/**
	 * Une fois le composant monté, récupérer les infos du visiteur.
	 */
	React.useEffect(() => {
		if (state !== null) {
			const { login, mdp } = state;

			getVisiteur(login, mdp).then((res) => {
				if (res.data !== null) {
					setDataVisiteur(res.data);
				}
			})
		} else {
			navigateTo("/");
		}
	}, []);

	return <>
		<Navbar />
		<div className="p-4 m-auto w-[800px]">
			<h2 className="text-4xl font-bold mb-4">Bonjour, {dataVisiteur.nom} {dataVisiteur.prenom} 👋</h2>
			<Outlet context={[dataVisiteur]} />
		</div>
	</>
}
