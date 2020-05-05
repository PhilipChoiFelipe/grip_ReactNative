import React from 'react';

//design
import { StyleSheet, View, Text} from 'react-native';

export const EmptyComponent = () => {
	return(
	<View style={styles.container}>
						<Text style={styles.text}>
							Select Date with red marks
						</Text>
					</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: 'rgba(51, 51, 51, 0.7)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15,
		marginHorizontal: '5%',
		marginVertical: '5%',
	},
	text: {
		fontFamily: 'Jockey-One',
		color: '#333333',
		fontSize: 25,
		paddingVertical: 26,
		paddingHorizontal: 15
	}
})