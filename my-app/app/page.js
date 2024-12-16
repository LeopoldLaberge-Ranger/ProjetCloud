"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import ForumCard from "./components/forumCard";
import init from './common/init';
import Sidebar from "./components/sidebar";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const { db } = init();
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    getDocs(collection(db, "Publication"))
      .then((querySnapshot) => {

        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), 
        }));
        setPosts(postsArray);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <>
    
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="container">
        <h1 className="doto-header mb-0 me-5">ConnectHive</h1>
        </div>
      </main>
    </div>
    </>
  );
}
