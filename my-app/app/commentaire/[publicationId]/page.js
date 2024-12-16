"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation"; 
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import styles from "../../page.module.css";
import AjouterCommentaire from "../../components/AjouterCommentaire"

const PublicationComments = () => {
  const { publicationId } = useParams();
  const router = useRouter(); 
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const db = getFirestore();
  const storage = getStorage(); 

  useEffect(() => {
    const fetchCommentsWithUserDetails = async () => {
      setLoading(true);
      try {
        // Fetch comments
        const commentsRef = collection(db, "Commentaires");
        const commentsSnapshot = await getDocs(query(commentsRef, where("publicationId", "==", publicationId)));
        const commentsData = commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Fetch user details and profile picture for each comment
        const commentsWithUserDetails = await Promise.all(
          commentsData.map(async (comment) => {
            const profilePicUrl = await downloadProfilePic(comment.userId);
            return { ...comment, profilePic: profilePicUrl || "/default-profile.png" }; // Use default if no image
          })
        );

        setComments(commentsWithUserDetails);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };

    if (publicationId) {
      fetchCommentsWithUserDetails();
    }

  }, [db, publicationId]);

  // Function to download profile picture from Firebase Storage
  const downloadProfilePic = async (userId) => {
    const profilePicRef = ref(storage, `images/${userId}/profilePic/`);
    try {
      const res = await listAll(profilePicRef);
      if (res.items.length > 0) {
        const url = await getDownloadURL(res.items[0]);
        return url;
      }
      return null; // No profile picture found
    } catch (error) {
      console.error("Error downloading profile picture:", error);
      return null;
    }
  };

  // Format the timestamp into a readable string
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown Date";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="container my-4">
          {/* Navigation and Add Comment Button */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <AjouterCommentaire />
            <button className="btn btn-primary position-absolute top-0 end-0 m-3">
              <i className="bi bi-plus-lg"></i> Ajouter un commentaire
            </button>
          </div>

          {loading && <p>Loading comments...</p>}

          <h3>Commentaires:</h3>

          {comments.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {comments.map((comment) => (
                <div key={comment.id} className="card shadow-sm">
                  <div className="card-body d-flex">
                    {/* Profile Pic */}
                    <img
                      src={comment.profilePic}
                      alt="Profile"
                      width={50}
                      height={50}
                      className="rounded-circle me-3"
                    />
                    {/* Comment Content */}
                    <div>
                      <p>{comment.commentaire}</p>
                      <div>
                        <small>
                          Publié par <strong>{comment.email || "Unknown Email"}</strong>
                        </small>
                      </div>
                      {/* Timestamp */}
                      <div>
                        <small className="text-muted">{formatTimestamp(comment.timestamp)}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun commentaire pour le moment.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PublicationComments;
