import { useState } from "react";
import { Link } from "react-router-dom";
interface Props {
  children: React.ReactNode;
}

const ACCESS_CODE = import.meta.env.VITE_PRIVATE_ACCESS_CODE;

const ProtectedRoute = ({ children }: Props) => {
  const [authorized, setAuthorized] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (code === ACCESS_CODE) {
      setAuthorized(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authorized) return <>{children}</>;

  return (
    <div className="text-center mt-5">
      <h4 className="fw-semibold mb-3">Acceso restringido</h4>

      <p className="text-muted mb-4">
        Esta sección es privada. Por favor ingresa el código de acceso.
      </p>

      <div className="mx-auto" style={{ maxWidth: 320 }}>
        <input
          type="password"
          className="form-control form-control-lg text-center"
          placeholder="Código de acceso"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <div className="text-danger mt-2">Código incorrecto</div>}

        <button
          className="btn btn-lg w-100 mt-3"
          style={{
            backgroundColor: "#B89B5E",
            color: "white",
            borderRadius: 30,
          }}
          onClick={handleSubmit}
        >
          Acceder
        </button>
      </div>
          <div className="text-center mt-5">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#B89B5E",
            fontWeight: 500,
          }}
        >
          ← Volver a la invitación
        </Link>
      </div>
    </div>
  );
};

export default ProtectedRoute;
