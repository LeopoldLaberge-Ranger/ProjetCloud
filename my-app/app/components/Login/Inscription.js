"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../common/init";

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Utilisateur créé avec succès :", userCredential.user);
      console.log("Auth object:", auth);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <form onSubmit={onSubmit} className="d-flex flex-column w-full max-w-md rounded-lg shadow-md p-4"  style={{
        backdropFilter: 'blur(10px)', // optional
      }}>
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
      <input type="submit" className="connexion block w-full p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="S'inscrire"/>
      <a href="/signup" className="text-gray-500 text-center mt-2">Deja inscrit ? Se connecter</a>
    </form>
  );
}
