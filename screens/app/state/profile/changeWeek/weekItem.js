import React, { useState } from 'react';

//design
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Alert,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { BackgroundColors } from '../../../../../assets/colors/backgroundColors';
import { Ionicons } from '@expo/vector-icons';



export const WeekItem = ({item, index, selectedWeek, setSelectedWeek}) => {
	if(selectedWeek == index){
	   
	 }
    return (
        <TouchableOpacity
			key={index}
            style={
                [styles.blocks, selectedWeek == index + 1 ? {backgroundColor: 'white'} : {backgroundColor: 'rgba(51, 51, 51, 0.7)'}]}
            onPress={() => {
                setSelectedWeek(index + 1);
            }}
        >
            <View style={styles.blocks_inner}>
                <Text style={styles.week}>WEEK {index + 1}</Text>
                <Text style={styles.set}>
                    [{item.map(number => {
                        return number + ' - ';
                    })}]
                </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Ionicons
                    style={{ justifyContent: 'center' }}
                    name="md-checkmark-circle"
                    color="#333333"
                    size={selectedWeek == index + 1 ? 40 : -10}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    blocks: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: '5%',
        borderRadius: 15,
        // borderBottomWidth: '1',
        // borderBottomColor: '#333333'
    },
    blocks_inner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        // borderBottomWidth: 1,
        // borderBottomColor: 'rgba(51, 51, 51, 0.75)',
        alignItems: 'center'
    },
    week: {
        fontFamily: 'Jockey-One',
        fontSize: 30,
        color: '#333333'
    },
    set: {
        fontFamily: 'IBMPlexSans-regular',
        fontSize: 15,
        color: '#333333'
    }
};

// function weekPropsAreEqual(prevWeeks, nextWeeks) {
//   return (
//     prevWeeks.selectedWeek === nextWeeks.selectedWeek &&
//     prevWeeks.setSelectedWeek === nextWeeks.setSelectedWeek
//   );
// }


// export const WeekItem = React.memo(weekItem);