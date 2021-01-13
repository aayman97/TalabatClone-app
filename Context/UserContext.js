import React, { Component,useContext,useState} from 'react';
import { View } from 'react-native'

 const UserContext = React.createContext()

export function useUser(){
    return useContext(UserContext)
}

const UserProvider= ({children}) => {
 
const [userName,SetUserName] = useState('')
const [resturantFromDataBase,setRresturantFromDataBase] = useState()
const [userTelephoneNumber , setUserTelephoneNumber] = useState('')
const [userAddress, setUserAddress] = useState(
    {
     City: '' ,
     Street : '' ,
     Town :'',
     BuildingNumber : '',
     AppartmentNumber : ''
    }
)
const [basket,setBasket] = useState([])
const [totalAmount,setTotalAmount] = useState(0)
const[itemURL,setItemURL] = useState('')

const value = {
    userName,SetUserName,
    userTelephoneNumber , setUserTelephoneNumber,
    userAddress, setUserAddress,
    basket,setBasket,
    totalAmount,setTotalAmount,
    itemURL,setItemURL,
    resturantFromDataBase,setRresturantFromDataBase
}

return(
 <UserContext.Provider value = {value} >
      { children } 
 </UserContext.Provider>
)
}
export default UserProvider;