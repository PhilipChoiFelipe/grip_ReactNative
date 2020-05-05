import React, { useEffect } from 'react';

import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setIncrease, drawerClose } from '../../../../modules/appState';

//util
import Drawer from 'react-native-drawer';
import { ExerciseDrawer } from './exerciseDrawer';

export const SetScreen = ({ navigation, route }) => {
    let dispatch = useDispatch();
    // let program = route.params.program;
    // let backgroundColor = route.params.backgroundColor;

    const { program, currentSet, showDrawer } = useSelector(
        state => ({
            program: state.userState.program.program,
            currentSet: state.appState.currentSet,
			showDrawer: state.appState.toggle.showDrawer
        }),
        shallowEqual
    );

    //if currentSet >= program set length, program is done.
    const handleNavigate = () => {
        if (currentSet < program.set.length - 1) {
            navigation.navigate('RestScreen');
            dispatch(setIncrease());
        } else {
            navigation.navigate('DoneScreen');
        }
    };
    // console.log('TODAY SET', program.set[currentSet]);
    // console.log('TODAY length', program.set.length);
	useEffect(() => {
		console.log('%c SET_PROGRAM_SET:', 'background: purple; color: white', program.set[currentSet]);
	}, [program, currentSet])
    return (
        <Drawer
            type="overlay"
            tapToClose={true}
            openDrawerOffset={0.2} // 20% gap on the right side of drawer
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            open={showDrawer}
			onClose={()=>{dispatch(drawerClose())}}
            content={<ExerciseDrawer program={program} navigation={navigation} />}
        >
            <SafeAreaView style={{ ...GlobalStyles.container, backgroundColor: '#F2F2F2' }}>
                <View style={GlobalStyles.body_Container}>
                    <Text style={GlobalStyles.title}>
                        THIS IS SET [{program.set[currentSet].rep}]
                    </Text>
                </View>
                <GoButton text="NEXT" style={{ margin: '10%' }} onPress={handleNavigate} />
            </SafeAreaView>
        </Drawer>
    );
};