import React, { useMemo, useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiMoreVertical,
  FiPhone,
  FiMail,
  FiMapPin,
  FiHome,
  FiUsers,
  FiTrendingUp,
  FiChevronDown,
  FiEye,
  FiEdit2,
} from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

const Agents = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [openMenu, setOpenMenu] = useState(null);

  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);


  // fetch agents from backend
  useEffect(() => {
    console.log('Fetching agents with token:', token);
    fetch('/api/agents', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          // unauthorized – redirect to login
          navigate('/login');
          return [];
        }
        if (!res.ok) {
          console.error('Failed to load agents, status:', res.status);
          return [];
        }
        return res.json();
      })
        .then(data => {
          console.log('Agents response data:', data);
          setAgents(Array.isArray(data.agents) ? data.agents : []);
        })
      .catch(err => {
        console.error('Failed to load agents', err);
        setAgents([]);
      });
    }, [token, navigate]);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        agent.name.toLowerCase().includes(searchValue) ||
        agent.email.toLowerCase().includes(searchValue) ||
        agent.role.toLowerCase().includes(searchValue) ||
        agent.location.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        agent.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        agent.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [search, statusFilter, departmentFilter, agents]);

    const activeAgents = agents.filter(agent => agent.status === "active").length;

    const totalProperties = agents.reduce((total, agent) => total + (agent.managedProperties || 0), 0);

    const totalSold = agents.reduce((total, agent) => total + (agent.propertiesSold || 0), 0);

  return (
    <div className="min-h-full bg-[#f7f9fa] text-[#26343c]">

      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <div className="flex items-center gap-2 text-xs text-[#8a969c]">
            <NavLink
              to="/dashboard"
              className="hover:text-[#159a98] transition-colors"
            >
              Dashboard
            </NavLink>

            <span>/</span>

            <span className="text-[#59676e]">
              Agents
            </span>
          </div>

          <h1 className="mt-2 text-[28px] font-bold tracking-tight text-[#26343c]">
            Agents
          </h1>

          <p className="mt-1 text-sm text-[#7b878d]">
            Manage your property agents and track their performance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/agents/add')}
          className="
            inline-flex h-11 items-center justify-center gap-2
            rounded-lg bg-[#148f8c] px-5
            text-sm font-semibold text-white
            shadow-sm
            transition-all duration-200
            hover:bg-[#117c79]
            hover:-translate-y-[1px]
            hover:shadow-md
            active:translate-y-0
          "
        >
          <FiPlus size={18} />
          Add New Agent
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Agents"
          value={agents.length}
          icon={FiUsers}
          description="Registered agents"
        />

        <SummaryCard
          title="Active Agents"
          value={activeAgents}
          icon={FiTrendingUp}
          description="Currently active"
          positive
        />

        <SummaryCard
          title="Managed Properties"
          value={totalProperties}
          icon={FiHome}
          description="Across all agents"
        />

        <SummaryCard
          title="Properties Sold"
          value={totalSold}
          icon={FiTrendingUp}
          description="Total completed sales"
          positive
        />
      </div>

      {/* FILTER BAR */}
      <div className="
        mb-5 rounded-xl border border-[#e1e7e9]
        bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]
      ">

        <div className="flex flex-col gap-3 xl:flex-row">

          {/* SEARCH */}
          <div className="relative min-w-0 flex-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c999f]"
              size={17}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search agents, email, location..."
              className="
                h-11 w-full rounded-lg
                border border-[#dce4e7]
                bg-[#fafcfc]
                pl-10 pr-4
                text-sm text-[#34434b]
                outline-none
                transition-all
                placeholder:text-[#a4afb4]
                focus:border-[#58b9b6]
                focus:bg-white
                focus:ring-2 focus:ring-[#58b9b6]/10
              "
            />
          </div>

          {/* STATUS */}
          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              "All Statuses",
              "active",
              "inactive",
            ]}
          />

          {/* DEPARTMENT */}
          <FilterSelect
            value={departmentFilter}
            onChange={setDepartmentFilter}
            options={[
              "All Departments",
              "Residential",
              "Commercial",
              "Leasing",
            ]}
          />

          <button
            type="button"
            className="
              flex h-11 items-center justify-center gap-2
              rounded-lg border border-[#dce4e7]
              bg-white px-4
              text-sm font-medium text-[#59676e]
              transition-colors
              hover:border-[#58b9b6]
              hover:text-[#148f8c]
            "
          >
            <FiFilter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* RESULTS HEADER */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-[#748188]">
          Showing{" "}
          <span className="font-semibold text-[#34434b]">
            {filteredAgents.length}
          </span>{" "}
          agents
        </p>

        <p className="hidden text-xs text-[#929da2] sm:block">
          Last updated just now
        </p>
      </div>

      {/* AGENT GRID */}
      {filteredAgents.length > 0 ? (
        <div className="
          grid grid-cols-1 gap-5
          md:grid-cols-2
          xl:grid-cols-3
        ">
          {filteredAgents.map((agent, index) => (
            <AgentCard
              key={agent._id}
              agent={agent}
              index={index}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          ))}
        </div>
      ) : (
        <EmptyAgentsState
          search={search}
          onClear={() => {
            setSearch("");
            setStatusFilter("All Statuses");
            setDepartmentFilter("All Departments");
          }}
        />
      )}
    </div>
  );
};


/* =========================================================
   SUMMARY CARD
========================================================= */

const SummaryCard = ({
  title,
  value,
  icon: Icon,
  description,
  positive,
}) => {
  return (
    <div className="
      group rounded-xl border border-[#e1e7e9]
      bg-white p-5
      shadow-[0_2px_8px_rgba(15,23,42,0.05)]
      transition-all duration-300
      hover:-translate-y-1
      hover:shadow-[0_8px_20px_rgba(15,23,42,0.09)]
    ">
      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8a969c]">
            {title}
          </p>

          <p className="mt-2 text-[27px] font-bold tracking-tight text-[#293840]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#8a969c]">
            {description}
          </p>
        </div>

        <div className="
          flex h-11 w-11 items-center justify-center
          rounded-xl bg-[#e7f6f5]
          text-[#42aaa7]
          transition-transform duration-300
          group-hover:scale-110
        ">
          <Icon size={21} />
        </div>
      </div>

      {positive && (
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#3d9d8e]">
          <FiTrendingUp size={13} />
          Growing performance
        </div>
      )}
    </div>
  );
};


/* =========================================================
   FILTER SELECT
========================================================= */

const FilterSelect = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-11 min-w-[175px]
          appearance-none rounded-lg
          border border-[#dce4e7]
          bg-white
          pl-4 pr-10
          text-sm font-medium text-[#59676e]
          outline-none
          transition-all
          hover:border-[#58b9b6]
          focus:border-[#58b9b6]
          focus:ring-2 focus:ring-[#58b9b6]/10
        "
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <FiChevronDown
        className="
          pointer-events-none
          absolute right-3 top-1/2
          -translate-y-1/2
          text-[#8c999f]
        "
        size={16}
      />
    </div>
  );
};


/* =========================================================
   AGENT CARD
========================================================= */

const AgentCard = ({
  agent,
  index,
  openMenu,
  setOpenMenu,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-xl border border-[#dfe7e9]
        bg-white
        shadow-[0_2px_8px_rgba(15,23,42,0.06)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#b8dedd]
        hover:shadow-[0_10px_25px_rgba(15,23,42,0.10)]
      "
      style={{
        animation: `agentFadeIn 0.45s ease-out ${index * 80}ms both`,
      }}
    >

      {/* TOP */}
      <div className="border-b border-[#edf1f2] p-5">

        <div className="flex items-start justify-between">

          {/* PROFILE */}
          <div className="flex min-w-0 items-center gap-4">

            <div className="
              relative h-[62px] w-[62px]
              shrink-0 overflow-hidden
              rounded-full
              bg-[#dff2f1]
            ">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="
                    h-full w-full object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement
                      .querySelector(".agent-fallback")
                      ?.classList.remove("hidden");
                  }}
                />

                <div className="
                  agent-fallback hidden
                  absolute inset-0
                  flex items-center justify-center
                  bg-[#dff2f1]
                  text-lg font-bold
                  text-[#268f8c]
                ">
                  {agent.initials || agent.name?.split(' ')[0]?.[0]}
                </div>

              {/* ONLINE DOT */}
                <span
                  className={`
                    absolute bottom-0.5 right-0.5
                    h-4 w-4 rounded-full
                    border-2 border-white
                    ${
                      agent.status === "active"
                        ? "bg-[#38b79c]"
                        : "bg-[#aeb8bd]"
                    }
                  `}
                />
            </div>

            <div className="min-w-0">
              <h3 className="
                truncate text-[16px]
                font-bold text-[#2e3d45]
              ">
                {agent.name}
              </h3>

              <p className="
                mt-1 truncate
                text-xs text-[#7b878d]
              ">
                {agent.role}
              </p>

              <div className={`mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${agent.status === "active" ? "bg-[#e5f6f4] text-[#218f89]" : "bg-[#f1f3f4] text-[#7c878d]"}`}>
                {agent.status}
              </div>
            </div>
          </div>

          {/* MENU */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenMenu(
                  openMenu === agent.id ? null : agent.id
                )
              }
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg
                text-[#8c999f]
                transition-colors
                hover:bg-[#eef5f5]
                hover:text-[#238f8c]
              "
              aria-label={`Actions for ${agent.name}`}
            >
              <FiMoreVertical size={18} />
            </button>

            {openMenu === agent.id && (
              <div className="
                absolute right-0 top-9 z-20
                w-36 overflow-hidden
                rounded-lg border border-[#e0e7e9]
                bg-white
                py-1
                shadow-[0_8px_25px_rgba(15,23,42,0.15)]
              ">
                <button
                  type="button"
                  className="
                    flex w-full items-center gap-2
                    px-3 py-2 text-left text-xs
                    text-[#59676e]
                    hover:bg-[#f2f8f8]
                    hover:text-[#148f8c]
                  "
                  onClick={() => navigate(`/agents/${agent._id}`)}
                >
                  <FiEye size={14} />
                  View Profile
                </button>

                <button
                  type="button"
                  className="
                    flex w-full items-center gap-2
                    px-3 py-2 text-left text-xs
                    text-[#59676e]
                    hover:bg-[#f2f8f8]
                    hover:text-[#148f8c]
                  "
                  onClick={() => navigate(`/agents/${agent._id}/edit`)}
                >
                  <FiEdit2 size={14} />
                  Edit Agent
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTACT */}
        <div className="mt-5 space-y-2">

          <div className="
            flex items-center gap-2
            text-xs text-[#758188]
          ">
            <FiMail
              size={14}
              className="shrink-0 text-[#54aaa8]"
            />
            <span className="truncate">
              {agent.email}
            </span>
          </div>

          <div className="
            flex items-center gap-2
            text-xs text-[#758188]
          ">
            <FiPhone
              size={14}
              className="shrink-0 text-[#54aaa8]"
            />
            <span>{agent.phone}</span>
          </div>

          <div className="
            flex items-center gap-2
            text-xs text-[#758188]
          ">
            <FiMapPin
              size={14}
              className="shrink-0 text-[#54aaa8]"
            />
            <span>{agent.location}</span>
          </div>
        </div>
      </div>

      {/* PERFORMANCE */}
      <div className="grid grid-cols-3 divide-x divide-[#edf1f2]">

        <Metric
          value={agent.managedProperties}
          label="Properties"
        />

        <Metric
          value={agent.propertiesSold}
          label="Sold"
        />

        <Metric
          value={agent.rating}
          label="Rating"
        />
      </div>

      {/* FOOTER */}
      <div className="
        flex items-center
        justify-between
        border-t border-[#edf1f2]
        px-5 py-3.5
      ">

        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#9aa5aa]">
            Sales Revenue
          </p>

          <p className="mt-0.5 text-sm font-bold text-[#34434b]">
            {agent.revenue}
          </p>
        </div>

        <div className="flex gap-2">

            <button
              type="button"
              className="
                flex h-8 w-8 items-center justify-center
                rounded-md
                border border-[#c7e1df]
                text-[#278f8c]
                transition-all
                hover:bg-[#eaf7f6]
              "
              title="View agent"
              onClick={() => navigate(`/agents/${agent._id}`)}
            >
              <FiEye size={14} />
            </button>

            <button
              type="button"
              className="
                flex h-8 w-8 items-center justify-center
                rounded-md
                bg-[#158f8c]
                text-white
                transition-all
                hover:bg-[#117c79]
              "
              title="Edit agent"
              onClick={() => navigate(`/agents/${agent._id}/edit`)}
            >
              <FiEdit2 size={14} />
            </button>

        </div>
      </div>
    </div>
  );
};


/* =========================================================
   METRIC
========================================================= */

const Metric = ({
  value,
  label,
}) => {
  return (
    <div className="px-3 py-3 text-center">
      <p className="text-[15px] font-bold text-[#34434b]">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] text-[#8b979c]">
        {label}
      </p>
    </div>
  );
};


/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyAgentsState = ({
  search,
  onClear,
}) => {
  return (
    <div className="
      rounded-xl border border-dashed
      border-[#ccd9dc]
      bg-white
      px-6 py-16
      text-center
    ">
      <div className="
        mx-auto flex h-14 w-14
        items-center justify-center
        rounded-full bg-[#e8f6f5]
        text-[#42aaa7]
      ">
        <FiUsers size={24} />
      </div>

      <h3 className="mt-4 text-lg font-bold text-[#34434b]">
        No agents found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-[#879399]">
        {search
          ? `No agents match "${search}". Try a different search term or clear your filters.`
          : "There are no agents matching the selected filters."}
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-5 rounded-lg
          bg-[#e7f6f5]
          px-4 py-2
          text-sm font-semibold
          text-[#238f8c]
          transition-colors
          hover:bg-[#d8efed]
        "
      >
        Clear Filters
      </button>
    </div>
  );
};


export default Agents;