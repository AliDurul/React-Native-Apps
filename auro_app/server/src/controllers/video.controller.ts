import { Request, Response, NextFunction } from 'express';
import Video, { IVideo } from "../models/video.models";

import { CustomError } from "../utils/common";


export const getVideos = async (req: Request, res: Response): Promise<void> => {

    const result = await res.getModelList(Video)

    res.send({
        success: true,
        details: await res.getModelListDetails(Video),
        result,
    });
};

export const createVideo = async (req: Request, res: Response): Promise<void> => {

    req.body.creator = req.user?._id;
    const result = await Video.create(req.body);

    if (!result) throw new CustomError("Video not created", 400);

    res.status(201).send({
        success: true,
        result,
    });
};

export const getVideoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await Video.findById(id);

    if (!result) throw new CustomError("Video not found", 404);

    res.status(200).send({
        success: true,
        result,
    });
};

export const updateVideo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await Video.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    if (!result) throw new CustomError("Video not found", 404);

    res.status(201).send({
        success: true,
        result
    });

};

export const deleteVideo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const data = await Video.deleteOne({ _id: id })

    if (!data.deletedCount) throw new CustomError("Video not found or already deleted.", 404, true);

    res.status(data.deletedCount ? 204 : 404).send({
        succes: data.deletedCount,
        data
    })

};

