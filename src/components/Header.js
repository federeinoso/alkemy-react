import { Link } from "react-router-dom";
import Buscador from "./Buscador";

const Header = ({ favorites }) => {
  let token = sessionStorage.getItem("token");
  return (
    <header>
      <nav className="navbar bg-own justify-content-center justify-content-md-between">
        <div className="">
          <ul className="navbar-nav d-flex flex-row w-100 gap">
            <li className="nav-item">
              <Link className="nav-link text-light fw-bold" to="/listado">
                AlkeFlix 🎞
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/listado">
                Listado
              </Link>
            </li>
            <li className="nav-item ps-rel">
              <Link className="nav-link text-light favorite" to="/favoritos">
                Favoritos
                {token && (
                  <span className="iconFav">
                    <span className="num">{favorites.length}</span>
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
        <Buscador />
      </nav>
    </header>
  );
};

export default Header;
