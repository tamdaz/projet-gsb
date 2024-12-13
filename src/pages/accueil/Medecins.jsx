import React from 'react'
import 'react-datalist-input/dist/styles.css';
import DatalistInput from 'react-datalist-input';
import { getMedecins, getMedecinsParNom } from '../../api/medecins';
import { Outlet, useNavigate } from 'react-router-dom';

/**
 * Page qui représente la consultation d'un médecin en question.
 */
export default function Medecins() {
	const [medecins, setMedecins] = React.useState([]);
	const [recherche, setRecherche] = React.useState("");
	const [medecinTrouvee, setMedecinTrouvee] = React.useState({});
	const navigateTo = useNavigate();

	/**
	 * À chaque fois qu'on tape le nom du médecin dans la barre de recherche,
	 * mettre à jour l'autocomplétion afin de trouver facilement le médecin
	 * correspondant.
	 */
	React.useEffect(() => {
		getMedecinsParNom(recherche).then((res) => {
			setMedecins(res.data);
		});
	}, [recherche]);

	/**
	 * Permet de lister les médecins, utilisé pour l'autocomplétion.
	 */
	const listeMedecins = () => {
		return medecins.map(m => {
			return {
				id: m.id,
				value: `${m.nom} ${m.prenom}`
			}
		}).slice(0, 9)
	}

	/**
	 * Permet de récupérer les informations des médecins.
	 */
	const selectMedecin = (item) => {
		getMedecins().then(json => {
			const medecin = json.data.filter(m => item.id === m.id)[0]
			console.log(medecin);

			setMedecinTrouvee(medecin);
		})
	}

	return <div>
		<h2 className="text-2xl mb-2">Médecins</h2>
		<DatalistInput
			placeholder="Rechercher médecins"
			onSelect={item => {
				selectMedecin(item);
				navigateTo(`/accueil/medecins/${item.id}`);
			}}
			onChange={e => {
				setRecherche(e.target.value)
				setMedecinTrouvee({})
			}}
			items={listeMedecins()}
		/>
		<Outlet context={[medecinTrouvee, medecinTrouvee]} key="0" />
	</div>
}
