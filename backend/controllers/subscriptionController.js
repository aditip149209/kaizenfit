import { cancelSubscription, getCurrentSubscription, listTiers, upsertSubscription } from '../models/services.js';

const getUserId = (req) => req.user?.uid;
const sendUnauthorized = (res) => res.status(401).json({ message: 'Unauthorized' });

export const getSubscriptionTiers = async (_req, res) => {
  try {
    const tiers = await listTiers();
    return res.status(200).json(tiers);
  } catch (error) {
    console.error('Error in getSubscriptionTiers:', error);
    return res.status(500).json({ message: 'Error fetching subscription tiers' });
  }
};

export const getMySubscription = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const subscription = await getCurrentSubscription(userId);
    return res.status(200).json(subscription);
  } catch (error) {
    console.error('Error in getMySubscription:', error);
    return res.status(500).json({ message: 'Error fetching subscription' });
  }
};

export const subscribeToTier = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const { tierId } = req.body ?? {};

    if (!tierId) {
      return res.status(400).json({ message: 'tierId is required' });
    }

    const subscription = await upsertSubscription(userId, tierId);

    return res.status(200).json({
      message: 'Subscription activated successfully',
      subscription,
    });
  } catch (error) {
    console.error('Error in subscribeToTier:', error);
    return res.status(500).json({ message: error.message || 'Error activating subscription' });
  }
};

export const cancelMySubscription = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const subscription = await cancelSubscription(userId);

    if (!subscription) {
      return res.status(404).json({ message: 'No subscription found' });
    }

    return res.status(200).json({
      message: 'Subscription canceled successfully',
      subscription,
    });
  } catch (error) {
    console.error('Error in cancelMySubscription:', error);
    return res.status(500).json({ message: error.message || 'Error canceling subscription' });
  }
};
