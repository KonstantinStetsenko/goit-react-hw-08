
import { useSelector, useDispatch } from "react-redux";
import Contact from "../Contact/Contact";
import style from "./contactlist.module.css";
import {  deleteContact } from "../../redux/contactsOps";
import { selectFilteredContacts } from "../../redux/contactsSlice"; 

export default function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts); 
  const loading = useSelector((state) => state.contacts.contacts.loading);

 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (filteredContacts.length === 0) {
    return <p>No contacts available</p>;
  }

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={style.boxList}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          phone={contact.number}
          id={contact.id}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
