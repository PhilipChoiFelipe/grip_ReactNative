import React from 'react';

//Style
import { Text, View, StyleSheet } from 'react-native';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { GlobalStyles } from '../../../../style/globalStyle';
import { Divider } from 'react-native-elements';
import _ from 'lodash';

import { LoadingScreen } from '../loading';
//redux
import { useSelector, shallowEqual } from 'react-redux';

export const DifficultyChart = () => {
    let { user, loading } = useSelector(
        state => ({
            user: state.state.user.user
            // loading: state.loading['state/CHECK']
        }),
        shallowEqual
    );
    console.log(user.summary);
    // const date = new Date(user.summary[0].finishedDate);
    // let formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`;
    const sortedDates = _.orderBy(user.summary, ['finishedDate'], ['desc']);
    let completedDates = _.map(sortedDates, sortedDate => {
        let date = new Date(sortedDate.finishedDate);
        return {
            difficulty: sortedDate.difficulty,
            date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`,
            unixDate: sortedDate.finishedDate
        };
    });
    completedDates = _.chunk(completedDates, 5)[0];
    completedDates = _.orderBy(completedDates, ['unixDate'], ['asc']);

    console.log('SORTED', completedDates);

    // console.log(formatDate);
    const fill = 'rgb(134, 65, 244)';
    const contentInset = { top: 20, bottom: 20 };
    // const completedDates = [
    //     {
    //         difficulty: 5,
    //         date: '20/03/29'
    //     },
    //     {
    //         difficulty: 5,
    //         date: '20/04/01'
    //     },
    //     {
    //         difficulty: 3,
    //         date: '20/04/02'
    //     },
    //     {
    //         difficulty: 2,
    //         date: '20/04/03'
    //     },
    //     {
    //         difficulty: 1,
    //         date: '20/04/05'
    //     }
    // ];
    const data = _.map(completedDates, 'difficulty');
    return (
        <View style={GlobalStyles.container}>
            <Divider />
            <View style={{ flex: 9, marginHorizontal: '3%', justifyContent: 'center' }}>
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
        </View>
    );
};

// export const DifficultyChart = React.memo(difficultyChart);