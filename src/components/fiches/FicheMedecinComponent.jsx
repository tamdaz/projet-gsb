import React from 'react'

export default function FicheMedecinComponent() {
  return <div>
    <hr />
    <br />
    <h2 className="text-2xl">Fiche du médecin</h2>
    <form method="post">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label>
          Nom : 
          <input type="text" name="nom" />
        </label>
        <label>
          Prénom : 
          <input type="text" name="prenom" />
        </label>
        <label>
          Département : 
          <input type="text" name="departement" />
        </label>
        <label>
          Numéro de téléphone : 
          <input type="tel" name="tel" />
        </label>
        <label>
          Adresse : 
          <input type="text" name="adresse" />
        </label>
      </div>
      <label>
        Spécialité complémentaire : 
        <input type="text" name="specialite_complementaire" />
      </label>
      <br />
      <button type="submit" className="w-full">Mettre à jour</button>
    </form>
  </div>
}
