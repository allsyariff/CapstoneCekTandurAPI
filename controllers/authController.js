const { db } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Fungsi untuk validasi email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Fungsi untuk validasi password
const isValidPassword = (password) => password.length >= 8;

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validasi input
    if (!name || !email || !password) {
        return res.status(400).json({
            status: 400,
            message: "Missing required fields",
            error: {
                details: "Please provide name, email, and password."
            }
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid email format",
            error: {
                details: "Email must contain '@' and be in a valid format."
            }
        });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid password",
            error: {
                details: "Password must be at least 8 characters long."
            }
        });
    }

    try {
        // Cek apakah email sudah terdaftar
        const userQuerySnapshot = await db.collection('users').where('email', '==', email).get();
        if (!userQuerySnapshot.empty) {
            return res.status(400).json({
                status: 400,
                message: "Email already registered",
                error: {
                    details: "A user with this email already exists."
                }
            });
        }

        // Generate ID untuk user baru
        const id = uuidv4().replace(/-/g, '').slice(0, 16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        const userData = { id, name, email, password, insertedAt, updatedAt };

        // Simpan data user baru di Firestore
        await db.collection('users').doc(id).set(userData);

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
