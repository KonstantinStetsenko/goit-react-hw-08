import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNameFilter, changeNumberFilter } from "../../redux/filters/selectors";
import style from "./searchbox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filterName = useSelector((state) => state.filters.name) || "";
  const filterNumber = useSelector((state) => state.filters.number) || ""; 

  const handleNameChange = (value) => {
    dispatch(changeNameFilter(value));
  };

  const handleNumberChange = (value) => {
    dispatch(changeNumberFilter(value));
  };

  return (
    <Formik
      initialValues={{ name: filterName, phoneNumber: filterNumber }}
      onSubmit={(values) => {
        handleNameChange(values.name);
        handleNumberChange(values.phoneNumber);
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className={style.containerForm}>
          <div>
            <label className={style.labelForm} htmlFor="nameSearch">
              Find contacts by name
              <Field
                className={style.inputSearch}
                type="text"
                id="nameSearch"
                name="name"
                value={values.name}
                onChange={(event) => {
                  handleChange(event);
                  handleNameChange(event.target.value);
                }}
                onBlur={handleBlur}
                placeholder="Search by name"
              />
            </label>
          </div>
          <div>
            <label className={style.labelForm} htmlFor="phoneSearch">
              Find contacts by phone number
              <Field
                className={style.inputSearch}
                type="text"
                id="phoneSearch"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={(event) => {
                  handleChange(event);
                  handleNumberChange(event.target.value);
                }}
                onBlur={handleBlur}
                placeholder="Search by phone number"
              />
            </label>
          </div>
        </Form>
      )}
    </Formik>
  );
}
