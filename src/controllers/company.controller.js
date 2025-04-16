import { cookiesOptions } from '../config/cookies.js';
import { prisma } from '../db/db.js';
import asyncHandler from '../utils/asyncHandler.js';
import { generateToken } from '../utils/jwt.js';
import { registerCompanySchema } from '../validators/company.validator.js';
import { loginUserSchema } from '../validators/user.validator.js';

export const registerCompany = asyncHandler(async (req, res) => {
    const { companyName, email, password, domain } = registerCompanySchema.parse(
        req.body
    );

    const existingCompany = await prisma.company.findUnique({
        where: {
            OR: [{ email: email }, { domain: domain }],
        },
    });

    if (existingCompany) {
        return res.status(400).json({
            success: false,
            message: 'Company already exists',
            data: null,
        });
    }

    const company = await prisma.company.create({
        data: {
            companyName: companyName,
            email: email,
            password: password,
            domain: domain,
        },
    });

    return res.status(201).json({
        success: true,
        message: 'Company created successfully',
        data: {
            id: company.id,
            companyName: company.companyName,
            email: company.email,
            domain: company.domain,
        },
    });
});

export const loginCompany = asyncHandler(async (req, res) => {
    const { email, password } = loginUserSchema.parse(req.body);

    const company = await prisma.company.findUnique({
        where: {
            OR: [{ email: email }, { domain: domain }],
        },
    });

    if (!company) {
        return res.status(404).json({
            success: false,
            message: 'Company not found',
            data: null,
        });
    }

    if (company.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
            data: null,
        });
    }

    const JWTtoken = generateToken({ id: company.id, role: 'COMPANY' });

    return res
        .status(200)
        .cookie('accessToken', JWTtoken, cookiesOptions)
        .json({
            success: true,
            message: 'Login successful',
            data: {
                id: company.id,
                companyName: company.companyName,
                email: company.email,
                accessToken: JWTtoken,
            },
        });
});

export const getAllCompanies = asyncHandler(async (req, res) => {
    const companies = await prisma.company.findMany();
    return res.status(200).json({
        success: true,
        message: 'Companies fetched successfully',
        data: companies,
    });
});

export const getCompanyById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'id is required',
            data: null,
        });
    }
    const company = await prisma.company.findUnique({
        where: {
            id,
        },
    });
    if (!company) {
        return res.status(404).json({
            success: false,
            message: 'Company not found',
            data: null,
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Company fetched successfully',
        data: company,
    });
});

// export const updateCompany = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { companyName, email, password, domain } = req.body;

//     const oldCompany = await prisma.company.findUnique({
//         where: {
//             id,
//         },
//     });

//     if (!oldCompany) {
//         return res.status(404).json({
//             success: false,
//             message: 'Company not found',
//             data: null,
//         });
//     }

//     if (oldCompany.email !== email) {
//         const user = await
//         if (user) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Email already exists',
//                 data: null,
//             });
//         }
//     }

//     if (company.domain !== domain) {
//         const user = await User.findOne({ domain });
//         if (user) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Domain already exists',
//                 data: null,
//             });
//         }
//     }

//     return res.status(200).json({
//         success: true,
//         message: 'Company updated successfully',
//         data: null,
//     });
// });

export const deleteCompany = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'id is required',
            data: null,
        });
    }

    const company = await prisma.company.delete({
        where: {
            id,
        },
    });
    if (!company) {
        return res.status(404).json({
            success: false,
            message: 'Company not found',
            data: null,
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Company deleted successfully',
        data: company,
    });
});
