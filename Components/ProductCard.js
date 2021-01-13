import React, { Component, useState , useEffect} from 'react';
import {  MaterialCommunityIcons,MaterialIcons , Entypo} from '@expo/vector-icons';
import { 
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
 } from 'react-native'
 import {Text} from 'react-native-elements'
import { useUser } from '../Context/UserContext';

 const ProductCard = ({name,price,type,url,active}) => {
   // const [active,setActive] = useState(false)
    //const[basket,setBasket] = useState([])
    let width = Math.round(Dimensions.get('window').width);
    let height = Math.round(Dimensions.get('window').height);
    
  

    return(
        

        <View style ={{backgroundColor : 'white' , paddingVertical : 5}}>
            <View style ={{flexDirection : 'row'}}>
                <View style ={{paddingHorizontal : 2,borderRightWidth : active ? 10 : null,
                          borderColor : 'rgba(255,140,0,.9)',borderRadius : 20}}/>
                <View style ={{flex : 2, marginLeft : 5, marginTop : 10}}>
                <Text style ={{fontWeight : 'bold'}}> {name}</Text>
                <Text style ={{fontWeight : '400',marginTop : 10}}> {price} EGP </Text>
                </View>

                <Image
                style ={{width : (width*20)/100 , height : (width*20)/100  , borderRadius : 10 , margin : 10}}
                source = {{uri : url}}
                />
           </View>
        </View>
       

    )
 }

 export default ProductCard ;
