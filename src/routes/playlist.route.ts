import { Request, Response, Router } from "express"
import { authenticateToken } from "../middlewares/authentificationToken"
import { createNewPlaylistController, addSongToPlaylistController, updatePlaylistController, deletePlayListController, fetchPlaylistByEventController } from "../controllers/playlist.controller"

const PlayListRouter = Router()


PlayListRouter.post('/create', authenticateToken, (req: Request, res: Response) => createNewPlaylistController(req, res))
PlayListRouter.post('/add-song', authenticateToken, (req: Request, res: Response) => addSongToPlaylistController(req, res))
PlayListRouter.patch('/', authenticateToken, (req: Request, res: Response) => updatePlaylistController(req, res))
PlayListRouter.delete('/:playlistId', authenticateToken, (req: Request, res: Response) => deletePlayListController(req, res))
PlayListRouter.get('/:eventId', authenticateToken, (req: Request, res: Response) => fetchPlaylistByEventController(req, res))


export { PlayListRouter }
