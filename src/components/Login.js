import axios from "axios";
import swal from "@sweetalert/with-react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "") {
      swal({ title: "Los campos no pueden estar vacios", icon: "warning" });
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      swal({ title: "Formato de email no valido", icon: "error" });
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swal({
        title: "Credenciales invalidas",
        icon: "error",
      });
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org/", { email, password })
      .then((res) => {
        swal({ title: "Login completado", icon: "success" });
        const token = res.data.token;
        sessionStorage.setItem("token", token);
        navigate("/listado");
      });
  };
  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to="/listado" />}
      <div className="container">
        <div className="d-flex flex-column align-items-center justify-content-center mt-40 text-light">
          <h2>Formulario de Login</h2>
          <form onSubmit={submitHandler} className="d-flex flex-column mt-40">
            <div>
              <label className="form-label">
                <span>Correo electrónico:</span>
              </label>
              <br />
              <input type="text" name="email" className="form-control" />
            </div>
            <div className="mt-20">
              <label className="form-label">
                <span>Contraseña:</span>
              </label>
              <br />
              <input type="password" name="password" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary mt-20">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
