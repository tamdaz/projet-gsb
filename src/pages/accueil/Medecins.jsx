import React from 'react'
import 'react-datalist-input/dist/styles.css';
import DatalistInput from 'react-datalist-input';
import { getMedecins, getMedecinsParNom } from '../../api/medecins';

/**
 * Page qui représente la consultation d'un médecin en question.
 */
export default function Medecins() {
	const [medecins, setMedecins] = React.useState([]);
	const [recherche, setRecherche] = React.useState("");
	const [medecinTrouvee, setMedecinTrouvee] = React.useState({});
	const [section, setSection] = React.useState("fiche");

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
	const listeMedecins = () => {
		return medecins.map(m => {
			return {
				id: m.id,
				value: `${m.nom} ${m.prenom}`
			}
		}).slice(0, 9)
	}

	/**
	 * Permet de formater le numéro de téléphone en groupant les
	 * deux chiffres entre eux.
	 * @param {string} numero
	 */
	const formaterNumeroTelephone = (numero) => {
		return numero.match(/(.{1})./g).join(" ")
	}

	/**
	 * Permet d'afficher un navbar pour sélectionner la consultation
	 * des rapports ainsi que des médecins.
	 */
	const NavbarMedecins = () => {
		return <div className="grid grid-cols-2 gap-4 py-4">
			<button className="w-full">Consulter les rapports</button>
			<button className="w-full">Gérer le médecin</button>
		</div>
	}

	/**
	 * Affiche des informations sur un médecin en question.
	 */
	const TableauMedecin = () => {
		return <table className="border w-full">
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
					<td className="border px-4 py-2 w-[300px]">{ formaterNumeroTelephone(medecinTrouvee.tel) }</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Spécialité complémentaire</td>
					<td className="border px-4 py-2 w-[300px]">{ medecinTrouvee.specialitecomplementaire ?? "Aucun" }</td>
				</tr>
			</tbody>
		</table>
	}

	/**
	 * Permet de récupérer les informations des médecins.
	 */
	const getInfos = (item) => {
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
			onSelect={item => getInfos(item)}
			onChange={e => setRecherche(e.target.value)}
			items={listeMedecins()}
		/>
		<NavbarMedecins />
		<br />
		{ Object.keys(medecinTrouvee).length !== 0 && <TableauMedecin /> }
	</div>
}
