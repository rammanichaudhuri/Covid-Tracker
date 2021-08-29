import React from 'react';
import './Map.css';
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import { showDataOnMap } from "./util";
import "leaflet/dist/leaflet.css";

function Map({countries, casesType, center, zoom}) {
  const outerBounds = [
    [-89.98155760646617, -180],
    [89.99346179538875, 180],
  ]
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
    return (
        <div className="map_container">
            <LeafletMap
              className="map"
              center={center}
              zoom={zoom}
              minZoom={1.0}
              scrollWheelZoom={false}
              maxBounds={outerBounds}
              maxBoundsViscosity={1.0}
            >
              <ChangeView center={center} zoom={zoom} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; 
                  <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
