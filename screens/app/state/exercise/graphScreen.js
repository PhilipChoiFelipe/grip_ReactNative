import React, { useEffect } from 'react';

//design
import { SafeAreaView, Text, View, StyleSheet, Alert } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { SummaryStyles } from '../../../../style/summaryStyle';
import { GoButton } from '../../../../shared/customButtons';

//graph
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import _ from 'lodash';

//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { nextWeek } from '../../../../modules/userState';
import { tabToggle } from '../../../../modules/appState';

export const GraphScreen = ({ navigation, route }) => {
    let dispatch = useDispatch();

    const { user, reflections, program } = useSelector(
        state => ({
            user: state.userState.user.user,
            reflections: state.reflection.reflections,
			program: state.userState.program.program
        }),
        shallowEqual
    );



    //Check if user wants to move up next Week if day > 5
    let moveupWeek = false;

    //create alert to stay or move up week
    const createAlert = () =>
        Alert.alert(
            `Move up to WEEK${user.state.week + 1}?`,
            'You have completed this set for 5days',
            [
                {
                    text: 'Stay',
                    onPress: () => {
                        moveupWeek = false;
						dispatch(nextWeek({nextWeek: moveupWeek, pullupCount: program.pullupCount}))
                    },
                    style: 'cancel'
                },
                {
                    text: 'Move Up',
                    onPress: () => {
                        moveupWeek = true;
						dispatch(nextWeek({nextWeek: moveupWeek, pullupCount: program.pullupCount}))
                    }
                }
            ],
            { cancelable: false }
        );

	//use press to go back home
	const handleComplete = () => {
		if (user.state.day + 1 > 5) {
			createAlert();
        }else{
			dispatch(nextWeek({nextWeek: moveupWeek, pullupCount: program.pullupCount}))
		}
        dispatch(tabToggle());
        navigation.navigate('HomeScreen');
    };
	
	
    const date = new Date();
    const formatDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

    //completedDates for GRAPH
    const sortedDates = _.orderBy(reflections, ['finishedDate'], ['desc']);
    let completedDates = _.map(sortedDates, sortedDate => {
        let date = new Date(sortedDate.finishedDate);
        let year = `${date.getFullYear()}`.slice(2);
        return {
            difficulty: sortedDate.difficulty,
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            unixDate: sortedDate.finishedDate
        };
    });
    completedDates = _.chunk(completedDates, 5)[0];
    completedDates = _.orderBy(completedDates, ['unixDate'], ['asc']);
    const fill = 'rgb(134, 65, 244)';
    const contentInset = { top: 20, bottom: 20 };
    const data = _.map(completedDates, 'difficulty');

    console.log('%c GRAPH_SUMMARY:', 'background: purple; color: white', reflections);
    return (
        <SafeAreaView style={{ ...GlobalStyles.container, backgroundColor: '#F2F2F2' }}>
            {/*<Modal visible={modalOpen} animationType="slide">
                <View>
                    <Text style= {SummaryStyles.title}>WRITE SOMETHING</Text>
                </View>
            </Modal>*/}
            <View style={SummaryStyles.title_Container}>
                <View>
                    <Text style={SummaryStyles.title}>WEEK {user.state.week}</Text>
                    <Text style={SummaryStyles.subtitle}>{user.state.program}</Text>
                </View>
                <View>
                    <Text style={SummaryStyles.finishedDate}>{formatDate}</Text>
                    <Text style={SummaryStyles.currentDate}>DAY - {user.state.day}</Text>
                </View>
            </View>
            <View style={SummaryStyles.body_container}>
                <View style={styles.block}>
                    <Text style={styles.block_description}>Weekly Difficulty Graph</Text>
                    <View style={{ flexDirection: 'row', height: 350 }}>
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
            <GoButton text="HOME" onPress={handleComplete} style={{ marginTop: '5%' }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    block: {
        flex: 1,
        marginHorizontal: '5%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(51, 51, 51, 0.75)'
    },
    block_description: {
        fontFamily: 'IBMPlexSans-regular',
        fontSize: 15,
        color: '#333333',
        // lineHeight: 50,
        margin: 10
    }
});