import {StyleSheet} from 'react-native';


// ******** App Style Sheet ****************************************************************************
export const styles = StyleSheet.create({

    mapContainer: {

        alignItems: 'center',
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center', 

    },
    settingsContainer: {

        flex: 1,
        backgroundColor: '#000000',
        paddingLeft: 15,
        paddingTop: 15,

    },
    navigationContainer: {

        alignContent: 'center',
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingTop: 15,  

    },
    Heading1: {

        color: '#ffffff',
        fontSize: 22,
        fontWeight: "bold",
        marginTop: '30%',
    
    },
    Heading2: {

        color:'#ffffff',
        fontSize: 18,
        marginLeft: 15,
        marginTop: 15,

    },
    item: {

        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'left',

      },
    
    dropdown: {

        width: '100%',
        alignItems: 'left',
        backgroundColor: "#bbbbbb",
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "#ffffff",
        marginTop: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {

          height: 1,
          width: 0,
          
        },

        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        
    },
    dropdownText: {

        color: '#000000',
        fontSize: 16,

    },
    map: {

        height: '100%',
        width: '100%',
        
    },
    mapOverlay: {

        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderWidth: 2,
        borderRadius: 25,
        bottom: 20,
        color: '#ffcd00',
        left: '25%',
        padding: 10,
        position: 'absolute',
        textAlign: 'center',
        width: '50%',    

    },
    currentLocationButton: {

        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,
        bottom: 20,
        left: '0%',
        padding: 10,
        position: 'absolute',
        textAlign: 'center',
        width: '20%',
        
    },
    mapThemeButton: {

        position: 'absolute',
        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,        
        height: '4%',
        padding: 5,
        right: '0%',
        textAlign: 'center',
        top: 80,
        width: '15%',

    },
    settingsButton: {

        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,        
        padding: 7,
        position: 'absolute',
        right: '5%',
        textAlign: 'center',
        top: '10%',

    },
    navigationButton: {

        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,
        bottom: '5%',
        padding: 10,

    },
    navigationButtonText: {

        color: '#ffcd00',
        fontSize: 24,
    
    },
    centeredText: {

        color: '#ffcd00',
        textAlign: 'center',

    },
    backButton: {

        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,
        left: '5%',
        padding: 7,
        position: 'absolute',
        textAlign: 'center',
        top: '5%',

    },
    navigateButton: {
        
        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,
        bottom: '10%',
        fontSize: 48,
        textAlign: 'center',
        position: 'absolute',
        width: '40%',
        
    },
    StartButton: {

        position:"absolute",
        bottom: '10%',
        alignSelf: 'center',
        backgroundColor: '#115740',
        borderWidth: 2,
        borderRadius: 25,
        borderColor: '#ffcd00',
        paddingHorizontal: 15,
        paddingVertical: 10,
  
    },
  
    StartButtonText: {

        fontSize: 24,
        color: '#ffcd00'

    },
    pathButton: {

        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,
        padding: 7,
        position: 'absolute',
        right: '0%',
        textAlign: 'center',
        top: 40,

    },
    markersButton: {

        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,
        padding: 7,
        position: 'absolute',
        right: '0%',
        textAlign: 'center',
        top: 120,
        
    },


});