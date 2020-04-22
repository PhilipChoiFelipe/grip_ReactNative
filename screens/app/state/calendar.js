import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { GlobalStyles } from '../../../style/globalStyle';
// import { NumberButton } from '../../../shared/customButtons';
import { Calendar } from 'react-native-calendars';

export const CalendarScreen = () => {
    return (
        <View style={{ ...GlobalStyles.container, justifyContent: 'flex-start' }}>
            <Calendar
                style={{
                    marginHorizontal: '2%',
				    marginTop: '10%'
                }}
                onDayPress={day => {
                    console.log('selected day', day);
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
                showWeekNumbers={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={substractMonth => substractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                theme={{
                    textDayFontFamily: 'Jockey-One',
                    textMonthFontFamily: 'Jockey-One',
                    textDayHeaderFontFamily: 'Jockey-One',
                    calendarBackground: '#E6E6E6',
                    textDayFontSize: 20,
                    textMonthFontSize: 35,
                    textDayHeaderFontSize: 18
                }}
            />
        </View>
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
