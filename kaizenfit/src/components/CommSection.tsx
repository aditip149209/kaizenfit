import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { showToast } from "../lib/toast";

// --- TYPES ---
type Post = {
  id: string;
  author: string;
  badge: "PR ALERT" | "INTEL NEEDED" | "GENERAL" | "MOTIVATION";
  content: string;
  likes: number;
  timestamp: string;
  likedByMe: boolean;
};

type LeaderboardRow = {
  rank: number;
  name: string;
  totalXp: number;
  isCurrentUser: boolean;
};

type WeeklyBountyState = {
  title: string;
  reps: number;
  targetReps: number;
  progressPct: number;
};

// --- COMPONENTS ---

const Badge = ({ type }: { type: string }) => {
  const styles = {
    "PR ALERT": "bg-kaizen-green text-black border-black",
    "INTEL NEEDED": "bg-yellow-300 text-black border-black",
    "MOTIVATION": "bg-black text-white border-black",
    "GENERAL": "bg-white text-black border-black",
  };
  
  const styleClass = styles[type as keyof typeof styles] || styles["GENERAL"];

  return (
    <span className={`text-[10px] font-heading uppercase px-2 py-1 border-2 ${styleClass}`}>
      {type}
    </span>
  );
};

const PostCard = ({ post, onLike }: { post: Post; onLike: (id: string) => void }) => (
  <div className="bg-white border-3 border-black shadow-neo p-6 transition-all hover:-translate-y-1">
    
    {/* Post Header */}
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 border-2 border-black rounded-full flex items-center justify-center font-heading text-xs">
          {post.author.substring(0, 2)}
        </div>
        <div>
          <h3 className="font-heading text-sm uppercase leading-none">{post.author}</h3>
          <span className="font-mono text-xs text-gray-500">{post.timestamp}</span>
        </div>
      </div>
      <Badge type={post.badge} />
    </div>

    {/* Content */}
    <p className="font-mono text-sm leading-relaxed mb-6 border-l-2 border-gray-200 pl-4">
      {post.content}
    </p>

    {/* Actions */}
    <div className="flex items-center gap-4 border-t-2 border-gray-100 pt-4">
      <button 
        onClick={() => onLike(post.id)}
        className={`flex items-center gap-2 font-heading text-xs uppercase px-4 py-2 transition-all rounded ${post.likedByMe ? 'bg-kaizen-green shadow-none translate-y-0.5' : 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5'}`}
      >
        <span>▲</span>
        {post.likes} RESPECT
      </button>
      
      <button className="flex items-center gap-2 font-heading text-xs uppercase px-4 py-2 hover:bg-gray-100 rounded">
        <span>💬</span> Comment
      </button>
    </div>
  </div>
);

export default function Community() {
  const { user } = useAuth();
  const username = user?.email?.split('@')[0].toUpperCase() || "OPERATOR";
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedTag, setSelectedTag] = useState<Post["badge"]>("GENERAL");
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [bounty, setBounty] = useState<WeeklyBountyState | null>(null);
  const [repsInput, setRepsInput] = useState('25');
  const [submittingReps, setSubmittingReps] = useState(false);

  const toRelativeTime = (iso: string) => {
    const diffMs = Date.now() - new Date(iso).getTime();
    const diffMinutes = Math.max(1, Math.floor(diffMs / 60000));

    if (diffMinutes < 60) {
      return `${diffMinutes} MIN AGO`;
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours} HOUR${diffHours > 1 ? 'S' : ''} AGO`;
    }

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} DAY${diffDays > 1 ? 'S' : ''} AGO`;
  };

  const mapPost = (row: any): Post => ({
    id: row.id,
    author: row.author,
    badge: row.badge,
    content: row.content,
    likes: Number(row.likes ?? 0),
    timestamp: row.createdAt ? toRelativeTime(row.createdAt) : 'JUST NOW',
    likedByMe: Boolean(row.likedByMe),
  });

  const loadPosts = async () => {
    try {
      const response = await api.get('/community/posts', { params: { limit: 50, offset: 0 } });
      const rows = response.data?.rows ?? [];
      setPosts(rows.map(mapPost));
    } catch (error) {
      console.error('Failed to load community posts:', error);
      showToast.error('Failed to load feed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const response = await api.get('/community/leaderboard', { params: { limit: 10 } });
      setLeaderboard(response.data?.rows ?? []);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      showToast.error('Failed to load rankings');
    }
  };

  const loadWeeklyBounty = async () => {
    try {
      const response = await api.get('/community/bounty/current');
      const challenge = response.data?.challenge;
      const progress = response.data?.progress;

      if (!challenge) {
        setBounty(null);
        return;
      }

      setBounty({
        title: challenge.title,
        reps: Number(progress?.reps ?? 0),
        targetReps: Number(challenge.targetReps ?? 500),
        progressPct: Number(progress?.progressPct ?? 0),
      });
    } catch (error) {
      console.error('Failed to load weekly bounty:', error);
      showToast.error('Failed to load weekly bounty');
    }
  };

  useEffect(() => {
    loadLeaderboard();
    loadWeeklyBounty();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      const response = await api.post('/community/posts', {
        author: username,
        badge: selectedTag,
        content: newPostContent,
      });

      const created = response.data?.post;
      if (created) {
        setPosts((prev) => [mapPost(created), ...prev]);
      }

      setNewPostContent("");
      showToast.success('Post transmitted');
    } catch (error) {
      console.error('Failed to create post:', error);
      showToast.error('Failed to transmit post');
    }
  };

  const handleLike = async (id: string) => {
    const previousPosts = posts;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              likedByMe: !post.likedByMe,
              likes: post.likedByMe ? Math.max(0, post.likes - 1) : post.likes + 1,
            }
          : post
      )
    );

    try {
      const response = await api.patch(`/community/posts/${id}/like`);
      const updated = response.data?.post;

      if (!updated) {
        return;
      }

      setPosts((prev) => prev.map((post) => (post.id === id ? mapPost(updated) : post)));
      loadLeaderboard();
    } catch (error) {
      console.error('Failed to toggle like:', error);
      setPosts(previousPosts);
      showToast.error('Failed to update respect');
    }
  };

  const handleLogReps = async () => {
    const reps = Number.parseInt(repsInput, 10);

    if (!Number.isFinite(reps) || reps <= 0) {
      showToast.error('Enter valid reps');
      return;
    }

    try {
      setSubmittingReps(true);
      const response = await api.post('/community/bounty/current/log', { reps });
      const challenge = response.data?.challenge;
      const progress = response.data?.progress;

      if (challenge) {
        setBounty({
          title: challenge.title,
          reps: Number(progress?.reps ?? 0),
          targetReps: Number(challenge.targetReps ?? 500),
          progressPct: Number(progress?.progressPct ?? 0),
        });
      }

      await loadLeaderboard();
      showToast.success(`Logged ${reps} reps`);
    } catch (error) {
      console.error('Failed to log bounty reps:', error);
      showToast.error('Failed to log reps');
    } finally {
      setSubmittingReps(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-kaizen-gray overflow-y-auto">
      
      {/* Header */}
      <header className="bg-white border-b-3 border-black p-6">
        <h1 className="font-heading text-3xl uppercase tracking-tighter">The Arena</h1>
        <p className="font-mono text-sm text-gray-600 mt-1 uppercase">
          Global Operator Feed // Connect & Conquer
        </p>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        
        {/* LEFT COLUMN: THE FEED */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Create Post Widget */}
          <div className="bg-kaizen-lightgreen border-3 border-black p-6 shadow-neo">
            <h2 className="font-heading text-lg uppercase mb-4">Broadcast Frequency</h2>
            <form onSubmit={handlePost}>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your victory, ask a question, or drop some knowledge..."
                className="w-full bg-white border-3 border-black p-4 font-mono text-sm mb-4 focus:outline-none focus:bg-white h-24 resize-none"
              />
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {(["GENERAL", "PR ALERT", "INTEL NEEDED"] as const).map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`text-[10px] font-heading uppercase px-3 py-1 transition-all rounded ${selectedTag === tag ? 'bg-black text-white' : 'bg-white hover:bg-gray-200'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                
                <button 
                  type="submit"
                  className="bg-black text-kaizen-green font-heading uppercase text-sm px-6 py-2 hover:bg-white hover:text-black transition-all rounded"
                >
                  TRANSMIT
                </button>
              </div>
            </form>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {loading && <div className="font-mono text-sm">LOADING FEED...</div>}
            {posts.map(post => (
              <PostCard key={post.id} post={post} onLike={handleLike} />
            ))}
            {!loading && posts.length === 0 && (
              <div className="font-mono text-sm">NO TRANSMISSIONS YET. BE THE FIRST TO POST.</div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <aside className="space-y-6">
          
          {/* Leaderboard Widget */}
          <div className="bg-white border-3 border-black p-0 overflow-hidden shadow-neo">
            <div className="bg-black text-white p-3 border-b-3 border-black text-center">
              <h3 className="font-heading uppercase tracking-wide">Squad Rankings</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-4">
                {[
                  ...leaderboard,
                ].map((entry) => (
                  <li key={`${entry.name}-${entry.rank}`} className="flex items-center justify-between font-mono text-sm border-b-2 border-gray-100 pb-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={`font-bold w-6 text-center ${entry.rank === 1 ? 'text-yellow-500 text-lg' : 'text-gray-400'}`}>
                        #{entry.rank}
                      </span>
                      <span className={entry.isCurrentUser ? "font-bold bg-kaizen-green px-1" : ""}>
                        {entry.isCurrentUser ? 'YOU' : entry.name}
                      </span>
                    </div>
                    <span className="font-bold">{entry.totalXp} XP</span>
                  </li>
                ))}
                {leaderboard.length === 0 && (
                  <li className="font-mono text-xs uppercase text-gray-500">No ranking data yet.</li>
                )}
              </ul>
            </div>
            <div className="bg-gray-50 p-3 border-t-3 border-black text-center">
              <button className="font-heading text-xs uppercase underline rounded">View Full Roster</button>
            </div>
          </div>

          {/* Weekly Challenge Widget */}
          <div className="bg-kaizen-green border-3 border-black p-6 shadow-neo relative overflow-hidden">
             <div className="absolute -right-4 -top-4 text-9xl opacity-10 font-heading pointer-events-none">
               ?
             </div>
             <h3 className="font-heading uppercase text-xl mb-2">Weekly Bounty</h3>
             <p className="font-mono text-sm mb-4 font-bold">
               {bounty?.title ?? 'LOADING BOUNTY...'}
             </p>
             <div className="w-full bg-white border-2 border-black h-4 mb-1">
               <div className="bg-black h-full" style={{ width: `${Math.max(0, Math.min(100, bounty?.progressPct ?? 0))}%` }}></div>
             </div>
             <div className="flex justify-between font-mono text-xs mb-4">
               <span>{bounty?.reps ?? 0} / {bounty?.targetReps ?? 500}</span>
               <span>{bounty?.progressPct ?? 0}%</span>
             </div>
             <div className="flex gap-2">
               <input
                 type="number"
                 min="1"
                 value={repsInput}
                 onChange={(e) => setRepsInput(e.target.value)}
                 className="w-24 border-2 border-black px-2 py-2 font-mono text-xs"
               />
               <button
                 onClick={handleLogReps}
                 disabled={submittingReps}
                 className="flex-1 bg-black text-white py-2 font-heading uppercase text-xs hover:bg-white hover:text-black transition-all rounded disabled:opacity-60"
               >
                 {submittingReps ? 'LOGGING...' : 'LOG REPS'}
               </button>
             </div>
          </div>

        </aside>
      </main>
    </div>
  );
}