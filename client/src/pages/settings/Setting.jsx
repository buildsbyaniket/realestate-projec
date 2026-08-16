// src/pages/settings/Settings.jsx

import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../utils/api";

import {
  FiUser,
  FiBell,
  FiLock,
  FiMonitor,
  FiGlobe,
  FiSave,
  FiShield,
  FiMail,
  FiMoon,
  FiSun,
  FiCheck,
} from "react-icons/fi";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [settings, setSettings] = useState({
    fullName: "Alex Carter",
    email: "alex.carter@example.com",
    phone: "+1 555 123 4567",
    company: "PropManage Realty",
    role: "Administrator",
    avatar: "",

    emailNotifications: true,
    propertyNotifications: true,
    clientNotifications: true,
    reportNotifications: false,

    twoFactor: false,
    loginAlerts: true,

    language: "English",
    timezone: "UTC-05:00",
    dateFormat: "MM/DD/YYYY",

    theme: "light",
  });

  const fileInputRef = React.useRef(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiFetch('/api/auth/me', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        const user = response.data.user || {};
        setSettings((prev) => ({
          ...prev,
          fullName: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          company: user.company || '',
          role: user.role || '',
          avatar: user.avatar || '',
        }));
      } catch (err) {
        console.error('Error fetching profile:', err.response?.data || err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange("avatar", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: FiUser,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: FiBell,
    },
    {
      id: "security",
      label: "Security",
      icon: FiShield,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: FiMonitor,
    },
    {
      id: "system",
      label: "System",
      icon: FiGlobe,
    },
  ];

  const handleChange = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const { updateProfile } = useContext(AuthContext);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        name: settings.fullName,
        email: settings.email,
        phone: settings.phone,
        company: settings.company,
        avatar: settings.avatar,
        // optionally other fields can be added here
      };
      const updatedUser = await updateProfile(payload);
      // sync local settings with saved data
      setSettings((prev) => ({
        ...prev,
        fullName: updatedUser.name || prev.fullName,
        email: updatedUser.email || prev.email,
        phone: updatedUser.phone || prev.phone,
        company: updatedUser.company || prev.company,
        avatar: updatedUser.avatar || prev.avatar,
      }));
      alert('Profile saved successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to save profile: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const Toggle = ({ enabled, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
        enabled ? "bg-[#5fb5b2]" : "bg-[#cbd5d8]"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );

  const InputField = ({
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
  }) => (
    <div>
      <label className="mb-2 block text-[12px] font-semibold text-[#52616a]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-[#dce4e7] bg-white px-4 text-[13px] text-[#2b373f] outline-none transition-all duration-200 placeholder:text-[#a4afb4] focus:border-[#70bcb9] focus:ring-2 focus:ring-[#70bcb9]/15"
      />
    </div>
  );

  const SelectField = ({ label, value, onChange, children }) => (
    <div>
      <label className="mb-2 block text-[12px] font-semibold text-[#52616a]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-[#dce4e7] bg-white px-4 text-[13px] text-[#2b373f] outline-none transition-all duration-200 focus:border-[#70bcb9] focus:ring-2 focus:ring-[#70bcb9]/15"
      >
        {children}
      </select>
    </div>
  );

  const SettingRow = ({
    icon: Icon,
    title,
    description,
    enabled,
    onChange,
  }) => (
    <div className="flex items-center justify-between border-b border-[#edf1f2] py-5 last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf6f5] text-[#56aaa8]">
          <Icon size={18} />
        </div>

        <div>
          <p className="text-[13px] font-semibold text-[#34414a]">
            {title}
          </p>

          <p className="mt-1 max-w-[520px] text-[11px] leading-5 text-[#7b878d]">
            {description}
          </p>
        </div>
      </div>

      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-[17px] font-bold text-[#2b373f]">
          Profile Information
        </h2>

        <p className="mt-1 text-[12px] text-[#7a858b]">
          Manage your personal and company information.
        </p>
      </div>

      {/* Profile Header */}
      <div className="flex items-center gap-5 rounded-xl border border-[#dce4e7] bg-[#f9fbfb] p-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#30464d] text-xl font-bold text-[#78d0cd]">
          AC
        </div>

        <div className="flex-1">
          <h3 className="text-[15px] font-bold text-[#34414a]">
            {settings.fullName}
          </h3>

          <p className="mt-1 text-[11px] text-[#7b878d]">
            {settings.role}
          </p>

          <button
            type="button"
            onClick={triggerFileSelect}
            className="mt-3 rounded-lg border border-[#cfdadc] bg-white px-4 py-2 text-[11px] font-semibold text-[#52616a] transition hover:border-[#70bcb9] hover:text-[#4e9f9d]"
          >
            Change Avatar
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </div>
        {settings.avatar && (
          <div className="mt-4">
            <img src={settings.avatar} alt="Avatar" className="h-20 w-20 rounded-full object-cover" />
          </div>
        )}
      </div>

        {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputField
          label="Full Name"
          value={settings.fullName}
          onChange={(value) => handleChange("fullName", value)}
        />

        <InputField
          label="Email Address"
          type="email"
          value={settings.email}
          onChange={(value) => handleChange("email", value)}
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-4 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
        >
          <FiSave size={16} />
          {saving ? 'Saving...' : 'Save'}
        </button>
        <InputField
          label="Phone Number"
          value={settings.phone}
          onChange={(value) => handleChange("phone", value)}
        />

        <InputField
          label="Company"
          value={settings.company}
          onChange={(value) => handleChange("company", value)}
        />
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div>
      <h2 className="text-[17px] font-bold text-[#2b373f]">
        Notification Settings
      </h2>

      <p className="mt-1 text-[12px] text-[#7a858b]">
        Choose which notifications you want to receive.
      </p>

      <div className="mt-5 rounded-xl border border-[#dce4e7] bg-white px-5">
        <SettingRow
          icon={FiMail}
          title="Email Notifications"
          description="Receive important account and system notifications by email."
          enabled={settings.emailNotifications}
          onChange={(value) =>
            handleChange("emailNotifications", value)
          }
        />

        <SettingRow
          icon={FiBell}
          title="Property Notifications"
          description="Get notified when properties are added, updated, or sold."
          enabled={settings.propertyNotifications}
          onChange={(value) =>
            handleChange("propertyNotifications", value)
          }
        />

        <SettingRow
          icon={FiUser}
          title="Client Notifications"
          description="Receive notifications about client activities and requests."
          enabled={settings.clientNotifications}
          onChange={(value) =>
            handleChange("clientNotifications", value)
          }
        />

        <SettingRow
          icon={FiBell}
          title="Report Notifications"
          description="Receive notifications when scheduled reports are generated."
          enabled={settings.reportNotifications}
          onChange={(value) =>
            handleChange("reportNotifications", value)
          }
        />
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div>
      <h2 className="text-[17px] font-bold text-[#2b373f]">
        Security
      </h2>

      <p className="mt-1 text-[12px] text-[#7a858b]">
        Protect your account and manage login preferences.
      </p>

      <div className="mt-5 space-y-4">
        <div className="rounded-xl border border-[#dce4e7] bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf6f5] text-[#56aaa8]">
              <FiLock size={19} />
            </div>

            <div className="flex-1">
              <h3 className="text-[13px] font-semibold text-[#34414a]">
                Password
              </h3>

              <p className="mt-1 text-[11px] text-[#7b878d]">
                Last changed 30 days ago.
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg border border-[#d5dfe1] bg-white px-4 py-2 text-[11px] font-semibold text-[#52616a] transition hover:border-[#70bcb9] hover:text-[#4e9f9d]"
            >
              Change Password
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-[#dce4e7] bg-white px-5">
          <SettingRow
            icon={FiShield}
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your administrator account."
            enabled={settings.twoFactor}
            onChange={(value) => handleChange("twoFactor", value)}
          />

          <SettingRow
            icon={FiBell}
            title="Login Alerts"
            description="Receive an alert whenever your account is accessed from a new device."
            enabled={settings.loginAlerts}
            onChange={(value) => handleChange("loginAlerts", value)}
          />
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div>
      <h2 className="text-[17px] font-bold text-[#2b373f]">
        Appearance
      </h2>

      <p className="mt-1 text-[12px] text-[#7a858b]">
        Customize how the management system looks.
      </p>

      <div className="mt-5 rounded-xl border border-[#dce4e7] bg-white p-5">
        <p className="text-[12px] font-semibold text-[#52616a]">
          Theme
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleChange("theme", "light")}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              settings.theme === "light"
                ? "border-[#70bcb9] bg-[#f2faf9]"
                : "border-[#dce4e7] hover:border-[#b8c7ca]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                <FiSun className="text-[#56aaa8]" size={19} />
              </div>

              {settings.theme === "light" && (
                <FiCheck className="text-[#56aaa8]" size={18} />
              )}
            </div>

            <p className="mt-4 text-[13px] font-semibold text-[#34414a]">
              Light
            </p>

            <p className="mt-1 text-[11px] text-[#7b878d]">
              Clean and bright interface.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleChange("theme", "dark")}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              settings.theme === "dark"
                ? "border-[#70bcb9] bg-[#f2faf9]"
                : "border-[#dce4e7] hover:border-[#b8c7ca]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#202d36]">
                <FiMoon className="text-[#78d0cd]" size={19} />
              </div>

              {settings.theme === "dark" && (
                <FiCheck className="text-[#56aaa8]" size={18} />
              )}
            </div>

            <p className="mt-4 text-[13px] font-semibold text-[#34414a]">
              Dark
            </p>

            <p className="mt-1 text-[11px] text-[#7b878d]">
              Darker interface for low-light environments.
            </p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSystem = () => (
    <div>
      <h2 className="text-[17px] font-bold text-[#2b373f]">
        System Preferences
      </h2>

      <p className="mt-1 text-[12px] text-[#7a858b]">
        Configure language, timezone, and regional preferences.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-5 rounded-xl border border-[#dce4e7] bg-white p-5 md:grid-cols-2">
        <SelectField
          label="Language"
          value={settings.language}
          onChange={(value) => handleChange("language", value)}
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Spanish</option>
          <option>French</option>
        </SelectField>

        <SelectField
          label="Timezone"
          value={settings.timezone}
          onChange={(value) => handleChange("timezone", value)}
        >
          <option>UTC-05:00</option>
          <option>UTC+00:00</option>
          <option>UTC+05:30</option>
          <option>UTC+08:00</option>
        </SelectField>

        <SelectField
          label="Date Format"
          value={settings.dateFormat}
          onChange={(value) => handleChange("dateFormat", value)}
        >
          <option>MM/DD/YYYY</option>
          <option>DD/MM/YYYY</option>
          <option>YYYY-MM-DD</option>
        </SelectField>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "notifications":
        return renderNotifications();

      case "security":
        return renderSecurity();

      case "appearance":
        return renderAppearance();

      case "system":
        return renderSystem();

      case "profile":
      default:
        return renderProfile();
    }
  };

  return (
    <div className="min-h-full bg-[#f5f8f8]">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[25px] font-bold tracking-tight text-[#2b373f]">
          Settings
        </h1>

        <p className="mt-1 text-[13px] text-[#6f7a80]">
          Manage your account, preferences, and system settings.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Settings Navigation */}
        <aside className="w-full shrink-0 lg:w-[230px]">
          <div className="rounded-xl border border-[#dce4e7] bg-white p-3 shadow-[0_3px_10px_rgba(15,23,42,0.05)]">
            <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[1.8px] text-[#8b969b]">
              Settings
            </p>

            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative flex w-full items-center rounded-lg px-3 py-3 text-left text-[12px] font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#30464d] text-[#78d0cd] shadow-sm"
                        : "text-[#68757b] hover:translate-x-1 hover:bg-[#f0f5f5] hover:text-[#34414a]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 h-6 w-1 rounded-r-full bg-[#6bc3c1]" />
                    )}

                    <Icon
                      size={17}
                      className={`mr-3 ${
                        isActive
                          ? "text-[#78d0cd]"
                          : "text-[#8a969b] group-hover:text-[#56aaa8]"
                      }`}
                    />

                    {tab.label}

                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#6bc3c1]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Settings Content */}
        <section className="min-w-0 flex-1">
          <div className="rounded-xl border border-[#dce4e7] bg-white p-6 shadow-[0_3px_10px_rgba(15,23,42,0.06)]">
            {renderContent()}

            {/* Save Button */}
            <div className="mt-7 flex justify-end border-t border-[#edf1f2] pt-5">
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-[#30464d] px-5 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#263a40] hover:shadow-md"
              >
                <FiSave size={15} />
                Save Changes
              </button>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes settingsFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;
export { Settings };