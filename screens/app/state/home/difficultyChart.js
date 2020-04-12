import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';
import { Avatar, Card, Divider, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

export const DifficultyChart = () => {
    const fill = 'rgb(134, 65, 244)';
    const contentInset = { top: 20, bottom: 20 };
    const completedDates = [
        {
            difficulty: 5,
            date: '20/03/29'
        },
        {
            difficulty: 5,
            date: '20/04/01'
        },
        {
            difficulty: 3,
            date: '20/04/02'
        },
        {
            difficulty: 2,
            date: '20/04/03'
        },
        {
            difficulty: 1,
            date: '20/04/05'
        }
    ];
    const data = _.map(completedDates, 'difficulty');
    return (
        <View style={GlobalStyles.container}>
			<Divider/>
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

const styles = StyleSheet.create({
    
});