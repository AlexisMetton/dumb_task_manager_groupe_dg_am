const bcrypt = require('bcrypt');
const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user');

jest.mock('../../models/user');

describe('Auth Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should register a new user', async () => {
        User.findByUsernameOrEmail.mockResolvedValue(null);
        User.create.mockResolvedValue({ id: 1, username: 'test' });

        const response = await request(app)
            .post('/register')
            .send({
                username: 'test',
                password: 'test',
                email: 'test@example.com',
            });

        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/tasks');
    });

    test('should not register if user already exists', async () => {
        User.findByUsernameOrEmail.mockResolvedValue({ username: 'test', email: 'test@example.com' });

        const response = await request(app)
            .post('/register')
            .send({
                username: 'test',
                password: 'test',
                email: 'test@example.com',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Le nom d'utilisateur ou l'email existe déjà.");
    });

    test('should login an existing user', async () => {
        const hashedPassword = await bcrypt.hash('test', 10);
        const mockUser = { id: 1, username: 'test', password: hashedPassword };
        User.findByUsername.mockResolvedValue(mockUser);

        const response = await request(app).post('/login').send({
            username: 'test',
            password: 'test',
        });

        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/tasks');
    });

    test('should return error when logging in with invalid username', async () => {
        User.findByUsername.mockResolvedValue(null);

        const response = await request(app).post('/login').send({
            username: 'invalidUser',
            password: 'test',
        });

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Invalid username or password.');
        expect(User.findByUsername).toHaveBeenCalledWith('invalidUser');
    });

    test('should return error when logging in with incorrect password', async () => {
        const hashedPassword = await bcrypt.hash('test', 10);
        const mockUser = { id: 1, username: 'test', password: hashedPassword, roles: ['ROLE_USER'] };
        User.findByUsername.mockResolvedValue(mockUser);

        const response = await request(app).post('/login').send({
            username: 'test',
            password: 'wrongPassword',
        });

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Invalid username or password.');
    });

    test('should logout the logged-in user', async () => {
        const hashedPassword = await bcrypt.hash('test', 10);
        const mockUser = { id: 1, username: 'test', password: hashedPassword };
        User.findByUsername.mockResolvedValue(mockUser);

        const agent = request.agent(app);

        const loginResponse = await agent.post('/login').send({
            username: 'test',
            password: 'test',
        });

        expect(loginResponse.statusCode).toBe(302);
        expect(loginResponse.headers.location).toBe('/tasks');

        const logoutResponse = await agent.get('/logout');

        expect(logoutResponse.statusCode).toBe(302);
        expect(logoutResponse.headers.location).toBe('/login');
    });
});
