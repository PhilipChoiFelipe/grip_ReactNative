import { StyleSheet } from 'react-native';

export const GlobalStyles = {
	container: {
		backgroundColor: '#E6E6E6',
		flex: 1
	},
	title: {
		fontSize: 32,
		color: '#333333',
		fontFamily: 'Jockey-One',
		lineHeight: 35
	},
	title_Container: {
		height: 90,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: '5%',
		paddingVertical: '5%',
		alignItems: 'center',
	},
	body_Container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	home_description: {
		// flex: 1,
        fontSize: 15,
        color: '#333333',
        fontFamily: 'Jockey-One',
        textAlign: 'center',
		// justifyContent: 'center',
        backgroundColor: 'rgba(128, 128, 128, 0.6);',
        borderRadius: 25,
        marginHorizontal: '15%',
        padding: 5
    },
    home_state: {
        lineHeight: 15,
        fontFamily: 'Jockey-One',
        color: '#333333',
        fontSize: 15
    },
	flipShape: {
		transform: [{ rotate: '180deg' }]
	},
	errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'
    }
};