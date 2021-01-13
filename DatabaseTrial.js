import {projectFirestore,projectStorage} from './firebase/Config'
import React, { Component,useState, useEffect } from 'react';
import {Alert, ScrollView, View,StyleSheet,Picker } from 'react-native'
import {Input , Text,Button} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import useStorage from './hooks/useStorage';
import Store from './store';
import {RNPickerSelect as Select} from 'react-native-picker-select';


const DatabaseTrial = (props) => {

 const[resturant, setResturant] = useState()
 const[products,setProducts]  = useState([])     
 const [resturantAndProduct , setResturantAndProduct] = useState(false)
 const [inputValue,setinputValue] = useState('Select an item...')
 const[resturantNameInput,setResturantNameInput] = useState(null)
const[productNameInput,setProductNameInput] = useState(null)

 const productsListTemp = []
 let productTemp = {name : '' , type : '' , price : ''}
 let resturantTemp =  {
    name: '', 
    type : '',
    delieveryTime : 0,
    rating : 0.0,
}




const [image,setImage] = useState()

const UploadResturantName = React.createRef()
const uploadProductName = React.createRef()

const ResturantName = React.createRef()
const ResturantType = React.createRef()
const ResturantDeliveryTime = React.createRef()
const ResturantRating = React.createRef()

const ProductName = React.createRef()
const ProductType = React.createRef()
const ProductPrice = React.createRef()
 
useEffect(() => {
  
     

    if(resturant && products.length > 0){

       projectFirestore.collection('Resturants').doc(resturant.name+'').get().then(
       doc => {
           if(!doc.exists ){

               console.log('No resturant with such a name')

            projectFirestore.collection('Resturants').doc(resturant.name+'').set(
                resturant,{merge : true}
            ).then(res => console.log(res)).catch(err => console.log(err))

            for(let i = 0 ; i< products.length;i++){

                projectFirestore.collection('Resturants').doc(resturant.name+'')
                .collection('Products').doc(products[i].name).get().then(
                    doc => {
                        if(!doc.exists){
                            console.log('No product with such a name')
                            console.log('Products = ',products)
                            projectFirestore.collection('Resturants').doc(resturant.name+'').collection('Products').doc(products[i].name).set(
                                products[i],{merge : true}
                            ).then(res => console.log(res)).catch(err => console.log(err))
                        }
                    }
                )
            }
           }
           else if(doc.id === resturant.name+'' ){
             console.log('doc id == resturant Name')
            for(let i = 0 ; i< products.length;i++){

                projectFirestore.collection('Resturants').doc(resturant.name+'')
                .collection('Products').doc(products[i].name).get().then(
                    doc => {
                        if(!doc.exists){
                            console.log('No product with such a name')
                            projectFirestore.collection('Resturants').doc(resturant.name+'')
                            .collection('Products').doc(products[i].name).set(
                                products[i]
                            ).then(res => console.log(res)).catch(err => console.log(err))
                        }
                        else{

                            projectFirestore.collection('Resturants').doc(resturant.name+'')
                            .collection('Products').doc(products[i].name).set(
                                products[i],{merge : true}
                            ).then(res => console.log(res)).catch(err => console.log(err))
                        }
                    }
                )
            }
           }
       }

       )
   
     
    }

},[resturant,products])



const onChooseImagePress = async () => {
    //let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, "test-image")
        .then(() => {
         console.log('Success')
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  async function uploadImage  (uri, imageName){
    const response = await fetch(uri);
    const blob = await response.blob();
    
  
    setImage(blob)

    
  }





return(

    <ScrollView>
 
    <View style = {{padding : 10, borderBottomWidth : 5 , borderBottomColor : 'gray'}}>

    <Select
     style ={{viewContainer : {borderRadius : 2, borderWidth : 2 , borderColor : 'gray' , margin : 10}}}
    onValueChange = {(value)=> {
        if(value){
            setinputValue(value)
            console.log(inputValue)

            if(value === 'Product'){
                setResturantAndProduct(true)
            }
            else{
                setResturantAndProduct(false)
            }
          
        }
        
    }}
     items = {[{label : 'Resturant'},{label : 'Product'}]}
    />

   { inputValue !== 'Select an item...' ?<Input
    ref = {UploadResturantName}
     style ={{width : 300 , margin : 5}}
     placeholder = 'Enter the resturant name'
    onChangeText ={text =>{
   
          setResturantNameInput(text)
            console.log(resturantNameInput)
        
        }}

     /> : null}

    { resturantAndProduct ? <Input
     ref = {uploadProductName}
     style ={{width : 300 , margin : 5}}
     placeholder = 'Enter the product name'
    onChangeText ={text =>{
   
            setProductNameInput(text)
            console.log(productNameInput)
        
        }}

     /> : null}


    
   
    <Button containerStyle = {{margin : 10 , width : 300} }
  
        title = 'Upload Image and submit'
        onPress = {() =>{
           
            if((inputValue !=='Select an item...')){

                if(resturantNameInput && productNameInput){
                    onChooseImagePress()
                  

                }
                else if(resturantNameInput){
                    onChooseImagePress()
                    
                   
                }

            }

           
        }
        
          
            
        }
        />
    {image ?
    <Store image = {image} 
    resturantName = {resturantNameInput} 
    productName = {productNameInput}/> 
    : null}
    
    </View>
  

     <Input
     ref = {ResturantName}
    placeholder = 'name'
    onChangeText = {text => resturantTemp.name = text}
     />
    
    <Input
    ref = {ResturantType}
    placeholder = 'type'
    onChangeText = {text => resturantTemp.type = text}
    />
   
   <Input
    ref = {ResturantDeliveryTime}
    placeholder = 'delievery time'
    keyboardType =  'numeric'
    onChangeText = {text => resturantTemp.delieveryTime = text}
    />
    
    <Input
    ref = {ResturantRating}
    placeholder = 'Rating'
    keyboardType =  'numeric'
    onChangeText = {text => resturantTemp.rating = text}
    />
    
    <Text> Product Info</Text>

    <View style = {{padding : 5 , dborderWidth : 10,borderRadius : 20 , borderColor : 'black'}}>
    
    <Input
   ref={ProductName}
    placeholder = 'Product name'
    onChangeText = {text => productTemp.name = text}
    />

    <Input
     ref={ProductType}
    placeholder = 'Product type'
    onChangeText = {text => productTemp.type = text}
    />

    <Input
    ref = {ProductPrice}
    placeholder = 'Product price'
    keyboardType = 'numeric'
    onChangeText = {text => productTemp.price = text}
    />

    <Button
    title = 'Submit product info'
    onPress = {()=> {

            productsListTemp.push(productTemp)
           ProductName.current.clear()
           ProductPrice.current.clear()
           ProductType.current.clear()

            
           
           productTemp = {name : '' , type : '' , price : ''}
           

        


   

       
    }}
    />

    </View>

    <Button 
    title = "Revise the data"
    onPress = {() => {
        console.log('Resturant data : ',resturantTemp)
        console.log('Its products :' , productsListTemp)
    }}
    />
    
     <Button
     containerStyle = {{padding : 5}}
    title = 'submit data about resturant'
    onPress ={async () =>{
      
        setResturant(resturantTemp)
       setProducts(productsListTemp)
        ResturantName.current.clear()
        ResturantType.current.clear()
        ResturantRating.current.clear()
        ResturantDeliveryTime.current.clear()
        resturantTemp =  {
            name: '', 
            type : '',
            delieveryTime : 0,
            products : [],
            rating : 0.0,
        }
     

    }}
    />

    </ScrollView>

)



}
const styles = StyleSheet.create({
  buttonViewStyle  : {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  }  

})

export default DatabaseTrial