import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, subscription } from 'react-native';
import MapView, { AnimatedRegion, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

import { MapContext, Stack, masterNodeArray } from './App'
import { navigationButtonPressed } from './NavigationFunctions'


/*

 This file holds functions that interract with the MapView object

*/




// ******** Map Screen *********************************************************************************************

// Main Map Screen
export function MapScreen({ navigation }){

  const conVars = useContext(MapContext);

  return (
    <View style={conVars.appStyle.mapContainer}>

      {dynamicMapViewElement()}

      <StatusBar style="auto"/>

      {SettingsButton({navigation, conVars})}

      {NavigationButton({navigation, conVars})}

    </View>
  );
}








// ******* Map Screen Elements *************************************************************************************

// MapView Element
export function dynamicMapViewElement(){

  // Context Variables (Must List All & In This Order)
  const conVars = useContext(MapContext);

  var liveMap = {
    mapRegion: {
      latitude: conVars.locationTrackingFlag ? conVars.latitude : 35.2939156011969,
      longitude: conVars.locationTrackingFlag ? conVars.longitude : -93.13625872135162,
      latitudeDelta: conVars.locationTrackingFlag ? 0.002 : 0.01,
      longitudeDelta: conVars.locationTrackingFlag ? 0.002 : 0.01, 
    }}

  // Map View Return
  return(
    <MapView 
      provider={PROVIDER_GOOGLE}
      style={{height: '100%', width: '100%'}}
      region={liveMap.mapRegion}
      pitchEnabled={false}
      //showsUserLocation={true}
      customMapStyle={conVars.mapStyle}
    >

      <Marker 
      coordinate={{
        latitude: conVars.locationTrackingFlag ? conVars.latitude : 0,
        longitude: conVars.locationTrackingFlag ? conVars.longitude : 0,
      }}
      image={conVars.userIcon ? conVars.userIcon : require('./assets/JerryIcon.png')}
      key={'user'}
      >
      </Marker>
      <Marker 
      coordinate={{
        latitude: conVars.destinationMarker ? conVars.destinationMarker.latitude : 0,
        longitude: conVars.destinationMarker ? conVars.destinationMarker.longitude : 0,
      }}
      image={require('./assets/DestinationTestMarker.png')}
      key={'destination'}
      >
      </Marker>

      <Polyline
        coordinates={conVars.polyLine}
        strokeColor={conVars.polyLineColor} // fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={6}
      />
    </MapView>
  );
}






function SettingsButton({navigation, conVars}){
  return(
    <TouchableOpacity style={conVars.appStyle.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={conVars.appStyle.centeredText}>Settings</Text>
    </TouchableOpacity>
  );
}





function NavigationButton({navigation, conVars}){

  // Not navigating
  if(conVars.navigatingFlag == false){
    return(
      <View style={{alignItems:'center', bottom:'5%', position:'absolute'}}>
      <TouchableOpacity style={conVars.appStyle.navigationButton} onPress={() => navigation.navigate('Navigation')}>
          <Text style={conVars.appStyle.navigationButtonText}>Navigation</Text>
      </TouchableOpacity>
      </View>
    );
  }
  else{
    // Considering Navigating
    if(conVars.locationTrackingFlag == false){
      return(
        <View style={{bottom:'5%', flexDirection:'row', position:'absolute', alignItems:'flex-start'}}>
          <View style={{}}>
            <TouchableOpacity style={conVars.appStyle.navigationButton} onPress={() => startButtonPressed({conVars})}>
              <Text style={conVars.appStyle.navigationButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <TouchableOpacity style={conVars.appStyle.navigationButton} onPress={() => cancelButtonPressed({conVars, navigation})}>
              <Text style={conVars.appStyle.navigationButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    // Actively Navigating
    else{
      return(
        <View style={{bottom:'5%', flexDirection:'row', position:'absolute', alignItems:'flex-start'}}>
          <View style={{}}>
            <TouchableOpacity style={conVars.appStyle.navigationButton} onPress={() => rerouteButtonPressed({navigation, conVars})}>
              <Text style={conVars.appStyle.navigationButtonText}>Reroute</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <TouchableOpacity style={conVars.appStyle.navigationButton} onPress={() => stopButtonPressed({conVars})}>
              <Text style={conVars.appStyle.navigationButtonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}





// Confirm the shown path and start following the user
function startButtonPressed({conVars}){
  conVars.setLocationTrackingFlag(true);
}





// Cancel the path and go back to the navigation screen
function cancelButtonPressed({conVars, navigation}){
  conVars.setPolyLine([{latitude:0,longitude:0},{latitude:0.1,longitude:0.1}]);
  conVars.setNavigatingFlag(false);
  conVars.setLocationTrackingFlag(true);
  conVars.setDestinationMarker({latitude: 0, longitude: 0});
  navigation.navigate('Navigation');
}





// Remap the path to avoid the current direction
function rerouteButtonPressed({navigation, conVars}){
  Alert.alert("Not yet implemented");

  /*
  // Variables
  let closestNode = 1;
  let currentNode = 1;
  let currentNodeDistance = 0;
  let closestNodeDistance = -1;
  let userDistanceToDestination = -1;
  let nodeDistanceToDestination = -1;


  // Find Closest Node
  for(currentNode; currentNode < conVars.polyLine.length - 1; currentNode++){
    
    currentNodeDistance = Math.sqrt(Math.pow((Number(conVars.latitude) - 
      Number(conVars.polyLine[currentNode].latitude), 2) + Math.pow((Number(conVars.longitude)
      - Number(conVars.polyLine[currentNode].longitude)), 2)));


    if(currentNodeDistance < closestNodeDistance || closestNodeDistance == -1){
      closestNodeDistance = currentNodeDistance;
      closestNode = currentNode;
      
      console.log("Closest Node: " + closestNode + "   Distance: " + closestNodeDistance);
    }
  }

  // Check If The User Is Before or After The Node
  nodeDistanceToDestination = Math.sqrt(Math.pow((Number(conVars.polyLine[currentNode].latitude) - 
      Number(conVars.polyLine[conVars.polyLine.length - 1].latitude), 2)
      + Math.pow((Number(conVars.polyLine[currentNode].longitude)
      - Number(conVars.polyLine[conVars.polyLine.length - 1].longitude)), 2)));

  userDistanceToDestination = Math.sqrt(Math.pow((Number(conVars.latitude) - 
      Number(conVars.polyLine[conVars.polyLine.length - 1].latitude), 2)
      + Math.pow((Number(conVars.longitude)
      - Number(conVars.polyLine[conVars.polyLine.length - 1].longitude)), 2)));
  
  if(userDistanceToDestination < nodeDistanceToDestination){
    closestNode--;
  }

  // Mark The Node as Inactive in masterNodeArray
  masterNodeArray[Number(conVars.polyLine[closestNode].name)].activeStatus = 'inactive';
  console.log("Avoided Node: " + conVars.polyLine[closestNode].name + "    " + closestNode);

  // Find a New Path to the Destination
  //navigationButtonPressed({navigation, conVars});
  */

}





// End the path after it was confirmed
function stopButtonPressed({conVars}){
  conVars.setPolyLine([{latitude:0,longitude:0},{latitude:0.1,longitude:0.1}]);
  conVars.setDestinationMarker({latitude: 0, longitude: 0});
  conVars.setNavigatingFlag(false);
  conVars.setLocationTrackingFlag(true);
}
