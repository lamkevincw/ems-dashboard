import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function QuantifierMarkers(props) {
    return (
        <Marker position={props.latlon}>
            <Popup>
                {props.name}
            </Popup>
        </Marker>
    );
}

export default QuantifierMarkers;