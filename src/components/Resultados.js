import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Cards from "./Cards";

const Resultados = ({ addOrRemoveFromFavs }) => {
  const query = new URLSearchParams(window.location.search);
  const keyword = query.get("keyword");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const endPoint = `
https://api.themoviedb.org/3/search/movie?api_key=289207db887c63424d0625ca6f9b63dd&language=en-US&query=${keyword}`;
    axios
      .get(endPoint)
      .then((res) => {
        setResults(res.data.results);
        if (res.data.results.length === 0) {
          swal({ title: "No hay peliculas con ese nombre", icon: "error" });
        }
      })
      .catch((err) => swal({ title: "Hubo un error", icon: "error" }));
  }, [keyword]);

  return (
    <div className="mt-20">
      <h1 className="text-light">Peliculas sobre {keyword}</h1>

      <Cards array={results} addOrRemoveFromFavs={addOrRemoveFromFavs} />
    </div>
  );
};

export default Resultados;
