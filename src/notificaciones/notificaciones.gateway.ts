import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*', }, })
@Injectable()
export class NotificacionesGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
    }

    handleConnection(client: Socket) {
    }

    handleDisconnect(client: Socket) {
    }

    sendNotification(notification: any) {
        try {
            this.server.emit('new_notification', notification);
        } catch (error) {
            console.error('Error al enviar notificación global:', error.message);
        }
    }
}
