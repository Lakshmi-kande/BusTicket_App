const bcrypt = require ('bcrypt');
const user = require('../model/user');
const { constants } = require('../constants');
const { registerUser,loginUser } = require('../controllers/userController');

jest.mock('../model/user');
jest.mock('bcrypt');

describe('registerUser', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should register a new user', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
                mobile: '1234567890',
                gender: 'male',
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const expectedUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            mobile: req.body.mobile,
            gender: req.body.gender,
        };

        user.findOne.mockResolvedValue(null);
        bcrypt.genSalt.mockResolvedValue(salt);
        bcrypt.hash.mockResolvedValue(hashedPassword);
        user.create.mockResolvedValue(expectedUser);

        await registerUser(req, res);

        expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, salt);
        expect(user.create).toHaveBeenCalledWith(expectedUser);
        expect(res.status).toHaveBeenCalledWith(constants.SUCCESSFULL_POST);
        expect(res.json).toHaveBeenCalledWith(expectedUser);
    });

    test('should return a validation error if any field is missing on user registering process', async () => {
        const req = {
            body: {
                name: 'John Doe',
                password: 'password123',
                mobile: '1234567890',
                gender: 'male',
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(constants.VALIDATION_ERROR);
        expect(res.json).toHaveBeenCalledWith({ message: 'All fields are mandatory' });
    });

    test('should return a validation error if user already exists', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
                mobile: '1234567890',
                gender: 'male',
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        user.findOne.mockResolvedValue({ email: req.body.email });

        await registerUser(req, res);

        expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.status).toHaveBeenCalledWith(constants.VALIDATION_ERROR);
        expect(res.json).toHaveBeenCalledWith({ message: 'You are already registered' });
    });
});






describe('loginUser function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return 400 if email or password is missing on user login process', async () => {
        const req = { 
            body: {
                email: 'test@example.com'
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(constants.VALIDATION_ERROR);
        expect(res.json).toHaveBeenCalledWith({ message: 'All fields are mandatory!' });
    });

    test('should return 401 if user is not found', async () => {
        const req = {
            body: {
            email: 'test@example.com',
            password: 'password'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    
    user.findOne.mockResolvedValue(null);
    await loginUser(req, res);
    
    expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(constants.UNATHORIZED);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });


    test('should return 401 if password is incorrect from user', async () => {
        const req = {
            body: {
            email: 'test@example.com',
            password: 'password'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockUser = {
        _id: '123',
        email: 'test@example.com',
        password: '$2b$10$ZfS/NjK0aCTpF4/lkL68Jux2D.Ug4l4cm2hXJvTo28ZtoFq3zA3yi', // hashed "password"
        role: 'user'
    };
    user.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);
    
    await loginUser(req, res);
    
    expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
    expect(res.status).toHaveBeenCalledWith(constants.UNATHORIZED);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });

    test('should return 200 with successfully login message for admin user', async () => {
        const req = {
            body: {
            email: 'admin@example.com',
            password: 'password'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockUser = {
        _id: '123',
        email: 'admin@example.com',
        password: '$2b$10$ZfS/NjK0aCTpF4/lkL68Jux2D.Ug4l4cm2hXJvTo28ZtoFq3zA3yi', // hashed "password"
        role: 'admin'
    };
    
    user.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    await loginUser(req, res);

    expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
    expect(res.status).toHaveBeenCalledWith(constants.SUCCESSFULL_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful - Admin' });
    });

    test('should return 200 with successfully login message for normal user', async () => {
        const req = {
            body: {
            email: 'user@example.com',
            password: 'password'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockUser = {
        _id: '123',
        email: 'user@example.com',
        password: '$2b$10$ZfS/NjK0aCTpF4/lkL68Jux2D.Ug4l4cm2hXJvTo28ZtoFq3zA3yi', // hashed "password"
        role: 'user'
    };

    user.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    await loginUser(req, res);

    expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
    expect(res.status).toHaveBeenCalledWith(constants.SUCCESSFULL_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful - Normal user' });
    });
});
