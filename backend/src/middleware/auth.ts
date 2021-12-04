// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.model';

// const NAMESPACE = 'Auth';

// const authenticateToken = async (req: any, res: Response, next: NextFunction) => {

//     const token = req.headers.authorization?.split(' ')[1];

//     if (token) {
//         jwt.verify(token, config.server.token.secret, async (error: any, decoded: any) => {
//             if (error) {
//                 res.status(404).json({
//                     message: error.message,
//                     error
//                 })
//             }

//             if (decoded) {
//                 User.findById(decoded['_id'])
//                     .then(user => {
//                         req.user = user;
//                         next();
//                     })
//                     .catch(error => res.status(401).json({ message: error.message, error }))
//             }
//         })
//     } else {
//         res.status(401).json({
//             message: 'You are not logged in! Please login.'
//         });
//     }
// };

// const restrictTo = (...roles: String[]) => {
//     return (req: any, res: Response, next: NextFunction) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(404).json({
//                 message: 'You do not have permission to perform this action!'
//             })
//         }
//         next();
//     }
// }

// export default { authenticateToken, restrictTo };
