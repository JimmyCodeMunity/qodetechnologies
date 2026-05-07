import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmDialog = ({ open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel, variant = "danger" }) => {
  const isDanger = variant === "danger";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isDanger ? "bg-red-500/10 border border-red-500/20" : "bg-orange-500/10 border border-orange-500/20"
              }`}>
                <AlertTriangle size={20} className={isDanger ? "text-red-400" : "text-orange-400"} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{message}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={onConfirm}
                className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  isDanger
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {confirmLabel || "Confirm"}
              </button>
              <button
                onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-white font-medium text-sm hover:bg-neutral-700 transition-all"
              >
                {cancelLabel || "Cancel"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
