import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, subscription, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

import { findShortestSidewalkPath, findClosestNode } from './LocationFunctions';
import { MapContext, Stack, masterNodeArray, LocationPermissionsFlag } from './App'


/*
This Holds All Stuff Related to the Navigation Screen
*/






// ******** Navigation Screen **************************************************************************************

export function NavigationScreen({ navigation }){

  const conVars = useContext(MapContext);

    return(
        <View style={conVars.appStyle.navigationContainer}>

            <View style={{marginTop: '20%'}}></View>

            <TouchableOpacity style={conVars.appStyle.backButton} onPress={() => navigation.navigate('Map')}>
              <Text style={conVars.appStyle.centeredText}>Back</Text>
            </TouchableOpacity>

            <Text style={conVars.appStyle.Heading2}>Destination</Text>
            {EndNodeDropdownComponent()}

            {CustomCoordsMenu({conVars})}

            <Text style={conVars.appStyle.Heading2}>Navigation Type</Text>
            {NavigationTypeDropdownComponent()}

            {NavigationButton({navigation})}

        </View>
    );
}



// ******** Navigation Elements ************************************************************************************


// Important variables and initializations
var startNode = 0;
var endNode = 345;
var currentDestination = currentDestination;
var currentNavigationType = currentNavigationType;
var navigationTypeValue = 0


// Options for Destination Dropdown
const DestinationOptions = [
    { label: 'Custom Destination', value: -1 },
    { label: 'Corley', value: 345 },
    { label: 'Baz Tech', value: 113 },
    { label: 'Pendergraft', value: 215 },
    { label: 'Rothwell', value: 0 },
  ];

// Options for Navigation Type Dropdown
const NavigationTypeOptions = [
  { label: 'Sidewalk', value: 0 },
  { label: 'Off Road', value: 1 },
];






// Holds the current destination
function EndNodeDropdownComponent(){

    const conVars = useContext(MapContext);
    const [value, setValue] = useState(null);
  
    const renderItem = item => {
      return (
        <View style={conVars.appStyle.item}>
          <Text style={conVars.appStyle.dropdownText}>{item.label}</Text>
        </View>
      );
    };
  
    return (
      <Dropdown
      style={conVars.appStyle.dropdown}
      containerStyle={conVars.appStyle.dropdownContainer}
      placeholderStyle={conVars.appStyle.dropdownText}
      selectedTextStyle={conVars.appStyle.dropdownSelected}
      activeColor=''
      data={DestinationOptions}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={currentDestination ? currentDestination : 'Corley'}
      value={value}
      onChange={item => {
        setValue(item.value);
        endNode = item.value;
        if(endNode == -1){
          conVars.setCustomCoordsFlag(true);
        }
        else{
          conVars.setCustomCoordsFlag(false);
        }
        // For checking to make sure value updates correctly
        //console.log('End Node: ', item.value)
        currentDestination = item.label;
      }}
      renderItem={renderItem}
    />
    );
  };





// Holds the current navigation type (sidewalk or direct)
  function NavigationTypeDropdownComponent(){

    const conVars = useContext(MapContext);
    const [value, setValue] = useState(null);
  
    const renderItem = item => {
      return (
        <View style={conVars.appStyle.item}>
          <Text style={conVars.appStyle.dropdownText}>{item.label}</Text>
        </View>
      );
    };
  
    return (
      <Dropdown
      style={conVars.appStyle.dropdown}
      containerStyle={conVars.appStyle.dropdownContainer}
      placeholderStyle={conVars.appStyle.dropdownText}
      selectedTextStyle={conVars.appStyle.dropdownSelected}
      activeColor=''
      data={NavigationTypeOptions}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={currentNavigationType ? currentNavigationType : 'Sidewalk'}
      value={value}
      onChange={item => {
        setValue(item.value);
        // For checking to make sure value updates correctly
        //console.log('End Node: ', item.value)
        currentNavigationType = item.label;
        navigationTypeValue = item.value;
      }}
      renderItem={renderItem}
    />
    );
  };




// Menu for custom coords stuff (only active if 'Custom Destination' is selected)
function CustomCoordsMenu({conVars}){

  const [customCoordsText, setCustomCoordsText] = React.useState('Paste Coords Here');

  if(conVars.customCoordsFlag == false){
    return(
      <View>

      </View>
    );
  }
  else{
    return(
      <View>
        <View style={{marginTop: '5%'}}></View>
        <TextInput
          style={conVars.appStyle.textInput}
          onChangeText={setCustomCoordsText}
          value={customCoordsText}
          clearTextOnFocus={true}
        />


        <TouchableOpacity style={conVars.appStyle.getCoordsButton} 
            onPress={() => GetMyCoordsButtonPressed({conVars})}>
          <Text style={conVars.appStyle.centeredText}>Get My Coords</Text>
        </TouchableOpacity>

        <View style={{marginTop: '5%'}}></View>
      </View>
    );
  }
}







// Begin navigation with settings set in navigation screen
function NavigationButton({navigation}){

    const conVars = useContext(MapContext);


    return(
      <TouchableOpacity style={conVars.appStyle.StartButton} onPress={() => navigationButtonPressed({navigation, conVars})}>
        <Text style={conVars.appStyle.StartButtonText}>Navigate</Text>
      </TouchableOpacity>
    );
  }







  // *************** Path Builder ************************************************************************************



// Generates a polyline between path nodes
export function navigationButtonPressed({navigation, conVars}){

  // Only allow navigation if location permissions are enabled
  if(LocationPermissionsFlag == true){

    // Variables
    let polyLineTemp = [];
    let shortestPathNodeList = [];
    let userLatitude = conVars.latitude;
    let userLongitude = conVars.longitude;

    startNode = findClosestNode(userLatitude, userLongitude);
    conVars.setPolyLine(polyLineTemp);

    var currentNodeLatitude = 0.0;
    var currentNodeLongitude = 0.0;

    if(endNode == -1){
      endNode = 0;  // Temporary handling of custom coords
    }


    if(navigationTypeValue == 0){

      // Find Shortest Path
      findShortestSidewalkPath(startNode, endNode, shortestPathNodeList);
  

  
      // Load each node in shortestPathNodeList into polyLineCoordinates
      for(let currentNode = shortestPathNodeList.length - 1; currentNode >= 0; currentNode--){
  
        currentNodeLatitude = masterNodeArray[shortestPathNodeList[currentNode]].nodeLatitude;
        currentNodeLongitude = masterNodeArray[shortestPathNodeList[currentNode]].nodeLongitude;

  
        // Adds the node to the polyLineCoordinates list
        polyLineTemp.push({
          latitude: Number(currentNodeLatitude),
          longitude: Number(currentNodeLongitude),
          name: Number(shortestPathNodeList[currentNode])
        });
      }

    }
    else{
      currentNodeLatitude = masterNodeArray[endNode].nodeLatitude;
      currentNodeLongitude = masterNodeArray[endNode].nodeLongitude;


      // Adds the node to the polyLineCoordinates list
      polyLineTemp.push({
        latitude: Number(currentNodeLatitude),
        longitude: Number(currentNodeLongitude),
        name: -1
      });
    }

    

    // Connect polyline to current user location
    polyLineTemp.push({
      latitude: userLatitude,
      longitude: userLongitude,
      name: -1
    });
    
    
  
    // Load polyline and go back to map
    conVars.setPolyLine(polyLineTemp);
    conVars.setDestinationMarker({
      latitude: polyLineTemp[0].latitude,
      longitude: polyLineTemp[0].longitude,
    });
    console.log("Destination: " + polyLineTemp[0].latitude);
    conVars.setNavigatingFlag(true);
    conVars.setLocationTrackingFlag(false);
    navigation.navigate("Map");

  }


  else{
    Alert.alert("Please enable location permissions");
  }
}





function GetMyCoordsButtonPressed({conVars}){
  Alert.alert("Latitude: " + conVars.latitude + "\nLongitude: " + conVars.longitude);
}
