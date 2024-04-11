import { motion } from "framer-motion";
import Checkout from "./Checkout";
const Model = () => {
  return (
    <motion.div
      // className="overflow-y-scroll"
      initial={{ opacity: 0, y: -20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation when component is visible
      exit={{ opacity: 0, y: 20 }} // Animation when component is removed from DOM
      transition={{ duration: 0.5 }} // Animation duration
    >
      <Checkout />
    </motion.div>
  );
};

export default Model;
