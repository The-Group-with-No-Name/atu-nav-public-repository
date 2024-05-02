import React, { useState, useEffect, useRef, createContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, subscription } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SettingsScreen } from './Settings';
import { NavigationScreen } from './NavigationFunctions';
import { MapScreen } from './MapFunctions';
import { buildMasterNodeArray } from './LocationFunctions';

import { atuMap } from './map-themes/atuMap';
import { atuStyles } from './styles/atuStyles';





// Stacks & Context
export const Stack = createNativeStackNavigator();
export const MapContext = createContext();


// Initialization Flags & Important Variables
export var LocationPermissionsFlag = false;
var MasterNodeArrayBuiltFlag = false;
export const masterNodeArray = [];







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