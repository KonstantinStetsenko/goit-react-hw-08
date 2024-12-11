import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "./contactform.module.css";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const inputNameId = useId();
  const inputNumberId = useId();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact({ id: nanoid(), name: values.username, number: values.number }));
    resetForm();
  };

  return (
    <Formik
        validationSchema={FeedbackSchema}
  initialValues={{ username: "", number: "" }}
  onSubmit={handleSubmit}
    >
      <Form className={style.ContactForm}>
        <label className={style.labelForm} htmlFor={inputNameId}>
          Name
        </label>
        <Field
          className={style.textForm}
          type="text"
          name="username"
          placeholder="Username"
          id={inputNameId}
        />
        <ErrorMessage
          className={style.errorMass}
          name="username"
          component="span"
        />
        <label className={style.labelForm} htmlFor={inputNumberId}>
          Number
        </label>
        <Field
          className={style.textForm}
          type="text"
          name="number"
          placeholder="Number"
          id={inputNumberId}
        />
        <ErrorMessage
          className={style.errorMass}
          name="number"
          component="span"
        />
        <button className={style.button} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
