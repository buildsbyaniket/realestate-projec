import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../utils/api";

/**
 * EnquiryModal – a simple modal to send a message to an agent.
 * Props:
 *   isOpen   – boolean to show/hide the modal
 *   onClose  – function to close the modal
 *   agentId  – the target agent's ObjectId
 */
const EnquiryModal = ({ isOpen, onClose, agentId }) => {
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatus({ type: "error", text: "Message cannot be empty" });
      return;
    }
    try {
      const res = await apiFetch('/api/enquiries', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ agentId, message }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: "success", text: "Enquiry sent!" });
        setMessage("");
        // close after a short delay
        setTimeout(() => onClose(), 1500);
      } else {
        setStatus({ type: "error", text: data.message || "Failed to send" });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: "Network error" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-[#26343c]">Contact Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full rounded border border-[#dce5e7] p-2 focus:outline-none focus:border-[#6bc3c1]"
            rows={4}
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {status && (
            <p className={`mt-1 text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}> {status.text} </p>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded px-4 py-2 text-sm font-medium text-[#30464d] hover:bg-[#30464d]/10"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-[#30464d] px-4 py-2 text-sm font-medium text-white hover:bg-[#263b42]"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
