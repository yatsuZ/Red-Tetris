import { io, type Socket } from 'socket.io-client';

const serverUrl: string = import.meta.env.VITE_SERVER_URL + ':' + import.meta.env.VITE_SERVER_PORT;
export const socket: Socket = io(serverUrl);

socket.on('connect', () => {
	console.log(`Client connecté ! ID: ${socket.id}`);
});
socket.on('connect_error', (err) => {
	console.log('Erreur connexion socket :', err.message);
});
