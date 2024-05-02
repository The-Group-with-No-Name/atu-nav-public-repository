import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { React, useState, useEffect, subscription } from 'react';
import * as Location from "expo-location";
import { Asset } from 'expo-asset';
import { readAsStringAsync } from 'expo-file-system';

import { masterNodeArray } from './App'






// Location Node Struct
export function locationNode(nodeName,activeStatus,nodeLongitude,nodeLatitude,connectionsArray){
    this.nodeName = nodeName;
    this.activeStatus = activeStatus;
    this.nodeLongitude = nodeLongitude;
    this.nodeLatitude = nodeLatitude;
    this.connectionsArray = connectionsArray;
 }
 
 

 // should read from nodeSetupList file
 export async function buildMasterNodeArray(masterNodeArray) {
  
  const [{ localUri }] = await Asset.loadAsync(require("./assets/nodeSetupList.txt"));
  var nodeName = '';
  var nodeStatus = '';
  var nodeLong = 0;
  var nodeLat = 0;
  var nodeCons = [];

  // Node Format:
  // Name:    (4-digit indexNumber)(2-char code/Name)
  // Status:  (active/inactive)
  // Long:    (longitude of node)
  // Lat:     (latitude of node)
  // Connect: (list of connected nodes)


  if (localUri) {
    readAsStringAsync(localUri).then((contents) => {

      if(masterNodeArray.length == 0){

       //build nodes:
       var nodePortions = contents.split(" ");
       //console.log(nodePortions);
       var portionIndex = 0;
      
       // Read each word from node portions
       while(portionIndex < nodePortions.length){
         //console.log('Portion Index: ', portionIndex);

         nodeCons.length = 0;

         nodeName = nodePortions[portionIndex];
         portionIndex++;

         nodeStatus = nodePortions[portionIndex];
         portionIndex++;

         nodeLat = Number(nodePortions[portionIndex]);
         portionIndex++;

         nodeLong = Number(nodePortions[portionIndex]);
         portionIndex++;

         // Read words until END
         while(portionIndex < nodePortions.length){

           // Keep reading as long as END isn't reached
           if(nodePortions[portionIndex].slice(0,3) != "END"){

             nodeCons.push(nodePortions[portionIndex]);
             portionIndex++;

           }
           else{

             // If not the final line, removes END from next name (because I used newline character)
             if(nodePortions[portionIndex].length > 3){

               nodePortions[portionIndex] = nodePortions[portionIndex].slice(5,nodePortions[portionIndex].length);

             }

             break;

           }

         }

         masterNodeArray.push(new locationNode(nodeName,nodeStatus,nodeLong,nodeLat,[]));

         for(nodeConIndex = 0; nodeConIndex < nodeCons.length; nodeConIndex++){
           masterNodeArray[masterNodeArray.length - 1].connectionsArray.push(nodeCons[nodeConIndex]);
         }

         if(nodePortions[portionIndex] == "END"){
           console.log('Master Node Array (should show 477): ', masterNodeArray.length);  // should log end of thing
           break;
         }

       }

       nodePortions.length = 0;
       }

    });
  }
}







 // New Path Finder ****************************************************************************************************************************
// Current rendition untested


 // finds the shortest path from startNodeName to endNodeName
 export function findShortestSidewalkPath(startNodeIndex, endNodeIndex, shortestPathNodeList){

  //let startNodeIndex = Number(startNodeName.slice(0,4)) * 1;  // dirty number reformatting
  //let endNodeIndex = Number(endNodeName.slice(0,4)) * 1;

  if(startNodeIndex != endNodeIndex){

    shortestPathNodeList.push(startNodeIndex);
    shortestSidewalkPathRecursive(endNodeIndex,shortestPathNodeList);  // start path search

  }

  else{

    shortestPathNodeList.push(startNodeIndex);

  }

  resetNodeActiveStatus();  // reactivate all nodes
  //moveNodeListToPolyline(shortestPathNodeList, {setPolyLine});  // map the path
  console.log('Shortest Path: ', shortestPathNodeList);
  //shortestPathNodeList.length = 0;  // clear the temporary list
  return;
}






// recursively finds shortest path forward from currentNodeIndex
function shortestSidewalkPathRecursive(endNodeIndex,shortestPathNodeList){
  
  let currentIndex = shortestPathNodeList[shortestPathNodeList.length - 1];

  // Check that end node or dead end haven't been reached
  if((currentIndex != endNodeIndex) && (masterNodeArray[currentIndex].connectionsArray.length > 1)){
    
    let closestConnection = 0; // Connection closest to end node
    let currentConnection = 0; // connection being tested
    let distance = 100;      // current shortest distance
    let checkDistance = 0;  // distance for currentConnection
    
    // Check every connection not in shortestPathNodeList for node closest to destination
    for(let checkPaths = 0; checkPaths < masterNodeArray[currentIndex].connectionsArray.length; checkPaths++){

      currentConnection = Number(masterNodeArray[currentIndex].connectionsArray[checkPaths]);
      
      // Make sure we aren't going backwards (node is not in our current path)
      if((checkArrayForElement(shortestPathNodeList,currentConnection) == false)
        && (masterNodeArray[currentConnection].activeStatus == 'active')){

        // Compare node distances
        // Changed to now check distance to end AND distance traveled (the + part)
        checkDistance = (distanceBetweenNodes(currentConnection,endNodeIndex)
          + distanceBetweenNodes(currentIndex,endNodeIndex));
        if(distance > checkDistance){
          distance = checkDistance;
          closestConnection = currentConnection;
        }
      }  
    }

    // Continue on with closest node
    shortestPathNodeList.push(closestConnection);
    shortestSidewalkPathRecursive(endNodeIndex,shortestPathNodeList);
    
  }
  else{

    // Dead end handler
    if(currentIndex != endNodeIndex){

      // Deactivate problematic connection and continue
      masterNodeArray[currentIndex].activeStatus = 'inactive';
      shortestPathNodeList.pop();
      shortestSidewalkPathRecursive(endNodeIndex,shortestPathNodeList);
    }
  }
  
}






// Computes the distance between two nodes
export function distanceBetweenNodes(nodeIndexOne,nodeIndexTwo){
  
  let distance = 0;

  distance = Math.sqrt(Math.pow((masterNodeArray[nodeIndexOne].nodeLatitude 
      - masterNodeArray[nodeIndexTwo].nodeLatitude),2) 
    + Math.pow((masterNodeArray[nodeIndexOne].nodeLongitude
      - masterNodeArray[nodeIndexTwo].nodeLongitude),2));

  return distance;
}






// Resets the active status of all nodes in masterNodeArray
function resetNodeActiveStatus(){

  for(let index = 0; index > masterNodeArray.length; index++){

    if(masterNodeArray[index].activeStatus != 'active'){
      masterNodeArray[index].activeStatus = 'active';
    }
  }
}






// Reroute function to avoid unwanted paths (NOT IN USE!!!)
export function reroutePath(currentNode,endNodeName,shortestPathNodeList){
  
  // Make sure a path is being followed
  if(shortestPathNodeList.length < 1){

    for(let index = 0; index < shortestPathNodeList.length; index++){

      // Find user's place on current path
      if(shortestPathNodeList[index] == currentNode && index != 0){

        // Deactivate unwanted path and reroute
        masterNodeArray[currentNode].activeStatus = 'inactive';
        currentNode = shortestPathNodeList[index - 1]
        findShortestSidewalkPath(currentNode,endNodeName,shortestPathNodeList,masterNodeArray);
      }
      else if(index == 0){

        // Total new route for start node (not yet implemented)
        alert('No reroute available');
      }
    }
  }
}






 // Find the nearest node to the user
 export function findClosestNode(userLatitude, userLongitude){
  
  // Variables
  let nearestNodeIndex = 0;
  let nearestNodeDistance = -1;
  let currentNodeDistance = 0;
 

  // Check every node for closest node to user
  for(let checkNode = 0; checkNode < masterNodeArray.length; checkNode++){

    // Check distance between current node and user
    currentNodeDistance = Math.sqrt(Math.pow((Number(userLatitude) - 
      Number(masterNodeArray[checkNode].nodeLatitude)), 2) + Math.pow((Number(userLongitude)
      - Number(masterNodeArray[checkNode].nodeLongitude)), 2));

    // Save node if current node is closer
    if(currentNodeDistance < nearestNodeDistance || nearestNodeDistance == -1){
      nearestNodeIndex = checkNode;
      nearestNodeDistance = currentNodeDistance;
    }   

  }
    
  // Return the nearest node
  //console.log(nearestNodeIndex);
  return nearestNodeIndex;

 }





  //check an array for elements to prevent repeats
  function checkArrayForElement(currentArray,currentElement){
 
    for(let checkIndex = 0; checkIndex < currentArray.length; checkIndex++){
  
      if(currentArray[checkIndex] == currentElement){return true;}
  
    }
  
    return false;
  }
 