import { Request, Response, Router } from "express"
import { authenticateToken } from "../middlewares/authentificationToken"
import { authenticationEventController, createNewEventController, getAllEventController, getEventByIdController } from "../controllers/event.controller"
import { upload } from "../middlewares/multerUploader"

const EventRouter = Router()

EventRouter.post('/create', authenticateToken, upload.single('image'), (req: Request, res: Response) => createNewEventController(req, res))
EventRouter.post('/authenticate', (req: Request, res: Response) => authenticationEventController(req, res))
EventRouter.get('/:eventId', authenticateToken, (req: Request, res: Response) => getEventByIdController(req, res))
EventRouter.get('/', authenticateToken, (req: Request, res: Response) => getAllEventController(req, res))


export { EventRouter }
