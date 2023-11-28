import { Request, Response, Router } from "express"
import { authenticateToken } from "../middlewares/authentificationToken"
import { upload } from "../middlewares/multerUploader"
import { createNewVideoController, getVideoByTypeController } from "../controllers/video.controller"

const VideoRouter = Router()

VideoRouter.post('/create', authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req: Request, res: Response) => createNewVideoController(req, res))
VideoRouter.get('/', authenticateToken, (req: Request, res: Response) => getVideoByTypeController(req, res))

export { VideoRouter }
