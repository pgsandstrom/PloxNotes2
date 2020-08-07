// import { save, load } from './controller/note';
import socketio from "socket.io";
import { PartialDict, WEBSOCKET_COMMAND } from "types";
import { load, save } from "./noteController";

interface NoteConnection {
  noteId: string;
  socket: socketio.Socket;
}

const activeSockets: PartialDict<string, NoteConnection> = {};

export default (io: socketio.Server) => {
  // TODO really using the rest interface to update data should trigger all websockets to send out new data... but you know...
  io.sockets.on("connection", (socket) => {
    activeSockets[socket.id] = { noteId: "", socket };
    socket.on(WEBSOCKET_COMMAND.SET_ID, (noteId) => {
      if (activeSockets[socket.id] === undefined) {
        return;
      }
      activeSockets[socket.id]!.noteId = noteId;
      // When client clarifies who they are, send out the data to them!
      load(noteId).then((notes) => {
        socket.emit(WEBSOCKET_COMMAND.LOAD, { noteId, notes: notes.data });
      });
    });
    socket.on(WEBSOCKET_COMMAND.POST, (data) => {
      console.log("server receinved post");
      const { id, notes } = data;
      save(id, notes).then(() => {
        Object.keys(activeSockets)
          .filter((socketId) => socketId !== socket.id) // Remove own socket
          .filter((socketId) => activeSockets[socketId]?.noteId === id) // Remove users in other notes
          .map((socketId) => activeSockets[socketId]!.socket)
          .forEach((otherSocket) =>
            otherSocket.emit(WEBSOCKET_COMMAND.LOAD, { id, notes })
          );
        socket.emit("ok");
      });
    });
    socket.on("disconnect", () => {
      delete activeSockets[socket.id];
    });
  });
};