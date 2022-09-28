import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Detalle from "./components/Detalle";
import Listado from "./components/Listado";
import Login from "./components/Login";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favInLocal = localStorage.getItem("favs");
    if (favInLocal != null) {
      const favsArray = JSON.parse(favInLocal);
      setFavorites(favsArray);
    }
  }, []);
  const favMovies = localStorage.getItem("favs");

  let tempMoviesInFavs;

  if (favMovies === null) {
    tempMoviesInFavs = [];
  } else {
    tempMoviesInFavs = JSON.parse(favMovies);
  }

  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const poster_path = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;

    const movieData = {
      poster_path,
      title,
      overview,
      id: btn.dataset["movieId"],
    };
    let movieIsInArray = tempMoviesInFavs.find(
      (movie) => movie.id === movieData.id
    );
    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      btn.classList.add("bg-green");
      setFavorites(tempMoviesInFavs);
    } else {
      let moviesLeft = tempMoviesInFavs.filter((movie) => {
        return movie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      btn.classList.remove("bg-green");
      setFavorites(moviesLeft);
    }
  };
  return (
    <div className="container mb-20">
      <Header favorites={favorites} />
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route
          path="/listado"
          element={
            <Listado
              addOrRemoveFromFavs={addOrRemoveFromFavs}
              favorites={favorites}
            />
          }
        ></Route>
        <Route path="/detalle" element={<Detalle />}></Route>
        <Route
          path="/favoritos"
          element={
            <Favoritos
              addOrRemoveFromFavs={addOrRemoveFromFavs}
              favorites={favorites}
            />
          }
        ></Route>
        <Route
          path="/resultados"
          element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
