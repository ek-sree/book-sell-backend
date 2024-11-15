import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import config from '../config/config';

export const createToken = (userId: Types.ObjectId) => { 
    const token = jwt.sign(
        { userId: userId.toString() }, 
        config.SECRET_KEY, 
        { expiresIn: '1h' }
    );
    return token;
};
