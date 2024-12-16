"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import init from "../../common/init";
import styles from "../../page.module.css";
import ForumCard from "../../components/forumCard";

const ForumPage = () => {
  const { db } = init();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (id) {
      const forumId = parseInt(id);

      const fetchPosts = async () => {
        const postsQuery = query(
          collection(db, "Publication"),
          where("forumId", "==", forumId)
        );
        try {
          const querySnapshot = await getDocs(postsQuery);
          const postsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(postsArray);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      fetchPosts();
    }
  }, [id, db]);

  return (
<div className={styles.page}>
  <main className={styles.main}>
    <div className="container">
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <ForumCard key={post.id} post={post} />
          ))}
        </>
      ) : (
        <h1>Aucun contenu dans ce forum.</h1>
      )}
    </div>
  </main>
</div>

  );
};

export default ForumPage;
