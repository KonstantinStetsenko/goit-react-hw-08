import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Contacts from "./pages/Contacts/Contacts";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { addContact, deleteContact, fetchContacts } from "./redux/contactsOps";
import { selectNameFilter } from "./redux/filtersSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const { loading } = useSelector((state) => state.contacts.contacts);
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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>

    /* // <div>
    //   <h1>Phonebook</h1>
    //   <ContactForm onAdd={handleAddContact} />
    //   <SearchBox /> 
    //   {loading&&<h2>Loading.....</h2>}
    //   <ContactList users={filteredContacts} onDelete={handleDeleteContact} /> 
    // </div> */
  );
}

export default App;
