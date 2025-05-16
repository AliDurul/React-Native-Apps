import { Request, Response, NextFunction } from 'express';
import Token from "../models/token.models";

import { CustomError } from "../utils/common";


export const getTokens = async (req: Request, res: Response): Promise<void> => {

    const result = await res.getModelList(Token)

    res.send({
        success: true,
        details: await res.getModelListDetails(Token),
        result,
    });
};

export const createToken = async (req: Request, res: Response): Promise<void> => {

    const result = await Token.create(req.body);

    if (!result) throw new CustomError("Token not created", 400);

    res.status(201).send({
        success: true,
        result,
    });
};

export const getTokenById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await Token.findById(id);

    if (!result) throw new CustomError("Token not found", 404);

    res.status(200).send({
        success: true,
        result,
    });
};

export const updateToken = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await Token.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    if (!result) throw new CustomError("Token not found", 404);

    res.status(201).send({
        success: true,
        result
    });

};

export const deleteToken = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const data = await Token.deleteOne({ _id: id })

    if (!data.deletedCount) throw new CustomError("Token not found or already deleted.", 404, true);

    res.status(data.deletedCount ? 204 : 404).send({
        succes: data.deletedCount,
        data
    })

};

