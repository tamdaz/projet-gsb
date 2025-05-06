import React from 'react'
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
		sessionStorage.clear("credentials");
		navigateTo("/", { state: null });
	}

	/**
	 * Composant qui affiche l'item du navbar.
	 * Si le lien présent dans le navbar correspond à
	 * l'URL indiqué dans le navigateur : mettre cet item en gras.
	 */
	const NavItem = ({ url, isExactUrl, name }) => {
		const checkPath = (isExactUrl) ?
			location.pathname === url :
			location.pathname.startsWith(url)
		;

		return <Link to={url} className={checkPath ? "font-bold" : null}>{ name }</Link>
	}

	return <nav className="w-full bg-blue-500 text-white flex flex-row gap-8 px-8 py-3 items-center">
		<b>GSB</b>
		<NavItem isExactUrl={true} url="/accueil" name="Dashboard" />
		<NavItem isExactUrl={false} url="/accueil/rapports" name="Rapports" />
		<NavItem isExactUrl={false} url="/accueil/medecins" name="Médecins" />
		<div className="flex-grow"></div>
		<button onClick={deconnexion} className="btn-red px-4">
			Se déconnecter
		</button>
	</nav>
}
