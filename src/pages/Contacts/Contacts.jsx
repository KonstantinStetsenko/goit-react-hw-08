import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "./Contacts.module.css";


const Contacts = () => {

    return <div className={css.containerContacts}>
        <ContactForm />
        <SearchBox/>
        <ContactList/>
    </div>
}
export default Contacts