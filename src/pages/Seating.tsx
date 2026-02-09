import Layout from "../components/Layout";
import SeatingBoard from "../components/SeatingBoard";
import { Link } from "react-router-dom";

const Seating = () => {
  return (
    <Layout>
      <div className="text-center mb-5">
        <h2 className="fw-bold">Distribución de Mesas</h2>
        <p className="text-muted">
          Nos alegra compartir este momento con ustedes
        </p>
      </div>

      <SeatingBoard />

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
    </Layout>
  );
};

export default Seating;
