import React, { useState } from "react";

const AddCommentButton = ({ isLoggedIn, onAddComment }) => {
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (commentText.trim()) {
      setLoading(true);
      try {
        await onAddComment(commentText);
        setCommentText(""); 
        setShowModal(false);
      } catch (error) {
        console.error("Error adding comment:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {isLoggedIn && (
        <>
          {/* Button to trigger the modal */}
          <button
            className="btn btn-primary position-absolute top-0 end-0 m-3"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-lg"></i> Ajouter un commentaire
          </button>

          {/* Modal for adding a comment */}
          <div
            className={`modal fade ${showModal ? "show" : ""}`}
            style={{ display: showModal ? "block" : "none" }}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden={!showModal}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Ajouter un commentaire
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <textarea
                    className="form-control"
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Écrivez votre commentaire..."
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Envoi..." : "Publier"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddCommentButton;
