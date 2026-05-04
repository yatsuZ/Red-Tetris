import { io, type Socket } from "socket.io-client";

const chemin_server_requet_socket : string = import.meta.env.VITE_SERVER_URL + ":" + import.meta.env.VITE_SERVER_PORT;
export const socket: Socket = io(chemin_server_requet_socket);

socket.on("connect", () => {
  console.log(`Client connecté ! ID: ${socket.id}`);
});
socket.on("connect_error", (err) => {
    console.log("Erreur connexion socket :", err.message);
});
