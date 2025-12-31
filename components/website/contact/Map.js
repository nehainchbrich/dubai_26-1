// components/Map.js
import React, { useEffect, useRef } from 'react';

const Map = () => {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const center = { lat: 25.17805, lng: 55.27183 };

  useEffect(() => {
    if (inputRef.current) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center,
        zoom: 5,
      });

      mapRef.current = map;

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocompleteRef.current = autocomplete;
      autocomplete.bindTo('bounds', map);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          alert('No details available for input: ' + place.name);
          return;
        }

        map.setCenter(place.geometry.location);
        map.setZoom(12);

        new window.google.maps.Marker({
          position: place.geometry.location,
          map,
        });
      });

      const marker = new window.google.maps.Marker({
        position: center,
        map,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div class="custom-infowindow">Inch & Brick</div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    }
  }, []);

  return (
    <div className="row">
      <input
        id="search_input"
        ref={inputRef}
        type="text"
        placeholder="Search for a location"
      />
      <div className="col-md-12">
        <div id="map" style={{ width: '100%', height: '500px' }}></div>
      </div>
      <style>
        {`
       
        #search_input {
          margin-bottom: 10px;
          position: relative;
          right: 0;
          padding: 10px;
          border: none!important;
          top: 5px;
          z-index: 1000;
        }
        .custom-infowindow {
          color: #000;
          text-align: center;
          font-size: 14px;
          width: 100px;
        }
        `}
      </style>
    </div>
  );
};

export default Map;
