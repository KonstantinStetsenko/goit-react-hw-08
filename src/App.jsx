import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import { addContact, deleteContact } from "./redux/contactsOps";
import { selectNameFilter } from "./redux/filtersSlice"; 
import { fetchContacts } from "./redux/contactsOps";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

useEffect(() => {
    dispatch(fetchContacts()); 
  }, [dispatch]);

  const { loading } = useSelector((state) => state.contacts.contacts)
  const contacts = useSelector((state) => state.contacts.contacts.items || []);
  const filter = useSelector(selectNameFilter); 
  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={handleAddContact} />
      <SearchBox /> 
      {loading&&<h2>Loading.....</h2>}
      <ContactList users={filteredContacts} onDelete={handleDeleteContact} /> 
    </div>
  );
}

export default App;
