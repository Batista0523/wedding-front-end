const TravelNote = () => {
  return (
    <div className="bg-white shadow-sm p-4 mt-5" style={{ borderRadius: 20 }}>
      <h5 className="fw-semibold mb-3 text-center">Un mensaje especial</h5>

      <p className="text-muted" style={{ lineHeight: 1.7 }}>
        A nuestros familiares y amigos residentes en los Estados Unidos:
        <br />
        <br />
        Nos honraría profundamente contar con su presencia en este día tan
        especial. Sin embargo, entendemos que este evento se llevará a cabo en
        la <strong>República Dominicana</strong>, y que por distintas razones
        algunos no podrán acompañarnos.
        <br />
        <br />
        Queremos expresarles que comprendemos y respetamos cada decisión. Su
        cariño y buenos deseos significan mucho para nosotros, estén donde
        estén.
      </p>
    </div>
  );
};

export default TravelNote;
