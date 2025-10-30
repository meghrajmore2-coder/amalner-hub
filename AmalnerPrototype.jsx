import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* AmalnerPrototype - central UI component */
export default function AmalnerPrototype() {
  const initialPosts = [
    {
      id: 1,
      type: "blog",
      title: "Amalner: A Quick History",
      author: "Local Contributor",
      content:
        "Amalner has a rich cultural history and thriving educational scene. This short post highlights a few key landmarks and events.",
      likes: 8,
      comments: [
        { id: 1, text: "Nice summary!", author: "Ravi" },
        { id: 2, text: "Add a photo tour next time", author: "Sana" },
      ],
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
    },
    {
      id: 2,
      type: "video",
      title: "Bori River — Short Clip",
      author: "Traveler",
      content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      likes: 3,
      comments: [],
      createdAt: Date.now() - 1000 * 60 * 60 * 2,
    },
  ];

  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem("amalner_posts");
      return raw ? JSON.parse(raw) : initialPosts;
    } catch (e) {
      return initialPosts;
    }
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [resources] = useState([
    { id: 1, title: "Jalgaon District Official", url: "https://jalgaon.gov.in/" },
    { id: 2, title: "MSRTC Bus Timetable", url: "https://msrtc.maharashtra.gov.in/" },
    { id: 3, title: "Indian Railways Enquiry", url: "https://www.indianrail.gov.in/enquiry/" },
  ]);
  const [ads] = useState([
    { id: 1, text: "Local Shop — Fresh Sweets", url: "#" },
    { id: 2, text: "Tour Guide Services", url: "#" },
    { id: 3, text: "Handloom Store", url: "#" },
  ]);

  useEffect(() => {
    localStorage.setItem("amalner_posts", JSON.stringify(posts));
  }, [posts]);

  function addPost(newPost) {
    setPosts((p) => [{ ...newPost, id: Date.now(), likes: 0, comments: [], createdAt: Date.now() }, ...p]);
  }

  function toggleLike(id) {
    setPosts((p) => p.map((x) => (x.id === id ? { ...x, likes: x.likes + 1 } : x)));
  }

  function addComment(postId, text, author = "Guest") {
    if (!text.trim()) return;
    setPosts((p) =>
      p.map((x) => (x.id === postId ? { ...x, comments: [...x.comments, { id: Date.now(), text, author }] } : x))
    );
  }

  function deletePost(postId) {
    setPosts((p) => p.filter((x) => x.id !== postId));
  }

  function handleAdminToggle() {
    const pwd = prompt("Enter admin password (demo):");
    if (pwd === "admin") setIsAdmin(true);
    else alert("Wrong password — demo password is 'admin'");
  }

  return (
    <div className="min-h-screen text-slate-900">
      <header className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-300 text-white py-6 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Amalner Hub</h1>
            <p className="text-sm opacity-90">Community posts, local resources & small ads</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAdminToggle}
              className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md backdrop-blur"
            >
              {isAdmin ? "Admin Mode" : "Sign in as Admin"}
            </button>
            <a href="#create" className="hidden sm:inline-block bg-white text-indigo-600 px-3 py-1 rounded-md font-medium">
              Create Post
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <div className="sticky top-6 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-slate-700 mb-2">Resources</h3>
              <ul className="space-y-2 text-sm">
                {resources.map((r) => (
                  <li key={r.id}>
                    <a href={r.url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                      {r.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-slate-700 mb-2">About Amalner</h3>
              <p className="text-sm text-slate-600">Short facts, maps, or a small description about the town can go here.</p>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-6 order-1 lg:order-2">
          <div id="create" className="mb-6">
            <CreatePostForm onCreate={addPost} />
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  layout
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <div className="text-xs text-slate-500">by {post.author} • {new Date(post.createdAt).toLocaleString()}</div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="px-2 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100"
                      >
                        👍 {post.likes}
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => {
                            if (confirm("Delete this post?")) deletePost(post.id);
                          }}
                          className="px-2 py-1 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 text-slate-700">
                    {post.type === "video" ? (
                      <div className="space-y-2">
                        <div className="text-sm text-slate-500">Video link:</div>
                        <a href={post.content} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                          {post.content}
                        </a>
                      </div>
                    ) : (
                      <p>{post.content}</p>
                    )}
                  </div>

                  <CommentsSection post={post} onComment={addComment} />
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <aside className="lg:col-span-3 order-3">
          <div className="space-y-4 sticky top-6">
            <h3 className="text-sm font-semibold text-slate-600">Sponsored</h3>
            <div className="grid grid-cols-1 gap-3">
              {ads.map((a) => (
                <motion.a
                  key={a.id}
                  href={a.url}
                  className="block bg-white p-3 rounded-lg shadow hover:scale-[1.02] transition-transform"
                >
                  <div className="text-sm font-medium">{a.text}</div>
                  <div className="text-xs text-slate-500">Small ad tile</div>
                </motion.a>
              ))}
            </div>

            <div className="bg-white p-3 rounded-lg shadow text-xs text-slate-500">
              Pro tip: Keep ads small and local to support the community.
            </div>
          </div>
        </aside>
      </main>

      <footer className="bg-slate-800 text-slate-200 py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} Amalner Hub — Built for the community
        </div>
      </footer>
    </div>
  );
}

/* CreatePostForm and CommentsSection are defined below */

function CreatePostForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("blog");
  const [author, setAuthor] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert("Please add title and content");
    onCreate({ title, content, type, author: author || "Anonymous" });
    setTitle("");
    setContent("");
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Create a post</h3>
        <div className="text-xs text-slate-500">Share blog, news or video</div>
      </div>

      <div className="grid gap-2">
        <input
          className="border border-slate-200 rounded px-3 py-2 text-sm"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)} className="border border-slate-200 rounded px-3 py-2 text-sm">
          <option value="blog">Blog / Article</option>
          <option value="video">Video Link</option>
        </select>

        <textarea
          className="border border-slate-200 rounded px-3 py-2 text-sm h-28"
          placeholder="Content (or video URL)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="border border-slate-200 rounded px-3 py-2 text-sm"
          placeholder="Your name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <div className="flex gap-2">
          <button type="submit" className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm">Post</button>
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setContent("");
            }}
            className="bg-slate-100 text-slate-700 px-3 py-2 rounded-md text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}

function CommentsSection({ post, onComment }) {
  const [text, setText] = useState("");
  return (
    <div className="mt-4 border-t pt-3">
      <div className="text-sm text-slate-500 mb-2">Comments ({post.comments.length})</div>
      <div className="space-y-2">
        {post.comments.map((c) => (
          <div key={c.id} className="text-sm bg-slate-50 p-2 rounded">
            <div className="text-xs text-slate-500">{c.author}</div>
            <div>{c.text}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onComment(post.id, text);
          setText("");
        }}
        className="mt-3 flex gap-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-slate-200 rounded px-3 py-2 text-sm"
        />
        <button className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm">Comment</button>
      </form>
    </div>
  );
}
