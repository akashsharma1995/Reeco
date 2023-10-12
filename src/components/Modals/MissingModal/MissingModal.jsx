import React from 'react';
import Modal from '../../Modal/Modal';
import styles from './missingModal.module.css'
import Button from '../../Button/Button';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../../redux/slice/orderSlice';

export const MissingModal = ({ activeProduct, handleClose={handleClose} }) => {
  const dispatch = useDispatch();

  const handleSubmit = (value) => {
    dispatch(updateStatus({
      productId: activeProduct.id,
      status: value ? "Missing-urgent" : "Missing"
    }));
    handleClose();
  }

  return (
    <Modal title="Missing Product" handleClose={handleClose}>
      <p className={styles.content}>Is '{activeProduct.name}' urgent?</p>
      <div className={styles.buttons}>
        <Button variant="secondary" onClick={() => handleSubmit(true)}>Yes</Button>
        <Button variant="secondary" onClick={() => handleSubmit(false)}>No</Button>
      </div>
    </Modal>
  )
}
