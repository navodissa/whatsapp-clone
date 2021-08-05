import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';

import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './src/aws-exports'
import {getUser} from '../whatsapp-clone/src/graphql/queries';
import { createUser } from '../whatsapp-clone/src/graphql/mutations';
Amplify.configure(config)

const randomImages = [
  'https://cdn.pixabay.com/photo/2021/07/23/06/49/man-6486690_960_720.png',
  'https://cdn.pixabay.com/photo/2021/07/11/07/12/woman-6403070__340.jpg',
  'https://cdn.pixabay.com/photo/2021/07/25/07/49/man-6491146__340.png',
  'https://cdn.pixabay.com/photo/2021/07/03/10/54/naruto-6383640__340.jpg',
  'https://cdn.pixabay.com/photo/2021/07/08/07/23/child-6396095__340.png'
]


function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }

  // Run this snippet only when App is first mounted
  useEffect(() => {
    const fetchUser = async () => {
      // Get authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true})
      console.log(userInfo)

      if (userInfo) {
      // get the user from Backend with the user ID from Auth
      const userData = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub }))
      
      if (userData.data.getUser) {
        console.log("User is already registerd in the database")
        return
      }

      const newUser = {
        id: userInfo.attributes.sub,
        name:userInfo.username,
        imageUri: getRandomImage(),
        status: 'Hey, I am using Whatsapp',
      }

      console.log(newUser)

      await API.graphql(
        graphqlOperation(
          createUser,
          {input: newUser}
        )
      )

      // If there is no user in the DB with the id, then create one
      }

    }
    fetchUser();
  }, [])
 

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
