import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function Rapports() {
	const [dataVisiteur, setDataVisiteur] = useOutletContext();

	return <div>
		<h2 className="text-2xl">Rapports</h2>
		<table className="border">
			<tbody>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Nom</td>
					<td className="border px-4 py-2 w-[300px]">{ dataVisiteur.nom }</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Prénom</td>
					<td className="border px-4 py-2 w-[300px]">{ dataVisiteur.prenom }</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Adresse</td>
					<td className="border px-4 py-2 w-[300px]">{ dataVisiteur.adresse }</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Code postal</td>
					<td className="border px-4 py-2 w-[300px]">{ dataVisiteur.cp }</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-[300px] text-start">Ville</td>
					<td className="border px-4 py-2 w-[300px]">{ dataVisiteur.ville }</td>
				</tr>
			</tbody>
		</table>
	</div>
}
