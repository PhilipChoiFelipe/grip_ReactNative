import React, { useEffect } from 'react';
//design
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import { GoButton, NumberButton } from '../../../../shared/customButtons';
import { GlobalStyles } from '../../../../style/globalStyle';
//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateMax, increase, decrease } from '../../../../modules/userState';
import { tabToggle } from '../../../../modules/appState';

const checkMax = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { updateMaxError, maxPullups, stay } = useSelector(({ userState }) => ({
        updateMaxError: userState.updateMax.updateMaxError,
        maxPullups: userState.updateMax.maxPullups,
		stay: userState.updateMax.stay
    }), shallowEqual);
	
	const handleSumbit = (e) => {
		e.preventDefault();
		console.log("%c CHECK_MAX_COUNT", 'background: black; color: white', maxPullups);
		dispatch(updateMax({ maxPullups }))

	}
	
	const createAlert = () =>  Alert.alert(
      "Don't fit current program",
      "Change Program?",
      [
        {
          text: "Stay",
          onPress: () => {
			  dispatch(tabToggle());
			  navigation.navigate("ProfileScreen")
		  },
          style: "cancel"
        },
        { text: "Change", onPress: () => navigation.navigate("ChooseProgram") }
      ],
      { cancelable: false }
    );
	
	//wether if user should continue on his program or not 
	useEffect(() => {
		if(stay == false){
			createAlert();
		}else if(stay == true){
			dispatch(tabToggle());
			navigation.navigate('ProfileScreen');
		}
	}, [stay])
	
	//handle http error
	useEffect(() => {
		if(updateMaxError){
			console.log('UPDATE_MAX_ERROR', 'background: red; color: white', updateMaxError);
		}
	},[updateMaxError]);
	
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <View style={GlobalStyles.body_Container}>
                <NumberButton
                    onPress={() => {
                        if (maxPullups < 100) {
                            dispatch(increase());
                        }
                    }}
                />
                <Text style={styles.number}>{maxPullups}</Text>
                <NumberButton
                    style={styles.triangleDown}
                    onPress={() => {
                        if (maxPullups > 0) {
                            dispatch(decrease());
                        }
                    }}
                />
            </View>
            <GoButton
                text="Go"
                style={{ marginVertical: '5%' }}
                /*onPress={() => {
					Alert.alert(
						'Update max pullups',
						'Please be honest for yourself',
						[
							{text: 'Yes', onPress: () => dispatch(updateMax({ maxPullups }))},
							{text: 'No', onPress: () => dispatch(navigation.navigate('Profile'))}
						]
					);
                }}*/
				onPress={handleSumbit}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    number: {
        fontFamily: 'Jockey-One',
        color: '#333333',
        fontSize: 250,
        lineHeight: 260,
        // marginTop: '15%',
        top: '6%'
    },
    triangleDown: {
        transform: [{ rotate: '180deg' }]
    }
});

export const CheckMax = React.memo(checkMax);