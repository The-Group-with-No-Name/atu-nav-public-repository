import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { React, useState, useEffect, subscription } from 'react';


const Permissions = (props) => {
    return (
        <View style={styles.root}>

            <Text>Permissions</Text>

            <Text style={styles.text}>This app requires user location permissions</Text>

            <TouchableOpacity style={styles.button} onPress={()=>AskPermission()}>

                <Text style={styles.text}>Allow</Text>

            </TouchableOpacity>

        </View>


    );


}

function AskPermission() {

    const getPermissions = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
  
        if (status !== 'granted') {
  
          console.log("Please grant location permissions.");
  
          setUserLongitude("Please grant location permissions in device settings.");
          setUserLatitude("Please grant location permissions in device settings.");
  
          return;
  
        }

    }

}

Navigation.registerComponent('Permissions', () => Permissions);

// **************** Styles **********************************************************************************************

const styles = StyleSheet.create({

    container: {
    
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    
      },
    
      text: {
    
        color: '#ffffff',
    
      },
    
      button: {
    
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 10,
    
      },
    
      buttonText: {
    
        color: '#ffffff',
    
      }







});