import React, { Component } from 'react';
import {StyleSheet , View,ScrollView, SafeAreaView} from 'react-native'
import {Text} from 'react-native-elements'
import TypesCards from '../Components/TypesCard';

const ScrollTypeCards = (props) =>{

    return (

    
        <ScrollView 
        horizontal
        contentContainerStyle = {{flex : 4,flexDirection : 'row' , alignItems : "center" , justifyContent :'space-between'}}>
        
          <TypesCards/>
          <TypesCards/>
          <TypesCards/>
          <TypesCards/>
       
        </ScrollView>
     
    )
}
export default ScrollTypeCards