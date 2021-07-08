import React from 'react';
import { Text, FlatList, ImageBackground } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import chatRoomData from '../data/Chats'
import BG from '../assets/images/BG.jpg'

const ChatRoomScreen
 = () => {
    return (
        <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
            <FlatList
            data={chatRoomData.messages}
            renderItem={({item}) => <ChatMessage message={item} />}
            inverted
            />
        </ImageBackground>
    )
}

export default ChatRoomScreen

