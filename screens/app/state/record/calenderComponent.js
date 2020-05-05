import React from 'react';

//design
import { StyleSheet, View } from 'react-native';

//util
import { Calendar } from 'react-native-calendars';
const _ = require('lodash');
import { objToArray } from '../../../../lib/objToArray';

export const CalendarComponent = ({ reflections, handleDateSelect }) => {
    //transform reflection to markedDates format
    let markedDates = {};
    if (reflections) {
        let formattedDates = _.map(reflections, reflection => {
            return reflection.formattedDate;
        });
        for (let i = 0; i < formattedDates.length; i++) {
            let formattedDate = formattedDates[i];
            markedDates[formattedDate] = { selected: true, selectedColor: '#EE5F5F' };
            // markedDates.formattedDates[i] = {selected: true, marked: true, selectedColor: '#547D99'}
        }
        // console.log(markedDates);
    }

    return (
        <Calendar
            markedDates={markedDates}
            onDayPress={day => {
                console.log('selected day', day.dateString);
                handleDateSelect(day.dateString);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
                console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
                console.log('month changed', month);
            }}
            renderArrow={direction =>
                direction == 'left' ? (
                    <NumberButton style={numberstyles.triangleLeft} />
                ) : (
                    <NumberButton style={numberstyles.triangleRight} />
                )}
            // Hide day names. Default = false
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            theme={{
                textDayFontFamily: 'Jockey-One',
                textMonthFontFamily: 'Jockey-One',
                textDayHeaderFontFamily: 'Jockey-One',
                calendarBackground: '#E6E6E6',
                // textDayFontSize: 20,
                textMonthFontSize: 35
                // textDayHeaderFontSize: 18
            }}
        />
    );
};

const NumberButton = ({ style }) => {
    return (
        <View style={style}>
            <View style={numberstyles.button} />
        </View>
    );
};


const numberstyles = StyleSheet.create({
    button: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#333333'
    },
    triangleLeft: {
        transform: [{ rotate: '270deg' }]
    },
    triangleRight: {
        transform: [{ rotate: '90deg' }]
    }
});