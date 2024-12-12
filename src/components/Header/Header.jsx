import { NavLink } from "react-router-dom"
import css from "./header.module.css"


const Header = () => {
    return <header className={css.header}>
        <h3>Contacts</h3>
        <ul className={css.listLink}>
            <NavLink to="/" className={css.link}>Home</NavLink>
            <NavLink to="/contacts" className={css.link}>Contacts</NavLink>
            <NavLink to="/login" className={css.link}>Login</NavLink>
              <NavLink to="/register" className={css.link}>Register</NavLink>
</ul>
    </header>
}

export default Header