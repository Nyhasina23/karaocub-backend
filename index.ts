
import dotenv from "dotenv"
dotenv.config()

import "./src/config/db.config"
import express from 'express'
import morgan from 'morgan'
import cors from "cors"
import bodyParser from "body-parser"
import { PlayListRouter } from "./src/routes/playlist.route"
import { EventRouter } from "./src/routes/event.route"
import { KaraokeRouter } from "./src/routes/karaoke.route"
import { VideoRouter } from "./src/routes/video.route"
import path from "path"
import { AdminRouter } from "./src/routes/admin.route"
import { CategorieRouter } from "./src/routes/categorie.route"

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/public", express.static(path.join(__dirname, "/public")))



//ROUTES **

app.use('/api/playlists', PlayListRouter)
app.use('/api/events', EventRouter)
app.use('/api/karaokes', KaraokeRouter)
app.use('/api/videos', VideoRouter)
app.use('/api/categories', CategorieRouter)
app.use('/api/admin', AdminRouter)

const PORT = process.env.PORT || 8085


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})