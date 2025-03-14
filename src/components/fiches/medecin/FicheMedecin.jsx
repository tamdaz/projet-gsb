import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Fiche from './Fiche'
import Rapports from './Rapports'

export default function FicheMedecin() {
  const [medecinTrouvee] = useOutletContext();
  const [affichage, setAffichage] = useState("fiche");

  /**
   * Permet d'afficher un navbar pour sélectionner la consultation
   * des rapports ainsi que des médecins.
   */
  const NavbarMedecins = () => {
    return <div className="grid grid-cols-2 gap-4 py-4">
      <button className="w-full" onClick={() => setAffichage("rapport")}>Consulter les rapports</button>
      <button className="w-full" onClick={() => setAffichage("fiche")}>Gérer le médecin</button>
    </div>
  }

  return <div>
    { medecinTrouvee != {} && <NavbarMedecins /> }
    <h2 className="text-2xl">Fiche du médecin</h2>
    <br />
    { affichage === "rapport" && <Rapports id={medecinTrouvee.id} /> }
    { affichage === "fiche"   && <Fiche medecin={medecinTrouvee} /> }
  </div>
}
