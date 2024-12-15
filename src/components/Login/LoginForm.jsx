import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (value, options) => {
    dispatch(login(value))
      .unwrap()
      .then((res) => {
        toast.success(`welcome${res?.user?.name}`);
        setTimeout(() => {
          navigate("/contacts");
        }, 1000);

        options.resetForm();
      })
      .catch((error) => {
        toast.error("Ошибка входа. Пожалуйста, попробуйте снова.");
      });

    options.resetForm();
  };
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div>
      <h2>Register</h2>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={css.form}>
          <Field
            className={css.imputForm}
            name="email"
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

export default LoginForm;
