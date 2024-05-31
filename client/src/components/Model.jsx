import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const Model = ({ children }) => {
  return (
    <motion.div
      // className="overflow-y-scroll"
      initial={{ opacity: 0, y: -20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation when component is visible
      exit={{ opacity: 0, y: 20 }} // Animation when component is removed from DOM
      transition={{ duration: 0.5 }} // Animation duration
    >
      {children}
    </motion.div>
  );
};

export default Model;
