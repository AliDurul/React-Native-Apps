import { Router } from "express";
import { createVideo, deleteVideo, getVideoById, getVideos, updateVideo } from "../controllers/video.controller";

const router = Router();

router.route("/").get(getVideos).post(createVideo)
router.route('/:id').get(getVideoById).put(updateVideo).delete(deleteVideo);

export default router;