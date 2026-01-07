const EventInfoCard = () => {
  return (
    <div className="bg-white shadow-sm p-4 mt-5" style={{ borderRadius: 20 }}>
      <h4 className="fw-bold text-center mb-4">Información del evento</h4>

      <div className="text-center mb-4">
        <h6 className="fw-semibold">Ceremonia</h6>
        <p className="text-muted mb-1">Parroquia San Antonio de Padua</p>
        <p className="text-muted mb-1">
          Guayabal, Santiago, República Dominicana
        </p>
        <p className="text-muted">21 de febrero de 2026 · 4:00 PM</p>
      </div>

      <div
        style={{
          height: 1,
          width: 60,
          backgroundColor: "#B89B5E",
          margin: "2rem auto",
        }}
      />

      <div className="text-center">
        <h6 className="fw-semibold">Compartir especial</h6>
        <p className="text-muted mb-1">Salón de Eventos José Noel</p>
        <p className="text-muted">Guayabal, Santiago</p>
        <p className="text-muted mb-1">21 de febrero de 2026 · 6:30 PM</p>
      </div>
    </div>
  );
};

export default EventInfoCard;
