console.log('Hello, World!');
/*eslint-disable unknown-require */
const _async = require('asyncawait/async');
const _await = require('asyncawait/await');
const {GTFS} = require('./gtfs.js');
const gtfs = new GTFS();

_async(() => {
  const trips = _await(gtfs.getTripsForCalendarDate('20160518'));
  console.log(trips.length);
})().catch(err => {
  console.error(err);
});
/*eslint-disable unknown-require */
const trackerConfig = require('./tracker_configuration.json');

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: trackerConfig.databaseURL
});

// Database references
const timeRef = admin.database().ref('current-time');

// Library classes
const {HeartBeat} = require('./heart_beat.js');

new HeartBeat(timeRef, trackerConfig.simulation);
/*eslint-disable unknown-require */


const Promise = require('bluebird');


const panelConfig = require('./panels_config.json');
const googleMapsClient = require('@google/maps').createClient({
  key: trackerConfig.mapsApiKey,
  Promise
});



// Database references
const panelsRef = admin.database().ref('panels');


// Library classes


const {TimeTable} = require('./time_table.js');


new HeartBeat(timeRef, trackerConfig.simulation);
new TimeTable(timeRef, panelsRef, gtfs, panelConfig, googleMapsClient);



const generatedPaths = require('./paths.json');


// Database references
const busLocationsRef = admin.database().ref('bus-locations');
const mapRef = admin.database().ref('map');


// Library classes
const {BusSimulator} = require('./bus_simulator.js');


const {PanelChanger} = require('./panel_changer.js');


new HeartBeat(timeRef, trackerConfig.simulation);
new TimeTable(timeRef, panelsRef, gtfs, panelConfig, googleMapsClient);
new PanelChanger(mapRef, panelConfig);
if (trackerConfig.simulation) {
  new BusSimulator(timeRef, gtfs, busLocationsRef, generatedPaths);
} else {
  // Exercise for the reader: integrate real bus location data
}