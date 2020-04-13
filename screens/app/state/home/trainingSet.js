import * as React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { GlobalStyles } from '../../../../style/globalStyle';


const exercises = [
    {
        name: 'Warm Up',
        desc: ''
    },
    {
        name: 'Pullup Try',
        desc: 'MAX / 1'
    },
    {
        name: 'Pullup Try',
        desc: 'MAX / 1'
    },
    {
        name: 'Pullup Try',
        desc: 'MAX / 1'
    },
    {
        name: 'Pullup Try',
        desc: 'MAX / 1'
    },
    {
        name: 'Pullup Try',
        desc: 'MAX / 1'
    }
];

export const TrainingSet = () => {
    return (
        <View style={GlobalStyles.container}>
            <View style={{ ...GlobalStyles.body_container, flex: 4, marginVertical: '20%', marginHorizontal: '5%' }} hide>
				<Text style={GlobalStyles.home_description}>Today's Training Set</Text>
                {exercises.map((exercise, index) => (
                    <ListItem
                        key={index}
                        title={exercise.name}
                        titleStyle={{ fontFamily: 'IBMPlexSans-light', fontSize: 15 }}
                        subtitle={exercise.desc}
                        containerStyle={{ backgroundColor: '#E6E6E6' }}
                        bottomDivider
                    />
                ))}
            </View>
        </View>
    );
};