import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { updateMedecin } from '../../api/medecins';

export default function FicheMedecin() {
  const [medecinTrouvee, setMedecinTrouvee] = useOutletContext();
  const [section, setSection] = useState("rapport");

  /**
   * Permet de mettre à jour les informations du médecin.
   * @param {Event} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    
    updateMedecin(formData);
  }

  /**
   * Permet d'afficher un navbar pour sélectionner la consultation
   * des rapports ainsi que des médecins.
   */
  const NavbarMedecins = () => {
    return <div className="grid grid-cols-2 gap-4 py-4">
      <button className="w-full" onClick={() => setSection("rapport")}>Consulter les rapports</button>
      <button className="w-full" onClick={() => setSection("medecin")}>Gérer le médecin</button>
    </div>
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
            {medecinTrouvee.id}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 w-[300px] text-start">Nom</td>
          <td className="border px-4 py-2 w-[300px]">
            {medecinTrouvee.nom}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 w-[300px] text-start">Prénom</td>
          <td className="border px-4 py-2 w-[300px]">
            {medecinTrouvee.prenom}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 w-[300px] text-start">Adresse</td>
          <td className="border px-4 py-2 w-[300px]">
            {medecinTrouvee.adresse}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 w-[300px] text-start">Département</td>
          <td className="border px-4 py-2 w-[300px]">
            {medecinTrouvee.departement}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 w-[300px] text-start">Numéro de téléphone</td>
          <td className="border px-4 py-2 w-[300px]">
            {medecinTrouvee.tel}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 w-[300px] text-start">Spécialité complémentaire</td>
          <td className="border px-4 py-2 w-[300px]">
            {medecinTrouvee.specialitecomplementaire ?? "Aucun"}
          </td>
        </tr>
      </tbody>
    </table>
  }

  /**
   * Permet d'afficher un formulaire afin que l'utilisateur puisse mettre à
   * jour les informations du médecin.
   */
  const FormulaireMedecin = () => {
    return <form onSubmit={handleSubmit} method="post">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label>
          Nom :
          <input
            type="text" name="nom"
            defaultValue={medecinTrouvee.nom}
          />
        </label>
        <label>
          Prénom :
          <input
            type="text" name="prenom"
            defaultValue={medecinTrouvee.prenom}
          />
        </label>
        <label>
          Département :
          <input
            type="text" name="departement"
            defaultValue={medecinTrouvee.departement}
          />
        </label>
        <label>
          Numéro de téléphone :
          <input
            type="tel" name="tel"
            defaultValue={medecinTrouvee.tel}
          />
        </label>
        <label className="col-span-2">
          Adresse :
          <input
            type="text" name="adresse"
            defaultValue={medecinTrouvee.adresse}
          />
        </label>
      </div>
      <label>
        Spécialité complémentaire :
        <input
          type="text" name="specialite"
          defaultValue={medecinTrouvee.specialite_complementaire}
        />
      </label>
      <br />
      <button type="submit" className="w-full">Mettre à jour</button>
    </form>
  }

  return <div>
    <NavbarMedecins />
    <h2 className="text-2xl">Fiche du médecin</h2>
    { section === "medecin" && <FormulaireMedecin /> }
    { section === "rapport" && <TableauMedecin /> }
  </div>
}
