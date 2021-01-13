import React, { Component, useEffect, useState,useRef} from 'react';
import {  MaterialCommunityIcons,MaterialIcons , Entypo,Ionicons} from '@expo/vector-icons';
import { 
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
    FlatList,
    StyleSheet
 } from 'react-native'
import ResturantTopView from '../Components/ResturantTopView';
import ProductCard from '../Components/ProductCard';
import ViewBasket from '../Components/ViewBasket';
import Animated, { interpolate } from 'react-native-reanimated'
import {projectFirestore,projectStorage} from '../firebase/Config'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useUser } from '../Context/UserContext';
import { useNavigation } from '@react-navigation/native';


 const ResturantInfoAndProducts = ({route,navigation}) => {

   const [resturant,setResturant] = useState();
    const[products,setproducts] = useState();
    const scrollA = useRef(new Animated.Value(0)).current;
   // const [basket,setBasket] = useState([])
    const [active,setActive] = useState([])
    const [imageHeight,setImageHeight] = useState(0)
    const [imageWidth,setImageWidth] = useState(0)

    const item = route.params.item;

    let width = Math.round(Dimensions.get('window').width);
    let height = Math.round(Dimensions.get('window').height);


    
  
    
  
    
  const {basket,setBasket} =useUser()
   
  const styles =StyleSheet.create( {
    ResturantTopView : scrollA => ({
        height : imageHeight+180,
        width : width,
        transform: [
          {
            translateY: scrollA.interpolate({
              inputRange: [-height/2, 0, height/2,height/2+ 1],
              outputRange: [-180, 0, 180 * 0.75, 180 * 0.75],
            }),
          },
          
        ],
        
    }),
    image : scrollA => ({
      height :imageHeight,
      width : width,
      resizeMode: 'stretch',
      transform: [
          {
              translateY: scrollA.interpolate({
                inputRange: [-imageHeight, 0, imageHeight],
                outputRange: [-imageHeight, 0, 0],
              }),
            },
        {
          scale: scrollA.interpolate({
            inputRange: [-imageHeight/2, 0, imageHeight/2],
            outputRange: [2, 1 , 1],
          }),
        },
      ],
      
  })
  
   })

  useEffect(() =>{
    
    setActive([])
    
    
    var subscribe = projectFirestore.collection('Resturants').doc(item.name)
    .collection('Products').orderBy('type').onSnapshot(
        doc => {
            const productsTemp = []
          
                
                doc.forEach(doc => {
                    if(doc.exists){
                        productsTemp.push(doc.data())                        }
                })
            
            setproducts(productsTemp)
        }
    )
  
    
    return subscribe;
  },[])

useEffect(()=>{

  Image.getSize(item.url,(w,h)=>{
    setImageHeight(h)
    setImageWidth(w)
  })

  //console.log(imageHeight)
},[imageHeight])

function Isactive(item){
  let duplicate = false
for(let i = 0;i< basket.length;i++){
  if(basket[i].item.name === item.name){
    duplicate = true
    break;
  }
}
  return duplicate
}

function addinBasket (item){

let duplicate = false
for(let i = 0;i< basket.length;i++){
  if(basket[i].item.name === item.name){
    duplicate = true
    break;
  }
}
if(duplicate === false){
 setBasket([...basket,{item,amount:1}])

 return true
}
else{

  return false
}

}

    return(
<View style ={{flex : 2 }}>

{
  navigation.setOptions({headerLeft : () => (
    <Ionicons name="arrow-back" size={27} color="black" style ={{margin : 5}} 
    onPress ={() =>{
    
        navigation.pop()
      

    }}/>
  )})
}
     <View style ={{flex : 1}}>

      {console.log('Resturant Products : ',item)}
       
        <Animated.ScrollView indicatorStyle ='black'
         onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollA}}}],
            {useNativeDriver: true},
          )}
         scrollEventThrottle = {16}  >

     <Animated.View  style={styles.ResturantTopView(scrollA)}>      
            <ResturantTopView styleAnimation ={styles.image(scrollA)} item ={item}/>
     </Animated.View> 
     {/* <View style ={{width : width , height : height*0.05 , backgroundColor : 'orange'}}/>  */}
           {
               products ? products.map(item =>{
              
                return(
                  <TouchableWithoutFeedback onPress ={
                    () => {
                     if(addinBasket(item)){
                      setActive([...active,item])
                     }
                    // else {
                    //   var basketTemp = [...basket]
                    //   var index = basket.indexOf(item)
                    //   if(index !== -1){
                    //     basketTemp.splice(index,1)
                    //     setBasket(basketTemp)
                    //   }
                     
                    // }
                    }
                  }>
                  <ProductCard 
                    name = {item.name}
                    price = {item.price}
                    type = {item.type}
                    url = {item.url}
                    active = {Isactive(item)}
                    />
                    </TouchableWithoutFeedback>

                 
            )
               }):null
           }

        </Animated.ScrollView>

     
</View>


        <ViewBasket itemsLength ={basket.length} basket ={basket}  
        onPress ={() =>navigation.navigate('Checkout',{item : item,basket : basket})} 
        />
   
        </View>
    )
 }

 const height = Math.round(Dimensions.get('window').height);
 
 export default ResturantInfoAndProducts;