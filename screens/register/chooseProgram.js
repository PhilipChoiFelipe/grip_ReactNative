import React, { useState } from 'react';
import {
    StyleSheet,
    Button,
    TextInput,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { NavButton, EmptySpace, GoButton } from '../../shared/customButtons';
import { Avatar, Card, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../style/globalStyle'
const color = {
    1: 'rgba(119, 128, 115, 0.8)',
    2: 'rgba(115, 128, 126, 0.8)',
    3: 'rgba(128, 89, 89, 0.8)',
    4: 'rgba(128, 115, 115, 0.8)',
    5: 'rgba(153, 110, 92, 0.8)'
};
export const ChooseProgram = ({ navigation }) => {
    const [programs, setPrograms] = useState([
        {
            title: 'Make one count',
            description:
                'Start with 6 weeks of basic training to achieve one proper pull up: deadhang, negative, etc',
            image: '../../assets/images/images_pullup/pullup1.jpg',
            color: color[Math.floor(Math.random() * 5 + 1)]
        },
        {
            title: 'Up to 50',
            description:
                'Make yourself dream high enough! Reach 50 pulls with this program. Only requirements are passion and perseverance',
            image: '../../assets/images/images_pullup/pullup1.jpg',
            color: color[Math.floor(Math.random() * 5 + 1)]
        },
        {
            title: 'Recon Ron',
            description:
                'Classic pullup programs that helped many people to reach their goal. It is 38weeks long program to reach more than 30 pullups',
            image: '../../assets/images/images_pullup/pullup1.jpg',
            color: color[Math.floor(Math.random() * 5 + 1)]
        }
    ]);
    const [program, setProgram] = useState('');
    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.title_Container}>
                <Text style={GlobalStyles.title}>
                    PullUp Program <br />recommendation
                </Text>
                <Avatar
                    rounded
                    title="MS"
                    size="medium"
					titleStyle={{fontSize: 22}}
                    overlayContainerStyle={{ backgroundColor: '#4D3636' }}
                />
            </View>
            <View style={GlobalStyles.body_Container}>
                <FlatList
                    extraData={program}
                    data={programs}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setProgram(item.title);
                                console.log(program);
                                console.log(Math.floor(Math.random() * 5 + 1));
                            }}
                        >
                            <Card
                                title={item.title}
                                image={require('../../assets/images/images_pullup/pullup1.jpg')}
                                containerStyle={{
                                    backgroundColor: item.color,
                                    borderRadius: 20
                                }}
                                titleStyle={{
                                    color: '#333333',
                                    fontFamily: 'Jockey-One',
                                    alignSelf: 'flex-start',
                                    fontSize: 25,
                                    marginLeft: 10
                                }}
                            >
                                <View style={styles.card_descriptionContainer}>
                                    <Text style={styles.card_description}>{item.description}</Text>
                                    <Ionicons
                                        name="md-checkmark-circle"
                                        size={program == item.title ? 50 : 0}
                                    />
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Divider
                style={{ marginTop: 5, backgroundColor: 'rgba(51, 51, 51, 0.75)', marginHorizontal: '5%' }}
            />
            <View style={styles.buttons}>
                <NavButton text="<-" style={styles.navButton} onPress={() => navigation.navigate('CheckMax')} />
                <GoButton text="Go" onPress={() => navigation.navigate('CheckMax')} />
				<EmptySpace/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card_description: {
        fontFamily: 'IBMPlexSans-medium',
        color: '#333333',
        padding: 10
    },
    card_descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        // textAlign:'center'
    },
	buttons: {
		flex: 1,
        flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		marginHorizontal: '20%',
	},
	navButton: {
		transform: [{ rotate: '180deg' }],
		marginTop: 20
	}
});