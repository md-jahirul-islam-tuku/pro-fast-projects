import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import districts from "../assets/data/warehouses.json";
import { FiSearch } from "react-icons/fi";

/* Fix Leaflet marker icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIcon,
  iconSize: [16, 26], // small size
  iconAnchor: [8, 26], // anchor at bottom center
  popupAnchor: [1, -24], // adjust popup above icon
  shadowSize: [26, 26], // scale shadow smaller too
});

/* ✅ Fly helper */
const FlyTo = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (!center || !zoom) return;
    map.flyTo(center, zoom, { duration: 1.4 });
  }, [center, zoom, map]);

  return null;
};

const BD_CENTER = [23.685, 90.3563];
const BD_ZOOM = 7;
const DISTRICT_ZOOM = 12;

const Coverage = () => {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [mapCenter, setMapCenter] = useState(BD_CENTER);
  const [mapZoom, setMapZoom] = useState(BD_ZOOM);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  /* 🔍 Suggestions */
  const suggestions =
    search.length > 0
      ? districts.filter((d) =>
          d.district.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  /* ❌ Close suggestions on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* 🔤 Highlight matching text */
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
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

      {/* 🔍 Search */}
      <div ref={searchRef} className="relative mt-6 max-w-md z-9999">
        <div className="relative">
          {/* 🔍 Search icon */}
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-lime-500" />

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
            className="w-full rounded-full pl-11 pr-10 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-lime-400 transition ring-1 ring-gray-300"
          />

          {/* ❌ Clear button */}
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedDistrict(null);
                setShowSuggestions(false);
                setMapCenter(BD_CENTER);
                setMapZoom(BD_ZOOM);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2
          text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          )}
        </div>

        {/* 🔽 Suggestions (UNDER input, aligned left) */}
        {showSuggestions && suggestions.length > 0 && (
          <ul
            className="absolute left-0 top-full mt-2 w-full bg-white rounded-xl
        shadow-lg max-h-60 overflow-y-auto z-9999"
          >
            {suggestions.map((d, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearch(d.district);
                  setSelectedDistrict(d);
                  setShowSuggestions(false);
                  setMapCenter([d.latitude, d.longitude]);
                  setMapZoom(DISTRICT_ZOOM);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-lime-100"
              >
                {highlightMatch(d.district, search)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="my-8 border-gray-300" />

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

          <FlyTo center={mapCenter} zoom={mapZoom} />

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
