import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = 'https://grip-alpha.herokuapp.com';


export default client;

// export const handleError = ({response}) => {
// 	if(response.data.error){
// 		throw new Error(error);
// 	}
// }

