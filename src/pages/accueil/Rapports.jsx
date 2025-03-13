import React from 'react'
import DatalistInput from 'react-datalist-input';
import { getMedecinsParNom } from '../../api/medecins';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';

/**
 * Page qui représente la consultation d'un rapport en question.
 */
export default function Rapports() {
	const [recherche, setRecherche] = React.useState("");
	const [medecins, setMedecins] = React.useState([]);
	const [medecinTrouvee, setMedecinTrouvee] = React.useState({});
	const [choix, setChoix] = React.useState("Ajouter");
	const [dataVisiteur] = useOutletContext();

	const navigateTo = useNavigate();

	/**
	 * À chaque fois qu'on clique pour ajouter ou modifier un rapport, le
	 * tableau de médecins est réinitialisé et le médécin qui a été
	 * trouvée est localement effacé de l'état.
	 */
	React.useEffect(() => {
		getMedecinsParNom(recherche).then((res) => {
			setMedecins(res.data);
		});
	}, [choix]);

	/**
	 * Permet de lister les médecins, utilisé pour l'autocomplétion.
	 */
	const listeMedecins = () => {
		return medecins.map(m => {
			return {
				id: m.id,
				value: [m.nom, m.prenom].join(' ')
			}
		}).slice(0, 9)
	}

	/**
	 * Permet d'aller vers "Ajouter un rapport".
	 */
	const goToAjouter = () => {
		navigateTo(`${medecinTrouvee.id}/ajouter`);
		setChoix("Ajouter");
	}

	/**
	 * Permet d'aller vers "Modifier un rapport".
	 */
	const goToModifier = () => {
		navigateTo(`${medecinTrouvee.id}/modifier`);
		setChoix("Modifier");
	}

	/**
	 * Consiste à afficher la barre de recherche pour trouver un médecin.
	 */
	const RechercheMedecin = () => {
		if (Object.keys(medecinTrouvee).length !== 0) {
			return <Outlet context={[dataVisiteur, medecinTrouvee]} />
		}

		return <DatalistInput
			placeholder="Rechercher un médecin"
			onSelect={item => {
				setMedecinTrouvee(item);
				if (choix === "Ajouter")
					navigateTo(`/accueil/rapports/${item.id}/ajouter`);
				else if (choix === "Modifier")
					navigateTo(`/accueil/rapports/${item.id}/modifier`);
			}}
			onChange={e => setRecherche(e.target.value)}
			items={listeMedecins()}
		/>
	}

	return <div>
		<h2 className="text-2xl">{choix.toUpperCase()} un rapport</h2>
		<div className="grid grid-cols-2 gap-4 py-4">
			<button onClick={goToAjouter} className="w-full">Ajouter un rapport</button>
			<button onClick={goToModifier} className="w-full">Modifier un rapport</button>
		</div>
		<RechercheMedecin />
	</div>
}
