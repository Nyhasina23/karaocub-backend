import mongoose from 'mongoose';
import { IPlayList } from '../types/playlist.type';

const PlayListSchema = new mongoose.Schema<IPlayList>({
    karaokes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "karaokes",
        required: false
    }],
    name: {
        type: String,
        required: true
    }
})

export const PlayListModel = mongoose.model('playlists', PlayListSchema)