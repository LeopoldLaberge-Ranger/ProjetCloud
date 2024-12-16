"use client";
import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import InscriptionModal from "./InscriptionModal";
import init from "../common/init";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";

export default function Header() {
  const { app } = init(); // Initialize Firebase
  const auth = getAuth(app); // Initialize Firebase Auth
  const storage = getStorage(app); // Initialize Firebase Storage

  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        downloadProfilePic(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // Download profile picture from Firebase Storage
  const downloadProfilePic = (uid) => {
    const profilePicRef = ref(storage, `images/${uid}/profilePic/`);

    listAll(profilePicRef)
      .then((res) => {
        if (res.items.length > 0) {
          getDownloadURL(res.items[0]).then(setProfilePic);
        }
      })
      .catch((error) => console.error("Error downloading profile picture:", error));
  };

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.reload(); // Refresh the page after logout
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const profilePicFolderRef = ref(storage, `images/${user.uid}/profilePic/`);

    // Delete any existing profile pictures before uploading the new one
    listAll(profilePicFolderRef)
      .then((res) => {
        const deletePromises = res.items.map((item) => deleteObject(item));
        return Promise.all(deletePromises);
      })
      .then(() => {
        const fileRef = ref(storage, `images/${user.uid}/profilePic/${file.name}`);
        return uploadBytes(fileRef, file);
      })
      .then(() => {
        downloadProfilePic(user.uid);
      })
      .catch((error) => {
        console.error("Error uploading profile picture:", error);
      });
  };

  return (
    <header className="p-3 bg-white text-dark fixed-top">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
            <img src="./R.png" className="bi me-2" width="32" height="32" role="img" aria-label="Bootstrap" />
            <p className="doto-header mb-0 me-5">ConnectHive</p>
          </a>
          <form className="search col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              className="form-control form-control-dark rounded-5"
              type="search"
              placeholder="Rechercher sur ConnectHive"
              aria-label="Search"
            />
          </form>
          <div className="text-end d-flex align-items-center">
            {user ? (
              <>
                <div className="me-3 position-relative">
                  <label htmlFor="profilePicInput">
                    <img
                      src={profilePic || "/default.jpg"}
                      alt="Profile"
                      className="rounded-circle"
                      width="40"
                      height="40"
                      style={{ cursor: "pointer", objectFit: "cover" }}
                    />
                  </label>
                  <input
                    id="profilePicInput"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    style={{ display: "none" }}
                  />
                </div>
                <button onClick={handleLogout} className="btn btn-outline-danger">
                  Logout
                </button>
              </>
            ) : (
              <>
                <LoginModal />
                <InscriptionModal />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
