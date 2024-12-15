import React from "react";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { openDeleteModal, openEditModal } from "../../redux/contacts/slice";
import css from "./contact.module.css";

import styles from "./contact.module.css";

const Contact = ({ name, phone, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => { dispatch(openDeleteModal(id)) };

  const handleEdit = () => {
    dispatch(openEditModal(id));
  };


  return (
    <div className={styles.cardContact}>
      <div className={styles.formContact}>
        <div className={styles.contactName}>
          <FaUser className={styles.user} size={24} />
          {name}
        </div>
        <div className={styles.contactPhone}>
          <FaPhone className={styles.phone} size={24} />
          {phone}
        </div>
      </div>
      <div className={css.containerButton}>
        <button className={styles.buttonDel} onClick={handleDelete}>
          Delete
        </button>
        <button className={styles.buttonDel} onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default Contact;
