import * as React from 'react';
import { StyleSheet, FlatList,} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItems';
import chatRooms from '../data/ChatRooms';
import { withDecay } from 'react-native-reanimated';


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <FlatList style={{width: '100%'}}
        data={chatRooms} 
        renderItem={({ item }) => <ChatListItem chatRoom={item} /> }
        keyExtractor={(item) => item.id} 
      />
      {/* <ChatListItem chatRoom={ChatRooms[0]}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
