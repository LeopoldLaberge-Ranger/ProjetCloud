import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import init from "../common/init";

function ForumCard(props) {
  const { post } = props;
  const [imageUrls, setImageUrls] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    init();
    const storage = getStorage();
    const auth = init()

    const fetchImages = async () => {
      try {
        const postImagesRef = ref(storage, `posts/${post.id}`);
        const res = await listAll(postImagesRef);
        
        const urls = await Promise.all(
          res.items.map((itemRef) => getDownloadURL(itemRef))
        );
        
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
        setImageUrls(["/default-image.png"]);
      }
    };

    fetchImages();
  }, [post.id]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{post.titre}</h5>
        
        <p className="card-text">{post.contenu}</p>

        <div className="post-meta">
        <p><strong>Author:</strong> {userEmail || "Anonymous"}</p>
          <p><strong>Date:</strong> {new Date(post.Timestamp.toDate()).toLocaleDateString()}</p>

        </div>

        <div className="images-container">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Post image ${index + 1}`}
                width={500}
                height={300}
                className="img-fluid rounded mb-3"
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>

        <div className="text-center">
          <a
            href={`/commentaire/${post.id}`}
            className="btn btn-primary mt-3"
          >
            View Comments
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForumCard;
