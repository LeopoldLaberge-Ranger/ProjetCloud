"use client"
import '../styles/variables.scss'
import React, { useState } from 'react';
import Inscription from '../components/Login/Inscription';

const InscriptionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn btn-warning rounded-3" onClick={handleLoginClick}>S'inscrire</button>
      <div
        className={`modal fade ${isOpen ? 'show' : ''}`}
        id="myModal"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
                <img src="./R.png" className="bi me-2" width="32" height="32" role="img" aria-label="Bootstrap"/>
                <p className="doto-header mb-0 me-5">ConnectHive</p>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
                <Inscription />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InscriptionModal;