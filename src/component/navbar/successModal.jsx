import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
function SuccessModal({ title, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <FiCheck size={28} className="text-green-600" />
        </div>

        <h2 className="text-xl font-bold text-[#111] mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-5">{message}</p>

        <button
          onClick={onClose}
          className="w-full h-10 text-[14px] font-semibold text-white bg-[#C8102E] rounded-md hover:bg-[#a80d25] transition-colors"
        >
          Continue
        </button>
      </div>
    </div>,
    document.body
  );
}

export default SuccessModal