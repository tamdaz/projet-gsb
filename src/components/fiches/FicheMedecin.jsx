import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function FicheMedecin() {
  const [ medecinTrouvee, setMedecinTrouvee ] = useOutletContext();

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

  return <div>
    <NavbarMedecins />
    <h2 className="text-2xl">Fiche du médecin</h2>
    <form method="post">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label>
          Nom :
          <input type="text" name="nom" value={medecinTrouvee.nom} />
        </label>
        <label>
          Prénom :
          <input type="text" name="prenom" value={medecinTrouvee.prenom} />
        </label>
        <label>
          Département :
          <input type="text" name="departement" value={medecinTrouvee.departement} />
        </label>
        <label>
          Numéro de téléphone :
          <input type="tel" pattern='' name="tel" value={medecinTrouvee.tel} />
        </label>
        <label className="col-span-2">
          Adresse :
          <input type="text" name="adresse" value={medecinTrouvee.adresse} />
        </label>
      </div>
      <label>
        Spécialité complémentaire :
        <input type="text" name="specialite" value={medecinTrouvee.specialite_complementaire} />
      </label>
      <br />
      <button type="submit" className="w-full">Mettre à jour</button>
    </form>
  </div>
}
