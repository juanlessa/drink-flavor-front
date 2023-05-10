import axios from 'axios';


export default defineNuxtPlugin(() => {
    const baseURL = "http://localhost:3333" 
    
    const api = axios.create({
		baseURL: baseURL
	});
    
    return {
        provide: {
          axios: api,
        },
      };
})