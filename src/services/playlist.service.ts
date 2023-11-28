import { EventModel } from "../models/event.model";
import { PlayListModel } from "../models/playlist.model";
import { IPlayList } from "../types/playlist.type";
import { ResponseDataType, SetResponseData, SetResponseError } from "../types/response.type";


export const createNewPlaylistService = async (idEvent: string, name: string): Promise<ResponseDataType> => {
    let response: ResponseDataType;
    try {

        const event = await EventModel.findById(idEvent)

        if (event) {
            const newPlaylist = await PlayListModel.create<IPlayList>({
                name,
            })
            event.playlists?.push(newPlaylist._id)
            await event.save()
            response = SetResponseData("Playlist created", 200, newPlaylist)

        } else {
            response = SetResponseError("Event not found", 404, null)
        }

    } catch (error) {
        response = SetResponseError("Unable to create playlist", 500, error)
    }
    return response
}

export const addSongToPlaylistService = async (playlistId: string, karaokeId: string): Promise<ResponseDataType> => {
    let response: ResponseDataType;
    try {

        let playlist = await PlayListModel.findById(playlistId);
        if (playlist) {

            playlist.karaokes?.push(karaokeId);
            await playlist.save()
            response = SetResponseData("Song added to playlist", 200, playlist);
        } else {
            response = SetResponseError("Playlist not found", 404, null)
        }
    } catch (error) {
        response = SetResponseError("Unable to add song to playlist", 500, error)
    }

    return response
}

export const updatePlaylistService = async (playlistId: string, name: string, karaokes: string[]): Promise<ResponseDataType> => {
    let response: ResponseDataType;
    try {

        const updatedPlaylist = {
            name,
            karaokes
        }

        let playlist = await PlayListModel.findByIdAndUpdate(playlistId, {
            $set: updatedPlaylist
        });
        if (playlist) {

            response = SetResponseData("Playlist updated", 200, playlist);
        } else {
            response = SetResponseError("Playlist not found", 404, null)
        }
    } catch (error) {
        response = SetResponseError("Unable to update playlist", 500, error)
    }

    return response
}

export const deletePlayListService = async (playlistId: string): Promise<ResponseDataType> => {
    let response: ResponseDataType;
    try {

        let playlist = await PlayListModel.findByIdAndDelete(playlistId);
        if (playlist) {
            response = SetResponseData("Playlist removed", 200, playlist);
        } else {
            response = SetResponseError("Playlist not found", 404, null)
        }
    } catch (error) {
        response = SetResponseError("Unable to remove playlist", 500, error)
    }

    return response
}


export const fetchPlaylistByEventService = async (eventId: string): Promise<ResponseDataType> => {
    let response: ResponseDataType;
    try {

        let event = await EventModel.findById(eventId).populate("playlists");
        if (event) {
            response = SetResponseData("Playlist fetched", 200, event?.playlists);
        } else {
            response = SetResponseError("Event not found", 404, null)
        }
    } catch (error) {
        response = SetResponseError("Unable to fetch playlist", 500, error)
    }

    return response
}


