export interface IVideo {
    _id?: string;
    type: VideoType;
    image: string;
    duration: string;
    url: string;

}

export type VideoType = {
    GOLD: string;
    GUEST: string;
}