import { motion } from "framer-motion";

export default function Loader({ loading }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl z-50"
      style={{ pointerEvents: loading ? "auto" : "none" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Empty content - loading spinner could be added here if needed */}
    </motion.div>
  );
}