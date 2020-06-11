import React, { useEffect, useState } from 'react';

//design
import { SafeAreaView, StyleSheet, View, Text, Alert, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { GoButton } from '../../../../../shared/customButtons';
import { GlobalStyles } from '../../../../../style/globalStyle';
import { CreateAlert } from '../../../../../shared/alert';

//componenet
import { WeekItem } from './weekItem';


//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { selectWeek } from '../../../../../modules/userState';
import { tabToggle } from '../../../../../modules/appState';

//util
import _ from 'lodash';

export const ChangeWeek = ({ navigation }) => {
	const dispatch = useDispatch();
    const [selectedWeek, setSelectedWeek] = useState(null);

    const onSubmit = () => {
		if(!selectedWeek){
			CreateAlert('Choose Week!', '');	 
		}else{
			console.log('%c SELECTED_WEEK:', 'background: black; color: white', selectedWeek);
        	dispatch(selectWeek({selectedWeek}));
			navigation.navigate('ProfileScreen');
			dispatch(tabToggle());
		}
    };

    const { programWeeks } = useSelector(
        state => ({
            programWeeks: state.userState.programWeeks.programWeeks
        }),
        shallowEqual
    );

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <View style={GlobalStyles.body_Container}>
                <FlatList
                    style={{width: Dimensions.get('window').width - 40,}}
                    keyExtractor={(item, index) => index + ''}
                    extraData={selectedWeek}
                    data={programWeeks}
                    renderItem={({ item, index }) => {
                        return (
                            <WeekItem item={item} index={index} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek}/>
                        );
                    }}
                />
            </View>
			<GoButton text="Save" onPress={onSubmit} style={{ bottom: 10, position: 'absolute', alignSelf:'center' }} />
        </SafeAreaView>
    );
};

