import React, { useState, useEffect, useRef, createContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, subscription } from 'react-native';
//import { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
//import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SettingsScreen } from './Settings';
import { NavigationScreen } from './NavigationFunctions';
import { MapScreen } from './MapFunctions';
import { buildMasterNodeArray } from './LocationFunctions';

//import { lightOptions } from './app-themes/lightApp';
//import { darkOptions } from './app-themes/darkApp';
//import { atuOptions } from './app-themes/atuApp';
import { atuMap } from './map-themes/atuMap';
import { atuStyles } from './styles/atuStyles';
//import { mainAppStyles } from './styles/style-sheets'





// Stacks & Context
export const Stack = createNativeStackNavigator();
export const MapContext = createContext();


// Initialization Flags & Important Variables
export var LocationPermissionsFlag = false;
var MasterNodeArrayBuiltFlag = false;
export const masterNodeArray = [];






/*
let locationsOfInterest = [
  {
    title: "First",
    location: {
      latitude: 35.2939878039481,
      longitude: -93.13465341925621
    },
    description: "My location!"
  }
  ]
*/



// ********** Main App Function ************************************************************************************

export default function App() {

  // Context Variables
  const [mapStyle, setMapStyle] = useState(atuMap);
  const [polyLine, setPolyLine] = useState([]);
  const [markerList, setMarkerList] = useState([]);
  const [appStyle, setAppStyle] = useState(atuStyles)
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [polyLineColor, setPolyLineColor] = useState("#ffffff");
  const [locationTrackingFlag, setLocationTrackingFlag] = useState(false);
  const [navigatingFlag, setNavigatingFlag] = useState(false);
  const [destinationMarker, setDestinationMarker] = useState({latitude: 0, longitude: 0});
  const [userIcon, setUserIcon] = useState(require('./assets/JerryIcon.png'));
  const [customCoordsFlag, setCustomCoordsFlag] = useState(false);

  // Holds all useState stuff to pass into context
  const conVars = {mapStyle, setMapStyle,
    polyLine, setPolyLine, markerList, setMarkerList, 
    latitude, longitude, appStyle, setAppStyle,
    polyLineColor, setPolyLineColor, locationTrackingFlag, 
    setLocationTrackingFlag, navigatingFlag, setNavigatingFlag,
    destinationMarker, setDestinationMarker, userIcon, setUserIcon,
    customCoordsFlag, setCustomCoordsFlag};


  useEffect(() => {

    getLocationPermissions({setLatitude, setLongitude, setLocationTrackingFlag});
    buildNodeWeb();

  });


  // Return with screen stack.
  return (
    <MapContext.Provider value={conVars}>
      <MainScreenNavigator/>
    </MapContext.Provider>
  );
}





// ********* Screens and Navigator *********************************************************************************

// Holds Navigation Stack Stuff
function MainScreenNavigator(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen
          name="Map"
          component={MapScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Navigation" 
          component={NavigationScreen} 
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}








// ******* UseState Functions **************************************************************************************

// Get Location Permissions
async function getLocationPermissions({setLatitude, setLongitude, setLocationTrackingFlag}){

  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    console.log("Please grant location permissions.");
    return;
  }
  else{
    // Get User Location
    const locationSuscription = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 0.1,
    }, (location) => {

        // Start tracking user location
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);  

        // Flag Permission Granted
        if(LocationPermissionsFlag == false){
          console.log("Location Permission Granted");
          LocationPermissionsFlag = true;
          setLocationTrackingFlag(true);
        }
      }
    );  
  }

  // Stop tracking user location
  return () => locationSuscription.remove();
};







// Build the Master Node Web
function buildNodeWeb(){
    // Initialize the Node Web
    if(MasterNodeArrayBuiltFlag == false){
      MasterNodeArrayBuiltFlag = true;
      buildMasterNodeArray(masterNodeArray);
    };
}






// Stop Tracking User When App Is Closed
async function endSubscription(){
  return () => {
    if (subscription){subscription.remove();} 
  };
}











/*
// ********* Curtis' Buttons ***************************************************************************************


// Current Location Button
const CurrentLocationButton = () => {
  return (

    <TouchableOpacity style={styles.currentLocationButton} onPress={()=>CurrentLocationButtonPressed()}>

      <Text style={{color: "#ffcd00"}} >Current Location</Text>

    </TouchableOpacity>
  );

}

const CurrentLocationButtonPressed = () => {
  Alert.alert('', 'Current location button pressed');

}





// ************* Path Building Stuff *******************************************************************************

// Variables holding path stuff



// Places markers at path intersections
const markersButton = () => {
  return (
    <TouchableOpacity style={styles.markersButton} onPress={()=>markersButtonPressed(
      startNodeName, endNodeName, shortestPathNodeList, masterNodeArray)}>
      <Text style={styles.centeredText}>Markers</Text>
    </TouchableOpacity>
  );
}


// Generates a polyline path to desination
const pathButton = () => {
  return (
    <TouchableOpacity style={styles.pathButton} onPress={()=>{
      pathButtonPressed(startNodeName, endNodeName, shortestPathNodeList, masterNodeArray)}}>
      <Text style={styles.centeredText}>Path</Text>
    </TouchableOpacity>
  );
}

*/













// ************* Code No Longer In Use, Kept For Reference *********************************************************
        
        /* { {userLocation && (
          <Marker
            coordinate={{
              latitude: userLatitude,
              longitude: userLongitude,
            }}
            title="Your Location"
            description="You are here"
          />
        )} }
      </MapView>

      <Text style={styles.text}>Longitude: {userLongitude}</Text>
      <Text style={styles.text}>Latitude: {userLatitude}</Text>

      <TouchableOpacity style={styles.button} onPress={findShortestPath}>
        <Text style={styles.buttonText}>Test find path /Temp/</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={settingsButtonPressed}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      {errorMsg && <Text style={styles.text}>{errorMsg}</Text>}
    </View>
  );
} }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     width: '100%',
//     height: '70%',
//   },
//   text: {
//     color: '#ffffff',
//   },
//   button: {
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     padding: 10,
//   },
//   buttonText: {
//     color: '#ffffff',
//   },
// });*/




// Previously used main return, kept here for reference only

/*
  return (
    <View style={styles.container}>
      <MapView 
      provider='google'
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          "latitude": 35.2939156011969, 
          "latitudeDelta": 0.007876526155094155, 
          "longitude": -93.13625872135162, 
          "longitudeDelta": 0.005186051130309011
        }}
        customMapStyle={mapStyleSelector(mapStyleIndex)}
       >
        {markers.map((marker,index) =>(
         <Marker 
            key={index} 
            coordinate={marker}
            image={require('./assets/TheFaceSmall.png')}
          />
        ))}
        <Polyline
          coordinates={polyLineCoordinates}
          strokeColor="#fff" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={6}
        />
      </MapView>

      {setMapThemeButton()}

      {CurrentLocationButton()}

      {markersButton()}

      {pathButton()}

      <Text style ={styles.mapOverlay}>Long: {userLatitude}, {"\n"} Lat: {userLongitude} </Text>
      <StatusBar style="auto"/>
    </View>
  );
*/




// Past UseEffect, kept for reference

  /*useEffect(() => {
    getLocationAsync();
    }, 
  []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 1,
      },
      (location) => {
        const { coords } = location;
        const { latitude, longitude } = coords;
        setUserLongitude(longitude);
        setUserLatitude(latitude);
        
      }
    );
  };
*/



// Newer old main return
/*
// Return without pages
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {dynamicMapViewElement(onRegionChange)}

      {CurrentLocationButton()}

      {markersButton()}

      {pathButton()}

      {setMapThemeButton()}

      <StatusBar style="auto"/>

    </View>
  );
*/





// Previous UseState
/*
  const getPermissions = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {

      console.log("Please grant location permissions.");

      setUserLongitude("Please grant location permissions in device settings.");
      setUserLatitude("Please grant location permissions in device settings.");

      return;

    }
    let testLocation = await Location.getCurrentPositionAsync(

      {

        accuracy: Location.Accuracy.BestForNavigation,

      },
      (location) => {

        const { coords } = location;
        const { latitude, longitude } = coords;

        setTestLongitude(longitude);
        setTestLatitude(latitude);
       

      }

    );
    let currentLocation = await Location.watchPositionAsync(
      {

        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 1,

      },
      (location) => {

        const { coords } = location;
        const { latitude, longitude } = coords;

        setUserLongitude(longitude);
        setUserLatitude(latitude);
        setUserLocation(coords);

      }

    );

  };

  getPermissions();

  return () => {

    if (subscription){

      subscription.remove();

    }

  };
*/