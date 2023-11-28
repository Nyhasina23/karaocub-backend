export interface IEvent {
    _id?: string;
    name: string;
    clientName: string;
    image: string;
    email: string;
    password: string;
    videos?: string[];
    playlists?: string[];
    date?: String
}