import { Event } from './event';
import { User } from './user';

export interface Ticket {
    uid: string;
    situacao: string;
    evento: Event;
    participante: User;
}
