const { db } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const id = uuidv4().replace(/-/g, '').slice(0, 16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    try {
        const userRef = db.collection('users').doc(id);
        const doc = await userRef.get();
        if (doc.exists) {
            return res.status(400).json({
                status: 400,
                message: "User already exists",
                error: {
                    details: "The user has registered an account with the same email address",
                }
            });
        }
        const userData = { id, name, email, password, insertedAt, updatedAt };
        await userRef.set(userData);

        return res.status(201).json({
            status: 201,
            message: "User registered successfully",
            data: userData
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: {
                details: error.message
            }
        });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userQuerySnapshot = await db.collection('users').where('email', '==', email).get();

        if (userQuerySnapshot.empty) {
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials",
                error: {
                    details: "Authentication failed. User not found."
                }
            });
        }

        const userDoc = userQuerySnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.password !== password) {
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials",
                error: {
                    details: "Authentication failed. Incorrect password."
                }
            });
        }

        return res.status(200).json({
            status: 200,
            message: "User logged in successfully",
            data: {
                userId: userData.id,
                name: userData.name,
                email: userData.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: {
                details: error.message
            }
        });
    }
};

exports.logoutUser = async (req, res) => {
    const { email } = req.body;

    try {
        const userQuerySnapshot = await db.collection('users').where('email', '==', email).get();

        if (userQuerySnapshot.empty) {
            return res.status(400).json({
                status: 400,
                message: "User not found",
                error: {
                    details: "Logout failed because the user does not exist."
                }
            });
        }

        const userDoc = userQuerySnapshot.docs[0];
        const userId = userDoc.id;
        const userData = userDoc.data();

        await db.collection('users').doc(userId).update({ isLoggedIn: false });

        return res.status(200).json({
            status: 200,
            message: "User logged out successfully",
            data: {
                userId: userData.id,
                name: userData.name,
                email: userData.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: {
                details: error.message
            }
        });
    }
};

