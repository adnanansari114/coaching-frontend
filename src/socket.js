import { io } from "socket.io-client";
const URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL || window.location.origin;
export const socket = io(URL, { autoConnect: true });





// import { io } from "socket.io-client";

// const URL = 'http://localhost:5000'; // Replace with your backend URL

// // Create a single socket instance to be reused throughout the app
// export const socket = io(URL, {
//     autoConnect: false,
// });