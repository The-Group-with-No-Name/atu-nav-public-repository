import {StyleSheet} from 'react-native';


// ******** ATU App Theme Style Sheet ****************************************************************************
export const atuStyles = StyleSheet.create({

    mapContainer: {

        alignItems: 'center',
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center', 

    },
    settingsContainer: {

        flex: 1,
        backgroundColor: '#115740',
        paddingLeft: 15,
        paddingTop: 15,

    },
    navigationContainer: {

        alignContent: 'center',
        backgroundColor: '#115740',
        flex: 1,
        paddingLeft: 15,
        paddingTop: 15, 

    },
    Heading1: {

        color: '#ffcd00',
        fontSize: 26,
        fontWeight: "bold",
        marginTop: '30%',
    
    },
    Heading2: {

        color:'#ffcd00',
        fontSize: 20,
        marginLeft: 15,
        marginTop: 15,

    },
    item: {

        alignItems: 'left',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,

      },
    
    dropdown: {

        alignItems: 'left',
        backgroundColor: "#115740",
        borderColor: "#ffcd00",
        borderRadius: 25,
        borderWidth: 2, 
        elevation: 2,       
        marginTop: 15,
        padding: 15,
        shadowColor: '#000000',
        shadowOffset: {

          height: 1,
          width: 0,
          
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        width: '100%',
        
    },
    dropdownText: {

        color: '#ffcd00',
        fontSize: 16,

    },
    dropdownContainer: {

        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderWidth: 2,
        borderRadius: 25,

    },
    dropdownSelected: {

        color: '#ffcd00',

    },
    arrowStyle: {

        backgroundColor: '#ffffff'

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
    settingsButton: {

        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,   
        opacity: 0.9,         
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
        opacity: 0.9,    
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
        opacity: 0.9,    
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
  
        alignSelf: 'center',
        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,
        bottom: '10%',
        opacity: 0.9,        
        paddingHorizontal: 15,
        paddingVertical: 10,
        position:"absolute",
  
    },
  
    StartButtonText: {

        color: '#ffcd00',
        fontSize: 24,
        
    },
    getCoordsButton: {

        backgroundColor: '#115740',
        borderColor: '#ffcd00',
        borderRadius: 25,
        borderWidth: 2,
        top: '5%',
        opacity: 0.9,    
        padding: 10,
        alignSelf: 'center',
    },
    textInput: {
        
        borderColor: '#ffcd00',
        backgroundColor: '#ffffff',
        color: '#0f0f0f',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,  
        
    },

});