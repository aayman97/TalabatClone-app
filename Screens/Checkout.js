import React, { Component, useState ,useEffect} from 'react';
import {  MaterialCommunityIcons,MaterialIcons , Entypo,AntDesign,Ionicons } from '@expo/vector-icons';
import { 
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image
 } from 'react-native'
 import {Text} from 'react-native-elements'
import { SafeAreaView } from 'react-native';
import ProductAmountCard from '../Components/ProductAmountCard';
import { useUser } from '../Context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase'
import { Button } from 'native-base';
import ConfirmationView from '../Components/ConfirmationView';
import { projectFirestore } from '../firebase/Config';

const Checkout = ({navigation,route,router}) => {
    let width = Math.round(Dimensions.get('window').width);
    let height = Math.round(Dimensions.get('window').height);
    
    const [closed] = useState(true)
    const {basket,setBasket,totalAmount,setTotalAmount} =useUser()
    const[viewConfirmation,setViewConfirmation] = useState(false)
    const [email,setEmail] = useState()
    
    
   
     useEffect(()=> {
     
     firebase.auth().onAuthStateChanged(user =>{
       if(user){
         setEmail(user.providerData[0].email)
       }
     })

     },[])
    
    function confirmOrder(){
     
    const createdAt = firebase.firestore.Timestamp.now().toDate()
  
      projectFirestore.collection('Users').doc(email+'').collection('Orders').add(
      {
        Order : basket.map(obj => obj),
        TotalAmount : totalAmount,
        Resturant : route.params.item,
        createdAt : createdAt
      }
      ).then(res => {
        console.log(res)
        setViewConfirmation(false)
        setBasket([])
        navigation.navigate('Home')
      }).catch(err => console.log(err))
    
      // console.log(createdAt)

    }

  

    return(
    
    <View style ={{flex : 1,backgroundColor : 'rgba(128, 128, 128, .1)',borderRadius :5}}>

      {navigation.setOptions({headerLeft : () => (
        <Ionicons name="arrow-back" size={27} color="black" style ={{margin : 5}} 
        onPress ={() => navigation.goBack()}/>
      )})}

    {console.log('Route params from ResturantInfoProducts.js ',route.params)}
    { viewConfirmation ?  <ConfirmationView 
    confirm ={() => confirmOrder()}
    cancel ={() => setViewConfirmation(false)}/> 
    : null}

      <ScrollView scrollEnabled = {basket.length >= 5 ? true : false}>
       {basket.map(item => {
         return (
           <ProductAmountCard name = {item.item.name} price = {item.item.price} url ={item.item.url} amount ={item.amount}/>
         )
       })}
  

   </ScrollView>

    <View style ={{backgroundColor : 'white'}}>
        <View style ={{marginTop : 10, marginBottom : 15}}>
        <Text style ={{fontSize : 30 , margin : 10, fontWeight : 'bold' ,shadowRadius : 15}}> Order Payment</Text>
        </View>
      
    <View style ={{flexDirection : 'row' , justifyContent : 'space-between' ,
    borderRadius : 10,paddingHorizontal : 20}}>
     <Text style ={{fontWeight : '500' , fontSize : 16}}> Basket Total : </Text>
     <Text style ={{fontWeight : '300' , fontSize : 16}}> {totalAmount} EGP </Text>
    </View>

    <View style ={{flexDirection : 'row' , justifyContent : 'space-between' ,
    borderRadius : 10,paddingHorizontal : 20 , marginTop : 10 , marginBottom : 10}}>
     <Text style ={{fontWeight : '500' , fontSize : 16}}> Delievery Fees : </Text>
     <Text style ={{fontWeight : '300' , fontSize : 16}}> 30 EGP </Text>
    </View>
   


   
    <View style ={{justifyContent : 'center',alignItems:'center',width : width,borderColor : 'black',
      height : (height*0.06) ,marginBottom : 30}}>
        <TouchableOpacity style ={{ marginTop : 30, width : width*0.92 , borderRadius : 10,
                                        justifyContent : 'center',alignItems:'center',
                                        height : (height*0.06),backgroundColor : 'orange'}}
                          onPress ={() => setViewConfirmation(true)}
                                        >
        <Text style ={{fontSize : 30,fontWeight :'600', color : 'white',letterSpacing : 2}}> Checkout </Text>                                  

        </TouchableOpacity>
  </View>
  </View>
  </View>
    )
}

export default Checkout;