import axios from "axios";
import { useEffect, useState } from "react";
import swal from "@sweetalert/with-react";
import Cards from "./Cards";
import { Navigate } from "react-router-dom";

const Listado = ({ addOrRemoveFromFavs }) => {
  let token = sessionStorage.getItem("token");

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=289207db887c63424d0625ca6f9b63dd&language=en-US&sort_by=popularity.desc";

    axios
      .get(endPoint)
      .then((res) => {
        const apiData = res.data.results;
        setMoviesList(apiData);
      })
      .catch((err) =>
        swal({ title: "Hubo un error, intenta más tarde", icon: "error" })
      );
  }, []);
  return (
    <>
      {!token && <Navigate to="/" />}
      <Cards array={moviesList} addOrRemoveFromFavs={addOrRemoveFromFavs} />
    </>
  );
};

export default Listado;
