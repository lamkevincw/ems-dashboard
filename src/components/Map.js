import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import QuantifierMarkers from './QuantifierMarkers';

// Quantifier locations given as lat:lon
const quantifierLoc = {
    "Q03": [52.142856, -106.626479],
    "QO6": [52.143393, -106.63095],
    "Q08": [52.1413, -106.619288],
    "Q10": [52.14303, -106.626568],
    "Q13": [52.143055, -106.626613]
};
const quantNames = Object.keys(quantifierLoc);

function Map(props) {
    const markers = quantNames.map(q => (
        <QuantifierMarkers
            name={q}
            key={q + "mapMarker"}
            latlon={quantifierLoc[q]}
        />
    ));

    return (
        <div id="map" className="pt-4 pb-4">
        <MapContainer
        style={{ height: "85vh", width: "100%" }}
        center={[52.142856, -106.626479]}
        zoom={13}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
        </MapContainer>
        </div>
    );
}

export default Map;