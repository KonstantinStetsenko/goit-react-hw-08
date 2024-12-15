import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";



const RegisterForm = () => {
    const dispatch = useDispatch()
     const navigate = useNavigate();
    const handleSubmit = (value, options) => {
        dispatch(register(value)).unwrap()
      .then((res) => {
        toast.success(`Welcome${res?.user?.name}You have successfully registered`);
          setTimeout(() => { navigate("/contacts"); }, 1000);
          
        options.resetForm();
      })
      .catch((error) => {
        toast.error("Error, This user already exists.");
      });

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
