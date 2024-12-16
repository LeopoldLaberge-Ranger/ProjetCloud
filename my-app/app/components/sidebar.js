"use client"
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import AjouterpublicationModal from "./AjouterpublicationModal";

const Sidebar = () => {
  const [forums, setForums] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State for managing modal visibility

  const db = getFirestore();

  useEffect(() => {
    const fetchForums = async () => {
      const forumRef = collection(db, "Forums");
      const forumSnapshot = await getDocs(forumRef);
      const forumList = forumSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setForums(forumList);
    };
    fetchForums();
  }, [db]);

  const handleModalOpen = (e) => {
    e.preventDefault(); // Prevent the page refresh
    setModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setModalOpen(false); 
  };

  return (
    <>
      <div className="container-fluid overflow-hidden">
        <div className="overflow-y-auto">
          <div className="col-2 col-sm-3 col-xl-2 d-flex fixed-top" id="sidebar">
            <div className="d-flex flex-column flex-grow-1 align-items-center align-items-sm-start bg-white px-2 px-sm-3 py-2 text-white vh-100 overflow-auto shadow-sm">
              <a
                
                className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none border-bottom border-solid border-3"
              >
                <AjouterpublicationModal isOpen={modalOpen} onClose={handleModalClose} />
              </a>
              <ul
                className="nav nav-pills mt-3 flex-column flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
                id="menu"
              >
                <div className="d-flex justify-content-center w-100">
                  <h4 className="text-dark text-center">Forums</h4>
                </div>
                {forums.map((forum) => (
                  <li key={forum.id} className="nav-item mb-2">
                    <a
                      href={`/forum/${forum.id}`}
                      className="nav-link px-3 py-2 rounded-pill text-dark d-flex align-items-center"
                      style={{
                        backgroundColor: "#f2f2f2",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <i className="fs-5 bi-house"></i>
                      <span className="ms-2 d-none d-sm-inline">{forum.ForumName}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="dropup py-sm-4 py-1 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="hugenerd"
                    width="28"
                    height="28"
                    className="rounded-circle"
                  />
                  <span className="d-none d-sm-inline mx-1">Joe</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark px-0 px-sm-2 text-center text-sm-start"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <a className="dropdown-item px-1" href="#">
                      <i className="fs-6 bi-basket"></i>
                      <span className="d-none d-sm-inline ps-1">New project</span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item px-1" href="#">
                      <i className="fs-6 bi-bookmark"></i>
                      <span className="d-none d-sm-inline ps-1">Settings</span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item px-1" href="#">
                      <i className="fs-6 bi-binoculars"></i>
                      <span className="d-none d-sm-inline ps-1">Profile</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
