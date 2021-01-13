import React, { Component, useState ,useEffect} from 'react';
import {  MaterialCommunityIcons,MaterialIcons , Entypo,Ionicons} from '@expo/vector-icons';
import { 
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
    Animated,
    TouchableOpacity 
 } from 'react-native'
 import {Text} from 'react-native-elements'
import { SafeAreaView } from 'react-native';
import ResturantNavButtons from '../Components/ResturantNavButtons';
import ResturantCard from '../Components/ResturantCard';
import {projectFirestore,projectStorage} from '../firebase/Config';
import { useUser } from '../Context/UserContext';
import {Picker, Spinner} from 'native-base'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import Animated from 'react-native-reanimated'

 const Resturants = ({navigation,route}) => {
     let width = Math.round(Dimensions.get('window').width);
     let height = Math.round(Dimensions.get('window').height);
    const [translateY] =  useState(new Animated.Value(height*0.4))
    const[resturants,setresturant,itemURL,setItemURL] = useState();
    const[allTheResturants,setAllTheResturants] = useState()
   

    const [filterBy,setfilterBy] = useState();
    const [backDrop, openBackDrop] = useState()
    const [loading,setLoading] = useState(false)
 
    const {resturantFromDataBase,setRresturantFromDataBase} =useUser()
  



    useEffect(() => {
     
   // openBackDrop(false)
    setLoading(true)
    
     if(filterBy && route.params.type !== ''){
     
        var subscribe = projectFirestore.collection('Resturants').orderBy(filterBy).onSnapshot(
            doc => {
                const resturantTemp = []
                if(!doc.empty){
                    
                    doc.forEach(doc => {
                        if(doc.exists){
                            if(doc.data().type === route.params.type){
                                resturantTemp.push(doc.data())  
                            }
                                                  }
                    })
                }
                setresturant(resturantTemp)
                setLoading(false)
              
            }
        )
       
        
        return subscribe;
     }
    else if(filterBy){
   
        var subscribe = projectFirestore.collection('Resturants').orderBy(filterBy).onSnapshot(
            doc => {
                const resturantTemp = []
                if(!doc.empty){
                    
                    doc.forEach(doc => {
                        if(doc.exists){
                            resturantTemp.push(doc.data())                        }
                    })
                }
                setresturant(resturantTemp)
                setLoading(false)
              
            }
        )
       
        
        return subscribe;
    }
    else if(route.params.type !== ''){
        

        var subscribe = projectFirestore.collection('Resturants').where('type','==',route.params.type).onSnapshot(
            doc => {
                const resturantTemp = []
                if(!doc.empty){
                    
                    doc.forEach(doc => {
                        if(doc.exists){
                            resturantTemp.push(doc.data())                        }
                    })
                }
                setresturant(resturantTemp)
                setLoading(false)
                
               
            }
            
        )
        

        
        return subscribe;
    }
    else {
      
     
        var subscribe = projectFirestore.collection('Resturants').onSnapshot(
            doc => {
                const resturantTemp = []
                if(!doc.empty){
                    
                    doc.forEach(doc => {
                        if(doc.exists){
                            resturantTemp.push(doc.data())                        }
                    })
                }
                setresturant(resturantTemp)
                setAllTheResturants(resturantTemp)
                setLoading(false)
                
               
            }
            
        )
        

        
        return subscribe;
    }

    }, [filterBy,route])

    useEffect(() => {
      if(resturants){
        setRresturantFromDataBase(resturants)
      
      }
    },[resturants])

    

    const transalateFilterView = () => {
        openBackDrop(true)
        Animated.timing(translateY,{
        toValue : 0,
         duration : 250,
        useNativeDriver : true
        }).start()
    }

 

    const animatedStyle = {
        transform : [
            {
                translateY :  translateY
            }
        ]
    }

if(!loading){

    return (
    
        <View style ={{flex : 1}}>
     

            {
      navigation.setOptions({headerLeft : () => (
        <Ionicons name="arrow-back" size={27} color="black" style ={{margin : 5}} 
        onPress ={() => navigation.navigate('Home')}/>
      )
    
    }
   
      )
    }
           
          
          
                <ScrollView >
                <ResturantNavButtons open = {                   
                    transalateFilterView
                }
                cusines = {() =>{
                    if(resturants){
                        navigation.navigate('Cusines',allTheResturants)
                    }
                   
                    }
                }
                search = {() => {
                    if(resturants){
                        navigation.navigate('Search',allTheResturants)
                    }
                }}
                />
                
                {resturants ? resturants.map((item,index) => {
                  
                    return(
                      <TouchableOpacity onPress ={() =>navigation.navigate('Products',{item : item,type : '',basket : []})}> 
                      <ResturantCard index = {index} title = {item.name} type = {item.type} time = {item.delieveryTime} rating ={item.rating} url = {item.url}/>
                      </TouchableOpacity>
                    )
                }) : null}
                
                </ScrollView>
                { backDrop ? (
                     
                            <View style = {{height : height, width : width , backgroundColor : 'rgba(0,0,0,0.7)',
                            position : 'absolute' , zIndex : 1,flex : 3}}>
                            <TouchableWithoutFeedback onPress ={
                                () => {
                                    openBackDrop(false)
                                }
                            }>                 
                           
                           <Animated.View style ={[styles.box,animatedStyle]}>
                            <ScrollView>
                                
                            <TouchableWithoutFeedback onPress ={() => {
                                setfilterBy('name')
                                openBackDrop(false)
                                console.log(filterBy)
                                }}>
                            <View style={{margin : 10, width : width *0.9,height : height *0.1 , borderBottomWidth: 1,
                            borderBottomColor : 'rgba(128, 128, 128, .5)',
                            }} > 
    
                            <Text style ={{fontSize : 30,fontWeight : 'bold',marginTop : 30}}> Name </Text>
                            </View>
                            </TouchableWithoutFeedback>
    
                            <TouchableWithoutFeedback
                            onPress ={() => {
                                setfilterBy('type')
                                openBackDrop(false)
                                console.log(filterBy)
                                }}
                            >
                            <View style={{margin : 10, width : width *0.9,height : height *0.1 , borderBottomWidth: 1,
                            borderBottomColor : 'rgba(128, 128, 128, .5)',
                            }} > 
    
                            <Text style ={{fontSize : 30,fontWeight : 'bold',marginTop : 30}}> Type </Text>
                            </View>
                            </TouchableWithoutFeedback>
    
                            <TouchableWithoutFeedback
                            onPress ={() => {
                                setfilterBy('delieveryTime')
                                openBackDrop(false)
                                console.log(filterBy)
                                }}
                            >
                            <View style={{margin : 10, width : width *0.9,height : height *0.1 , borderBottomWidth: 1,
                            borderBottomColor : 'rgba(128, 128, 128, .5)',
                            }} > 
    
                            <Text style ={{fontSize : 30,fontWeight : 'bold',marginTop : 30}}> Delivery Time </Text>
                            </View>
                            </TouchableWithoutFeedback>
    
                            <TouchableWithoutFeedback
                            onPress ={() => {
                                setfilterBy('rating')
                                openBackDrop(false)
                                console.log(filterBy)
                                }}
                            >
                            <View style={{margin : 10, width : width *0.9,height : height *0.1 }} > 
    
                            <Text style ={{fontSize : 30,fontWeight : 'bold',marginTop : 30}}> Rating </Text>
                            </View>
                            </TouchableWithoutFeedback>
                            </ScrollView>
    
                            </Animated.View> 
                            
                            </TouchableWithoutFeedback>
    
                            </View>
                            
    
                                    ) : null
    
            }
    
                
               

          </View>
    
        )
} 
else {
    return (
        <View style ={{flex : 1}}>

        <ResturantNavButtons />

        <View style ={{height : height , width : width ,flex : 1}}>
                  
        <Spinner size ="large" color = "gray"/>
        
        </View>
        </View>
    )
}
   
 }

 const width = Math.round(Dimensions.get('window').width);
 const height = Math.round(Dimensions.get('window').height);

 const styles = StyleSheet.create({
     box : {
        width : width ,
        height : height*0.4,
        backgroundColor : 'white',
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        marginTop : height*0.5
     }
 })
 export default Resturants;
