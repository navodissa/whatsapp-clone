import React from 'react';
import { Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import { API, Auth, graphqlOperation} from 'aws-amplify'

import { createMessage } from '../../src/graphql/mutations';

import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';

const InputBox = (props) => {
    const {chatRoomID} = props;

    const [message, setMessage] = useState('');
    const [myUserId, setMyUserId] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub);
        }

        fetchUser();
    }, [])

    const onSendPress = async () => {
        //console.warn(`Send pressed: ${message} `)
        // Send the message to backend
        try {
            await API.graphql(
                graphqlOperation(
                    createMessage, {
                        input: {
                            content: message,
                            userID: myUserId,
                            chatRoomID: chatRoomID
                        }
                    }
                )
            )
        } catch (e) {
            console.log(e);
        }

        setMessage('')
    }

    const onMicrophonePress = () => {
        console.warn("Microphone pressed")
    }

    const onPress = () => {
        if (!message) {
            onMicrophonePress();
        } else {
            onSendPress();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.midContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color="grey" />
                <TextInput 
                    placeholder="Type a Message"
                    multiline={true} 
                    style={styles.textInput}
                    value={message}
                    onChangeText={setMessage}
                    />
                <Entypo name="attachment" size={24} color="grey" style={styles.icons}/>
                {!message && <Fontisto name="camera" size={20} color="grey" style={styles.icons}/>}
            </View>
            <TouchableOpacity onPress={onPress}>
            <View style={styles.microphone}>
                {!message
                ? <MaterialCommunityIcons name="microphone" size={24} color="white" />
                : <MaterialIcons name="send" size={24} color="white" />}
            </View>
            </TouchableOpacity>

        </View>
    )
}

export default InputBox
