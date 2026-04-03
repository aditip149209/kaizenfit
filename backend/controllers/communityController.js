import {
  createCommunityPost,
  getCommunityLeaderboard,
  getCurrentCommunityChallenge,
  listCommunityPosts,
  logCommunityChallengeReps,
  toggleCommunityPostLike,
} from '../models/services.js';

const getUserId = (req) => req.user?.uid;
const sendUnauthorized = (res) => res.status(401).json({ message: 'Unauthorized' });

export const getCommunityPosts = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const result = await listCommunityPosts(userId, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getCommunityPosts:', error);
    return res.status(500).json({ message: 'Error fetching community posts' });
  }
};

export const addCommunityPost = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const { content, badge, author } = req.body ?? {};

    if (!content || !badge || !author) {
      return res.status(400).json({ message: 'content, badge, and author are required' });
    }

    const post = await createCommunityPost(userId, req.body);

    return res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (error) {
    console.error('Error in addCommunityPost:', error);
    return res.status(500).json({ message: error.message || 'Error creating community post' });
  }
};

export const toggleLikeCommunityPost = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const post = await toggleCommunityPostLike(userId, req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({
      message: 'Post like updated',
      post,
    });
  } catch (error) {
    console.error('Error in toggleLikeCommunityPost:', error);
    return res.status(500).json({ message: error.message || 'Error toggling post like' });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const result = await getCommunityLeaderboard(userId, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getLeaderboard:', error);
    return res.status(500).json({ message: 'Error fetching community leaderboard' });
  }
};

export const getWeeklyBounty = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const result = await getCurrentCommunityChallenge(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getWeeklyBounty:', error);
    return res.status(500).json({ message: 'Error fetching weekly bounty' });
  }
};

export const addWeeklyBountyReps = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const reps = Number(req.body?.reps ?? 0);
    if (!Number.isFinite(reps) || reps <= 0) {
      return res.status(400).json({ message: 'reps must be a positive number' });
    }

    const result = await logCommunityChallengeReps(userId, { reps });
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in addWeeklyBountyReps:', error);
    return res.status(500).json({ message: 'Error updating weekly bounty progress' });
  }
};
