import { useNavigation } from '@react-navigation/native';
import { AntDesign } from 'expo-vector-icons';
import React, { Component } from 'react';
import {StyleSheet , View ,Image, ImageBackground, TouchableOpacity} from 'react-native'
import {Text} from 'react-native-elements'

const TypesCards = (props) => {
  const imageNames = {
    food: require('../assets/food.jpg'),
    Grocery: require('../assets/Grocery.jpg'),
 };
const navigation = useNavigation()
    return (
        <TouchableOpacity onPress ={() => {
          if(props.image === 'food'){
            navigation.navigate('Resturants',{type : ''})
          }
        }}>
        <View style = {{width : 150 , 
          borderRadius : 15 , marginLeft : 10}}>
                <Image 
             style ={{flex : 1,width  : 150 , height : 150 ,
                 resizeMode : 'cover', position : 'relative',borderRadius : 10 }}
             source = {
             props.image === 'food' ? require('../assets/food.jpg') : 
             props.image === 'Grocery' ?  require('../assets/Grocery.jpg') : null
               }
             />
         <Text style = {{position : 'absolute' , fontFamily : 'roboto',
        fontWeight : 'bold' , color : 'white',bottom : 10
             }}> {props.title}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fixedRatio: {
      backgroundColor: 'rebeccapurple',
      flex: 1,
      aspectRatio: 1
    },
  });

export default TypesCards;