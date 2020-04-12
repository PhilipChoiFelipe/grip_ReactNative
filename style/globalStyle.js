import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFF0',
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
		// borderBottomWidth: 1,
		// borderBottomColor: 'rgba(51, 51, 51, 0.75)'
	},
	body_Container: {
		flex: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	home_description: {
        fontSize: 15,
        color: '#333333',
        fontFamily: 'Jockey-One',
        textAlign: 'center',
        backgroundColor: 'rgba(128, 128, 128, 0.6);',
        borderRadius: 25,
        marginHorizontal: '15%',
        padding: 5
    },
    home_state: {
        lineHeight: 8,
        fontFamily: 'Jockey-One',
        color: '#333333',
        fontSize: 15
    },
	flipShape: {
		transform: [{ rotate: '180deg' }]
	}
});