import React, { useEffect, useState } from 'react';

//design
import { Text, View, StyleSheet, Modal } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { SummaryStyles } from '../../../../style/summaryStyle';
import { GoButton } from '../../../../shared/customButtons';
import { FontAwesome } from '@expo/vector-icons';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { tabToggle } from '../../../../modules/state';

export const SummaryScreen = ({ navigation, route }) => {
	//Toggle Modal
	const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
		console.log('Modal toggled');
        setModalOpen(!modalOpen);
    };
	
    let dispatch = useDispatch();
	
    //To implment, instant dispatch.
    // useEffect(
    //     () => {
    //         dispatch(tabToggle());
    //     },
    //     [dispatch]
    // );
	
	//format completed exercise date
    const date = new Date();
    const formatDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    let user = route.params.user;
	let backgroundColor = route.params.backgroundColor;
    return (
        <View style={{...GlobalStyles.container, backgroundColor: backgroundColor}}>
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
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.block_description}>Memo</Text>
						<View style={{margin: '5%'}}>
                        	<FontAwesome name="plus" color="#333333" size={20} onPress={toggleModal}/>
						</View>
                    </View>
                </View>
                <View style={styles.block}>
                    <Text style={styles.block_description}>Difficulty</Text>
                </View>
            </View>
            <GoButton
                text="NEXT"
                onPress={() => {
                    navigation.navigate('GraphScreen');
                }}
                style={{ margin: '10%' }}
            />
        </View>
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
        margin: 15
    }
});