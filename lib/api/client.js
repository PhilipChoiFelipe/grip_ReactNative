import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = 'https://pullup-alpha-fzetd.run.goorm.io';


export default client;

// export const handleError = ({response}) => {
// 	if(response.data.error){
// 		throw new Error(error);
// 	}
// }

