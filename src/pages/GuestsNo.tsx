import { useEffect, useState } from "react";
import type { Guest } from "../types/guest";
import Layout from "../components/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../components/motion";

const API = import.meta.env.VITE_BASE_URL as string;

const GuestsNo = () => {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    axios.get(`${API}/guests`).then((res) => {
      const declined = res.data.payload.filter(
        (g: Guest) => g.status === "declined"
      );
      setGuests(declined);
    });
  }, []);

  return (
    <Layout>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-center mb-5"
      >
        <h2 className="fw-bold">Respuestas no confirmadas</h2>
        <p className="text-muted mt-2">
          Agradecemos a quienes nos hicieron saber que no podrán acompañarnos
        </p>

        <div
          style={{
            height: 1,
            width: 80,
            backgroundColor: "#B89B5E",
            margin: "2rem auto",
          }}
        />
      </motion.div>

      <div className="row g-4">
        {guests.map((g) => (
          <motion.div
            key={g.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="col-md-6"
          >
            <div
              className="bg-white shadow-sm p-4 text-center"
              style={{ borderRadius: 18 }}
            >
              <h5 className="fw-semibold mb-0">{g.full_name}</h5>
            </div>
          </motion.div>
        ))}
      </div>

      {guests.length === 0 && (
        <p className="text-center text-muted mt-4">
          Aún no hay respuestas registradas en esta sección.
        </p>
      )}

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

export default GuestsNo;
