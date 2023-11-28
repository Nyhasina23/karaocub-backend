import { Request, Response, Router } from "express"
import { authenticateToken } from "../middlewares/authentificationToken"
import { upload } from "../middlewares/multerUploader"
import { createNewCategorieController, addSousCategorieController, fetchAllCategorieAndSousCategorieController, removeSousCategorieController, updateSousCategorieNameController, deleteCategorieController, updateCategorieNameController } from "../controllers/categorie.controller"

const CategorieRouter = Router()

CategorieRouter.post('/create', authenticateToken, upload.single('image'), (req: Request, res: Response) => createNewCategorieController(req, res))
CategorieRouter.patch('/sub/add', authenticateToken, upload.single('image'), (req: Request, res: Response) => addSousCategorieController(req, res))
CategorieRouter.patch('/sub', authenticateToken, (req: Request, res: Response) => updateSousCategorieNameController(req, res))
CategorieRouter.patch('/', authenticateToken, (req: Request, res: Response) => updateCategorieNameController(req, res))
CategorieRouter.delete('/sub/:sousCategorieId', authenticateToken, (req: Request, res: Response) => removeSousCategorieController(req, res))
CategorieRouter.delete('/:categorieId', authenticateToken, (req: Request, res: Response) => deleteCategorieController(req, res))
CategorieRouter.get('/', authenticateToken, (req: Request, res: Response) => fetchAllCategorieAndSousCategorieController(req, res))


export { CategorieRouter }
