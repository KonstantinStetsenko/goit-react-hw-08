import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";




const RegisterForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = (value, options) => {
        dispatch(register(value))
        options.resetForm()
    }


    const initialValues = {
        name: "",
        email: "",
        password:""
    }

  return (
    <div>
      <h2>Register</h2>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={css.form}>
          <Field
            className={css.imputForm}
            name="name"
            placeholder="Enter name"
          />
          <Field
            className={css.imputForm}
            name="email"
            placeholder="Enter email"
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

export default RegisterForm;
