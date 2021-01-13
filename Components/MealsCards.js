import { useNavigation } from '@react-navigation/native';
import { AntDesign , FontAwesome , Octicons ,Entypo , MaterialIcons} from 'expo-vector-icons';
import React, { Component } from 'react';
import {StyleSheet , View ,Image, TouchableOpacity, SafeAreaView} from 'react-native'
import {Text} from 'react-native-elements'

const MealsCard = ({type,delieveryTime,name,url,item}) => {

const navigation = useNavigation()
return(
  

     <TouchableOpacity onPress ={() => navigation.navigate('Products',{item : item})}>    
     <View style ={{flex: 1, margin : 15, maxWidth : 300}}>

      <Image 
      source = {{uri : url}}
      style ={{flex : 1,width  : 300, height : 100 , borderRadius : 10,
          resizeMode : 'cover'}}
      />   

   <View style = {{flex : 2, flexDirection : "row",justifyContent : 'space-between'
                  ,alignItems : "baseline" , paddingTop : 5}}>

    <View style={{maxWidth : 150,maxHeight : 100}}>                  
    <Text style = {{fontSize : 15,fontWeight :'bold'}}>{name}</Text>
    </View> 

    <View style ={{ flexDirection : "row" ,paddingBottom : 15}}>
    <FontAwesome name="motorcycle" size={20} color="black" />
    <Text style ={{fontWeight : '400'}}> within {delieveryTime} min </Text>
    </View>

    </View>

    <Text  style ={{fontWeight : '200'}}>{type}</Text>

    <View style ={{flexDirection : 'row' , paddingTop : 3}}>
     
     <View style = {{ paddingTop : 3}}>
    <Octicons name="smiley" size={15} color="black" />
    </View>

    <Text style = {{paddingHorizontal : 1}} > Very good</Text>

    <View style ={{alignItems : "center" , paddingTop : 3}}>
    <Entypo name="dot-single" size={15} color="gray" />
    </View>

    <Text>Delivery: 42.00</Text>

    </View>


    {/* <View style ={{flexDirection : 'row' , paddingTop : 3}}>
     
     <View style = {{ paddingTop : 3}}>
     <MaterialIcons name="local-offer" size={15} color="#e75480" />
    </View>

    <Text style = {{paddingHorizontal : 1 , color :'#e75480'}} > 25% OFF selected items</Text>

    <View style ={{alignItems : "center" , paddingTop : 3}}>
    <Entypo name="dot-single" size={15} color="gray" />
    </View>

    <Text style = {{color : '#e75480'}}>Special deals</Text>

    </View> */}
 

    
      </View>
      </TouchableOpacity>

)

}

export default MealsCard;