import { Request, Response, NextFunction } from 'express';
import { ENV } from '../configs/env';
import User, { IUser } from '../models/user.model';
import { CustomError, passwordEncrypt, sendMail, setToken } from '../utils/common';
import { passResetReqTemp, passResetSuccessTemp, verificationEmailTemp, welcomeEmailTemp } from '../utils/emailTemplates';
import crypto from 'node:crypto';
import { TForgetPass, TLoginUser, TRegisterUser, TResetPass, TVerifyEmail } from '../utils/validationSchemas';
import Token from '../models/token.models';


export const register = async (req: Request, res: Response): Promise<void> => {

    const { email } = req.body as TRegisterUser;

    const exists = await User.exists({ email });

    if (exists) throw new CustomError('This email is already used.', 409);

    const user = await User.create(req.body);

    // await sendMail({
    //     to: user.email,
    //     subject: 'Verify your email',
    //     tempFn: verificationEmailTemp,
    //     data: { verificationCode: user.verificationToken }
    // });

    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData) {
        tokenData = await Token.create({
            userId: user._id,
            token: passwordEncrypt(user._id.toString() + Date.now())
        });
    };

    res.status(200).send({
        success: true,
        token: tokenData.token,
        user: {
            id: user._id,
            name: user.username,
            email: user.email,
            avatar: user.avatar
        }
    });
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as TLoginUser;

    const user = await User.findOne<IUser>({ email, password });

    if (!user) throw new CustomError('Invalid email or password', 401, true);

    // if (!user.isVerified) throw new CustomError('Email not verified', 403, true);

    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData) {
        tokenData = await Token.create({
            userId: user._id,
            token: passwordEncrypt(user._id.toString() + Date.now())
        });
    };

    res.status(200).send({
        success: true,
        token: tokenData.token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }
    });
};


export const verifyEmail = async (req: Request, res: Response): Promise<void> => {

    const { verificationToken } = req.body as TVerifyEmail;

    const user = await User.findOne<IUser>({ verificationToken, verificationTokenExpiresAt: { $gt: new Date() } });

    if (!user) throw new CustomError('Invalid or expired verification token', 400);

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    sendMail({
        to: user.email,
        subject: 'Email verified successfully',
        tempFn: welcomeEmailTemp
    });

    res.status(200).send({
        success: true,
        message: 'Email verified successfully'
    });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    if (req.user._id) {
        const token = await Token.deleteOne({ userId: req.user._id });
    }

    res.status(200).send({ success: true, message: 'Logged out successfully' });
};

export const forgetPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body as TForgetPass;

    const user = await User.findOne<IUser>({ email });

    if (!user) throw new CustomError('User not found', 404, true);

    if (!user.isVerified) throw new CustomError('User email is not verified. Please verify your email.', 403, true);

    user.resetPassToken = crypto.randomBytes(20).toString('hex');

    user.resetPassExpiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours later

    await user.save();

    await sendMail({
        to: user.email,
        subject: 'Reset your password',
        tempFn: passResetReqTemp,
        data: { resetURL: ENV.frontendUrl + '/reset-password/' + user.resetPassToken }
    });

    res.status(200).send({
        success: true,
        message: 'Password reset link sent to your email'
    });
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { resetPassToken } = req.params;
    const { password } = req.body as TResetPass;

    const user = await User.findOne<IUser>({ resetPassToken, resetPassExpiresAt: { $gt: new Date() } });

    if (!user) throw new CustomError('Invalid or expired reset token', 400);

    user.password = password;
    user.resetPassToken = undefined;
    user.resetPassExpiresAt = undefined;
    await user.save();

    await sendMail({
        to: user.email,
        subject: 'Password reset successfully',
        tempFn: passResetSuccessTemp
    });

    res.status(200).send({
        success: true,
        message: 'Password reset successfully'
    });
};