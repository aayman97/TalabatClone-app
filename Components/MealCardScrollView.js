import React, { Component ,useState , useEffect } from 'react';
import {
    StyleSheet
   , View
   ,ScrollView
} from 'react-native'
import MealsCard from '../Components/MealsCards';
import {projectFirestore} from '../firebase/Config'
import firebase from 'firebase'
import { Text } from 'native-base';


const MealCardScrollView = (props)=> {
const [ResturantsAndProducts,setResturantsAndProducts] = useState()
const [Resturants,setResturants] = useState([])
const [startLoop,setLoop] = useState(false)
const[user,setUser] = useState(false)


   

    useEffect(()=>{

//   projectFirestore.collectionGroup('Resturants').get().then(
//         res => {
//             let temp = []

//             if(!res.empty){
//                 res.forEach(
//                     doc => {
                        
//                         if(doc.exists){
//                              temp.push(doc.data())
//                         }
//                     }
//                 )
//             }
//             setResturants(temp)
//         }
//     )
        
   const fetchData = async () => {
       const data = await projectFirestore.collection('Resturants').get()
       const resturantnameTemp = await data.docs.map(doc => doc.data())
       const finalTemp = []
       const loop = resturantnameTemp.map(async (item) => {
         const productData =  await projectFirestore.collection('Resturants').doc(item.name).collection('Products').get()
         console.log('..................')
         const add = await productData.docs.map(doc => doc.data())
         finalTemp.push({resturant : item , products : add})
          console.log('.....................')
         // console.log(add)
       })
       setTimeout(() => {
        setResturants(finalTemp)
        
       }, 1000);
   }
    fetchData()  
      },[])



    return (
        <ScrollView
        horizontal = {true} nestedScrollEnabled = {true}
        showsHorizontalScrollIndicator = {false} > 
  
        {
          Resturants.length >0 ? Resturants.map( item =>{
                             
                return(
                    <View>
                   {item.products ? item.products.map(product => {
                      if(parseInt(product.price) === 50){
                        return (
                            <MealsCard 
                            name = {item.resturant.name} 
                            delieveryTime ={item.resturant.delieveryTime}
                            type ={item.resturant.type}
                            url ={product.url}
                            item ={item.resturant}
                            />
                            
                           )
                      }
                     
                   }) : null}
                    </View>
                )
            
                
          
        

        }) : null}
        
        
        
      </ScrollView>
     
    )
}

export default MealCardScrollView;