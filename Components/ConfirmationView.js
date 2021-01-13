import React, { Component, useState ,useEffect} from 'react';
import {  MaterialCommunityIcons,MaterialIcons , Entypo,AntDesign,Ionicons } from '@expo/vector-icons';
import { 
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
    
 } from 'react-native'
 import { Button,Text } from 'native-base';

 const ConfirmationView = ({cancel,confirm}) => {
 
    let width = Math.round(Dimensions.get('window').width);
    let height = Math.round(Dimensions.get('window').height);
  
 return(

    <View style ={{
        zIndex : 2000,
        width : width*0.9,
        height : height*0.2, 
        position : 'absolute',
        borderRadius : 15,
        bottom : height*0.4,
        margin : 20,
        borderColor: 'rgba(128, 128, 128, .5)',
        borderWidth : 1,
        backgroundColor : 'white',
        justifyContent : 'center',
        alignItems : 'center',
        flex : 4
        }}>
        
        <View style ={{flex : 2,alignItems : 'center',justifyContent : 'center'}}>
        <Text style = {{fontSize : 25,fontWeight : 'bold'}}> Order Confirmation</Text>
        </View>

       <View style ={{
       flexDirection : 'row',
       justifyContent : 'space-between', 
       width : width*0.7,
       alignItems : 'center',
       height : height*0.1,
       paddingHorizontal : 10,
       flex : 2
       }} >
        
        <Button transparent bordered 
        onPress ={confirm}
        style={{borderColor : 'blue',justifyContent :'center',alignItems :'center'}}
        >
         <Text style ={{fontSize : 19,fontWeight : '400',color : 'blue'}}> Confirm </Text>
        </Button>

        <Button transparent bordered onPress ={cancel}
        style={{borderColor : 'red',justifyContent :'center',alignItems :'center'}}
        >
         <Text style ={{fontSize : 19,fontWeight : '400',color : 'red'}}> Cancel  </Text>
        </Button>

       </View>

      </View>

 )


 }

 export default ConfirmationView