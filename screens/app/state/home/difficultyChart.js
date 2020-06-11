import React, { useEffect } from 'react';

//Style
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { GlobalStyles } from '../../../../style/globalStyle';
import { Divider } from 'react-native-elements';
import _ from 'lodash';

//redux
import { useSelector, shallowEqual } from 'react-redux';

//Difficulty Recommendate
const difficultyRec = [
	"This set is too easy. Increase Week for challenge!",
	"Work hard! Hustle!",
	"Nice job! Hustle!",
	"This set seems bit tough for you!",
	"This set is too hard. Decrease Week to exercise effectively!"
]

export const DifficultyChart = () => {
    const { reflections, user } = useSelector(
        state => ({
            reflections: state.reflection.reflections,
			user: state.userState.user.user
            // loading: state.loading['state/CHECK']
        }),
        shallowEqual
    );
    // const date = new Date(user.summary[0].finishedDate);
    // let formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`;
	let average = 0;
    const sortedDates = _.orderBy(reflections, ['finishedDate'], ['desc']);
		// let completedDates = _.filter(sortedDates, sortedDate => {
		// if(sortedDate.week == user.state.week){
		// 	// let date = new Date(sortedDate.finishedDate);
		// 	// let year = `${date.getFullYear()}`.slice(2);
		// 	average += sortedDate.difficulty;
		// 	return {
		// 		difficulty: sortedDate.difficulty,
		// 		date: `${date.getMonth() + 1}/${date.getDate()}`,
		// 		unixDate: sortedDate.finishedDate
		// 	};
		// }
		// });
	let completedDates = _.filter(sortedDates, sortedDate => {
		if(sortedDate.week == user.state.week){
			average += sortedDate.difficulty;
			return sortedDate;
		}
		// return sortedDate.week == user.state.week;
	})
    completedDates = _.chunk(completedDates, 5)[0];
    completedDates = _.orderBy(completedDates, ['unixDate'], ['asc']);

	//Average of difficulty
	average = Math.round(average / completedDates.length, 2);
	const recommendation = difficultyRec[Math.round(average) - 1];
    const fill = 'rgb(134, 65, 244)';
    const contentInset = { top: 20, bottom: 20 };
    const data = _.map(completedDates, 'difficulty');

    useEffect(
        () => {
            console.log('%c DIFFICULTY_CHART_REFLECTIONS:', 'background: black; color: white');
            console.table(reflections);
        },
        [reflections]
    );
	console.log("COMPLETED DATES:", completedDates);
    return (
        <View>
			<Text style={GlobalStyles.home_description}>Week {user.state.week} difficulty average:     <Text style={{fontSize: 22, lineHeight: 20}}>{average ? average : '0'}</Text></Text>
			<Text style={{ ...GlobalStyles.home_description, backgroundColor: '#E6E6E6', fontSize: 20 }}>
				{recommendation}
            </Text>
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
                        formatLabel={(value, index) => completedDates[index]['formattedDate'].substring(5).replace('-', '/')}
                        contentInset={{ left: 35, right: 35 }}
                        svg={{ fontSize: 12, fill: '#333333' }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
	difficultyContainer: {
		backgroundColor: 'rgba(128, 128, 128, 0.6);',	
		flexDirection: 'row'
	},
	difficultyEmptyText: {
		fontFamily: 'Jockey-One',
		color: '#333333',
		fontSize: 30
	},
	average: {
		padding: 20,
		fontFamily: 'Jockey-One',
		fontSize: 20,
		color: '#333333',
		backgroundColor: '#EE5F5F'
	}
})


// export const DifficultyChart = React.memo(difficultyChart);