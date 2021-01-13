import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Dimensions,View , Image } from 'react-native'
import{Text} from 'react-native-elements'

const ResturantCard = ({title,type,rating,time, url,index}) => {

    let width = Math.round(Dimensions.get('window').width);
    let height = Math.round(Dimensions.get('window').height);

    return(
<View>
    <View style = {{borderTopWidth : index != 0 ? 1 : null,borderColor : 'rgba(128, 128, 128, .5)',marginBottom : 10,margin : 10}}/>

    <View style = {{flex : 2,flexDirection : 'row' }}>

    <Image style = {{resizeMode : 'cover',
width : width /6, height : height/14 , marginLeft : 5,borderRadius : 10 , marginTop: 10
}} source = {{uri : url}}/>

    <View style = {{flexDirection : 'column' , paddingHorizontal : 5}}>
    <Text style ={{fontWeight : 'bold' , fontSize : 30}}> {title}</Text>
    <Text style = {{paddingHorizontal : 5 , fontWeight : "100",marginTop : 5}}> {type}</Text>
    <Text style = {{paddingHorizontal : 5 , fontWeight : "100",marginTop : 8}}> {rating}</Text>
    <Text style = {{paddingHorizontal : 5 , fontWeight : "100",marginTop : 8}}> {["Deliever within : ",time, "min."].join('')}</Text>


    </View>
 
    </View>
</View>
      
    )
}

export default ResturantCard;