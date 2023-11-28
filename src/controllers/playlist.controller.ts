import { Request, Response } from "express";
import { addSongToPlaylistService, createNewPlaylistService, deletePlayListService, fetchPlaylistByEventService, updatePlaylistService } from "../services/playlist.service";


export const createNewPlaylistController = async (req: Request, res: Response) => {
    try {
        const { idEvent, name } = req.body;

        if (idEvent && name) {

            let response = await createNewPlaylistService(idEvent, name)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while creating playlist')
    }

}

export const addSongToPlaylistController = async (req: Request, res: Response) => {
    try {
        const { playlistId, karaokeId } = req.body;

        if (playlistId && karaokeId) {

            let response = await addSongToPlaylistService(playlistId, karaokeId)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while adding song to playlist')
    }

}

export const updatePlaylistController = async (req: Request, res: Response) => {
    try {
        const { playlistId, name, karaokes } = req.body;

        if (playlistId && name && karaokes) {

            let response = await updatePlaylistService(playlistId, name, karaokes);
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while updating playlist')
    }

}

export const deletePlayListController = async (req: Request, res: Response) => {
    try {
        const { playlistId } = req.params;

        if (playlistId) {

            let response = await deletePlayListService(playlistId);
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while deleting playlist')
    }

}


export const fetchPlaylistByEventController = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;

        if (eventId) {

            let response = await fetchPlaylistByEventService(eventId);
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while fetching playlist')
    }

}