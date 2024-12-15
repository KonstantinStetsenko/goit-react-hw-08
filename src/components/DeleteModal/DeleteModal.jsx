import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { selectDeleteItemId, selectIsDeleteModalOpen } from "../../redux/contacts/selectors";
import { closeDeleteModal } from "../../redux/contacts/slice";
import css from "./DeleteModal.module.css";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsDeleteModalOpen);
  const contactId = useSelector(selectDeleteItemId);

  const handleDelete = () => {
    dispatch(deleteContact(contactId));
    dispatch(closeDeleteModal());
  };

  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContainer}>
        <button className={css.modalClose} onClick={() => dispatch(closeDeleteModal())}>
          &times;
        </button>
        <div className={css.modalContent}>
          <h2>Delete Contact</h2>
          <p>Are you sure you want to delete this contact?</p>
        </div>
        <div className={css.modalFooter}>
          <button className="modal-save" onClick={handleDelete}>
            Delete
          </button>
          <button className={css.modalSave} onClick={() => dispatch(closeDeleteModal())}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
