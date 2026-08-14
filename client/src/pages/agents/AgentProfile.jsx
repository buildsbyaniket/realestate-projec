import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiEye, FiEdit2 } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import EnquiryModal from "../../components/EnquiryModal";

const AgentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [agent, setAgent] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`/api/agents/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.agent) setAgent(data.agent);
      })
      .catch((err) => console.error(err));
  }, [id, token, navigate]);

  if (!agent) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#f7f9fa] p-8">
        <p className="text-sm text-[#7b878d]">Loading agent profile…</p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#f7f9fa] text-[#26343c] p-6 lg:p-8">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-md bg-[#e8f7f6] p-2 text-[#268f8c]"
        >
          ← Back
        </button>
          <button
            type="button"
            className="ml-4 rounded-md bg-[#6bc3c1] px-4 py-2 text-sm font-medium text-white hover:bg-[#5aaab0]"
            onClick={() => setIsEnquiryOpen(true)}
          >
            Contact Agent
          </button>
        <h1 className="text-2xl font-bold">{agent.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className="rounded-xl border border-[#dfe7e9] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative h-20 w-20 rounded-full bg-[#dff2f1] overflow-hidden">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#2e3d45]">{agent.name}</h2>
              <p className="text-sm text-[#7b878d]">{agent.jobTitle}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[#7b878d]">
            <p><FiMail className="inline mr-2" />{agent.email}</p>
            <p><FiPhone className="inline mr-2" />{agent.phone}</p>
            <p><FiMapPin className="inline mr-2" />{agent.location}</p>
            <p>
              Status: 
              <span className={`px-2 py-1 rounded ${agent.status === "active" ? "bg-[#e5f6f4] text-[#218f89]" : "bg-[#f1f3f4] text-[#7c878d]"}`}>{agent.status}</span>
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="rounded-xl border border-[#dfe7e9] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
          <h3 className="text-lg font-semibold mb-4">Performance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#34434b]">{agent.managedProperties}</p>
              <p className="text-sm text-[#8a969c]">Properties</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#34434b]">{agent.propertiesSold}</p>
              <p className="text-sm text-[#8a969c]">Sold</p>
            </div>
            <div className="text-center col-span-2">
              <p className="text-2xl font-bold text-[#34434b]">{agent.rating}</p>
              <p className="text-sm text-[#8a969c]">Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="button"
          className="flex items-center gap-2 bg-[#148f8c] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#117c79]"
          onClick={() => navigate(`/agents/${agent._id}/edit`)}
        >
          <FiEdit2 /> Edit Agent
        </button>
        <button
          type="button"
          className="flex items-center gap-2 bg-[#e8f7f6] text-[#268f8c] font-semibold px-5 py-2 rounded-lg hover:bg-[#d1f0ef]"
          onClick={() => navigate(-1)}
        >
          <FiEye /> Back to List
        </button>
      </div>
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} agentId={id} />
    </div>
  );
};


export default AgentProfile;
