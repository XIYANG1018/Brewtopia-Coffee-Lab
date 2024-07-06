import express from 'express';
const router = express.Router();
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    logoutUser
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// '/' 是指'/api/users'
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);

// should be protected
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

// should be protected and admin
router.route('/:id').get(protect, admin, getUserById).delete(protect, admin, deleteUser).put(protect, admin, updateUser);


export default router;