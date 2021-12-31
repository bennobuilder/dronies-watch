import { io, Socket } from 'socket.io-client';

class SocketService {
  public socket: Socket | null = null;

  public connect(url: string): Promise<Socket> {
    return new Promise((rs, rj) => {
      // https://socket.io/docs/v4/client-initialization/#from-a-different-domain
      this.socket = io(url);
      if (this.socket == null) rj();

      this.socket.on('connect', () => {
        console.log('Connected to socket', { socket: this.socket });
        rs(this.socket as Socket);
      });

      this.socket.on('connect_error', (err) => {
        console.error('Connection error: ', err);
        rj(err);
      });
    });
  }
}

export const socketService = new SocketService();
