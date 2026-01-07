import { useState } from "react";
import { confirmRSVP } from "../api/guests.api";
import type { Guest } from "../types/guest";
import { motion } from "framer-motion";
import { fadeUp } from "./motion";

interface Props {
  guest: Guest;
  onSuccess: (status: "confirmed" | "declined") => void;
}

const RSVPForm = ({ guest, onSuccess }: Props) => {
  const [status, setStatus] = useState<"confirmed" | "declined">("confirmed");
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [attendance, setAttendance] = useState<
    "ceremony" | "celebration" | "both"
  >("ceremony");

  const handleSubmit = async () => {
    await confirmRSVP(guest.id, {
      status,
      has_plus_one: hasPlusOne,
      plus_one_name: hasPlusOne ? plusOneName : null,
      attendance,
    });

    onSuccess(status);
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="card border-0 shadow-sm p-4 mt-4"
      style={{ borderRadius: 20 }}
    >
      <h4 className="text-center mb-4">
        Hola{" "}
        <span style={{ color: "#B89B5E", fontWeight: 600 }}>
          {guest.full_name}
        </span>
      </h4>

      <div className="mb-4">
        <label className="form-label fw-semibold">
          ¿Asistirás a esta boda?
        </label>
        <select
          className="form-select form-select-lg"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "confirmed" | "declined")
          }
        >
          <option value="confirmed">Sí, con gusto</option>
          <option value="declined">No podré asistir</option>
        </select>
      </div>

      {status === "confirmed" && (
        <>
          <div className="mb-4">
            <label className="form-label fw-semibold">
              ¿Llevarás acompañante?
            </label>
            <select
              className="form-select form-select-lg"
              value={hasPlusOne ? "yes" : "no"}
              onChange={(e) => setHasPlusOne(e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Sí</option>
            </select>
            <small className="text-muted d-block mt-2">
              La invitación es válida para un solo acompañante.
            </small>
          </div>

          {hasPlusOne && (
            <div className="mb-4">
              <input
                className="form-control form-control-lg"
                placeholder="Nombre del acompañante"
                value={plusOneName}
                onChange={(e) => setPlusOneName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="form-label fw-semibold">¿A qué asistirás?</label>
            <select
              className="form-select form-select-lg"
              value={attendance}
              onChange={(e) =>
                setAttendance(
                  e.target.value as "ceremony" | "celebration" | "both"
                )
              }
            >
              <option value="ceremony">Solo ceremonia</option>
              <option value="celebration">Solo Compartir especial</option>
              <option value="both">Ceremonia y Compartir especial</option>
            </select>
          </div>
        </>
      )}

      <button
        className="btn btn-lg w-100 mt-3"
        style={{
          backgroundColor: "#B89B5E",
          color: "white",
          borderRadius: 30,
          fontWeight: 500,
        }}
        onClick={handleSubmit}
      >
        Confirmar asistencia
      </button>
    </motion.div>
  );
};

export default RSVPForm;
