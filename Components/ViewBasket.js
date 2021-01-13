import React, { Component, useState } from 'react';
import {  MaterialCommunityIcons,MaterialIcons , Entypo} from '@expo/vector-icons';
import { 
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
 } from 'react-native'
 import {Text,Button} from 'react-native-elements'

 const ViewBasket = ({itemsLength , basket , onPress})=> {

    let width = Math.round(Dimensions.get('window').width);
    let height = Math.round(Dimensions.get('window').height);
   
    const[itemsNumber, setItemNumbers] = useState(itemsLength)
    return(
    <View style={{width : '100%', height : '10%',borderWidth : 1,
                borderColor : 'rgba(128, 128, 128, .3)',backgroundColor : 'white'}}>
        <TouchableOpacity style ={{width : width-20, height : (height*6)/100 ,marginLeft : 10,marginTop : 15,borderWidth : 1,
                borderColor : 'rgba(128, 128, 128, .3)' ,borderRadius : 10  , backgroundColor : 'orange'}}
               disabled = {itemsLength === 0 ? true : false}
               onPress ={onPress}
                >

            <View style ={{flex : 2,alignItems :'center' , justifyContent:'space-between',flexDirection : 'row'}}>


            {/* <Entypo style ={{paddingHorizontal : 20 }} name="circle" size={40} color="white" /> */}
            <View style = {{width : (width*10)/100,height : (width*10)/100 , borderRadius : ((width*10)/100)/2 , 
            borderColor : 'white',borderWidth : 5,marginHorizontal : 15 , justifyContent : 'center', alignItems : 'center'}}>

            <Text style ={{fontSize : 20, fontWeight : '500' , color : 'white'}}> {itemsLength} </Text>

            </View>
            <Text style={{fontSize :18,color : 'white',letterSpacing : 2,fontWeight : '500',paddingHorizontal:10}}> View Basket</Text>
            </View>

        </TouchableOpacity>
     </View>
    )

 }

 export default ViewBasket;