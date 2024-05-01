//uses appStyleIndex to determine a app theme
function appThemeSelector(){
    switch(appStyleIndex){
      case 0:
        return lightApp;
        break;
      case 1:
        return darkApp;
        break;
      case 2:
        return retroApp;
        break;
      case 3:
        return atuApp;
        break;
      default:
        return atuApp;
        break;
  
    }
  }