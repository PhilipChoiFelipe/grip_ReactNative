import React from 'react';
import { Text, View } from 'react-native';
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
    let { program, loading } = useSelector(
        state => ({
            program: state.state.program.program,
            loading: state.loading['state/PROGRAM']
        }),
        shallowEqual
    );
    if (loading) {
        return <LoadingScreen />;
    } else {
        console.log(program);
        return (
            <View style={GlobalStyles.container}>
                <View
                    style={{
                        ...GlobalStyles.body_container,
                        flex: 4,
                        marginTop: '5%',
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
            </View>
        );
    }
};

// export const TrainingSet = React.memo(trainingSet);