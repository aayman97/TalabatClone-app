import React, { Component,useContext,useEffect,useState} from 'react';
import { View } from 'react-native'
import {firebaseAuth,firebaseAuthFunction,provider,db, projectFirestore} from '../firebase/Config'
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase'



export function useAuth(){
    return useContext(AuthContext)
}

const AuthContext = React.createContext()
const AuthProvider = ({children}) => {

const [currentUser,setCurrentUser] = useState()





async function signInWithGoogleAsync() {

        try {

          const result = await Google.logInAsync({
            androidClientId : '996419699927-229k6luehpolvlcqpmn4nj41r2c7k5f6.apps.googleusercontent.com',
            iosClientId : '996419699927-37b84eavhutqkc9nug4ftn7kq64db4c1.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
         
          });
      
          if (result.type === 'success') {
            onSignIn(result)
            return result.accessToken;
          } else {
            return false;
          }
        } catch (e) {
          alert(e.message)
        }
     }

     function onSignIn(googleUser) {
       //Sconsole.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.

        var unsubscribe = firebaseAuthFunction.onAuthStateChanged(firebaseUser => {
            //console.log('firebase user => ',firebaseUser)
            // if(firebaseUser){
            //     firebase.auth().signOut()
            // }
            unsubscribe();
          
          // Check if we are already signed-in Firebase with the correct user.
          
          if (!isUserEqual(googleUser, firebaseUser)) {
           
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
                );

             
            // Sign in with credential from the Google user.
          firebase.auth().signInWithCredential(credential)
            .then(res => {
              if(res.additionalUserInfo.isNewUser){
                  console.log('New User :',res.user.providerData[0].uid)
                  projectFirestore.collection('Users').doc(res.user.providerData[0].email+'').set({

                    displayName : res.user.providerData[0].displayName,
                    email : res.user.providerData[0].email,
                    phoneNumber : '01145360793',
                    address : {
                      City : 'Cairo',
                      Town : 'Tagamooa El Talet',
                      Building : '55',
                      AppartmentNumber : '4'
                    }
                  })
              }
              else {
                console.log('Registered User : ',res.user.providerData[0].uid)
              }
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
           console.log('User already signed-in Firebase.');
          }
        });
      }

      const isUserEqual = (googleUser, firebaseUser) => {
        //   console.log('google User => ', googleUser)
        //   console.log('......................................')
        //   console.log("firebase user =>",firebaseUser)
        //   console.log('......................................')
        if (firebaseUser) {
            //console.log('firebase user =>',firebaseUser)
          var providerData = firebaseUser.providerData;
          for (let i = 0; i < providerData.length; i++) {
            //   console.log(' providerData[i].providerId ==> ',  providerData[i].providerId)
            //   console.log('googleUser.getBasicProfile() ==> ' , googleUser.user.id)
            //   console.log('providerData[i].uid ==> ', providerData[i].uid )
            if (
              providerData[i].providerId ===
                firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.user.id
            ) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        
        return false;
      };
const value = {
   signInWithGoogleAsync,
   currentUser,

 }
    
    return(
     <AuthContext.Provider value = {value} >
          { children } 
     </AuthContext.Provider>
    )
    }
export default AuthProvider;

