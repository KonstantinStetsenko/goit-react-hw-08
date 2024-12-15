import Button from '@mui/material/Button';
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.user.email);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={css.container}>
      <p className={css.name}>{userEmail}</p>
         <Button  className={css.logoutButton} variant="outlined" startIcon={<BiLogOut />} onClick={handleLogout} className={css.logoutButton}  > Logout </Button>
    </div>
  );
};

export default UserMenu;

