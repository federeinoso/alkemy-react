import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Buscador = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    if (keyword.length < 3) {
      swal({ title: "Tienes que escribir algo", icon: "warning" });
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/resultados?keyword=${keyword}`);
    }
  };
  return (
    <form className="form-label mt-2" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        placeholder="Buscar una pelicula..."
        name="keyword"
      ></input>
    </form>
  );
};

export default Buscador;
