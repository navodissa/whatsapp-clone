import React from 'react';
import { Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import { useState } from 'react';

import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';

const InputBox = () => {

    const [message, setMessage] = useState('');

    const onSendPress = () => {
        console.warn(`Send pressed: ${message} `)

        // Send the message to backend

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
