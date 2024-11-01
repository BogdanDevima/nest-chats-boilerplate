import { InternalServerErrorException } from '@nestjs/common';
import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
/**
 * Initialize Firebase Admin Applications.
 *
 * @param {string | undefined} applicationCredentials - The application credentials file path. If not provided, the default application credentials will be used.
 * @returns {admin.app.App} The Firebase Admin app.
 */
export const initializeFirebaseAdmin = (applicationCredentials: string | null) => {
  try {
    return admin.initializeApp({
      credential: applicationCredentials
        ? admin.credential.cert(applicationCredentials)
        : applicationDefault(),
    });
  } catch (error) {
    throw new InternalServerErrorException('Failed to initialize Firebase Admin');
  }
};
