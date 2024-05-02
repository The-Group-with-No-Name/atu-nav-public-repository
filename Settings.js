import { StyleSheet, Text, View, TouchableOpacity, Pressable, Alert} from 'react-native';
import { React, useState, useEffect, subscription, useContext } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

//import { mapThemeSelected } from './MapFunctions';
//import { styles } from './styles/styles';
import { MapContext, Stack } from './App'

import { lightMap } from './map-themes/lightMap';
import { darkMap } from './map-themes/darkMap';
import { retroMap } from './map-themes/westernMap';
import { atuMap } from './map-themes/atuMap';

import {atuStyles} from './styles/atuStyles';
import {darkStyles} from './styles/darkStyles';
import {lightStyles} from './styles/lightStyles';



const appThemes = [
  { label: 'ATU', value: atuStyles },
  { label: 'Light', value: lightStyles },
  { label: 'Dark', value: darkStyles },
];

const mapThemes = [
  { label: 'ATU', value: atuMap },
  { label: 'Light', value: lightMap },
  { label: 'Dark', value: darkMap },
  { label: 'Retro', value: retroMap },
];

const pathLineColor = [
  { label: 'White', value: '#ffffff'},
  { label: 'Red', value: '#ff0000'},
  { label: 'Green', value: '#00ff00'},
  { label: 'Blue', value: '#0000ff'},
];

const userIcons = [
  {label: 'Jerry', value: require('./assets/JerryIcon.png')},
  {label: "The Face", value: require('./assets/TheFace.png')},
];




// Need to change to keep values through app instances
var currentAppTheme = currentAppTheme;
var currentMapTheme = currentMapTheme;
var currentPathColor = currentPathColor;
var currentUserIcon = currentUserIcon;

export function SettingsScreen({navigation}) {

  //mapThemeSelected(mapThemeValue);
  const conVars = useContext(MapContext);

  return (

    <View style={conVars.appStyle.settingsContainer}>
      <TouchableOpacity style={conVars.appStyle.backButton} onPress={() => navigation.navigate('Map')}>
        <Text style={conVars.appStyle.centeredText}>Back</Text>
      </TouchableOpacity>

      <Text style = {conVars.appStyle.Heading1}>Settings</Text>

      <Text style = {conVars.appStyle.Heading2}>App Theme</Text>
      {appThemeDropdownComponent()}

      <Text style = {conVars.appStyle.Heading2}>Map Theme</Text>
      {mapThemeDropdownComponent()}

      <Text style = {conVars.appStyle.Heading2}>Path Color</Text>
      {pathLineColorDropdownComponent()}

      <Text style = {conVars.appStyle.Heading2}>User Icon</Text>
      {userIconDropdownComponent()}

    </View>
  );

}

// ******** Dropdowns/Buttons for Settings Screen *******************************

function appThemeDropdownComponent(){
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
      data={appThemes}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={currentAppTheme ? currentAppTheme : 'ATU'}
      value={value}
      onChange={item => {
        setValue(item.value);
        conVars.setAppStyle(item.value);  // Updates the appStyle useState in context
        currentAppTheme = item.label;
      }}
      renderItem={renderItem}
    />
  );
};

function mapThemeDropdownComponent(){
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
      data={mapThemes}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={currentMapTheme ? currentMapTheme : 'ATU'}
      value={value}
      onChange={item => {
        setValue(item.value);
        conVars.setMapStyle(item.value);  // Updates the mapStyle useState in context
        currentMapTheme = item.label;
      }}
      renderItem={renderItem}
    />
  );
};

function pathLineColorDropdownComponent(){
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
      data={pathLineColor}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={currentPathColor ? currentPathColor : 'White'}
      value={value}
      onChange={item => {
        setValue(item.value);
        conVars.setPolyLineColor(item.value);
        currentPathColor = item.label;
      }}
      renderItem={renderItem}
    />
  );
};

export function appThemeSelected(appThemeValue){

  mapStyleIndex = appThemeValue;
  
}




function userIconDropdownComponent(){
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
      data={userIcons}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={currentUserIcon ? currentUserIcon : 'Jerry'}
      value={value}
      onChange={item => {
        setValue(item.value);
        conVars.setUserIcon(item.value);  // Updates the mapStyle useState in context
        currentUserIcon = item.label;
      }}
      renderItem={renderItem}
    />
  );
};
