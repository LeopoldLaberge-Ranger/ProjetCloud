"use client";

import { useState, useEffect } from "react";
import init from "../common/init";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import getDownloadURL to fetch the image URL
import { getAuth } from "firebase/auth";
import { addDoc, collection, Timestamp, getDocs } from "firebase/firestore";

const AjouterPublication = () => {
  const { db } = init();

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [forums, setForums] = useState([]);
  const [selectedForumId, setSelectedForumId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Charger les forums depuis Firestore
  useEffect(() => {
    const fetchForums = async () => {
      try {
        const forumRef = collection(db, "Forums");
        const forumSnapshot = await getDocs(forumRef);
        const forumList = forumSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setForums(forumList);
      } catch (error) {
        console.error("Erreur lors du chargement des forums :", error);
      }
    };

    if (db) fetchForums();
  }, [db]);

  // Gestion du changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Validation des champs
  const validateForm = () => {
    if (!titre.trim()) return "Veuillez entrer un titre.";
    if (!contenu.trim()) return "Veuillez entrer un contenu.";
    if (!selectedForumId) return "Veuillez sélectionner un forum.";
    return null;
  };

  // Soumettre le formulaire
  const submit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Réinitialiser le message d'erreur

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        setErrorMessage("Utilisateur non authentifié. Veuillez vous connecter.");
        return;
      }

      const uid = currentUser.uid;
      let imagePath = null;

      // Créer un nouveau document pour la publication
      const docRef = await addDoc(collection(db, "Publication"), {
        titre,
        contenu,
        Timestamp: Timestamp.now(),
        userID: uid,
        forumId: selectedForumId,
      });

      // Une fois le post ajouté, on peut récupérer son ID (postId)
      const postId = docRef.id;

      // Si une image a été sélectionnée
      if (imageFile) {
        const storageRef = ref(
          getStorage(),
          `posts/${postId}/${imageFile.name}` // Utilise postId pour définir le chemin de l'image
        );

        // Upload de l'image
        await uploadBytes(storageRef, imageFile);

        // Récupérer l'URL de l'image après l'upload
        imagePath = await getDownloadURL(storageRef);
        console.log("Image uploadée avec succès :", imagePath);

        // Mettre à jour le document de la publication avec l'URL de l'image
        await docRef.update({
          refImage: imagePath,
        });
      }

      console.log("Publication ajoutée avec ID :", postId);

      // Réinitialiser le formulaire
      resetForm();
    } catch (error) {
      setErrorMessage(
        "Une erreur est survenue lors de l'ajout de la publication. Veuillez réessayer."
      );
      console.error("Erreur :", error);
    }
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setTitre("");
    setContenu("");
    setImageFile(null);
    setSelectedForumId("");
  };

  return (
    <div className="container">
      <form className="bg-dark p-4 rounded shadow" onSubmit={submit}>
        <h3 className="text-white mb-3">Ajouter une publication</h3>

        {/* Titre */}
        <div className="mb-3">
          <label htmlFor="titre" className="form-label text-white">
            Titre de la publication
          </label>
          <input
            type="text"
            id="titre"
            className="form-control"
            placeholder="Titre de la publication"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>

        {/* Contenu */}
        <div className="mb-3">
          <label htmlFor="contenu" className="form-label text-white">
            Texte de la publication
          </label>
          <textarea
            id="contenu"
            className="form-control"
            rows="3"
            placeholder="Texte de la publication"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label text-white">
            Image pour la publication
          </label>
          <input
            type="file"
            id="image"
            className="form-control "
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          {imageFile && (
            <small className="text-white">Image sélectionnée : {imageFile.name}</small>
          )}
        </div>

        {/* Forums */}
        <div className="mb-3">
          <label htmlFor="forum" className="form-label text-white">
            Sélectionner un forum
          </label>
          <select
            id="forum"
            className="form-select"
            value={selectedForumId}
            onChange={(e) => setSelectedForumId(parseInt(e.target.value))}
          >
            <option value="">Choisir un forum</option>
            {forums.map((forum) => (
              <option key={forum.id} value={forum.id}>
                {forum.ForumName}
              </option>
            ))}
          </select>
        </div>

        {/* Erreurs */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        {/* Boutons */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Ajouter la publication
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjouterPublication;
