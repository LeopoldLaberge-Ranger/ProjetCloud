"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import ForumCard from "./components/forumCard";
import init from './common/init';
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const { db } = init(); // Initialize Firebase
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase
    getDocs(collection(db, "Publication"))
      .then((querySnapshot) => {
        // Map data into a usable format
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(), // Document data
        }));
        setPosts(postsArray);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="container">
          {/* Render ForumCard for each post */}
          {posts.map((post) => (
            <ForumCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
