const jwt = require('jsonwebtoken');
const adminMiddleware = require('../../middlewares/authorizeAdmin');
const User = require('../../models/user');

jest.mock('jsonwebtoken');
jest.mock('../../models/user');

describe('Admin Middleware and Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { session: {} };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
            redirect: jest.fn(),
            render: jest.fn(),
        };
        next = jest.fn();
    });

    describe('Middleware Tests', () => {
        test('Authorization successful with valid token and ADMIN role', () => {
            const decodedToken = {
                id: 1,
                username: 'admin',
                roles: ['ROLE_ADMIN'],
            };

            req.session.token = 'validToken';
            jwt.verify.mockImplementation(() => decodedToken);

            adminMiddleware(req, res, next);

            expect(jwt.verify).toHaveBeenCalledWith('validToken', process.env.JWT_SECRET);
            expect(req.user).toEqual(decodedToken);
            expect(next).toHaveBeenCalled();
        });

        test('Access denied without token', () => {
            adminMiddleware(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Accès non autorisé. Veuillez vous connecter.',
            });
            expect(next).not.toHaveBeenCalled();
        });

        test('Access denied with invalid token', () => {
            req.session.token = 'invalidToken';
            jwt.verify.mockImplementation(() => {
                throw new Error('Token invalide');
            });

            adminMiddleware(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Token invalide ou expiré. Veuillez vous reconnecter.',
            });
            expect(next).not.toHaveBeenCalled();
        });

        test('Access denied without ADMIN role', () => {
            const decodedToken = {
                id: 2,
                username: 'user',
                roles: ['ROLE_USER'],
            };

            req.session.token = 'validToken';
            jwt.verify.mockImplementation(() => decodedToken);

            adminMiddleware(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Accès refusé. Droits administrateurs requis.',
            });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('Admin Controller Tests', () => {
        test('should list all users', async () => {
            const mockUsers = [
                { id: 1, username: 'user1', roles: ['ROLE_USER'] },
                { id: 2, username: 'admin', roles: ['ROLE_ADMIN'] },
            ];

            User.getAll.mockResolvedValue(mockUsers);

            const adminController = require('../../controllers/adminController');
            await adminController.listUsers(req, res);

            expect(User.getAll).toHaveBeenCalled();
            expect(res.render).toHaveBeenCalledWith('admin', { users: mockUsers });
        });

        test('should delete a user by ID', async () => {
            req.params = { userId: 1 };

            User.delete.mockResolvedValue();

            const adminController = require('../../controllers/adminController');
            await adminController.deleteUser(req, res);

            expect(User.delete).toHaveBeenCalledWith(1);
            expect(res.redirect).toHaveBeenCalledWith('/admin');
        });

        test('should update user roles', async () => {
            req.params = { userId: 1 };
            req.body = { roles: ['ROLE_ADMIN'] };

            User.updateRoles.mockResolvedValue();

            const adminController = require('../../controllers/adminController');
            await adminController.updateRoles(req, res);

            expect(User.updateRoles).toHaveBeenCalledWith(1, ['ROLE_ADMIN']);
            expect(res.redirect).toHaveBeenCalledWith('/admin');
        });
    });
});
