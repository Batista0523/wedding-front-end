import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import WelcomeSection from "../components/WelcomeSection";
import MarriageFaithSection from "../components/MarriageFaithSection";
import EventInfoCard from "../components/EventInfoCard";
import TravelNote from "../components/TravelNote";
import SearchGuest from "../components/SearchGuest";
import RSVPForm from "../components/RSVPForm";
import ConfirmationSuccess from "../components/ConfirmationSuccess";
import type { Guest } from "../types/guest";
import { Link } from "react-router-dom";

const Home = () => {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [apiReady, setApiReady] = useState<boolean | null>(null);

  const [finalStatus, setFinalStatus] = useState<
    "confirmed" | "declined" | null
  >(null);
useEffect(() => {
  const checkAPI = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      await fetch(import.meta.env.VITE_BASE_URL, {
        signal: controller.signal,
      });

      clearTimeout(timeout);
      setApiReady(true);
    } catch {
      setApiReady(false);
    }
  };

  checkAPI(); 
  const interval = window.setInterval(checkAPI, 4000);

  return () => clearInterval(interval);
}, []);


  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setConfirmed(false);
    setFinalStatus(null);
  };

  const handleSuccess = (status: "confirmed" | "declined") => {
    setFinalStatus(status);
    setConfirmed(true);
    setSelectedGuest(null);
  };

  return (
    <Layout>
      <WelcomeSection />

      <MarriageFaithSection />

      <EventInfoCard />

      <TravelNote />

      {!confirmed && (
        <>
          <div className="text-center my-5">
            <span
              style={{
                display: "inline-block",
                width: 60,
                height: 2,
                backgroundColor: "#B89B5E",
                opacity: 0.5,
              }}
            />
          </div>
          <div className="text-center my-4">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.6rem 1.2rem",
                borderRadius: 30,
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor:
                    apiReady === null
                      ? "#ccc"
                      : apiReady
                      ? "#4CAF50"
                      : "#E53935",
                }}
              />

              <span
                style={{
                  fontSize: "0.9rem",
                  color: "#555",
                }}
              >
                {apiReady === null && "Conectando con el sistema…"}
                {apiReady === false &&
                  "Sistema despertando, por favor espera unos segundos"}
                {apiReady === true &&
                  "Sistema listo, por favor ingresa tu nombre"}
              </span>
            </div>
          </div>

          <SearchGuest onSelect={handleSelectGuest} />
          {selectedGuest && (
            <RSVPForm guest={selectedGuest} onSuccess={handleSuccess} />
          )}
        </>
      )}

      {confirmed && finalStatus && <ConfirmationSuccess status={finalStatus} />}

      <p className="text-center text-muted mt-4">
        Agradeceríamos nos confirmes tu asistencia antes del{" "}
        <strong>26 de enero de 2026</strong>.
      </p>
      <div className="text-center mt-5">
        <p className="text-muted mb-3">Resumen de respuestas</p>
        <Link
          to="/yes"
          style={{
            textDecoration: "none",
            color: "#B89B5E",
            fontWeight: 500,
            marginRight: "1.5rem",
          }}
        >
          Presentes
        </Link>

        <Link
          to="/no"
          style={{
            textDecoration: "none",
            color: "#B89B5E",
            fontWeight: 500,
          }}
        >
          Ausentes
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
