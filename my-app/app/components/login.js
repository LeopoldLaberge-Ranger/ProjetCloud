
'use client'
import init from '../common/init'
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const { auth } = init()
  const [user, setUser] = useState(null)
  console.log(user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
      //  window.location.replace('/');
      }
    })

    return () => unsubscribe()
  }, [auth])


  function submitForm(e) {
    e.preventDefault()

    // Récupération des champs du formulaire
    const email = e.target.email.value
    const password = e.target.password.value

    // Connexion (courriel + mot de passe)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log(userCred.user)
        location.reload()
      })
      .catch((error) => {
        console.log(error.message)
        // Afficher un message d'erreur à l'utilisateur
        alert("Erreur de connexion : " + error.message)
      })
  }

return (
  <>
    <div
      className="text-center flex justify-center items-center h-screen">
      <form onSubmit={submitForm} className="d-flex flex-column w-full max-w-md rounded-lg shadow-md p-4"  style={{
          backdropFilter: 'blur(10px)', // optional
        }}>
        <h3 className="text-center text-2xl font-bold mb-4 rounded-3">Se connecter</h3>
        <input type="email" name="email" className="block w-full p-2 mb-4 shadow-md rounded-3 border border-none" placeholder="Courriel" />
        <input type="password" name="password" className="block w-full p-2 mb-4 shadow-md rounded-3 border-none" placeholder="Mot de passe" />
        <input type="submit" className="connexion block w-full p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Se connecter"/>
        <a href="/signup" className="text-gray-500 text-center mt-2">Pas encore inscrit ? S'inscrire</a>
      </form>
    </div>
  </>
);
};
