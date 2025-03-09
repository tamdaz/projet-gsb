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
	const [choix, setChoix] = React.useState("ajouter");
	const [dataVisiteur] = useOutletContext();

	const navigateTo = useNavigate();

	/**
	 * À chaque fois qu'on clique pour ajouter ou modifier un rapport, le
	 * tableau de médecins est réinitialisé et le médécin qui a été
	 * trouvée est localement effacé de l'état.
	 */
	React.useEffect(() => {
		setMedecinTrouvee({});
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

	return <div>
		<h2 className="text-2xl">Rapports</h2>
		<div className="grid grid-cols-2 gap-4 py-4">
			<button onClick={() => setChoix("ajouter")} className="w-full">Ajouter un rapport</button>
			<button onClick={() => setChoix("modifier")} className="w-full">Modifier un rapport</button>
		</div>
		{
			Object.keys(medecinTrouvee).length === 0 ?
				<DatalistInput
					placeholder="Rechercher un médecin"
					onSelect={item => {
						setMedecinTrouvee(item)
						navigateTo(`/accueil/rapports/${item.id}`);
					}}
					onChange={e => setRecherche(e.target.value)}
					items={listeMedecins()}
				/> : <Outlet context={[medecinTrouvee, choix, dataVisiteur]} />
		}
	</div>
}
