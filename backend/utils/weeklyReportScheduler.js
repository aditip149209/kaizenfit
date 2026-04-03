/**
 * Weekly Intel Report Scheduler
 * Handles scheduling and sending weekly transformation reports to users
 */

import { User, UserProfile, NotificationPreferences, TransformationJournal, TransformationReport } from '../models/User.js';
import { sendWeeklyIntelReportNotification } from './pushNotificationService.js';
import { buildTransformationDraftText, buildTransformationPayload } from '../models/services.js';
import { sequelize } from '../config/db.js';
import { Op } from 'sequelize';

/**
 * Send weekly Intel report to a user
 * @param {string} userId - User ID
 * @param {boolean} sendNotification - Whether to send a push notification
 * @returns {Promise} - Promise resolving to report details
 */
export const sendWeeklyIntelReportToUser = async (userId, sendNotification = true) => {
  try {
    // Get user and profile
    const user = await User.findByPk(userId);
    if (!user) {
      console.error(`User not found: ${userId}`);
      return null;
    }

    const profile = await UserProfile.findOne({ where: { userid: userId } });
    const preferences = await NotificationPreferences.findOne({ where: { userid: userId } });

    // Check if user has enabled weekly reports
    if (!preferences || !preferences.weeklyIntelReport) {
      console.log(`Weekly reports disabled for user: ${userId}`);
      return null;
    }

    // Check if report was already sent this week
    const lastReportDate = preferences.lastWeeklyReportSent;
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    if (lastReportDate && new Date(lastReportDate) > lastWeek) {
      console.log(`Weekly report already sent this week for user: ${userId}`);
      return null;
    }

    // Build transformation payload for the week
    let reportContent = '';
    try {
      const payload = await buildTransformationPayload(userId, 'weekly');
      reportContent = await buildTransformationDraftText('weekly', payload);
    } catch (error) {
      console.warn(`Could not generate transformation payload for user ${userId}:`, error);
      // Fall back to a generic report
      reportContent = generateGenericWeeklyReport(profile);
    }

    // Create transformation journal entry
    const journal = await TransformationJournal.create({
      userid: userId,
      title: `Weekly Intel Report - ${new Date().toLocaleDateString()}`,
      content: reportContent,
    });

    // Create transformation report
    const report = await TransformationReport.create({
      userid: userId,
      journalId: journal.id,
      reportType: 'weekly',
      content: reportContent,
      payloadMeta: {
        generatedAt: new Date(),
        week: {
          start: lastWeek.toISOString(),
          end: today.toISOString(),
        },
      },
    });

    // Update notification preferences with sent timestamp
    await NotificationPreferences.update(
      { lastWeeklyReportSent: today },
      { where: { userid: userId } }
    );

    // Send push notification if user enabled it and has preferences enabled
    if (sendNotification && preferences.pushNotifications) {
      try {
        // Note: In real implementation, you'd fetch FCM token from user device
        // For now, we'll just log it
        console.log(`Sending weekly report notification to user: ${userId}`);
        // await sendWeeklyIntelReportNotification(fcmToken, 'weekly');
      } catch (notifError) {
        console.error(`Failed to send notification for user ${userId}:`, notifError);
      }
    }

    return {
      reportId: report.id,
      journalId: journal.id,
      content: reportContent,
      sentAt: today,
    };
  } catch (error) {
    console.error(`Error sending weekly report to user ${userId}:`, error);
    throw error;
  }
};

/**
 * Send weekly Intel reports to all users
 * (Should be called by a scheduled job)
 * @returns {Promise} - Promise resolving to results
 */
export const sendWeeklyIntelReportsToAllUsers = async () => {
  try {
    console.log('Starting weekly Intel report batch send...');

    // Get all users with weekly reports enabled
    const preferences = await NotificationPreferences.findAll({
      where: { weeklyIntelReport: true },
      include: [
        {
          model: User,
          attributes: ['userid', 'email'],
        },
      ],
    });

    const results = {
      total: preferences.length,
      sent: 0,
      failed: 0,
      errors: [],
    };

    for (const pref of preferences) {
      try {
        const result = await sendWeeklyIntelReportToUser(pref.userid, true);
        if (result) {
          results.sent++;
          console.log(`Weekly report sent to user: ${pref.userid}`);
        }
      } catch (error) {
        results.failed++;
        results.errors.push({
          userId: pref.userid,
          error: error.message,
        });
        console.error(`Failed to send report to user ${pref.userid}:`, error);
      }
    }

    console.log('Weekly Intel report batch send completed:', results);
    return results;
  } catch (error) {
    console.error('Error in sendWeeklyIntelReportsToAllUsers:', error);
    throw error;
  }
};

/**
 * Generate a generic weekly report when transformation payload is not available
 * @param {object} profile - User profile
 * @returns {string} - Report content
 */
const generateGenericWeeklyReport = (profile) => {
  const now = new Date();
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return `# Weekly Intel Report - ${now.toLocaleDateString()}

## Summary
Your weekly fitness journey from ${weekStart.toLocaleDateString()} to ${now.toLocaleDateString()}

## User Profile
- **Goal**: ${profile?.goal || 'N/A'}
- **Activity Level**: ${profile?.activityLevel || 'N/A'}
- **Current Height**: ${profile?.height || 'N/A'} ${profile?.heightType || 'cm'}
- **Daily Calorie Target**: ${profile?.dailyCalorieIntake || 'N/A'} kcal

## Recommendations
- Continue tracking your workouts and meals
- Stay consistent with your fitness routine
- Maintain your daily calorie target
- Remember to log your water intake

---
*Generated by Kaizen Fit - Your Personal Fitness Intel*
`;
};

/**
 * Schedule weekly Intel report for a specific day/time
 * Note: This requires a job scheduler like node-cron or bull
 * Example implementation with node-cron:
 *
 * import cron from 'node-cron';
 *
 * export const scheduleWeeklyIntelReports = () => {
 *   // Every Sunday at 09:00 AM
 *   cron.schedule('0 9 * * 0', async () => {
 *     await sendWeeklyIntelReportsToAllUsers();
 *   });
 * };
 */
export const getScheduledReportInfo = () => {
  return {
    frequency: 'weekly',
    schedule: 'Every Sunday at 09:00 AM',
    timezone: 'UTC',
    note: 'Set up scheduling with node-cron or bull job queue',
  };
};
