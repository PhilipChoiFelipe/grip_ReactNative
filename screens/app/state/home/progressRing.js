import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

export const ProgressRing = () => {
    return (
        <View style={GlobalStyles.container}>
            <View style={{ flex: 9, justifyContent: 'center' }}>
				<Text style={GlobalStyles.home_description}>Day 5 Ring</Text>
				<Text style={styles.ringText}> DAY 3 </Text>
                <ProgressCircle style={{ height: 250, marginTop: '10%' }} progress={0.7} progressColor={'#805959'} strokeWidth={25} animate={true}/>
            </View>
			<GoButton text="Pull" style={{bottom: '5%'}}/>
        </View>
    );
};

const styles = StyleSheet.create({
	ringText : {
		position: 'absolute',
		alignSelf: 'center',
		top: '45%',
		fontSize: 70,
		color: '#333333',
		fontFamily: 'Jockey-One',
	}
})