import React from 'react';
import { Text, FlatList, ImageBackground } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import chatRoomData from '../data/Chats'
import BG from '../assets/images/BG.jpg'
import InputBox from '../components/InputBox';

const ChatRoomScreen
 = () => {
    return (
        <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
            <FlatList
            data={chatRoomData.messages}
            renderItem={({item}) => <ChatMessage message={item} />}
            inverted
            />
            <InputBox />
        </ImageBackground>
    )
}

export default ChatRoomScreen
