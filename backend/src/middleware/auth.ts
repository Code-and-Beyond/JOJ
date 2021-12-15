import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { getUserByUsername } from '../services/user.services';

const authenticateToken = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];

    // skipping auth for google login
    console.log(req.path);
    // if (req.path === '/api/auth/google' && req.method === 'POST') {
    //     next();
    // }

    if (token) {
        jwt.verify(
            token,
            config.server.token.secret,
            async (error: any, decoded: any) => {
                if (error) {
                    res.status(404).json({
                        message: error.message,
                        error,
                    });
                }

                if (decoded) {
                    try {
                        const user = await getUserByUsername(
                            decoded['username']
                        );
                        req.user = user;
                        next();
                    } catch (error: any) {
                        res.status(401).json({ message: error.message, error });
                    }
                }
            }
        );
    } else {
        res.status(401).json({
            message: 'You are not logged in! Please login.',
        });
    }
};

const generateAccessToken = (user: any) => {
    const accessToken = jwt.sign(user, config.server.token.secret, {
        expiresIn: config.server.token.expireTime,
    });
    return accessToken;
};

const restrictTo = (...roles: String[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(404).json({
                message: 'You do not have permission to perform this action!',
            });
        }
        next();
    };
};

export default { authenticateToken, generateAccessToken, restrictTo };
