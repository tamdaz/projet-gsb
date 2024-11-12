import React from 'react'
import Alert from '../components/Alert'
import { getVisiteur } from '../api/visiteur';
import { useNavigate } from 'react-router-dom';

/**
 * Représente la page de connexion.
 */
export default function Index() {
    const [erreurLogin, setErreurLogin] = React.useState(false);

    const navigateTo = useNavigate();

    /**
     * Lors de la soumission de formulaire, tenter la connexion à un
     * compte utilisateur.
     * 
     * @param {Event} e
     */
    const connection = (e) => {
        e.preventDefault();

        if (erreurLogin === true) setErreurLogin(false);

        /** @type {{ login: string, mdp: string }} credentials */
        const credentials = Object.fromEntries(new FormData(e.target));

        // Récupérer les infos d'un visiteur.
        getVisiteur(credentials.login, credentials.mdp).then((response) => {
            if (response.data !== null) {
                console.log("Succès");

                navigateTo("/accueil", {
                    state: {
                        login: credentials.login,
                        mdp: credentials.mdp
                    }
                })
            } else {
                setErreurLogin(true);
                console.log("Erreur");
            }
        });
    }

    return <div className="grid grid-cols-2 w-screen h-screen divide-x-2">
        <div className="flex justify-center items-center">
            <img src="/logo-gsb.png" alt="logo_gsb" width={256} />
        </div>
        <div className="flex flex-col justify-center items-start p-8">
            {(erreurLogin === true) ? <Alert title="Impossible de se connecter !" /> : null}

            <h1 className="text-4xl font-bold text-center w-full">Identifiez-vous</h1>
            <br />
            <form onSubmit={connection} className="flex flex-col w-full" method="post">
                <label>
                    Nom d'utilisateur :
                    <input type="text" name="login" />
                </label>
                <label>
                    Mot de passe :
                    <input type="password" name="mdp" />
                </label>
                <br />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    </div>
}
