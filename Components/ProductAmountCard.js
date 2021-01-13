import React, { Component, useState ,useEffect} from 'react';
import {  MaterialCommunityIcons,MaterialIcons , Entypo,AntDesign} from '@expo/vector-icons';
import { 
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image
 } from 'react-native'
 import {Text} from 'react-native-elements'
import { SafeAreaView } from 'react-native';
import { useUser } from '../Context/UserContext';
import { StackActions, useNavigation } from '@react-navigation/native';


const ProductAmountCard = ({name,price,url,amount}) => {
    let width = Math.round(Dimensions.get('window').width);
    let height = Math.round(Dimensions.get('window').height);
    const [count , setCount] = useState(amount);
    const [total,setTotal] = useState()
    const {basket,setBasket,totalAmount,setTotalAmount} =useUser()
    const navigation = useNavigation()

   function updateAndDecrement(){
      setCount(count - 1)
      Total(basket)
    }

    function updateAndIncrement(){
      setCount(count + 1)
      Total(basket)
    }

    useEffect(() => {
      var basketTempArray = basket
      var index = basket.findIndex(item => item.item.name == name ) 
      basketTempArray[index].amount = count
      var AmountOfZeroProduct = basketTempArray.findIndex(item => item.amount == 0)
      if(AmountOfZeroProduct !== -1){
        basketTempArray.splice(AmountOfZeroProduct,1)
      }
      setBasket(basketTempArray)
    //  console.log('basket from userEffect =====> ', basket)
    //  console.log('       ')
      console.log(Total(basket))
      setTotalAmount(Total(basket))
      console.log('Total = ',totalAmount)
    },[count,totalAmount])

    useEffect(() => {
      setTotalAmount(Total(basket))
    },[])
    
    // useEffect(()=> {
    //   console.log('total Amount = ', total)
    // },[total])

    function Total(basket){
      let total = 0;
      for(let i = 0;i< basket.length;i++){
        total = total + (basket[i].amount * parseInt(basket[i].item.price,10))
      }
      return total
    }

    
    return(
  
          <View style ={{flexDirection : 'row' ,justifyContent : 'space-around', width :width,height : (height*12)/100
        ,backgroundColor : 'white', display : parseInt(price,10)*count === 0  ? 'none' : 'flex'
        }} >
     
           <View style ={{ margin : 10}}>
            <Text style={{fontSize : 15,fontWeight : '500' }}> {name}</Text>
             
             <View style ={{flexDirection : 'row'}}>

             <Text style={{fontSize : 15 ,marginTop : 15}}> EGP {parseInt(price,10)*count}</Text>

            <View style ={{flexDirection : 'row',justifyContent : 'space-evenly',  marginTop : 15 , paddingHorizontal : 50}}>
            <AntDesign name="minus" size={24} color="orange" onPress ={() => {count > 0 ? updateAndDecrement() : null}} />
            <Text style={{fontSize : 17 , paddingHorizontal : 25}}> {count} </Text>
            <AntDesign name="plus" size={24} color="orange" onPress ={() => updateAndIncrement()}/>
            </View>

           
            </View>
           </View>

           <Image style ={{width : (width*20)/100 , height : (width*20)/100 , borderRadius : 10 ,margin : 10,marginTop : 15}} 
           source ={{uri : url}}
           />
          </View>
   
    )
}

export default ProductAmountCard;