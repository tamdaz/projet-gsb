import React from 'react'
import { getMedecins, getMedecinsParNom } from '../../api/medecins';
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';

/**
 * Page qui représente la consultation d'un médecin en question.
 */
export default function Medecins() {
	const [medecins, setMedecins] = React.useState([]);
	const [recherche, setRecherche] = React.useState("");
	const [medecinTrouvee, setMedecinTrouvee] = React.useState({});

	/**
	 * A chaque fois qu'on tape le nom du médecin dans la barre de recherche,
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
	const listMedecins = () => {
		return medecins.map(m => {
			return {
				id: m.id,
				value: `${m.nom} ${m.prenom}`
			}
		}).slice(0, 9)
	}

	const RapportMedecin = () => {
		return <table className="border">
			<tbody>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Nom</td>
					<td className="border px-4 py-2 w-[300px]">{ medecinTrouvee.nom }</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Prénom</td>
					<td className="border px-4 py-2 w-[300px]">{ medecinTrouvee.prenom }</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Adresse</td>
					<td className="border px-4 py-2 w-[300px]">{ medecinTrouvee.adresse }</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Département</td>
					<td className="border px-4 py-2 w-[300px]">{ medecinTrouvee.departement }</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Numéro de téléphone</td>
					<td className="border px-4 py-2 w-[300px]">{ medecinTrouvee.tel.match(/(.{1})./g).join(" ") }</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Spécialité complémentaire</td>
					<td className="border px-4 py-2 w-[300px]">{ medecinTrouvee.specialitecomplementaire ?? "Aucun" }</td>
				</tr>
			</tbody>
		</table>
	}
	
	return <div>
		<h2 className="text-2xl">Médecins</h2>
		<DatalistInput
			placeholder="Rechercher médecins"
			onSelect={item => {
				getMedecins().then(json => {
					const medecin = json.data.filter(m => item.id === m.id)[0]
					console.log(medecin);
					
					setMedecinTrouvee(medecin);
				})
			}}
			onChange={e => setRecherche(e.target.value)}
			items={listMedecins()}
		/>
		<br />
		{ Object.keys(medecinTrouvee).length !== 0 && <RapportMedecin /> }
	</div>
}
