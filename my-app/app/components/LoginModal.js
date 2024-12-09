"use client"
import '../styles/variables.scss'
import React, { useState } from 'react';
import Login from '../components/login';

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn btn-light rounded-3 me-2" onClick={handleLoginClick}>Se connecter</button>
      <div
        className={`modal fade ${isOpen ? 'show' : ''}`}
        id="myModal"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;