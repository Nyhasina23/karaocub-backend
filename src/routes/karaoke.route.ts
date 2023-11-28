import { Request, Response, Router } from "express"
import { authenticateToken } from "../middlewares/authentificationToken"
import { upload } from "../middlewares/multerUploader"
import { createNewKaraokeController, fetchAllKaraokeController, fetchAllKaraokeOrderedByViewedCountController, fetchKaraokeByArtistController, fetchKaraokeByCategorieController, fetchKaraokeBySousCategorieController, fetchKaraokeByTitleController, upgradeKaraokeViewerCounterController } from "../controllers/karaoke.controller"

const KaraokeRouter = Router()

KaraokeRouter.post('/create', authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req: Request, res: Response) => createNewKaraokeController(req, res))
KaraokeRouter.get('/categorie/:categorieId', authenticateToken, (req: Request, res: Response) => fetchKaraokeByCategorieController(req, res))
KaraokeRouter.get('/sous-categorie/:sousCategorieId', (req: Request, res: Response) => fetchKaraokeBySousCategorieController(req, res))
KaraokeRouter.get('/search-title', authenticateToken, (req: Request, res: Response) => fetchKaraokeByTitleController(req, res))
KaraokeRouter.get('/search-artist', authenticateToken, (req: Request, res: Response) => fetchKaraokeByArtistController(req, res))
KaraokeRouter.get('/', authenticateToken, (req: Request, res: Response) => fetchAllKaraokeController(req, res))
KaraokeRouter.get('/most-viewed/', authenticateToken, (req: Request, res: Response) => fetchAllKaraokeOrderedByViewedCountController(req, res))
KaraokeRouter.patch('/:karaokeId', authenticateToken, (req: Request, res: Response) => upgradeKaraokeViewerCounterController(req, res))


export { KaraokeRouter }
