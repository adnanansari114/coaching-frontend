import { io } from "socket.io-client";
const URL = 'http://localhost:5000';
export const socket = io(URL, { autoConnect: true });





// import { io } from "socket.io-client"; 

// const URL = 'http://localhost:5000'; // Replace with your backend URL

// // Create a single socket instance to be reused throughout the app
// export const socket = io(URL, {
//     autoConnect: false,
// });