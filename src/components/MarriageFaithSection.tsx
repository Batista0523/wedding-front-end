import { motion } from "framer-motion";
import { fadeUp } from "./motion";

const MarriageFaithSection = () => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-white shadow-sm p-5 mt-5"
      style={{ borderRadius: 20 }}
    >
      <h4 className="fw-bold text-center mb-4">¿Por qué nos casamos?</h4>

      <p className="text-muted" style={{ lineHeight: 1.8 }}>
        Hemos decidido unir nuestras vidas en matrimonio porque creemos
        profundamente en el amor que nace de Dios y se fortalece en Él.
        <br />
        <br />
        Para nosotros, el matrimonio no es solo una promesa entre dos personas,
        sino un <strong>sacramento</strong>, un compromiso asumido ante Dios,
        quien es el centro y fundamento de nuestra unión.
        <br />
        <br />
        Deseamos caminar juntos buscando vivir conforme a Su voluntad,
        reconociendo la importancia de permanecer en gracia y de poder
        acercarnos al <strong>Cuerpo de Cristo</strong> a través de la comunión,
        como signo de una vida entregada y ordenada delante del
        <strong> Rey de Reyes</strong>.
        <br />
        <br />
        Por eso celebramos este matrimonio con fe, gratitud y esperanza,
        confiando en que Dios guiará cada paso de nuestro camino.
      </p>

      <p
        className="text-center mt-4"
        style={{ fontStyle: "italic", color: "#B89B5E" }}
      >
        “Lo que Dios ha unido, que no lo separe el hombre.”
        <br />— Mateo 19,6
      </p>
    </motion.section>
  );
};

export default MarriageFaithSection;
