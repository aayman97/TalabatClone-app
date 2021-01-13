import React from 'react';
import { View } from 'react-native';
 import useStorage from './hooks/useStorage'

 const Store = ({image ,resturantName, productName}) => {

    const {url} = useStorage(image,resturantName,productName)
     return(
        <View>
            {console.log('url = ' , url)}
        </View>
     )

 }

 export default Store