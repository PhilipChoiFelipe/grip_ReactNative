import React, { useEffect, useState } from 'react';

//design
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    ScrollView,
    RefreshControl
} from 'react-native';
import { Divider } from 'react-native-elements';
import { GlobalStyles } from '../../../../style/globalStyle';
import { BackgroundColors } from '../../../../assets/colors/backgroundColors';

//components
import { CalendarComponent } from './calenderComponent';
import { EmptyComponent } from './emptyComponent'
import { RecordItem } from './recordItem';

//util
import { Calendar } from 'react-native-calendars';
const _ = require('lodash');
import { objToArray } from '../../../../lib/objToArray';

//redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getReflections } from '../../../../modules/reflection';


export const RecordScreen = ({ navigation }) => {
    //to refresh flatList

    const dispatch = useDispatch();
    const { reflections } = useSelector(
        state => ({
            reflections: state.reflection.reflections,
        }),
        shallowEqual
    );

    //Selected date reflections
    const [selectedReflection, setSelectedReflection] = useState(reflections);

    //Update state when user selects specific date
    const handleDateSelect = date => {
        const selected = _.filter(reflections, reflection => {
            // console.log("REFLECTION_FORMATTED_DATE:", reflection.formattedDate);
            return reflection.formattedDate == date;
        });
        console.log('%c SELECTED:', 'background: black; color: white');
        console.table(selected);
        setSelectedReflection(selected);
    };

    //Update state after deleting one reflection.
    const handleDelete = finishedDate => {
        console.log('HELLO!!');
        const selected = _.filter(selectedReflection, reflection => {
            // console.log("REFLECTION_FORMATTED_DATE:", reflection.formattedDate);
            return reflection.finishedDate != finishedDate;
        });
        console.log('%c SELECTED:', 'background: black; color: white');
        console.table(selected);
        setSelectedReflection(selected);
    };

    useEffect(
        () => {
            console.log('%c CALENDAR:', 'background: black; color: white');
            console.log('REFLECTIONS:');
            console.table(reflections);
        },
        [reflections]
    );


    //sort reflections in descending ordeer
    let sortedReflections = _.orderBy(selectedReflection, ['finishedDate'], ['desc']);



    //Page refresh control
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        if (!reflections) {
            dispatch(getReflections());
        }
        setSelectedReflection(reflections);
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={{ ...GlobalStyles.container, justifyContent: 'flex-start' }}>
            <FlatList
                style={{ flex: 1, marginHorizontal: '2%' }}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListHeaderComponent={
                    <CalendarComponent
                        reflections={reflections}
                        handleDateSelect={handleDateSelect}
                    />
                }
				ListEmptyComponent={
					<EmptyComponent/>
				}
                data={objToArray(sortedReflections)}
                extraData={selectedReflection}
                keyExtractor={(item, index) => index + ''}
                renderItem={({ item, index }) => {
                    return (
						<RecordItem item={item} index={index} handleDelete={handleDelete} navigation={navigation}/>
                       
                    );
                }}
            />
        </SafeAreaView>
    );
};

