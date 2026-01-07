import { useState } from "react";
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
  const [finalStatus, setFinalStatus] = useState<
    "confirmed" | "declined" | null
  >(null);

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
        <><div className="text-center my-5">
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



          <SearchGuest onSelect={handleSelectGuest} />
          {selectedGuest && (
            <RSVPForm guest={selectedGuest} onSuccess={handleSuccess} />
          )}
        </>
      )}

   
      {confirmed && finalStatus && <ConfirmationSuccess status={finalStatus} />}

     
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
          Asistencias confirmadas
        </Link>

        <Link
          to="/no"
          style={{
            textDecoration: "none",
            color: "#B89B5E",
            fontWeight: 500,
          }}
        >
          Respuestas no confirmadas
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
