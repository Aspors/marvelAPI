import "./header.scss";
import { NavLink, Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <div className="container">
          <h1>
            <span>Marvel</span> information portal
          </h1>
          <div className="header__links">
            <NavLink
              className={({ isActive }) => (isActive ? "active_link" : "")}
              to="">
              Characters
            </NavLink>
            <span>/</span>
            <NavLink
              className={({ isActive }) => (isActive ? "active_link" : "")}
              to="comics">
              Comics
            </NavLink>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
