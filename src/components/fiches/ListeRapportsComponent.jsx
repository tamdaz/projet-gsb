import React from 'react'

export default function ListeRapportsComponent({ medecin }) {
	/**
	 * Permet de formater le numéro de téléphone en groupant les
	 * deux chiffres entre eux.
	 * @param {string} numero
	 */
	const formaterNumeroTelephone = (numero) => {
		return numero.match(/(.{1})./g).join(" ")
	}

	/**
	 * Affiche des informations sur un médecin en question.
	 */
	const TableauMedecin = () => {
		return <table className="border w-full">
			<tbody>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">ID</td>
					<td className="border px-4 py-2 w-[300px]">
						{medecin.id}
					</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Nom</td>
					<td className="border px-4 py-2 w-[300px]">
						{medecin.nom}
					</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Prénom</td>
					<td className="border px-4 py-2 w-[300px]">
						{medecin.prenom}
					</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Adresse</td>
					<td className="border px-4 py-2 w-[300px]">
						{medecin.adresse}
					</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Département</td>
					<td className="border px-4 py-2 w-[300px]">
						{medecin.departement}
					</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Numéro de téléphone</td>
					<td className="border px-4 py-2 w-[300px]">
						{formaterNumeroTelephone(medecin.tel)}
					</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Spécialité complémentaire</td>
					<td className="border px-4 py-2 w-[300px]">
						{medecin.specialitecomplementaire ?? "Aucun"}
					</td>
				</tr>
			</tbody>
		</table>
	}

	return <div>
		{ Object.keys(medecin).length !== 0 && <TableauMedecin /> }
	</div>
}
