import React, { useState } from 'react';

//design
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

//external modules
import Swipeout from 'react-native-swipeout';


//redux 
import { useDispatch } from 'react-redux';
import { deleteReflection } from '../../../../modules/reflection';
import { tabToggle } from '../../../../modules/appState';


export const RecordItem = ({ item, index, handleDelete, navigation }) => {
	const dispatch = useDispatch();
	
	    //move to clicked reflection screen
    const handleNavigate = reflection => {
        dispatch(tabToggle());
        navigation.navigate('Reflection', { reflection });
    };

	

	//Swipe Feature
	// Buttons
	const [swipedReflection, setSwipedReflection] = useState(null);
	var swipeoutBtns = [
    {
        backgroundColor: '#EE5F5F',
        underlayColor: '#EE5F5F',
        // underlayColor: 'red',
        text: 'delete',
        type: 'delete',
        paddingVerical: 10,
        onPress: () => {
            dispatch(deleteReflection({ date: swipedReflection.finishedDate }));
            handleDelete(swipedReflection.finishedDate);
        }
    }
];
	
    return (
        <Swipeout
            right={swipeoutBtns}
            autoClose={true}
            style={flatStyles.blocks}
            onOpen={() => setSwipedReflection(item)}
        >
            <TouchableOpacity
                key={index}
                onPress={() => {
                    handleNavigate(item);
                }}
                style={{ paddingVertical: 10 }}
            >
                <View style={flatStyles.blocks_inner}>
                    <View>
                        <Text style={flatStyles.programName}>{item.programName}</Text>
                        <Text style={flatStyles.date}>{item.formattedDate}</Text>
                    </View>
                    <View>
                        <Text style={flatStyles.pullCounts}>50 PULLS</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeout>
    );
};

const flatStyles = {
    blocks: {
        paddingHorizontal: 15,
        margin: '5%',
        borderRadius: 15,
        backgroundColor: 'rgba(51, 51, 51, 0.7)'
    },
    blocks_inner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        padding: 10
    },
    date: {
        fontFamily: 'IBMPlexSans-regular',
        fontSize: 15,
        color: '#333333'
    },
    programName: {
        fontFamily: 'Jockey-One',
        fontSize: 20,
        color: '#333333'
    },
    pullCounts: {
        fontFamily: 'Jockey-One',
        fontSize: 30,
        color: '#CCCCCC'
    }
};