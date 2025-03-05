import React from "react";
import Alert from "./../Alert";
import { updateMedecin } from "../../api/medecins";

/**
 * Permet d'afficher un formulaire afin que l'utilisateur puisse mettre à
 * jour les informations du médecin.
 */
export default function Fiche({ medecin }) {
  const [status, setStatus] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  /**
   * Permet de mettre à jour les informations du médecin.
   * @param {Event} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = Object.fromEntries(new FormData(e.target));
    data.id = medecin.id;
    data.departement = parseInt(data.departement);

    const response = await updateMedecin(data);

    if (response.status === 200) {
      setStatus("success");
      setMessage(response.data.message);
    } else {
      setStatus("error");
      setMessage("Une erreur s'est produite lors de la mise à jour de la fiche médécin.");
    }
  }

  return <>
    { status !== null && message !== null ? <Alert title={message} /> : null }
    <form onSubmit={handleSubmit} method="post">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label>
          Nom :
          <input
            type="text" name="nom"
            defaultValue={medecin.nom}
          />
        </label>
        <label>
          Prénom :
          <input
            type="text" name="prenom"
            defaultValue={medecin.prenom}
          />
        </label>
        <label>
          Département :
          <input
            type="text" name="departement"
            defaultValue={medecin.departement}
          />
        </label>
        <label>
          Numéro de téléphone :
          <input
            type="tel" name="tel"
            defaultValue={medecin.tel}
          />
        </label>
        <label className="col-span-2">
          Adresse :
          <input
            type="text" name="adresse"
            defaultValue={medecin.adresse}
          />
        </label>
      </div>
      <label>
        Spécialité complémentaire :
        <input
          type="text" name="specialite"
          defaultValue={medecin.specialitecomplementaire}
        />
      </label>
      <br />
      <button type="submit" className="w-full">Mettre à jour</button>
    </form>
  </>
}