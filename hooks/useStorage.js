import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore } from '../firebase/Config';

function useStorage (file,resturantName,productName) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references

    let storageRef = projectStorage.ref('Resturants')
    let collectionRef = projectFirestore.collection('Resturants');

    if(resturantName && productName){

      console.log('entered first condition')
      storageRef = storageRef.child(resturantName+'').child('Products').child(productName+'');
      collectionRef = collectionRef.doc(resturantName+'').collection('Products').doc(productName+'')
    }
    else if(resturantName){
      
      console.log('entered second condition')
      storageRef = storageRef.child(resturantName+'')
      collectionRef = collectionRef.doc(resturantName+'')

    }
    

    console.log('storageRef = ',storageRef.fullPath)
    //const collectionRef = projectFirestore.collection('images');
    
    
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
      console.log('err = ', err)
    }, async () => {
      const url = await storageRef.getDownloadURL();
     
      await collectionRef.set({ url},{merge : true});
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;