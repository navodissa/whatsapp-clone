import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { User } from '../../types';
import styles from './styles';
import moment from 'moment';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createChatRoomUser} from '../../src/graphql/mutations';
import ChatRooms from '../../data/ChatRooms';

export type ContactListItemProps = {
    user: User;
}

const ContactListItem = ( props: ContactListItemProps ) => {
    const { user } = props;

    const navigation = useNavigation();

    const onClick = async() => {
        try {
            // 1. Create a chatroom
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, { input: {} }
                )
            )

            if (!newChatRoomData.data) {
                console.log("Failed creating the chat room");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            // 2. Add 'user' to the 
            console.log(user.id)
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {input:
                        {
                        userID: user.id,
                        chatRoomID: newChatRoom.id
                    }
                }
                )
            )

            // 3. Add authenticated user to the chatroom
            console.log("Before entering get auth user")
            const userInfo = await Auth.currentAuthenticatedUser();

            console.log("This is userInfo: " + userInfo)

            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {input: 
                        {
                        userID: userInfo.attributes.sub,
                        chatRoomID: newChatRoom.id
                    }
                }
                )
            )

            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: user.name,
            })
            
        } catch (e) {
            console.log(e)
        }
    }
    return ( 
        <TouchableWithoutFeedback onPress={onClick}>       
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{uri: user.imageUri}} style={styles.avatar} />
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default ContactListItem
