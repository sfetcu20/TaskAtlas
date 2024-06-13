// components/Map.js
import React, { useRef, useEffect, useState } from 'react';
import 'ol/ol.css';
import { Map, Overlay, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { useGeolocation } from '../hooks';

const OpenLayersMap = ({ jobs }) => {
  const mapRef = useRef();
  const { coordinates, error } = useGeolocation();
  const [vectorSource, setSource] = useState(new VectorSource());
  const popupRef = useRef();

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
      // Initialize the map
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({ source: vectorSource }),
        ],
        view: new View({
          center: fromLonLat([coordinates.lon, coordinates.lat]), // Convert to map projection
          zoom: 12,
        }),
      });
      setSource(vectorSource);

      // Add a marker for each job
      jobs.forEach((job) => {
        const lon = Number(job.coordinates?.lon);
        const lat = Number(job.coordinates?.lat);

        const marker = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          jobTitle: job.title,
          jobId: job._id,
          jobAddress: job.address,
        });
        marker.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              height: 36,
              src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
            }),
          })
        );
        vectorSource.addFeature(marker);
      });
      // Create an overlay to anchor the popup to the map
      const popup = new Overlay({
        element: popupRef.current,
        positioning: 'top-right',
        stopEvent: true, // Allow events to be stopped
        offset: [0, -10],
      });
      map.addOverlay(popup);

      // Display the popup when the marker is clicked
      map.on('click', function (event) {
        const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {
          return feature;
        });
        if (feature) {
          const coordinates = feature.getGeometry().getCoordinates();
          popup.setPosition(coordinates);
          const jobTitle = feature.get('jobTitle');
          const jobAddress = feature.get('jobAddress');
          const jobId = feature.get('jobId');
          popupRef.current.innerHTML = `<div class="popup-title"><a href="${jobId}" target="_blank">${jobTitle}</a></div><div class="popup-address">${jobAddress}</div>`;
          // popupRef.current.innerHTML = `<div class="w-full border-b border-slate-800"><a href="view/post/${jobId}" class="no-underline">${jobTitle}</a></div>
          // <div className="w-full py-2">${jobAddress}</div>`;
          popupRef.current.style.display = 'inline-block';
        } else {
          popupRef.current.style.display = 'none';
        }
      });

      // Hide the popup when the map is clicked outside markers
      map.on('pointermove', function (event) {
        if (event.dragging) {
          popupRef.current.style.display = 'none';
          return;
        }
      });
    }
  }, [coordinates, jobs]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div style={{ position: 'relative' }}>
          <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
          <div
            ref={popupRef}
            style={{
              display: 'none',
              position: 'absolute',
              backgroundColor: 'white',
              padding: '10px',
              border: '3px solid',
              borderColor: '#53c68c',
              borderRadius: '5px',
              width: '400px',
              height: '100px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              pointerEvents: 'auto', // Allow pointer events

              //minWidth: '200px', // Ensure the tooltip is wider than taller
              //maxWidth: '300px',
            }}
          >
            <div className="popup-content" onClick={(e) => e.stopPropagation()}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenLayersMap;
