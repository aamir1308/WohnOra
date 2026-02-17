import React from 'react';
import { useState } from 'react';

// Simple component for displaying settings features
const SettingFeature = ({ feature }) => (
  <div className="flex items-center space-x-3">
    <input type="checkbox" id={feature} checked />
    <label htmlFor={feature}>{feature}</label>
  </div>
);

const SettingsPage = () => {
  const [features, setFeatures] = useState({
    has_map: true,
    has_auth: false,
    has_cart: false,
    has_admin: true,
    has_pricing: false,
  });

  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-4">WohnOra-Germany Settings</h2>
      <p className="mb-6 text-gray-700">Define the features for your application:</p>

      {/* List of settings features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['has_map', 'has_auth', 'has_cart', 'has_admin', 'has_pricing'].map(feature => (
          <SettingFeature key={feature} feature={feature} />
        ))}
      </div>

      {/* Button to save settings */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setFeatures({ ...features })}
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;