"use client";
import '../styles/variables.scss';
import React, { useState } from 'react';
import AjouterPublication from './AjouterPublication';

const AjoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="z-1">
      <button
        className="btn btn-warning rounded-3 me-2"
        onClick={handleLoginClick}
      >
        Ajouter une publication
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal fade show" id="myModal" style={{ display: 'block' }}>
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
                <AjouterPublication />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="modal-backdrop fade show"
          onClick={handleClose}
        ></div>
      )}
    </div>
  );
};

export default AjoutModal;
