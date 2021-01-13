import React, { Component, useEffect ,useState} from 'react';
import { View,Dimensions ,StyleSheet,Animated,Text} from 'react-native'
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
import {  MaterialCommunityIcons,MaterialIcons , Entypo,AntDesign,Ionicons } from '@expo/vector-icons';
import { useUser } from '../Context/UserContext';
import ResturantCard from '../Components/ResturantCard';
import { ScrollView } from 'react-native';
import { TouchableWithoutFeedback,TouchableOpacity } from 'react-native-gesture-handler';

const SearchBar = ({navigation,route}) =>{
 

    const width = Math.round(Dimensions.get('window').width);
    const height = Math.round(Dimensions.get('window').height);
    const {resturantFromDataBase,setRresturantFromDataBase} =useUser()
    const [translateX] = useState(new Animated.Value(-width))
    const [searchText,setSearchText] = useState()
    const allResturants = route.params

 
    let i = -1;

    useEffect(() => {
      Animated.timing((translateX), {
        toValue : 0,
        duration : 300,
        useNativeDriver : true
      }).start()
    },[])

    const animatedStyle = {
      transform : [
        {
          translateX: translateX
        }
      ]
    }

    return (


   
        <Container>
            {navigation.setOptions({  headerShown: false,})}
        <Header searchBar  transparent style ={{marginTop : 12}}>
        <Animated.View style ={[styles.view,animatedStyle]}>
        <Item style = {[styles.searchBar]} rounded  >
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText ={text => 
             setSearchText(text)
            }/>
          </Item>
          </Animated.View>
          <TouchableOpacity onPress ={() => navigation.navigate('Resturants')} 
          style ={{justifyContent : 'center',alignItems : 'center', marginTop : 7}} >
            <Text style ={{color : 'red',fontSize : 17}}> Cancel</Text>
          </TouchableOpacity>
        
        </Header>
        <ScrollView>
        {searchText ? (allResturants ? allResturants.map((item,index)=> {
     
    if((item.name.substring(0,searchText.length).toLowerCase() === searchText) || (item.name.substring(0,searchText.length).toUpperCase() === searchText)){
    return(
      <TouchableOpacity onPress ={() =>navigation.navigate('Products',item)}> 
      <ResturantCard title = {item.name} type = {item.type} time = {item.delieveryTime} rating ={item.rating} url = {item.url}/>
      </TouchableOpacity>
    )
}
            }) : null) : null}

       </ScrollView>
      </Container>
     


    )
}

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  searchBar : {
    height : height*0.04,
    borderColor : 'black',
    backgroundColor :'white',

    
  },
  view : {
    width : width*0.755,
    height : height*0.04,
    marginHorizontal : 10
  }
})
export default SearchBar;