import React, { Component } from 'react';
import {  MaterialCommunityIcons,MaterialIcons , Entypo} from '@expo/vector-icons';
import { 
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image
 } from 'react-native'
 import Animated from 'react-native-reanimated'
 import {Text} from 'react-native-elements'
import { SafeAreaView } from 'react-native';
import { ImageBackground } from 'react-native';

const ResturantTopView = ({styleAnimation , item}) =>{

    let width = Math.round(Dimensions.get('window').width);
    let height = Math.round(Dimensions.get('window').height);
    return(
        <View >
       
        <Animated.Image style = {styleAnimation}
        source = {{uri : item.url }}
        />
        {console.log('Item from resturant Top View : ',item)}
      
        <Text style ={{fontWeight : 'bold' ,fontSize : 30 , margin : 5}}> {item.name}</Text>
        <Text style = {{marginLeft : 8 , marginTop : 5 , fontWeight :'100'}}>{item.type}</Text>

       
        <View style = {{flexDirection : 'row' , marginRight : 5,marginLeft : 5,
        borderTopWidth : 1,borderColor : 'rgba(128, 128, 128, .1)' , marginTop : 9
    }}/>
        <View style ={{flexDirection : 'row' , marginTop : 12 , marginBottom : 12 , marginLeft : 5}}>

        <MaterialIcons name="star-rate" size={24} color="black" />
        <Text style={{fontWeight : '300' , marginTop : 4}}> Rating : {item.rating}</Text>

        </View>
        

        <View style = {{flexDirection : 'row' , marginRight : 5,marginLeft : 5,
        borderTopWidth : 1,borderColor : 'rgba(128, 128, 128, .1)'
    }}>
         <View style ={{flexDirection : 'row' ,marginTop : 12 , marginBottom : 12}}>
        <MaterialIcons name="delivery-dining" size={24} color="black" />
        <Text style={{fontWeight : '300' , marginTop : 4}}> Within {item.delieveryTime} min</Text>
        </View>
        </View>

        </View>
    )
}

export default ResturantTopView