import React, { Component } from 'react';
import {  MaterialCommunityIcons,MaterialIcons , Entypo} from '@expo/vector-icons';
import { 
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions
 } from 'react-native'
 import {Text} from 'react-native-elements'
 import {projectFirestore,projectStorage} from '../firebase/Config';
import { useNavigation } from '@react-navigation/native';
 
const ResturantNavButtons = (props) => {

const navigation = useNavigation()

 let width = Math.round(Dimensions.get('window').width);
 let height = Math.round(Dimensions.get('window').height);

return(

    <View style = {{flexDirection : 'row', justifyContent : 'space-around',
    marginHorizontal : 5,marginTop : 10, marginBottom : 10
 }}>
     
     
     <TouchableOpacity style = {{backgroundColor : 'orange' , height : 40, 
          width : (width/4)+20, borderRadius : 10 , alignItems : 'center' , justifyContent : 'center'}} 
          onPress = {props.open} 
          >
         

         <View style = {{flexDirection : 'row'}}>
         <MaterialIcons name = "filter-list" size = {25} color = 'white'/>
         <Text style = {{fontSize : 20 , color : "white"}}> Sort By</Text>
         </View>

        

     
         </TouchableOpacity>

         <TouchableOpacity style = {{backgroundColor : 'orange' , height : 40, 
          width : (width/4)+20, borderRadius : 10 , alignItems : 'center' , justifyContent : 'center'}} 
          onPress = {props.cusines}
          
          >
      

         <View style = {{ flexDirection : 'row'}}>
         <Entypo name="bowl" size={25} color="white" />
         <Text style = {{fontSize : 20 , color : 'white'}}> Cusines</Text>
         </View>


         </TouchableOpacity>

         <TouchableOpacity style = {{backgroundColor : 'orange' , height : 40, 
          width : (width/4)+20, borderRadius : 10 , alignItems : 'center' , justifyContent : 'center'}} 
          onPress = {props.search}
          >

         <View style = {{ flexDirection : 'row'}}>
         <MaterialIcons name = "search" size = {25} color = 'white'/>
         <Text style = {{fontSize : 20 , color : 'white'}}> Search</Text>
         </View>
         </TouchableOpacity> 



     </View>

)

}

export default ResturantNavButtons;