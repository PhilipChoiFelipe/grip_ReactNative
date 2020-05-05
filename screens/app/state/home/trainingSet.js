import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { GlobalStyles } from '../../../../style/globalStyle';

import { LoadingScreen } from '../loading';
//redux
import { useSelector, shallowEqual } from 'react-redux';

const exercises = [
    {
        name: 'Warm Up',
        description: 'Do it to prevent injury'
    }
];

export const TrainingSet = () => {
    const { program, loading } = useSelector(
        state => ({
            program: state.userState.program.program,
            loading: state.loading['userState/PROGRAM']
        }),
        shallowEqual
    );
    if (loading) {
        return <LoadingScreen />;
    } else {
		console.log('%c TRAINING_SET', 'background: black; color: white');
		console.table(program.set);
        return (
            <SafeAreaView style={GlobalStyles.container}>
                <View
                    style={{
                        ...GlobalStyles.body_container,
                        flex: 4,
                        marginTop: '10%',
                        marginHorizontal: '5%'
                    }}
                    hide
                >
                    <Text style={GlobalStyles.home_description}>Today's Set</Text>
                    <Text style={{ ...GlobalStyles.home_description, backgroundColor: '#E6E6E6' }}>
                        {
                            program.exercise_description[
                                Math.floor(Math.random() * program.exercise_description.length)
                            ]
                        }
                    </Text>
                    {program.set.map((exercise, index) => (
                        <ListItem
                            key={index}
                            title={exercise.exercise}
                            titleStyle={{ fontFamily: 'IBMPlexSans-light', fontSize: 15 }}
                            subtitle={`REPS: ${exercise.rep}`}
                            containerStyle={{ backgroundColor: '#E6E6E6' }}
                            bottomDivider
                        />
                    ))}
                </View>
            </SafeAreaView>
        );
    }
};

// export const TrainingSet = React.memo(trainingSet);