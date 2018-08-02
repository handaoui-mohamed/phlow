import React from "react"
import { Polygon, GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 21.416017, lng: 39.892154 }}
    >
        <Polygon
            options={{
                strokeColor: '#039be5', strokeWeight: 2,
                fillColor: '#039be5', fillOpacity: 0.2
            }}
            path={[
                { lat: 21.426493, lng: 39.869610 },
                { lat: 21.425455, lng: 39.872271 },
                { lat: 21.426533, lng: 39.873558 },
                { lat: 21.424935, lng: 39.876348 },
                { lat: 21.420621, lng: 39.882141 },
                { lat: 21.421939, lng: 39.882957 },
                { lat: 21.420467, lng: 39.887047 },
                { lat: 21.418030, lng: 39.888162 },
                { lat: 21.416462, lng: 39.890286 },
                { lat: 21.416872, lng: 39.891427 },
                { lat: 21.418706, lng: 39.891038 },
                { lat: 21.419236, lng: 39.892619 },
                { lat: 21.423000, lng: 39.891453 },
                { lat: 21.425822, lng: 39.891193 },
                { lat: 21.428813, lng: 39.894977 },
                { lat: 21.426642, lng: 39.897024 },
                { lat: 21.426015, lng: 39.898553 },
                { lat: 21.428379, lng: 39.900263 },
                { lat: 21.427511, lng: 39.902544 },
                { lat: 21.425050, lng: 39.906819 },
                { lat: 21.419912, lng: 39.904643 },
                { lat: 21.412819, lng: 39.906301 },
                { lat: 21.407922, lng: 39.907908 },
                { lat: 21.404814, lng: 39.903917 },
                { lat: 21.404803, lng: 39.900774 },
                { lat: 21.401527, lng: 39.895622 },
                { lat: 21.402273, lng: 39.894868 },
                { lat: 21.404716, lng: 39.888522 },
                { lat: 21.407494, lng: 39.886622 },
                { lat: 21.409103, lng: 39.885035 },
                { lat: 21.413519, lng: 39.876239 },
                { lat: 21.416488, lng: 39.873945 },
                { lat: 21.421313, lng: 39.867411 },
                { lat: 21.426493, lng: 39.869610 },
            ]}
        />
    </GoogleMap>
))

export default MyMapComponent