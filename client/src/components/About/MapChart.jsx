import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const markers = [
  { markerOffset: -20, name: "Chicago", coordinates: [-87.6298, 41.8781] },
  { markerOffset: -20, name: "Boston", coordinates: [-71.0589, 42.3601] },
  { markerOffset: -20, name: "Tulsa", coordinates: [-95.9928, 36.154] },
  { markerOffset: -20, name: "Baltimore", coordinates: [-76.6122, 39.2904] },
  { markerOffset: -20, name: "Miami", coordinates: [-80.1918, 25.7617] },
  { markerOffset: 30, name: "Washington, D.C.", coordinates: [-77.0369, 38.9072] },
  { markerOffset: -20, name: "Los Angeles", coordinates: [-118.2426, 34.0549] },
];

const MapChart = () => {
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event, name) => {
    setHoveredMarker(name);
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl} >
          {({ geographies, outline, borders }) => (
            <>
              <Geography geography={outline} fill="#E9E3DA" className="outline-none"/>
              <Geography geography={borders} fill="none" stroke="#FFF" />
            </>
          )}
        </Geographies>

        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker
            key={name}
            coordinates={coordinates}
            onMouseMove={(event) => handleMouseMove(event, name)}
            onMouseLeave={() => setHoveredMarker(null)}
          >
            <circle r={5} fill="#E42A1D" stroke="#fff" strokeWidth={2} />
          </Marker>
        ))}
      </ComposableMap>

      {/* Custom Tooltip */}
      {hoveredMarker && (
        <div
          style={{
            position: "fixed", // Use `fixed` to ensure tooltip follows the cursor
            top: `${tooltipPosition.y + 10}px`,
            left: `${tooltipPosition.x + 10}px`,
            background: "#333",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "4px",
            pointerEvents: "none", // Prevents tooltip from interfering with mouse events
          }}
        >
          {hoveredMarker}
        </div>
      )}
    </div>
  );
};

export default MapChart;
