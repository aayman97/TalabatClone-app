import React, { Component ,useState , useEffect } from 'react';
import {StyleSheet
    , View
    ,ScrollView
    ,Image
    , TouchableOpacity 
    ,Dimensions,
    LogBox
 } from 'react-native'
 import OrderAgainCard from '../Components/OrderAgainCard';
 import firebase from 'firebase'
import { projectFirestore } from '../firebase/Config';
import { useUser } from '../Context/UserContext';
import { useNavigation } from '@react-navigation/native';

 const OrderCardScrollView = (props) => {

    const [currentUser,setCurrentUser] = useState()
    const[orders,setOrders] = useState()
   
    const {basket,setBasket} =useUser()

    const navigation = useNavigation()

    useEffect(()=> {
   
     firebase.auth().onAuthStateChanged(user => {

        if(user){
            setCurrentUser(user)

         projectFirestore.collection('Users').doc(user.providerData[0].email+'').collection('Orders').orderBy('createdAt').get().then(
             res => {
                const temp = []
                 if(!res.empty){
                   // console.log('No Empty doc')
                     res.forEach(docs => {
                         if(docs.exists){
                            temp.push(docs.data())
                         }
                     })

                 }
                 else{
                    // console.log('Empty doc')
                 }
                 setOrders(temp)
             }
         )
        }
     })
    
    
    },[])


    return(
        <ScrollView
        horizontal = {true} nestedScrollEnabled = {true}
        showsHorizontalScrollIndicator = {false} > 
       {
         orders ? orders.map(item => {
             
             return(
                <OrderAgainCard 
                ResturantName ={item.Resturant.name} 
                totalAmount = {item.TotalAmount}
                firstOrderName ={item.Order[0].item.name}
                firstOrderAmount = {item.Order[0].amount}
                goToCheckoutPage = {() => {
                    setBasket(item.Order)
                    navigation.navigate('Products',{item : item.Resturant})
                
                }}
                />
             )
         }) : null
       }
       
       </ScrollView>
    )
    
 }

 export default OrderCardScrollView