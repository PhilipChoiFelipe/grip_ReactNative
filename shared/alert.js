import React from 'react';
import { Alert } from 'react-native';

export const CreateAlert = (title, message) => {
	Alert.alert(
		title,
		message,
		[
			{
				text: "OK"
			}
		],
		{cancelable: false}
	)
};

