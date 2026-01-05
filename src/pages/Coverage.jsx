import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import districts from "../assets/data/warehouses.json";

/* Fix Leaflet marker icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* FlyTo helper */
const FlyToDistrict = ({ district }) => {
  const map = useMap();

  useEffect(() => {
    if (!district) return;
    map.flyTo([district.latitude, district.longitude], 14, {
      duration: 1.4,
    });
  }, [district, map]);

  return null;
};



const Coverage = () => {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapZoom, setMapZoom] = useState(7);
  const [mapCenter, setMapCenter] = useState([23.685, 90.3563]);

  const searchRef = useRef(null);

  /* Filter suggestions dynamically by typing */
  const suggestions =
    search.length > 0
      ? districts.filter((d) =>
          d.district.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  /* Close suggestions on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Helper to highlight matching letters */
  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="font-bold text-lime-700">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-8 my-5">
      <h2 className="text-3xl font-bold text-gray-800">
        We are available in 64 districts
      </h2>

      {/* 🔍 Modern Google Maps-style Search Input */}
      <div ref={searchRef} className="relative mt-6 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search district"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedDistrict(null);
              setShowSuggestions(true);
            }}
            onFocus={() => search && setShowSuggestions(true)}
            className="w-full rounded-full pl-4 pr-10 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
          />
          {/* ❌ Close Button */}
          {search && (
            <button
              onClick={() => {
                setSearch(""); // Clear input
                setSelectedDistrict(null); // Reset selected district → shows full Bangladesh
                setShowSuggestions(false); // Hide suggestions
                setMapZoom(7);
                setMapCenter([23.685, 90.3563]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          )}
        </div>

        {/* 🔽 Suggestions with highlighted match */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-9999 mt-2 w-full bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((d, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearch(d.district);
                  setSelectedDistrict(d);
                  setShowSuggestions(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-lime-100"
              >
                {highlightMatch(d.district, search)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="my-8" />

      {/* 🗺️ Map */}
      <div className="h-150 rounded-xl overflow-hidden">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedDistrict && <FlyToDistrict district={selectedDistrict} />}

          {(selectedDistrict ? [selectedDistrict] : districts).map(
            (district, index) => (
              <Marker
                key={index}
                position={[district.latitude, district.longitude]}
              >
                <Popup>
                  <strong>{district.district}</strong>
                  <br />
                  {district.covered_area.join(", ")}
                </Popup>
              </Marker>
            )
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
