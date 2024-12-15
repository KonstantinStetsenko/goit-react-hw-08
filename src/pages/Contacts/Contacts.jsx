import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";


import { useSelector } from "react-redux";

import { Toaster } from "react-hot-toast";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import EditModal from "../../components/EditModal/EditModal";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Contacts.module.css";


const Contacts = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    
    <div className={css.containerContacts}>
       <Toaster position="top-right" reverseOrder={false} />
        <ToastContainer />
        {isLoggedIn && (
          <div className={css.content}>
            <SearchBox />
            <div className={css.containerUser}>
              <ContactForm />
              <ContactList />
            </div>

            <EditModal />
            <DeleteModal />
          </div>
        )}
      </div>
  
  );
};
export default Contacts;
