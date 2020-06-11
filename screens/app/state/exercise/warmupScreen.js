import React, { useState, useEffect } from 'react';

//design
import { SafeAreaView, Text, View, StyleSheet, Button } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

//util
import Drawer from 'react-native-drawer'
import { ExerciseDrawer } from './exerciseDrawer';

//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { drawerClose, tabFalse } from '../../../../modules/appState';

export const WarmupScreen = ({ navigation, route }) => {
    let dispatch = useDispatch();
    // const { program } = useSelector(state => ({
    // 	program: state.state.program.program
    // }));

	let program = route.params.program;
	
	const { showDrawer } = useSelector(
        state => ({
			showDrawer: state.appState.toggle.showDrawer
        }),
        shallowEqual
    );
	useEffect(() => {
		console.log('%c WARMUP_SCREEN_PROGRAM:', 'background: purple; color: white');
		console.table(program);
	}, [program]);
	
	
    return (
		<Drawer
			type="overlay"
			tapToClose={true}
			openDrawerOffset={0.2} // 20% gap on the right side of drawer
  			panCloseMask={0.2}
			closedDrawerOffset={-3}
			open={showDrawer}
			onClose={()=>{dispatch(drawerClose())}}
			content={<ExerciseDrawer program={program} navigation={navigation}/>}
			>
			<SafeAreaView style={{...GlobalStyles.container, backgroundColor: '#F2F2F2'}}>
				<View style={GlobalStyles.body_Container}>
					<Text style={GlobalStyles.title}>THIS IS WARMUP</Text>
				</View>
				<View style={{height: 150}}>
					<GoButton
						text="PULL"
						style={{ top: 40 }}
						onPress={() => {
							navigation.navigate('SetScreen');
							dispatch(tabFalse());
						}}
					/>
				</View>
			</SafeAreaView>
		</Drawer>
    );
};