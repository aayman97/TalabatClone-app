import React, { useState, useEffect } from 'react'
import { View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../Context/UserContext';


const Search = ({setSearchText}) => {

    const navigation = useNavigation()
    return(
        <Header searchBar transparent>
             <Item style = {[styles.searchBar]} rounded  >
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText ={text => 
             setSearchText(text)
            }/>
          </Item>
          <TouchableOpacity transparent
          onPress ={() => navigation.navigate('Resturants',{type : ''})}
          style ={{justifyContent : 'center'}}  >
            <Text style ={{color : 'red',fontSize : 17}}> Cancel</Text>
          </TouchableOpacity>
        </Header>
    )
}

const Cusines = ({navigation,route}) => {
    
    const resturants = route.params
    const {resturantFromDataBase,setRresturantFromDataBase} =useUser()
    const [searchText, setSearchText] = useState('')

    function IdentifyTypes(resturant){
        let typeTemp = []
        for(let i = 0;i<resturant.length;i++){
           if(!typeTemp.includes(resturant[i].type,0)){
               typeTemp.push(resturant[i].type)
        }
    }
    return typeTemp
}
    const types = IdentifyTypes(resturants)
    
    return ( 
     <Container style ={{backgroundColor : 'white'}}>
         <Search setSearchText ={setSearchText}/>
            <ScrollView style ={{backgroundColor : 'white'}}>
                {navigation.setOptions({  headerShown: false,})}
                
                {
                    console.log(searchText)
                }
                {
                types.map((l,i) => {
                    if(searchText.length > 0){
                        if(l.substring(0,searchText.length) === searchText){
                            return(
                                <TouchableWithoutFeedback onPress= {() => {
                                      navigation.navigate('Resturants',{
                                          type : l
                                      })
                                      }}>
                                <ListItem key={i} bottomDivider>
                                    <ListItem.Content >
                                    
                                    <ListItem.Title style ={{fontSize : 20}} >
                                    {l}
                                      </ListItem.Title>
                                      
                                    </ListItem.Content>
                                    
                                </ListItem>
                                </TouchableWithoutFeedback>
                                )
                        }
                    }
                    else{
                        return(
                            <TouchableWithoutFeedback onPress= {() => {
                                navigation.navigate('Resturants',{
                                    type : l
                                })
                                  }}>
                            <ListItem key={i} bottomDivider>
                                <ListItem.Content >
                                <ListItem.Title style ={{fontSize : 20}}>{l}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                            </TouchableWithoutFeedback>
                            )
                    }
                   
                })
                }
            </ScrollView>
       </Container> 
     );
}
 
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    searchBar : {
        height : height*0.04,
        borderColor : 'black',
        backgroundColor :'white',
      },
})
export default Cusines