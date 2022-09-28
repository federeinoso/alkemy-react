import { Link } from "react-router-dom";

const Cards = ({ array, addOrRemoveFromFavs }) => {
  return (
    <div className="row justify-content-center justify-content-sm-start">
      {array.map((movie, i) => {
        return (
          <div className=" mt-20 col-5 col-md-4 col-lg-3" key={i}>
            <div className="card bg-light card-wrap">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.original_title}
              />
              <button
                className="favourite-btn"
                onClick={addOrRemoveFromFavs}
                data-movie-id={movie.id}
              ></button>
              <div className="card-body">
                <h5 className="card-title wrap">{movie.title}</h5>
                <p className="card-text">
                  {movie.overview.substring(0, 66)}...
                </p>
                <Link
                  to={`/detalle?movieID=${movie.id}`}
                  className="btn btn-primary"
                >
                  View detail
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
