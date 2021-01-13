import React from 'react';
import { StyleSheet, View ,Text,Dimensions,ScrollView} from 'react-native';
import DatabaseTrial from './DatabaseTrial';
import Checkout from './Screens/Checkout';
import Home from './Screens/Home';
import ResturantInfoAndProducts from './Screens/ResturantProducts';
import {NavigationContainer, useNavigation, useRoute} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator,DrawerItemList,DrawerContentScrollView} from '@react-navigation/drawer'
import {Header} from 'react-native-elements'
import UserProvider from './Context/UserContext';
import SearchBar from './Screens/SearchBar';
import Cusines from './Screens/Cusines';
import Resturants from './Screens/Resturants';
import AuthProvider from './Context/AuthContext'
import { Drawer } from 'native-base';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Entypo,AntDesign  } from '@expo/vector-icons'; 
import firebase from 'firebase'

const stack = createStackNavigator()
const drawer = createDrawerNavigator()

const HomeScreen = ({navigation}) => {
return(
<stack.Navigator screenOptions ={{gestureEnabled : false}} >
       <stack.Screen name = 'Home' component ={Home}  />
       <stack.Screen name = 'Resturants' component ={Resturants}/>
       <stack.Screen name = 'Cusines' component = {Cusines}/>
       <stack.Screen name = 'Search' component ={SearchBar}/>
       <stack.Screen name = 'Products' component ={ResturantInfoAndProducts} />
       <stack.Screen name = 'Checkout' component ={Checkout} />
</stack.Navigator>
)
}

export default function App() {

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

  return (
  
  <AuthProvider>
   <UserProvider>
   <NavigationContainer >
      <drawer.Navigator drawerContent ={(props) => {
        return(
          <DrawerContentScrollView {...[props]}>
           <DrawerItemList {...props}/>
           <TouchableOpacity 
           onPress ={() => firebase.auth().signOut()}
           style ={{backgroundColor : 'rgba(144,122,122,0.3)',width : undefined,height : height*0.04,flexDirection : 'row',
                                      borderRadius : 5 , margin : 10 , justifyContent : 'center',alignItems : 'center'}}>
             <AntDesign name="logout" size={20} color="black" style ={{marginHorizontal : 20}} />
             <Text style ={{fontWeight : 'bold',fontSize : 15,marginRight : width*0.37}} >
              Sign out
             </Text>
           </TouchableOpacity>
          </DrawerContentScrollView>
        )
      }}>
        <drawer.Screen name = 'Home' component ={HomeScreen} options={{swipeEnabled : false,
          drawerIcon : () => <Entypo name="home" size={20} color="black" /> }} />
      </drawer.Navigator>
   </NavigationContainer>
   </UserProvider>
   </AuthProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    backgroundColor: 'white', 
   //alignItems: 'center',
  // justifyContent: 'center',
    
  },
});
