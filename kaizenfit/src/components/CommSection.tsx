import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

// --- TYPES ---
type Post = {
  id: number;
  author: string;
  badge: "PR ALERT" | "INTEL NEEDED" | "GENERAL" | "MOTIVATION";
  content: string;
  likes: number;
  timestamp: string;
  likedByMe: boolean;
};

// --- MOCK DATA ---
const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    author: "J_DOE",
    badge: "PR ALERT",
    content: "Finally broke the 100kg barrier on deadlifts today. Grip strength was the bottleneck, switched to mixed grip and it flew up.",
    likes: 24,
    timestamp: "2 HOURS AGO",
    likedByMe: false,
  },
  {
    id: 2,
    author: "SARAH_FIT",
    badge: "INTEL NEEDED",
    content: "Anyone have recommendations for high-protein vegan breakfasts that aren't just protein shakes? Hitting a wall with oatmeal.",
    likes: 8,
    timestamp: "5 HOURS AGO",
    likedByMe: true,
  },
  {
    id: 3,
    author: "KAIZEN_OP",
    badge: "MOTIVATION",
    content: "Discipline > Motivation. You don't have to like it, you just have to do it. Get after it today team.",
    likes: 156,
    timestamp: "1 DAY AGO",
    likedByMe: false,
  },
];

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

const PostCard = ({ post, onLike }: { post: Post; onLike: (id: number) => void }) => (
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
  
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedTag, setSelectedTag] = useState<Post["badge"]>("GENERAL");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      author: username,
      badge: selectedTag,
      content: newPostContent,
      likes: 0,
      timestamp: "JUST NOW",
      likedByMe: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.likedByMe ? post.likes - 1 : post.likes + 1,
          likedByMe: !post.likedByMe
        };
      }
      return post;
    }));
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
            {posts.map(post => (
              <PostCard key={post.id} post={post} onLike={handleLike} />
            ))}
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
                  { name: "ALEX_LIFTS", points: 2450, rank: 1 },
                  { name: "SARAH_FIT", points: 2100, rank: 2 },
                  { name: "YOU", points: 1850, rank: 3 },
                  { name: "MIKE_RUNS", points: 1600, rank: 4 },
                ].map((user) => (
                  <li key={user.name} className="flex items-center justify-between font-mono text-sm border-b-2 border-gray-100 pb-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={`font-bold w-6 text-center ${user.rank === 1 ? 'text-yellow-500 text-lg' : 'text-gray-400'}`}>
                        #{user.rank}
                      </span>
                      <span className={user.name === "YOU" ? "font-bold bg-kaizen-green px-1" : ""}>
                        {user.name}
                      </span>
                    </div>
                    <span className="font-bold">{user.points} XP</span>
                  </li>
                ))}
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
               PROTOCOL: 500 PUSHUPS
             </p>
             <div className="w-full bg-white border-2 border-black h-4 mb-1">
               <div className="bg-black h-full w-3/4"></div>
             </div>
             <div className="flex justify-between font-mono text-xs mb-4">
               <span>375 / 500</span>
               <span>75%</span>
             </div>
             <button className="w-full bg-black text-white py-2 font-heading uppercase text-xs hover:bg-white hover:text-black transition-all rounded">
               LOG REPS
             </button>
          </div>

        </aside>
      </main>
    </div>
  );
}