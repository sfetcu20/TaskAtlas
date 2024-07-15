import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import 'ol/ol.css';
import { fromLonLat, toLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { memo, useEffect, useMemo, useState } from 'react';
import { classnames } from '../lib';

const DEFAULT_COORDINATES = [25.005, 45.944];
const DEFAULT_ZOOM_LEVEL = 6;
const MAXIMUM_ZOOM_LEVEL = 18;
const ZOOM_LEVEL_THRESHOLD = 15;
const ANIMATION_DURATION = 1000;

const createMarker = () =>
  new Style({
    image: new Icon({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      height: 36,
      src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
    }),
  });

const getCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
  }
  return null;
};

const MapComponent = memo(function MapComponent({
  county = '',
  city = '',
  district = '',
  coordinates = null,
  readOnly = false,
  onCoordinatesChange = () => {},
}) {
  console.log({
    county,
    city,
    district,
    coordinates,
    readOnly,
    onCoordinatesChange,
  });
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [map, setMap] = useState(null);
  const [source, setSource] = useState(new VectorSource());

  const marker = useMemo(() => {
    const feature = new Feature();
    feature.setStyle(createMarker());
    return feature;
  }, []);

  const updateMapAndView = (map, coordinates, zoomLevel) => {
    source.clear();
    marker.setGeometry(new Point(coordinates));
    source.addFeature(marker);
    const view = map?.getView();
    const animationOptions = { center: coordinates, duration: ANIMATION_DURATION };
    if (zoomLevel) {
      animationOptions.zoom = zoomLevel;
    }
    view?.animate(animationOptions);
    if (typeof onCoordinatesChange === 'function') {
      onCoordinatesChange(toLonLat(coordinates));
    }
  };

  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [new TileLayer({ source: new OSM() }), new VectorLayer({ source: source })],
      view: new View({
        center: fromLonLat(coordinates || DEFAULT_COORDINATES),
        maxZoom: MAXIMUM_ZOOM_LEVEL,
        zoom: DEFAULT_ZOOM_LEVEL,
      }),
    });
    setMap(map);
    setSource(source);
    if (readOnly) {
      const coords = fromLonLat(coordinates || DEFAULT_COORDINATES);
      marker.setGeometry(new Point(coords));
      source.clear();
      source.addFeature(marker);
      map
        .getView()
        .animate({ center: coords, duration: ANIMATION_DURATION, zoom: ZOOM_LEVEL_THRESHOLD });
      return () => map.setTarget(undefined);
    } else {
      const handleMapClick = (e) => {
        updateMapAndView(map, e.coordinate);
      };
      map.on('click', handleMapClick);
      return () => {
        map.setTarget(undefined);
        map.un('click', handleMapClick);
      };
    }
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }
    let isDragging = false;
    const handleDragStart = (event) => {
      if (event.originalEvent.buttons === 1) {
        isDragging = true;
        map.getViewport().style.cursor = 'grabbing';
      }
    };
    const handleDragEnd = () => {
      if (isDragging) {
        isDragging = false;
        map.getViewport().style.cursor = readOnly ? 'grab' : 'crosshair';
      }
    };
    if (readOnly) {
      map.on('pointerdown', handleDragStart);
      map.on('pointerup', handleDragEnd);
      map.on('pointerdrag', handleDragStart);
      return () => {
        map.un('pointerdown', handleDragStart);
        map.un('pointerup', handleDragEnd);
        map.un('pointerdrag', handleDragStart);
      };
    } else {
      map.on('pointerup', handleDragEnd);
      map.on('pointerdrag', handleDragStart);
      return () => {
        map.un('pointerup', handleDragEnd);
        map.un('pointerdrag', handleDragStart);
      };
    }
  }, [map]);

  useEffect(() => {
    if (!map) {
      return;
    }
    if (coordinates && isFirstRender) {
      const coords = fromLonLat(coordinates);
      marker.setGeometry(new Point(coords));
      source.clear();
      source.addFeature(marker);
      map
        .getView()
        .animate({ center: coords, duration: ANIMATION_DURATION, zoom: ZOOM_LEVEL_THRESHOLD });
      setIsFirstRender(false);
      return;
    }
    if (county) {
      let address = '';
      let zoom = null;
      if (district && district !== 'other') {
        address = `${district}, ${city}, ${county}, Romania`;
        zoom = ZOOM_LEVEL_THRESHOLD;
      } else if (city) {
        address = `${city}, ${county}, Romania`;
        zoom = DEFAULT_ZOOM_LEVEL + (2 * (ZOOM_LEVEL_THRESHOLD - DEFAULT_ZOOM_LEVEL)) / 3;
      } else {
        address = `${county}, Romania`;
        zoom = DEFAULT_ZOOM_LEVEL + (ZOOM_LEVEL_THRESHOLD - DEFAULT_ZOOM_LEVEL) / 3;
      }
      getCoordinates(address).then((coords) => {
        if (coords) {
          const olCoords = fromLonLat(coords);
          updateMapAndView(map, olCoords, zoom);
        }
      });
    }
  }, [county, city, district, map]);

  return (
    <div
      id="map"
      className={classnames('w-full h-96', readOnly ? 'cursor-grab' : 'cursor-crosshair')}
      title={readOnly ? '' : 'Clic pentru a plasa un pin'}
    />
  );
});

export default MapComponent;
