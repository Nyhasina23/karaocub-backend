import { Request, Response, Router } from "express"
import { authenticateToken } from "../middlewares/authentificationToken"
import { AdminModel } from "../models/admin.model";
import { generateToken } from "../utils/generateJwtToken";

const AdminRouter = Router()

AdminRouter.post('/', async (req: Request, res: Response) => {

    try {
        const { username, password } = req.body;

        const admin = await AdminModel.findOne(username, password);
        if (admin) {
            const token = generateToken(admin._id.toString(), username)
            res.status(200).send(token)
        } else {
            res.status(404).send("Username or password incorrect")
        }

    } catch (error) {
        res.status(500).send("Unable to login admin")
    }

})

AdminRouter.patch('/', authenticateToken, async (req: Request, res: Response) => {

    try {
        const { adminId, username, password } = req.body;

        const admin = await AdminModel.findByIdAndUpdate(adminId, {
            username, password
        });
        if (admin) {
            const token = generateToken(admin._id.toString(), username)
            res.status(200).send(token)
        } else {
            res.status(404).send("admin not found")
        }

    } catch (error) {
        res.status(500).send("Unable to update admin")
    }

})

AdminRouter.get('/:adminId', async (req: Request, res: Response) => {

    try {
        const { adminId } = req.params;

        const admin = await AdminModel.findById(adminId);
        if (admin) {
            res.status(200).send(admin)
        } else {
            res.status(404).send("admin not found")
        }

    } catch (error) {
        res.status(500).send("Unable to get admin")
    }

})


export { AdminRouter }
