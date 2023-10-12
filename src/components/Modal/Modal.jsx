import React from 'react';
import styles from './modal.module.css';

const Modal = ({ title, handleClose, children }) => {

  return (
    <div className={styles.backdrop} onClick={() => handleClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={() => handleClose()}>&#10006;</span>
        <h3 className={styles.title}>{title}</h3>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal