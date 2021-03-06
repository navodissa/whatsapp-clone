import * as React from 'react';
import { StyleSheet, FlatList,} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ContactListItem from '../components/ContactListItems';
import users from '../data/Users';
import { withDecay } from 'react-native-reanimated';
import NewMessageButton from '../components/NewMessageButton';


export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <FlatList style={{width: '100%'}}
        data={users} 
        renderItem={({ item }) => <ContactListItem user={item} /> }
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
