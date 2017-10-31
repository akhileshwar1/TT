/*eslint-disable unknown-require */
const trackerConfig = require('./tracker_configuration.json');
const Promise = require('bluebird');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const panelConfig = require('./panels_config.json');
const generatedPaths = require('./paths.json');
const googleMapsClient = require('@google/maps').createClient({
  key: trackerConfig.mapsApiKey,
  Promise
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: trackerConfig.databaseURL
});
// Database references
const rawBusLocationsRef = admin.database().ref('raw-bus-locations');
 const rawLocationsRef = admin.database().ref('raw-locations');
const snappedBusLocationsRef = admin.database().ref('bus-locations');
const mapRef = admin.database().ref('map');
const mapRef1 = admin.database().ref('map1');
const panelsRef = admin.database().ref('panels');
const timeRef = admin.database().ref('current-time');
// Library classes
const {BusSimulator} = require('./bus_simulator.js');
const {GTFS} = require('./gtfs.js');
const {HeartBeat} = require('./heart_beat.js');
const {PanelChanger} = require('./panel_changer.js');
const {RoadSnapper} = require('./road_snapper.js');
//const {TimeTable} = require('./time_table.js');
const gtfs = new GTFS();
new HeartBeat(timeRef, trackerConfig.simulation);
//new TimeTable(timeRef, panelsRef, gtfs, panelConfig, googleMapsClient);
new PanelChanger(mapRef,mapRef1,panelConfig);
if (trackerConfig.simulation) {
  new BusSimulator(timeRef, gtfs, rawBusLocationsRef, generatedPaths);
 // new RoadSnapper(
   // timeRef,
   // rawBusLocationsRef,
  //  snappedBusLocationsRef,
  //  googleMapsClient
  //);
} else {
  // Exercise for the reader: integrate real bus location data
 
// Exercise for the reader: integrate real bus location data
  new RoadSnapper(
    timeRef,
    rawLocationsRef,
    snappedBusLocationsRef,
    googleMapsClient
  );
}
