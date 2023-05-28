import { Request, Response } from 'express';
import { TRoute } from '../src/backend/routes/types';
import { prisma } from '../src/backend/database';
import { verifyToken } from '../src/backend/utils/jwt.utils';
const SECRET = (process.env.SECRET_KEY as string) ?? 'XYZ'
import * as jwtUtils from '../src/backend/utils/jwt.utils';
jest.mock('../src/backend/utils/jwt.utils');

const ratingHandler: TRoute = {
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
                } else if (unlike) {
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
};


describe('ratingHandler', () => {
    let req: Request;
    let res: Response;

    beforeEach(() => {
        req = {
            query: {},
            headers: {},
        } as Request;
        res = {
            send: jest.fn(),
        } as unknown as Response;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add opinion when postId, like, and userId are provided and existingRating is null', async () => {
        req.query.postId = '1';
        req.query.like = 'true';
        req.headers.authorization = 'Bearer token123';

        const verifyTokenMock = jest.spyOn(jwtUtils, 'verifyToken');
        verifyTokenMock.mockReturnValueOnce({
            isValid: true,
            content: {
                id: 'userId123',
            },
        });

        jest.spyOn(prisma.ratings, 'findUnique').mockResolvedValueOnce(null);
        jest.spyOn(prisma.ratings, 'create').mockResolvedValueOnce({} as any);

        await ratingHandler.handler(req, res);

        expect(prisma.ratings.create).toHaveBeenCalledWith({
            data: {
                postId: 1,
                userId: 'userId123',
                like: 1,
                unlike: 0,
            },
        });

        expect(res.send).toHaveBeenCalledWith('Opinion has been added');
    });

    it('should update existingRating with like when postId, like, and userId are provided and existingRating is not null', async () => {
        req.query.postId = '1';
        req.query.like = 'true';
        req.headers.authorization = 'Bearer token123';

        const verifyTokenMock = jest.spyOn(jwtUtils, 'verifyToken');
        verifyTokenMock.mockReturnValueOnce({
            isValid: true,
            content: {
                id: 'userId123',
            },
        });

        jest.spyOn(prisma.ratings, 'findUnique').mockResolvedValueOnce({
            id: 1,
            postId: 1,
            userId: 'userId123',
            like: 0,
            unlike: 0,
        } as any);
        jest.spyOn(prisma.ratings, 'upsert').mockResolvedValueOnce({} as any);

        await ratingHandler.handler(req, res);

        expect(prisma.ratings.upsert).toHaveBeenCalledWith({
            where: { userId: 'userId123' },
            create: {
                postId: 1,
                userId: 'userId123',
                like: 1,
                unlike: 0,
            },
            update: {
                postId: 1,
                userId: 'userId123',
                like: 1,
                unlike: 0,
            },
        });

        expect(res.send).toHaveBeenCalledWith('Opinion has been added');
    });
});
