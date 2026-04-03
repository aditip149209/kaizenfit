/**
 * Push Notifications Service
 * Handles sending push notifications to users via Firebase Cloud Messaging
 */

import admin from 'firebase-admin';

/**
 * Send push notification to a user
 * @param {string} userId - User ID
 * @param {string} fcmToken - Firebase Cloud Messaging token
 * @param {object} notification - Notification object with title, body, and optional data
 * @returns {Promise} - Promise resolving to the notification response
 */
export const sendPushNotification = async (fcmToken, notification) => {
  try {
    if (!fcmToken) {
      console.warn('No FCM token provided for push notification');
      return null;
    }

    const message = {
      notification: {
        title: notification.title || 'Kaizen Fit',
        body: notification.body || 'You have a new update',
      },
      data: notification.data || {},
      token: fcmToken,
      webpush: {
        fcmOptions: {
          link: notification.link || '/',
        },
        notification: {
          title: notification.title || 'Kaizen Fit',
          body: notification.body || 'You have a new update',
          icon: '/logo.png',
          click_action: notification.link || '/',
        },
      },
    };

    const response = await admin.messaging().send(message);
    console.log('Push notification sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
};

/**
 * Send multicast push notification to multiple users
 * @param {array} fcmTokens - Array of FCM tokens
 * @param {object} notification - Notification object
 * @returns {Promise} - Promise resolving to multicast response
 */
export const sendMulticastPushNotification = async (fcmTokens, notification) => {
  try {
    if (!fcmTokens || fcmTokens.length === 0) {
      console.warn('No FCM tokens provided for multicast push notification');
      return null;
    }

    const message = {
      notification: {
        title: notification.title || 'Kaizen Fit',
        body: notification.body || 'You have a new update',
      },
      data: notification.data || {},
      webpush: {
        fcmOptions: {
          link: notification.link || '/',
        },
        notification: {
          title: notification.title || 'Kaizen Fit',
          body: notification.body || 'You have a new update',
          icon: '/logo.png',
          click_action: notification.link || '/',
        },
      },
    };

    const response = await admin.messaging().sendMulticast({
      ...message,
      tokens: fcmTokens,
    });

    console.log(`Push notifications sent to ${response.successCount} users`);
    if (response.failureCount > 0) {
      console.warn(`Failed to send notifications to ${response.failureCount} users`);
    }

    return response;
  } catch (error) {
    console.error('Error sending multicast push notifications:', error);
    throw error;
  }
};

/**
 * Send workout reminder notification
 * @param {string} fcmToken - FCM token
 * @param {string} workoutName - Name of the workout
 * @returns {Promise}
 */
export const sendWorkoutReminderNotification = async (fcmToken, workoutName) => {
  return sendPushNotification(fcmToken, {
    title: 'Workout Time!',
    body: `Time to complete your ${workoutName} routine`,
    data: {
      action: 'workout',
      type: 'reminder',
    },
    link: '/dashboard',
  });
};

/**
 * Send nutrition goal notification
 * @param {string} fcmToken - FCM token
 * @returns {Promise}
 */
export const sendNutritionGoalNotification = async (fcmToken) => {
  return sendPushNotification(fcmToken, {
    title: 'Nutrition Update',
    body: 'Check your daily nutrition intake and log your meals',
    data: {
      action: 'nutrition',
      type: 'daily_reminder',
    },
    link: '/nutrition',
  });
};

/**
 * Send transformation report notification
 * @param {string} fcmToken - FCM token
 * @param {string} reportType - Type of report (weekly, monthly, etc.)
 * @returns {Promise}
 */
export const sendWeeklyIntelReportNotification = async (fcmToken, reportType = 'weekly') => {
  return sendPushNotification(fcmToken, {
    title: 'Your Intel Report is Ready',
    body: `Your ${reportType} transformation report is now available`,
    data: {
      action: 'intel',
      type: 'report',
      reportType,
    },
    link: '/dashboard',
  });
};

/**
 * Send achievement/PR notification
 * @param {string} fcmToken - FCM token
 * @param {string} achievement - Achievement description
 * @returns {Promise}
 */
export const sendAchievementNotification = async (fcmToken, achievement) => {
  return sendPushNotification(fcmToken, {
    title: '🏆 New Achievement!',
    body: achievement,
    data: {
      action: 'achievement',
      type: 'pr_alert',
    },
    link: '/dashboard',
  });
};
