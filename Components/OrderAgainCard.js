import { AntDesign , FontAwesome } from 'expo-vector-icons';
import React, { Component } from 'react';
import {StyleSheet , View ,Image, ImageBackground, TouchableOpacity, SafeAreaView} from 'react-native'
import {Text} from 'react-native-elements'

const OrderAgainCard =({ResturantName,totalAmount,firstOrderAmount,firstOrderName,goToCheckoutPage})=> {

return (

    <View style = {{ flex: 3,flexDirection : 'column',borderRadius : 10 ,
                    width :320,height:150 ,borderColor :'#dcdcdc'
                 ,borderWidth : 3,marginLeft : 10 , marginTop : 10 
                 , justifyContent : 'center' , maxWidth : 270 , }}>

    <View style = {{flex : 2, flexDirection : 'row'
          ,justifyContent : 'space-between'
          ,alignItems : 'center' }}>   

    <Text style ={{  fontSize : 28 ,fontWeight : '100'
                    , marginLeft : 5 ,  fontFamily : 'roboto' }}>
        {ResturantName}
    </Text>

    <Text style ={{ fontSize : 15,marginRight: 5
                   , marginBottom : 10  , fontWeight : 'bold'}}> 
     EGP {totalAmount}.0
    </Text>
    
    </View>

    <View>
    <Text style = {{marginLeft : 5 ,paddingTop :5 ,paddingBottom : 10}}> {firstOrderAmount} x {firstOrderName} </Text>
    </View>  
    
       <View style = {{flex : 1, flexDirection : 'row'
          ,justifyContent : 'space-evenly'
          ,alignItems : 'flex-start'  , marginLeft : 5}}>   
          
          <TouchableOpacity onPress ={goToCheckoutPage}>
          <View style={{flex : 2 , flexDirection : 'row' , justifyContent : 'flex-start' ,alignItems : "center"}}>
         <Text style ={{fontWeight : 'bold' , paddingHorizontal : 5 , color : 'orange'}}> re-Order</Text>
          <AntDesign  name="reload1" size={24} color="orange" />
          </View>
          </TouchableOpacity>

          <TouchableOpacity>
          <View style={{flex : 2 , flexDirection : 'row' , justifyContent : 'flex-start' ,alignItems : "center"}}>
         <Text style ={{fontWeight : 'bold' , paddingHorizontal : 5 , color :'orange'}}> rating</Text>
          <FontAwesome name="smile-o" size={24} color="orange" />
          </View>
         </TouchableOpacity>

          </View>
   
  </View>


)



}

export default OrderAgainCard;