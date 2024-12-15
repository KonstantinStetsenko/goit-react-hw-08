import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import { selectEditItemId, selectIsEditModalOpen } from "../../redux/contacts/selectors";
import { closeEditModal } from "../../redux/contacts/slice";
import css from "./EditModal.module.css";
const EditModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsEditModalOpen);
  const contactId = useSelector(selectEditItemId);
  const contact = useSelector((state) =>
    state.contacts.contacts.items.find((item) => item.id === contactId)
  );

  useEffect(() => {
    if (contact) {
      // This effect ensures the Formik initial values are set correctly
    }
  }, [contact]);

  const handleSave = (values) => {
    dispatch(editContact({ contactId, updatedData: values }));
    dispatch(closeEditModal());
  };

  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContainer}>
        <button className={css.modalClose} onClick={() => dispatch(closeEditModal())}>
          &times;
        </button>
        <div className={css.modalContent}>
          <h2>Editing contact</h2>
          <Formik
            initialValues={{
              name: contact?.name || "",
              number: contact?.number || "",
            }}
            onSubmit={handleSave}
          >
            {({ values, handleChange }) => (
              <Form>
                <label>
                  Name:
                  <Field
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Phone:
                  <Field
                    type="text"
                    name="number"
                    value={values.number}
                    onChange={handleChange}
                  />
                </label>
                <div className={css.modalFooter}>
                  <button className={css.modalSave} type="submit">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

