interface Props {
  status: "confirmed" | "declined";
}

const ConfirmationSuccess = ({ status }: Props) => {
  if (status === "confirmed") {
    return (
      <div className="text-center mt-5">
        <h3 className="fw-bold">¡Gracias por confirmar!</h3>
        <p className="fs-5 text-muted mt-3">
          Nos llena de alegría contar contigo en este día tan especial 💍
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mt-5">
      <h3 className="fw-bold">Gracias por tu respuesta</h3>
      <p className="fs-5 text-muted mt-3">
        Lamentamos no poder contar con tu presencia, pero entendemos y
        respetamos completamente tu decisión.
        <br />
        Te llevamos en nuestros corazones en este día tan importante.
      </p>
    </div>
  );
};

export default ConfirmationSuccess;
