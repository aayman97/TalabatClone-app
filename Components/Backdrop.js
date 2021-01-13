import { AntDesign,Ionicons ,Entypo } from '@expo/vector-icons';
import React, { Component ,useState , useEffect } from 'react';
import {StyleSheet
   , View
   ,ScrollView
   ,Image
   , TouchableOpacity 
   ,Dimensions
} from 'react-native'
// import {Button} from 'react-native-elements'
import {Text} from 'react-native-elements'
import MealsCard from '../Components/MealsCards';
import OrderAgainCard from '../Components/OrderAgainCard';
import ScrollTypeCards from '../Components/ScrollTypeCards'
import TypesCards from '../Components/TypesCard';
import * as Font from 'expo-font'
import AppLoading  from 'expo-app-loading';
import { useUser } from '../Context/UserContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import * as GoogleSignIn from 'expo-google-sign-in';
import { Button } from 'native-base';
import {authenticationByGoogle,provider} from '../firebase/Config'
import firebase from 'firebase'
import * as Google from 'expo-google-app-auth';
import * as Expo from 'expo'
import { useAuth } from '../Context/AuthContext';
import { set } from 'react-native-reanimated';






const Backdrop = ({onPress}) =>{

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
const [user,setUser] = useState()
const {signInWithGoogleAsync} = useAuth()

useEffect(()=>{



firebase.auth().onAuthStateChanged(user => {

    setUser(user)
    
})

},[user])


    return(

        <View style = {{height : height, width : width , backgroundColor : 'rgba(0,0,0,0.7)',
    position : 'absolute' , zIndex : 1,justifyContent : 'center',alignItems : 'center'}}>

    <View style ={{width : width*0.9 , height : height*0.3 , backgroundColor : 'white'
    , borderRadius : 20, marginBottom : 200, flexDirection : 'row', alignItems:'center',justifyContent : 'center'
  }}>
   
       <View style ={{width:width*0.7}}>
       <Button block style ={{borderRadius : 10 , justifyContent : 'space-around',backgroundColor : '#4285f4'}} onPress ={() =>{
       signInWithGoogleAsync()
       firebase.auth().onAuthStateChanged(user => {
         if(user){
           onPress()
         }
       })
       }}>
       <AntDesign name="googleplus" size={35} color="white" />
        <Text style ={{color : 'white',fontSize : 18,fontWeight : 'bold'}}> Sign-in With Google</Text>
        </Button>
        </View>
      
    </View>
    </View> 
    )
}

export default Backdrop;