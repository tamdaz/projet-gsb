import React from 'react'
import Alert from '../components/Alert'
import { getVisiteur } from '../api/visiteur';
import { useNavigate } from 'react-router-dom';

/**
 * Représente la page de connexion.
 */
export default function Index() {
    // Définir le message d'erreur lors du login.
    const [erreurLogin, setErreurLogin] = React.useState(false);

    // Utilisé pour être navigué instanément.
    const navigateTo = useNavigate();

    /**
     * Lors du montage de ce composant, vérifier si les informations de connexion
     * est stockée en local ou non. Si c'est le cas, il sera redirigé vers la page
     * d'accueil.
     */
    React.useEffect(() => {
        if (sessionStorage.getItem("credentials") !== null) {
            const credentials = JSON.parse(sessionStorage.getItem("credentials"));
            
            navigateTo("/projet-gsb/accueil", {
                state: credentials
            });
        }
    }, []);

    /**
     * Lors de la soumission de formulaire, tenter la connexion à un
     * compte utilisateur.
     * 
     * @param {Event} e
     */
    const connection = (e) => {
        e.preventDefault();

        setErreurLogin(false);

        /** @type {{ login: string, mdp: string }} credentials */
        const credentials = Object.fromEntries(new FormData(e.target));

        // Récupérer les infos d'un visiteur.
        getVisiteur(credentials.login, credentials.mdp).then((response) => {
            if (response.data !== null) {
                const jsonCredentials = {
                    login: credentials.login,
                    mdp: credentials.mdp
                }

                navigateTo("/projet-gsb/accueil", {
                    state: jsonCredentials
                })

                // En envrionnement de développement, pour éviter de se connecter à chaque modification
                // du code, on stocke les informations de connexion dans la sessionStorage.
                // Note : elle ne peut stocker que durant le fonctionnement du navigateur.
                if (sessionStorage.getItem("credentials") === null) {
                    sessionStorage.setItem("credentials", JSON.stringify(jsonCredentials));
                }
    
                navigateTo("/projet-gsb/accueil", {
                    state: jsonCredentials
                })
            } else {
                setErreurLogin(true);
            }
        });
    }

    return <div className="grid grid-cols-2 w-screen h-screen divide-x-2">
        <div className="flex justify-center items-center">
            <img src="/logo-gsb.png" alt="logo_gsb" width={256} />
        </div>
        <div className="flex flex-col justify-center items-start">
            <div className="max-w-[800px] m-auto">
                {erreurLogin === true && <Alert title="Impossible de se connecter !" status="error" /> }
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
    </div>
}
