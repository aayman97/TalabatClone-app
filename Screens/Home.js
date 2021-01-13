import { AntDesign,Entypo } from '@expo/vector-icons';
import React, { useState , useEffect } from 'react';
import {StyleSheet
   , View
   ,ScrollView
   ,TouchableOpacity 
   ,Dimensions} from 'react-native'
import {Text} from 'react-native-elements'
import TypesCards from '../Components/TypesCard';
import * as Font from 'expo-font'
import AppLoading  from 'expo-app-loading';
import Backdrop from '../Components/Backdrop';
import firebase from 'firebase'
import {projectFirestore} from '../firebase/Config'
import OrderCardScrollView from '../Components/OrderCardScrollView';
import MealCardScrollView from '../Components/MealCardScrollView';
import { Spinner } from 'native-base';



const getFonts = () => {
  return Font.loadAsync({
    'roboto': require('../assets/Fonts/Roboto-Black.ttf')
  })
}

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

const Home = ({navigation}) => {

const [fontIsLoaded,setFontIsLoaded] = useState(false)
const [user,setUser] = useState(false);
const [currentUser,setCurrentUser] = useState('')
const [emptyOrder,setEmptyOrders] = useState(false)
//const [resturantNames,setResturantNames] = useState()
const [loading,setLoading] = useState(false)



useEffect(()=>{
  //setUser(false)

setLoading(true)
  firebase.auth().onAuthStateChanged(user => {
  
    
    
    if(user){
      setCurrentUser(user)
      setUser(true)
      const wait = async ()=> await projectFirestore.collection('Users').doc(user.providerData[0].email+'').collection('Orders').orderBy('createdAt').get().then(
        res => {
            if(!res.empty){
               console.log('No Empty doc')
               setEmptyOrders(false)
            }
            else{
                setEmptyOrders(true)
            }
            //setOrders(temp)
        }
    )
   wait()

         
    }
    else {
      setCurrentUser(user)
      setUser(false)

    }
    
  })
setTimeout(()=> {

  console.log(emptyOrder)
  setLoading(false)
},1000)
},[currentUser,emptyOrder])






if(fontIsLoaded){
   if(loading){
     return (
       <Spinner color ='orange' size ='large'/>
     )
   }
   else{
    return (
    
      <View style ={{backgroundColor : 'white'}}>
      
      {navigation.setOptions({ headerLeft : () => <Entypo name="menu" 
                                          size={30} color="black" 
                                          style ={{marginLeft : 10}}
                                          onPress ={() => {
                                            user ? navigation.toggleDrawer() : null;
                                          }}
                                          /> })}
        
       { !user ?  <Backdrop onPress = {() => setUser(true)}/>: 
       (
  <View>
  <ScrollView contentContainerStyle ={{position : 'relative', backgroundColor : 'white'}} scrollEnabled ={user }>
        <Text style = {{fontSize : 25,color : 'black' ,
         fontFamily : 'roboto' , marginLeft : 5,marginTop : 20}}>
             What would you like to order, {currentUser ? currentUser.displayName : null} ?
        </Text>
  
  
  
    <View style = {{ flexDirection : 'row',marginTop : 20}} >
     <TypesCards image = 'food'  title = 'Food'></TypesCards>
     <TypesCards image = 'Grocery' title = 'Grocery'></TypesCards>   
   </View>
  
    
  
      
   
  
     {emptyOrder ? 
     (

     <View style ={{width : undefined , 
                    height : height*0.235, 
                    margin : 10,
                    justifyContent : 'center',
                    alignItems : 'center'
                    }}>
      <Text style ={{fontSize : 20,
                     fontWeight : 'bold',
                     color : '#ff4500',
                     includeFontPadding : true
                     }}>
         Start your first Order now !!!!
         </Text>
        
     </View>

     )
     
     
     :
     
     
     (  
       <View>
       <View style = {{ flex : 2, flexDirection : 'row'
       , paddingHorizontal : 2,justifyContent : 'space-between'
       ,alignItems : 'center', marginTop : 20 }}>
       <Text style = {{fontSize : 20 
     ,fontWeight : 'bold'}}> Order again </Text>
     <TouchableOpacity style = {{ padding : 10}}>
       <AntDesign name="arrowright" size={24} color="orange" />
       </TouchableOpacity>
     </View>
     <OrderCardScrollView/>
     </View>

     )}
     
       <View style = {{ flex : 2, flexDirection : 'row'
          , paddingHorizontal : 2,justifyContent : 'space-between'
          ,alignItems : 'center', marginTop : 20 }}>
          <Text style = {{fontSize : 20 
        ,fontWeight : 'bold'}}> EGP 50 Meals </Text>
       </View>
  
  
    <MealCardScrollView/> 
          

  
      </ScrollView>  
      <TouchableOpacity style = {{alignItems : "center" ,margin : 5 , padding : 5 }}
       onPress = {() => navigation.navigate('Resturants',{type : ''})}>
  
      {width > 400 ?   
      <View style = {{width : 390,height :50, backgroundColor : '#ff4500' , alignItems : 'center' 
                       ,borderRadius : 10  }}
                      >
         <Text style = {{ color : 'white' , paddingTop : 15 }}> View all resturants</Text>
        </View> :
   <View style = {{width : 340,height :50, backgroundColor : '#ff4500' , alignItems : 'center' 
   ,borderRadius : 10  }}
  >
  <Text style = {{ color : 'white' , paddingTop : 15 }}> View all resturants</Text>
  </View> 
        }
      </TouchableOpacity>
      </View>
       )
       
       }
  
  
      
  
      </View>
    )
   }


}
else {
  return <AppLoading
  startAsync = {getFonts}
  onFinish = {() => {setFontIsLoaded(true)}}
  onError ={console.warn}
  />
}



  

}
 


export default Home