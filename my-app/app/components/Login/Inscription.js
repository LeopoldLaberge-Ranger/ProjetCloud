import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import init from '../../common/init';

export default function Inscription() {
  const { auth } = init(); // Initialisation de Firebase à partir de init.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Vérification des champs avant soumission
    setLoading(true);
    setError("");

    try {
      // Création de l'utilisateur Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Utilisateur créé :", userCredential.user);
      location.reload(); // Redirection vers la page d'accueil après inscription
    } catch (err) {
      setError("Erreur d'inscription"); // Affichage de l'erreur si l'inscription échoue
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return false;
    }
    if (!email.includes("@")) {
      setError("Veuillez entrer une adresse email valide");
      return false;
    }
    if (password.length < 8) {
      setError("Veuillez entrer un mot de passe d'au moins 8 caractères");
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column w-full max-w-md rounded-lg shadow-md p-4">
      <h3 className="text-center text-2xl font-bold mb-4 rounded-3">Inscription</h3>
      <input
        className="block w-full p-2 shadow-md rounded-3 border border-none"
        placeholder="Courriel"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <br />
      <input
        className="block w-full p-2 mb-2 shadow-md rounded-3 border border-none"
        placeholder="Mot de passe"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <br />
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : (
        <input type="submit" className="connexion block w-full p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="S'inscrire" />
      )}
      <a href="/signup" className="text-gray-500 text-center mt-2">Deja inscrit ? Se connecter</a>
    </form>
  );
}