/**
 * Permet d'afficher une alerte. Ce composant a pour but
 * d'attirer l'attention à l'utilisateur.
 * 
 * @param {{ title: string }} props
 * @returns 
 */
export default function Alert({ title, status }) {
  /**
   * Récupérer les propriétés de Tailwind pour styliser l'alerte.
   * 
   * @param {"success"|"error"|"unknown"} name 
   * @returns 
   */
  const getColors = (status = "unknown") => {
    const colors = {
      success: "bg-green-100 border-green-300",
      error: "bg-red-100 border-red-300",
      unknown: "bg-gray-100 border-gray-300",
    }

    return colors[status];
  }

  return <div className={`w-full px-4 py-2 mb-4 border rounded-md ${getColors(status)}`}>
    <h4 className="text-xl font-bold">{title}</h4>
  </div>
}
