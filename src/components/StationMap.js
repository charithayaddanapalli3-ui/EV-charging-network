import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function StationMap({ stations }) {
  return (
    <MapContainer
      center={[15.9129, 79.74]}
      zoom={7}
      style={{ height: "450px", marginTop: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((s) => (
        <Marker key={s.id} position={[s.lat, s.lng]}>
          <Popup>
            <b>{s.city}</b><br />
            Status: {s.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}