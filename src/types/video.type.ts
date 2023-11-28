export interface IVideo {
    _id?: string;
    type: VideoType;
    duration: string;
    url: string;

}

export type VideoType = {
    GOLD: string;
    GUEST: string;
}