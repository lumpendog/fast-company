const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const tokenService = require("../services/token.service");
const { generateUserData } = require("../utils/helpers");
const router = express.Router({ mergeParams: true });

// 0. Validate incoming data.
// 1. get data from req (email, password, ...)
// 2. check if email already exists
// 3. hash password
// 4. create user and save to db
// 5. generate tokens

const signUpValidations = [
    check("email", "Wrong email").isEmail(),
    check("password", "Password length should be at least 8 symbols").isLength({
        min: 8
    })
];

router.post("/signUp", [
    ...signUpValidations,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                    }
                });
            }

            const { email, password } = req.body;

            const existUser = await User.findOne({ email });

            if (existUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXISTS",
                        code: 400
                    }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await User.create({
                ...generateUserData(),
                ...req.body,
                password: hashedPassword
            });

            const tokens = tokenService.generateTokens({ _id: newUser._id });
            await tokenService.save(newUser._id, tokens.refreshToken);

            res.status(201).send({ ...tokens, userId: newUser._id });
        } catch (e) {
            res.status(500).json({
                message: "There is an error on server. Please try again later"
            });
        }
    }
]);

// 1. Validate data
// 2. get data from req (email, password)
// 3. Find user (check if he exists)
// 4. Compare hashed passwords
// 5. Generate tokens
// 6. return data

const signInValidators = [
    check("email", "Wrong email").normalizeEmail().isEmail(),
    check("password", "Need password for login").exists()
];

router.post("/signInWithPassword", [
    ...signInValidators,
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                    }
                });
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ error: { message: "EMAIL_NOT_FOUND", code: 400 } });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(400).json({
                    error: { message: "INVALID_PASSWORD", code: 400 }
                });
            }

            const tokens = tokenService.generateTokens({ _id: user._id });
            await tokenService.save(user._id, tokens.refreshToken);

            res.status(201).send({ ...tokens, userId: user._id });
        } catch (e) {
            res.status(500).json({
                message: "There is an error on server. Please try again later"
            });
        }
    }
]);

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data?._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body;

        const data = tokenService.validateRefresh(refreshToken);

        const dbToken = await tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({
                error: {
                    message: "INVALID_REFRESH_TOKEN",
                    code: 401
                }
            });
        }

        const tokens = tokenService.generateTokens({ _id: data._id });
        await tokenService.save(data._id, tokens.refreshToken);

        res.status(200).send({ ...tokens, userId: data._id });
    } catch (e) {
        res.status(500).json({
            message: "There is an error on server. Please try again later"
        });
    }
});

module.exports = router;
