import { cookiesOptions } from '../config/cookies.js';
import { prisma } from '../db/db.js';
import asyncHandler from '../utils/asyncHandler.js';
import { checkExistingUser } from '../utils/checkExistingUser.js';
import { generateToken } from '../utils/jwt.js';
import { createUserSchema, loginUserSchema, updateUserSchema } from '../validators/user.validator.js';

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, name } = createUserSchema.parse(req.body);
    const userExist = await checkExistingUser(username, email);
    if (userExist) {
        return res.status(409).json({
            success: false,
            message: 'User already exists with this email or username',
        });
    }
    const user = await prisma.user.create({
        data: {
            username,
            name,
            email,
            password,
        },
    });
    return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
        },
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = loginUserSchema.parse(req.body);

    const user = await checkExistingUser(null, email);
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }
    if (user.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    const JWTtoken = generateToken({ id: user.id });

    return res
        .status(200)
        .cookie('accessToken', JWTtoken, cookiesOptions)
        .json({
            success: true,
            message: 'Login successful',
            data: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                accessToken: JWTtoken,
            },
        });
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany();
    return res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data: users,
    });
});

export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'id is required',
            data: null,
        });
    }
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
            data: null,
        });
    }
    return res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: user,
    });
});

export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'id is required',
            data: null,
        });
    }
    const {
        username,
        name,
        email,
        password,
        course,
        collegeId,
        githubUrl,
        resumeUrl,
        avatarUrl,
        admissionYear,
        currentYear,
        gradYear,
    } = updateUserSchema.parse(req.body);

    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            username,
            name,
            email,
            password,
            course,
            collegeId,
            githubUrl,
            resumeUrl,
            avatarUrl,
            admissionYear,
            currentYear,
            gradYear,
        },
    });
    return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
    });
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id,
        },
    });
    return res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: user,
    });
});

export const getUserByUsername = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
            data: null,
        });
    }
    return res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: user,
    });
});
