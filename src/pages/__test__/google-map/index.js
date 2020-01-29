import React, { useState } from 'react'
import { compose, withProps } from 'recompose'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps'

const Map = (props) => {
  const [markers, setMarkers] = useState([])
  const { lat, lng, isMarkerShown } = props
  const onMarkerClick = (x) => {
    setMarkers([...markers, {
      lat: x.latLng.lat(),
      lng: x.latLng.lng(),
    }])
  }
  return (
    <GoogleMap
      onClick={onMarkerClick}
      defaultZoom={15}
      center={{
        lat,
        lng,
      }}
      options={{
        draggable: true,
        fullscreenControl: true,
        streetViewControl: true,
        mapTypeControl: false,
      }}
    >
      {isMarkerShown && markers.map(marker => (
        <Marker
          position={{
            lat: marker.lat,
            lng: marker.lng,
          }}
        />
      ))}
    </GoogleMap>
  )
}


export default compose(
  withProps({
    isMarkerShown: true,
    lat: 13.756842498598143,
    lng: 100.54564972254866,
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAVRmyBKdGACc2UAq_XfPeeMicYccjiw4I&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '337.45px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(Map)
