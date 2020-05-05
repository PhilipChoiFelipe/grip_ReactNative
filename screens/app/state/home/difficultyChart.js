import React, { useEffect } from 'react';

//Style
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { GlobalStyles } from '../../../../style/globalStyle';
import { Divider } from 'react-native-elements';
import _ from 'lodash';

//redux
import { useSelector, shallowEqual } from 'react-redux';

export const DifficultyChart = () => {
    const { reflections } = useSelector(
        state => ({
            reflections: state.reflection.reflections
            // loading: state.loading['state/CHECK']
        }),
        shallowEqual
    );
    // const date = new Date(user.summary[0].finishedDate);
    // let formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`;
    const sortedDates = _.orderBy(reflections, ['finishedDate'], ['desc']);
    let completedDates = _.map(sortedDates, sortedDate => {
        let date = new Date(sortedDate.finishedDate);
		let year = `${date.getFullYear()}`.slice(2)
        return {
            difficulty: sortedDate.difficulty,
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            unixDate: sortedDate.finishedDate
        };
    });
    completedDates = _.chunk(completedDates, 10)[0];
    completedDates = _.orderBy(completedDates, ['unixDate'], ['asc']);

    const fill = 'rgb(134, 65, 244)';
    const contentInset = { top: 20, bottom: 20 };
    const data = _.map(completedDates, 'difficulty');
	
	useEffect(() => {
		console.log('%c DIFFICULTY_CHART_REFLECTIONS:', 'background: black; color: white');
		console.table(reflections);
	}, [reflections]);
	
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <Divider />
            <View style={{ flex: 9, marginHorizontal: '3%', marginTop: '10%' }}>
                <Text style={GlobalStyles.home_description}>Weekly Difficulty Analysis</Text>
                <View style={{ flexDirection: 'row', height: 350, marginTop: '5%' }}>
                    <YAxis
                        data={data}
                        contentInset={contentInset}
                        svg={{
                            fill: '#333333',
                            fontSize: 12
                        }}
                        min={0}
                        max={5}
                        numberOfTicks={5}
                        formatLabel={value => `${value}`}
                    />
                    <View style={{ flex: 1, marginHorizontal: '5%' }}>
                        <BarChart
                            style={{ height: 350 }}
                            gridMin={0}
                            data={data}
                            svg={{ fill: '#73807E' }}
                            contentInset={contentInset}
                            yMin={0}
                            yMax={5}
                            spacingOuter={0.3}
                            spacingInner={0.3}
                        >
                            <Grid />
                        </BarChart>
                        <XAxis
                            data={data}
                            formatLabel={(value, index) => completedDates[index]['date']}
                            contentInset={{ left: 35, right: 35 }}
                            svg={{ fontSize: 12, fill: '#333333' }}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

// export const DifficultyChart = React.memo(difficultyChart);