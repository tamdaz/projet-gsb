import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

/**
 * Un composant qui affiche la barre de navigation, permettant d'aller de la page
 * d'accueil à une autre page.
 */
export default function Navbar() {
	const navigateTo = useNavigate();
	const location = useLocation();

	/**
	 * Permet de se déconnecter du compte d'un visiteur.
	 */
	const deconnexion = () => {
		navigateTo("/", { state: null });
	}

	/**
	 * Composant qui affiche l'item du navbar.
	 * Si le lien présent dans le navbar correspond à l'URL indiqué dans le
	 * navigateur, mettre cet item en gras.
	 */
	const NavItem = ({ url, name }) => {
		if (url === location.pathname) {
			return <Link to={url} className="font-bold">{ name }</Link>
		} else {
			return <Link to={url}>{ name }</Link>
		}
	}

	return <nav className="w-full bg-blue-500 text-white flex flex-row gap-8 px-8 py-3 items-center">
		<b>GSB</b>
		<NavItem url="/accueil" name="Dashboard" />
		<NavItem url="/accueil/rapports" name="Rapports" />
		<NavItem url="/accueil/medecins" name="Médecins" />
		<div className="flex-grow"></div>
		<button onClick={deconnexion} className="btn-red px-4">
			Se déconnecter
		</button>
	</nav>
}
