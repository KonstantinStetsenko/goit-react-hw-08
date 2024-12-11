

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import style from "./searchbox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name) || ""; 

  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <label className={style.labelForm} htmlFor="search">
      Find contacts by name
      <input className={style.inputSearch} type="text" value={filter} onChange={handleChange} />
    </label>
  );
}
