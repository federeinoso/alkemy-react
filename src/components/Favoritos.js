import { Navigate } from "react-router-dom";
import Cards from "./Cards";

const Favoritos = ({ addOrRemoveFromFavs, favorites }) => {
  let token = sessionStorage.getItem("token");

  return (
    <>
      {!token && <Navigate to="/" />}
      <h2 className="text-light mt-20">
        {favorites.length > 0
          ? "Tus peliculas favoritas"
          : "No tienes peliculas favoritas"}
      </h2>
      <Cards array={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />
    </>
  );
};

export default Favoritos;
