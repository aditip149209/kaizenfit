/**
 * Firebase Storage Service
 * Handles profile picture uploads to Firebase Storage
 */

import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get bucket instance (lazy initialization)
 */
const getBucket = () => {
  try {
    return admin.storage().bucket();
  } catch (error) {
    console.error('Error accessing Firebase Storage bucket:', error.message);
    throw new Error('Firebase Storage is not properly configured. Ensure storageBucket is set in Firebase Admin initialization.');
  }
};

/**
 * Upload profile picture to Firebase Storage
 * @param {string} userId - User ID
 * @param {Buffer} fileBuffer - File data
 * @param {string} mimeType - File MIME type (e.g., 'image/jpeg')
 * @returns {string} - Public download URL
 */
export const uploadProfilePictureToFirebase = async (userId, fileBuffer, mimeType) => {
  try {
    const bucket = getBucket();
    const filename = `profile-pictures/${userId}/avatar-${uuidv4()}.jpg`;
    const file = bucket.file(filename);

    // Upload file
    await file.save(fileBuffer, {
      metadata: {
        contentType: mimeType,
      },
    });

    // Get public download URL
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 365 * 24 * 60 * 60 * 1000, // 15 years
    });

    console.log(`Profile picture uploaded for user ${userId}: ${url}`);
    return url;
  } catch (error) {
    console.error('Error uploading profile picture to Firebase:', error);
    throw error;
  }
};

/**
 * Delete old profile picture from Firebase Storage
 * @param {string} profilePictureUrl - Current picture URL
 */
export const deleteProfilePictureFromFirebase = async (profilePictureUrl) => {
  try {
    if (!profilePictureUrl || !profilePictureUrl.includes('storage.googleapis.com')) {
      return; // Not a Firebase URL, skip deletion
    }

    const bucket = getBucket();
    // Extract filename from URL
    const urlParts = profilePictureUrl.split('/');
    const filename = urlParts[urlParts.length - 1]?.split('?')[0];

    if (!filename) return;

    const file = bucket.file(`profile-pictures/${filename}`);
    await file.delete();
    console.log(`Deleted old profile picture: ${filename}`);
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    // Continue even if deletion fails
  }
};

/**
 * Get public download URL for a file in Firebase Storage
 * @param {string} filename - Full path in storage
 * @returns {string} - Public URL
 */
export const getSignedUrl = async (filename) => {
  try {
    const bucket = getBucket();
    const file = bucket.file(filename);
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 365 * 24 * 60 * 60 * 1000,
    });
    return url;
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
};
