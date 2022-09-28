import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";

const Detalle = () => {
  let token = sessionStorage.getItem("token");

  const query = new URLSearchParams(window.location.search);
  const movieID = query.get("movieID");

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=289207db887c63424d0625ca6f9b63dd&language=en-US`
      )
      .then((res) => setDetail(res.data))
      .catch((err) =>
        swal({ title: "Hubo un error, intenta más tarde", icon: "error" })
      );
  }, [movieID]);

  return (
    <div>
      {!token && <Navigate to="/" />}
      {detail && (
        <>
          <div className="row text-light mt-20 position-relative">
            <div className="col-4" key={detail.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt=""
                className="w-100"
              />
            </div>
            <div className="col-7">
              <h1 className="fw-bold mt-20">{detail.title}</h1>
              <h3>{detail.tagline}</h3>
              <hr />
              <p className="mt-20">{detail.overview}</p>
              <h5 className="mt-40">
                {detail.genres &&
                  detail.genres.map((movie) => movie.name).join(", ")}
              </h5>
              <h5 className="mt-20">
                {detail.release_date && detail.release_date.substring(0, 4)}
              </h5>
              <h4 className="mt-40 position-absolute bottom-0 m-p-bottom">
                ⭐ {detail.vote_average && detail.vote_average.toFixed(1)}{" "}
                <span className="fs-6">
                  Rating by {detail.vote_count} cinephiles
                </span>
              </h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detalle;
