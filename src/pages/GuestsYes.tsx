import { useEffect, useState } from "react";
import type { Guest } from "../types/guest";
import Layout from "../components/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../components/motion";

const API = import.meta.env.VITE_BASE_URL as string;

const GuestsYes = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filter, setFilter] = useState<
    "all" | "ceremony" | "celebration" | "both"
  >("all");

  useEffect(() => {
    axios.get(`${API}/guests`).then((res) => {
      const confirmed = res.data.payload.filter(
        (g: Guest) => g.status === "confirmed"
      );
      setGuests(confirmed);
    });
  }, []);

  const filteredGuests = guests.filter((g) => {
    if (filter === "all") return true;
    return g.attendance === filter;
  });

  const totalPeople = filteredGuests.reduce(
    (sum, g) => sum + (g.has_plus_one ? 2 : 1),
    0
  );

  return (
    <Layout>
   
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-center mb-5"
      >
        <h2 className="fw-bold">Asistencias confirmadas</h2>
        <p className="text-muted mt-2">
          Gracias a todos los que nos acompañarán en este día especial
        </p>

        <div
          style={{
            height: 1,
            width: 80,
            backgroundColor: "#B89B5E",
            margin: "2rem auto",
          }}
        />

        <div className="d-flex justify-content-center gap-4">
          <div>
            <div className="fs-4 fw-semibold">{filteredGuests.length}</div>
            <small className="text-muted">Invitados</small>
          </div>
          <div>
            <div className="fs-4 fw-semibold">{totalPeople}</div>
            <small className="text-muted">Personas</small>
          </div>
        </div>
      </motion.div>

     
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="d-flex justify-content-center gap-3 mb-4 flex-wrap"
      >
        {[
          { key: "all", label: "Todos" },
          { key: "ceremony", label: "Solo ceremonia" },
          { key: "celebration", label: "Solo compartir especial" },
          { key: "both", label: "Ceremonia y compartir especial" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() =>
              setFilter(item.key as "all" | "ceremony" | "celebration" | "both")
            }
            className="btn btn-sm"
            style={{
              borderRadius: 20,
              padding: "0.4rem 1.1rem",
              border:
                filter === item.key
                  ? "1px solid #B89B5E"
                  : "1px solid rgba(0,0,0,0.1)",
              backgroundColor:
                filter === item.key
                  ? "rgba(184,155,94,0.12)"
                  : "transparent",
              color: "#333",
              fontWeight: 500,
            }}
          >
            {item.label}
          </button>
        ))}
      </motion.div>

    
      <div className="row g-4">
        {filteredGuests.map((g) => (
          <motion.div
            key={g.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="col-md-6"
          >
            <div
              className="bg-white shadow-sm p-4 h-100"
              style={{ borderRadius: 18 }}
            >
              <h5 className="fw-semibold mb-2">{g.full_name}</h5>

              {g.has_plus_one && (
                <p className="mb-1 text-muted">
                  Acompañante:{" "}
                  <span className="fw-medium">{g.plus_one_name}</span>
                </p>
              )}

              <p className="mb-2 text-muted">
                Asistencia:{" "}
                <span className="fw-medium">
                  {g.attendance === "both"
                    ? "Ceremonia y compartir especial"
                    : g.attendance === "ceremony"
                    ? "Solo ceremonia"
                    : "Solo compartir especial"}
                </span>
              </p>

              <div
                style={{
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  color: "#B89B5E",
                  fontWeight: 500,
                }}
              >
                Total personas: {g.has_plus_one ? 2 : 1}
              </div>
            </div>
          </motion.div>
        ))}
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
    </Layout>
  );
};

export default GuestsYes;
