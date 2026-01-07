import { motion } from "framer-motion";
import { fadeUp } from "./motion";

const WelcomeSection = () => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="text-center mb-5"
    >
      <p
        style={{
          letterSpacing: "0.2em",
          color: "#B89B5E",
          fontWeight: 500,
        }}
      >
        NOS CASAMOS
      </p>

      <h1 className="display-5 fw-bold mt-2">
        Arisleida Alonzo
        <br />
        <span style={{ fontWeight: 300 }}>&</span>
        <br />
        Elisaul Batista
      </h1>

      <div
        style={{
          height: 1,
          width: 80,
          backgroundColor: "#B89B5E",
          margin: "2rem auto",
        }}
      />

      <p className="mt-4 fs-5 text-muted">
        Con mucha alegría queremos invitarte a compartir con nosotros
        este día tan especial.
      </p>
    </motion.section>
  );
};

export default WelcomeSection;
