import { Field, Form, Formik } from "formik";
import css from "./LoginForm.module.css";


const LoginForm = () => {
  return (
    <div>
      <h2>Register</h2>
      <Formik>
        <Form className={css.form}>
          <Field
            className={css.imputForm}
            name="name"
            placeholder="Enter name"
          />
          <Field
            className={css.imputForm}
            name="password"
            placeholder="Enter password"
          />
          <button className={css.buttonSubmit} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm