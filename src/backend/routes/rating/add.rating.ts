import { Request, Response } from 'express';
import { TRoute } from '../types';
import { prisma } from '../../database';
import { verifyToken } from '../../utils/jwt.utils';

const SECRET = process.env.SECRET_KEY as string ?? 'XYZ';

export default {
    method: 'get',
    path: '/api/rating',
    validators: [],
    handler: async (req: Request, res: Response) => {
        const postId = parseInt(req.query.postId as string, 10);
        const like = req.query.like === 'true';
        const unlike = req.query.unlike === 'true';

        const insert = {
            postId,
            userId: null,
            like: 0,
            unlike: 0,
        };

        if (req.headers.authorization) {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (token) {
                const tokenData = verifyToken(token, SECRET);
                if (tokenData.isValid) {
                    insert.userId = tokenData.content.id;
                }
            }
        }
        if (postId && insert.userId) {
            const existingRating = await prisma.ratings.findUnique({
                where: { userId: insert.userId },
            });

            if (existingRating) {
                if (like) {
                    insert.like = 1;
                    await prisma.ratings.upsert({
                        where: { userId: insert.userId },
                        create: insert,
                        update: insert,
                    });
                    res.send('Opinion has been added');
                } else if (unlike ) {
                    insert.unlike = 1;
                    await prisma.ratings.upsert({
                        where: { userId: insert.userId },
                        create: insert,
                        update: insert,
                    });
                    res.send('Opinion has been added');
                }
            } else {
                if (like) {
                    insert.like = 1;
                } else if (unlike) {
                    insert.unlike = 1;
                }

                await prisma.ratings.create({
                    data: insert,
                });

                res.send('Opinion has been added');
            }
        } else {
            res.send('No postId or not logged in');
        }
    },
} as TRoute;
