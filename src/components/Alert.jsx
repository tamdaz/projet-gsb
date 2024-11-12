import React from 'react'

/**
 * Permet d'afficher une alerte. Ce composant a pour but
 * d'attirer l'attention de l'utilisateur.
 * 
 * @param {{ title: string }} props
 * @returns 
 */
export default function Alert({ title }) {
	return <div className="w-full px-4 py-2 mb-4 border rounded-md bg-gray-100 border-gray-300">
		<h4 className="text-xl font-bold">{title}</h4>
	</div>
}