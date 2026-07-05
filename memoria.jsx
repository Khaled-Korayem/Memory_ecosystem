import React, { useState, useEffect, useMemo } from "react";
import {
  Home, ShoppingBag, Layers, BookOpen, BarChart3, ShieldCheck, Settings,
  Search, Bell, UploadCloud, Star, BadgeCheck, Clock, Users, DollarSign,
  Bookmark, ChevronRight, ChevronLeft, ChevronDown, X, Eye, EyeOff, Lock,
  Globe, Calendar, MoreHorizontal, ArrowUpRight, TrendingUp, MapPin,
  PlayCircle, Check, GraduationCap, HeartPulse, Wrench, Palette, Rocket,
  FlaskConical, Landmark, History as HistoryIcon, Sparkles, Archive, Edit3,
  MessageCircle, Heart, Send, UserPlus, Menu, Share2, Plus,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line,
} from "recharts";

/* --------------------------------- data --------------------------------- */

const CATEGORY_ICON = {
  Education: GraduationCap, Healthcare: HeartPulse, Travel: MapPin, Engineering: Wrench,
  Arts: Palette, Entrepreneurship: Rocket, Science: FlaskConical, History: Landmark,
};

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
  { id: "myMemories", label: "My Memories", icon: Layers },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "community", label: "Community", icon: MessageCircle },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "privacy", label: "Privacy & Permissions", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings },
];

const MEMORIES = [
  { id: 1, title: "Teaching Calculus to a Room That Didn't Believe in Itself", creator: "Dr. Amara Osei", category: "Education", duration: "45 min", rating: 4.9, license: "Educational License", price: "$22", verified: true, emotion: "Medium", skill: "Intermediate", learners: 5200, language: "English", cover: ["#2563EB", "#4F46E5"],
    description: "A first-year lecturer walks into a remedial calculus class that has already decided it will fail. Forty-five minutes of reading a room, losing it, and getting it back.",
    outcomes: ["Reframe a hard concept for a skeptical audience", "Read a room's confidence, not just its confusion", "Recover a lesson plan mid-class without losing the group"],
    emotionalTags: ["Determination", "Patience", "Quiet pride"],
    timeline: [{ t: "0:00", label: "Walking into a silent classroom" }, { t: "12:40", label: "The first student gets it" }, { t: "38:00", label: "A room that's finally arguing about math" }],
    reviews: [{ name: "Jules T.", rating: 5, text: "Felt like I was actually there deciding what to say next." }, { name: "Priya N.", rating: 4, text: "Useful for new teachers more than veterans." }] },
  { id: 2, title: "First Solo Night Shift, ICU", creator: "Marcus Webb, RN", category: "Healthcare", duration: "52 min", rating: 4.8, license: "Research License", price: "Research access", verified: true, emotion: "High", skill: "Advanced", learners: 1800, language: "English", cover: ["#06B6D4", "#2563EB"],
    description: "The first night without a senior nurse beside him. A code blue at bed four, and the quiet after.",
    outcomes: ["Hold composure through a code blue", "Prioritize under simultaneous demands", "Debrief a hard shift without carrying it home"],
    emotionalTags: ["Adrenaline", "Fear", "Relief"],
    timeline: [{ t: "0:00", label: "Handover briefing" }, { t: "22:10", label: "Code blue, bed 4" }, { t: "49:30", label: "Signing out, hands still shaking" }],
    reviews: [{ name: "Dr. Hana K.", rating: 5, text: "Closest thing to shadowing without the liability." }] },
  { id: 3, title: "Crossing the Drakensberg on Foot", creator: "Noah Ferreira", category: "Travel", duration: "1h 10min", rating: 4.7, license: "Single Experience", price: "$12", verified: true, emotion: "Medium", skill: "Beginner", learners: 9100, language: "English", cover: ["#A5B4FC", "#4F46E5"],
    description: "A five-day solo crossing of the Drakensberg escarpment, told through the small decisions that keep a hiker alive.",
    outcomes: ["Read weather in mountain terrain", "Ration supplies across multi-day routes", "Sit with solitude instead of fighting it"],
    emotionalTags: ["Awe", "Fatigue", "Stillness"],
    timeline: [{ t: "0:00", label: "Trailhead at dawn" }, { t: "31:00", label: "Storm rolling in over the escarpment" }, { t: "1:02:00", label: "Camp at 2,800m" }],
    reviews: [{ name: "Ana R.", rating: 5, text: "Genuinely changed how I plan hikes." }] },
  { id: 4, title: "Restoring a 1920s Steam Locomotive", creator: "Elena Marlow", category: "Engineering", duration: "38 min", rating: 4.9, license: "Educational License", price: "$18", verified: true, emotion: "Medium", skill: "Intermediate", learners: 2400, language: "English", cover: ["#4F46E5", "#7C3AED"],
    description: "A century-old boiler, a crack no one else caught, and the six weeks it took to trust the engine again.",
    outcomes: ["Diagnose wear in century-old cast iron", "Sequence a multi-week restoration safely", "Talk a skeptical inspector through your work"],
    emotionalTags: ["Focus", "Frustration", "Satisfaction"],
    timeline: [{ t: "0:00", label: "First inspection of the boiler" }, { t: "14:00", label: "A crack no one else caught" }, { t: "36:00", label: "First test run under steam" }],
    reviews: [{ name: "Tomas B.", rating: 5, text: "The kind of tacit knowledge you can't get from a manual." }] },
  { id: 5, title: "Sculpting Grief into Bronze", creator: "Yuki Tanaka", category: "Arts", duration: "41 min", rating: 4.9, license: "Single Experience", price: "$15", verified: true, emotion: "High", skill: "Intermediate", learners: 3300, language: "Japanese (subtitled)", cover: ["#7C3AED", "#06B6D4"],
    description: "Six months after a loss, a sculptor returns to an empty studio to make the piece she's been avoiding.",
    outcomes: ["Translate an unspeakable feeling into form", "Work through a piece you want to abandon", "Know when a sculpture is actually finished"],
    emotionalTags: ["Grief", "Release", "Tenderness"],
    timeline: [{ t: "0:00", label: "An empty studio, six months on" }, { t: "19:00", label: "The first form that feels honest" }, { t: "40:00", label: "Casting day" }],
    reviews: [{ name: "Sofia M.", rating: 5, text: "I cried. Then I went and made something." }] },
  { id: 6, title: "The Week Before We Almost Ran Out of Money", creator: "Priya Chandran", category: "Entrepreneurship", duration: "33 min", rating: 4.6, license: "Full Transfer", price: "$29", verified: true, emotion: "High", skill: "Advanced", learners: 6700, language: "English", cover: ["#0F172A", "#2563EB"],
    description: "Thirteen days of runway, a payroll that almost doesn't clear, and the investor call that changes everything.",
    outcomes: ["Make payroll decisions under real pressure", "Have the investor conversation you're dreading", "Tell your team the truth without losing them"],
    emotionalTags: ["Anxiety", "Resolve", "Relief"],
    timeline: [{ t: "0:00", label: "Thirteen days of runway left" }, { t: "18:00", label: "The call that changed everything" }, { t: "31:00", label: "Payroll clears" }],
    reviews: [{ name: "Derek O.", rating: 4, text: "Uncomfortably real. Exactly what I needed before my own raise." }] },
  { id: 7, title: "The Night We Confirmed the Signal", creator: "Dr. Feyi Adisa", category: "Science", duration: "47 min", rating: 5.0, license: "Research License", price: "Research access", verified: true, emotion: "Medium", skill: "Advanced", learners: 1200, language: "English", cover: ["#2563EB", "#7C3AED"],
    description: "An anomaly in the overnight data, three independent checks, and a 3am call that turns out to matter.",
    outcomes: ["Distinguish noise from discovery under pressure", "Hold professional skepticism about your own result", "Communicate uncertainty honestly to a team"],
    emotionalTags: ["Disbelief", "Elation", "Caution"],
    timeline: [{ t: "0:00", label: "An anomaly in the overnight data" }, { t: "26:00", label: "Third independent check" }, { t: "44:00", label: "Calling the team at 3am" }],
    reviews: [{ name: "Grad student (anon.)", rating: 5, text: "This is what actual science feels like, not the highlight reel." }] },
  { id: 8, title: "Interpreting for My Grandmother's Testimony", creator: "Lian Zhou", category: "History", duration: "29 min", rating: 4.9, license: "Educational License", price: "$10", verified: true, emotion: "High", skill: "Beginner", learners: 4500, language: "Mandarin (subtitled)", cover: ["#7C3AED", "#A5B4FC"],
    description: "A granddaughter sets up a recorder in her grandmother's kitchen, and hears the part of the story she'd never told.",
    outcomes: ["Carry a family story without losing your own voice", "Ask the questions that unlock a memory", "Sit with silence during a hard interview"],
    emotionalTags: ["Reverence", "Grief", "Connection"],
    timeline: [{ t: "0:00", label: "Setting up the recorder in her kitchen" }, { t: "14:00", label: "The part of the story she'd never told" }, { t: "27:00", label: "A question I didn't expect to ask" }],
    reviews: [{ name: "Wei C.", rating: 5, text: "Made me call my own grandfather that night." }] },
];

const MY_UPLOADS = [
  { id: 101, title: "Learning to Free-dive at 40", category: "Travel", uploadedAgo: "3 weeks ago", privacy: "Licensed Only", revenue: 1240, learners: 340, utilization: 68, cover: ["#06B6D4", "#2563EB"] },
  { id: 102, title: "My First Trial as Lead Counsel", category: "Entrepreneurship", uploadedAgo: "2 months ago", privacy: "Private", revenue: 0, learners: 0, utilization: 0, cover: ["#0F172A", "#4F46E5"] },
  { id: 103, title: "Teaching My Daughter to Ride a Bike", category: "Education", uploadedAgo: "5 months ago", privacy: "Public", revenue: 860, learners: 1200, utilization: 45, cover: ["#2563EB", "#7C3AED"] },
];

const ACTIVITY_LOG = {
  101: [ { who: "Aalborg University", purpose: "Education", when: "Jul 2, 2026" }, { who: "Dr. R. Munroe", purpose: "Research", when: "Jun 24, 2026" } ],
  102: [],
  103: [ { who: "Willow Creek Elementary", purpose: "Education", when: "Jun 30, 2026" }, { who: "Anonymous learner", purpose: "Entertainment", when: "Jun 18, 2026" }, { who: "Family Studies Dept., UCLA", purpose: "Research", when: "May 29, 2026" } ],
};

const CATEGORY_LEARNERS = [
  { category: "Education", learners: 5200 }, { category: "Healthcare", learners: 1800 },
  { category: "Travel", learners: 9100 }, { category: "Engineering", learners: 2400 },
  { category: "Arts", learners: 3300 }, { category: "Entrepreneurship", learners: 6700 },
  { category: "Science", learners: 1200 }, { category: "History", learners: 4500 },
];

const MONTHLY_ACTIVITY = [
  { month: "Jan", views: 620 }, { month: "Feb", views: 780 }, { month: "Mar", views: 910 },
  { month: "Apr", views: 860 }, { month: "May", views: 1120 }, { month: "Jun", views: 1340 },
  { month: "Jul", views: 1510 },
];

const GEO = [
  { country: "United States", pct: 34 }, { country: "United Kingdom", pct: 18 },
  { country: "Brazil", pct: 14 }, { country: "India", pct: 12 }, { country: "Japan", pct: 9 }, { country: "Other", pct: 13 },
];

const CATEGORIES = ["Education", "Healthcare", "Travel", "Engineering", "Arts", "Entrepreneurship", "Science", "History"];
const NOTIFICATIONS = [
  { title: "Your memory was licensed", body: "\"Teaching My Daughter to Ride a Bike\" was licensed by Willow Creek Elementary.", when: "2h ago" },
  { title: "Verification complete", body: "\"Learning to Free-dive at 40\" passed authenticity review.", when: "1d ago" },
  { title: "New review", body: "Sofia M. left a 5-star review on \"Sculpting Grief into Bronze.\"", when: "3d ago" },
];

const COMMUNITIES = [
  { id: "cm1", name: "First-Gen Educators", category: "Education", tagline: "For teachers who are the first in their families to stand at the front of a classroom.", members: 1240, joined: true },
  { id: "cm2", name: "Frontline Nurses", category: "Healthcare", tagline: "Shift stories, hard calls, and the debriefs that never make it into a chart.", members: 860, joined: false },
  { id: "cm3", name: "Solo Travelers Guild", category: "Travel", tagline: "Trip notes and survival lessons from people who go alone.", members: 2310, joined: true },
  { id: "cm4", name: "Makers & Restorers", category: "Engineering", tagline: "For people who bring old, broken, and impossible things back to life.", members: 540, joined: false },
  { id: "cm5", name: "Grief & the Studio", category: "Arts", tagline: "Where difficult feelings get made into something you can hold.", members: 410, joined: false },
  { id: "cm6", name: "Early-Stage Founders", category: "Entrepreneurship", tagline: "The weeks nobody puts on the pitch deck.", members: 1980, joined: false },
  { id: "cm7", name: "Field Notes Collective", category: "Science", tagline: "Lab notebooks, late nights, and the moment data becomes a discovery.", members: 640, joined: false },
  { id: "cm8", name: "Oral History Keepers", category: "History", tagline: "Recording the people who remember what the books left out.", members: 990, joined: false },
];

const COMMUNITY_MEMBERS = {
  cm1: [ { name: "Dr. Amara Osei", role: "Host · Verified creator" }, { name: "Jules T.", role: "Member since 2025" }, { name: "Priya N.", role: "Member since 2026" }, { name: "Marcus Webb", role: "Member" }, { name: "Sam Rivera", role: "You" } ],
  cm2: [ { name: "Marcus Webb, RN", role: "Host · Verified creator" }, { name: "Dr. Hana K.", role: "Member since 2025" }, { name: "Sofia Marín", role: "Member" } ],
  cm3: [ { name: "Noah Ferreira", role: "Host · Verified creator" }, { name: "Ana R.", role: "Member since 2025" }, { name: "Wei Chen", role: "Member" }, { name: "Derek O.", role: "Member" }, { name: "Sam Rivera", role: "You" } ],
  cm4: [ { name: "Elena Marlow", role: "Host · Verified creator" }, { name: "Tomas B.", role: "Member" } ],
  cm5: [ { name: "Yuki Tanaka", role: "Host · Verified creator" }, { name: "Sofia Marín", role: "Member" } ],
  cm6: [ { name: "Priya Chandran", role: "Host · Verified creator" }, { name: "Derek O.", role: "Member" } ],
  cm7: [ { name: "Dr. Feyi Adisa", role: "Host · Verified creator" }, { name: "Grad Student (anon.)", role: "Member" } ],
  cm8: [ { name: "Lian Zhou", role: "Host · Verified creator" }, { name: "Wei Chen", role: "Member" } ],
};

const COMMUNITY_POSTS = {
  cm1: [
    { id: "p101", author: "Jules T.", when: "2h ago", text: "Used Dr. Osei's calculus memory before my first observed lesson today. The bit about reading the room's confidence instead of its confusion completely changed how I opened class.", likes: 32, liked: false, comments: [{ author: "Priya N.", text: "That memory got me through my own first year too." }] },
    { id: "p102", author: "Priya N.", when: "1d ago", text: "Anyone have a memory recommendation for teaching a subject you're not confident in yourself? Starting a chemistry unit next month and I'm nervous.", likes: 11, liked: false, comments: [] },
  ],
  cm2: [
    { id: "p201", author: "Dr. Hana K.", when: "6h ago", text: "Marcus's ICU memory is closest thing to shadowing a code blue without the liability. Sharing with every new grad on my unit.", likes: 47, liked: true, comments: [{ author: "Sofia Marín", text: "Wish I'd had this before my first night shift." }] },
  ],
  cm3: [
    { id: "p301", author: "Ana R.", when: "3h ago", text: "Crossed the same escarpment Noah did, six months after living his memory first. Genuinely changed how I pack for solo routes.", likes: 58, liked: false, comments: [{ author: "Wei Chen", text: "Did the storm hit you too?" }, { author: "Ana R.", text: "Right on schedule. He wasn't exaggerating." }] },
    { id: "p302", author: "Derek O.", when: "2d ago", text: "First solo trip booked for next month. Terrified. Send memories.", likes: 19, liked: false, comments: [] },
  ],
  cm4: [],
  cm5: [
    { id: "p501", author: "Sofia Marín", when: "1d ago", text: "\"Sculpting Grief into Bronze\" should come with a warning and a thank-you note. Shared it with my studio's grief-processing group this week.", likes: 89, liked: false, comments: [] },
  ],
  cm6: [
    { id: "p601", author: "Derek O.", when: "1h ago", text: "Relived Priya's runway memory right before my own investor call. The part about holding skepticism about good news stuck with me most.", likes: 24, liked: false, comments: [{ author: "Priya Chandran", text: "How did the call go?" }] },
  ],
  cm7: [],
  cm8: [
    { id: "p801", author: "Wei Chen", when: "5h ago", text: "Recorded my own grandfather's story last weekend after Lian's memory of her grandmother. Anyone else start capturing family history after finding Memoria?", likes: 61, liked: true, comments: [{ author: "Ana R.", text: "Did the same with my grandmother two months ago." }, { author: "Tomas B.", text: "This is exactly why I joined the platform." }] },
  ],
};

const COMMUNITY_EXTRA_MEMORY_IDS = { cm1: [5], cm3: [7], cm6: [2], cm8: [3] };

const HERO_WAVE = [14, 22, 18, 30, 26, 40, 34, 46, 38, 52, 44, 58, 48, 62, 50, 44, 56, 40, 48, 32, 38, 24, 30, 18];

function timeAgoLabel() { return "just now"; }

/* -------------------------------- helpers -------------------------------- */

function initials(name) { return name.split(" ").filter(w => w[0] === w[0].toUpperCase()).slice(0,2).map(w => w[0]).join("").slice(0,2); }

function Avatar({ name, size = 32 }) {
  return (
    <div className="mm-avatar" style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {initials(name)}
    </div>
  );
}

function Cover({ colors, children, height = 150 }) {
  return (
    <div className="mm-cover" style={{ height, background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
      <div className="mm-cover-blob mm-cover-blob--1" />
      <div className="mm-cover-blob mm-cover-blob--2" />
      <div className="mm-cover-silhouette">
        <svg viewBox="0 0 100 100" width="46" height="46"><circle cx="50" cy="34" r="16" fill="rgba(255,255,255,0.28)" /><path d="M20 92c2-24 16-38 30-38s28 14 30 38" fill="rgba(255,255,255,0.28)" /></svg>
      </div>
      {children}
    </div>
  );
}

function Badge({ tone = "neutral", children, icon: Icon }) {
  return <span className={`mm-badge mm-badge--${tone}`}>{Icon && <Icon size={12} />}{children}</span>;
}

function EmotionMeter({ level }) {
  const idx = { Low: 1, Medium: 2, High: 3 }[level] || 1;
  return (
    <div className="mm-meter" title={`Emotional intensity: ${level}`}>
      {[1, 2, 3].map(i => <span key={i} className={i <= idx ? "is-filled" : ""} />)}
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button className={`mm-toggle${checked ? " is-on" : ""}`} role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}>
      <span className="mm-toggle-knob" />
    </button>
  );
}

function ProgressBar({ value, tone = "blue" }) {
  return <div className="mm-progress"><div className={`mm-progress-fill mm-progress-fill--${tone}`} style={{ width: `${value}%` }} /></div>;
}

function SkeletonGrid({ count = 6 }) {
  return (
    <div className="mm-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="mm-skeleton-card" key={i}>
          <div className="mm-skeleton mm-skeleton--cover" />
          <div className="mm-skeleton mm-skeleton--line" style={{ width: "80%" }} />
          <div className="mm-skeleton mm-skeleton--line" style={{ width: "50%" }} />
        </div>
      ))}
    </div>
  );
}

function MemoryCard({ m, onOpen, onToggleSave, saved }) {
  const CatIcon = CATEGORY_ICON[m.category];
  return (
    <div className="mm-card">
      <Cover colors={m.cover}>
        <button
          className={`mm-save-btn${saved ? " is-saved" : ""}`}
          aria-label={saved ? "Remove from saved" : "Save for later"}
          onClick={(e) => { e.stopPropagation(); onToggleSave(m.id); }}
        >
          <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
        </button>
        <div className="mm-cover-cat"><CatIcon size={13} />{m.category}</div>
      </Cover>
      <div className="mm-card-body">
        <div className="mm-card-top">
          <h3>{m.title}</h3>
        </div>
        <div className="mm-card-creator">
          <Avatar name={m.creator} size={22} />
          <span>{m.creator}</span>
          {m.verified && <BadgeCheck size={14} className="mm-verified-icon" />}
        </div>
        <div className="mm-card-meta">
          <span><Clock size={13} />{m.duration}</span>
          <span><Star size={13} className="mm-star" />{m.rating}</span>
          <span><Users size={13} />{m.learners.toLocaleString()}</span>
        </div>
        <div className="mm-card-foot">
          <div>
            <Badge tone="lavender">{m.license}</Badge>
            <span className="mm-price">{m.price}</span>
          </div>
          <button className="mm-btn mm-btn--sm mm-btn--primary" onClick={() => onOpen(m.id)}>View Details</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ memory network ----------------------------- */
/* Signature visual: memories rendered as a living, pulsing network rather
   than a flat grid — nodes are categories/memories, edges are shared threads
   (a learner who experienced both, a shared theme). Not a brain, not circuitry —
   closer to a constellation of connected human moments. */

const NETWORK_NODES = [
  { id: "n1", label: "Education", cat: "Education", x: 18, y: 24, r: 15 },
  { id: "n2", label: "Healthcare", cat: "Healthcare", x: 46, y: 10, r: 12 },
  { id: "n3", label: "Travel", cat: "Travel", x: 78, y: 20, r: 17 },
  { id: "n4", label: "Engineering", cat: "Engineering", x: 86, y: 55, r: 12 },
  { id: "n5", label: "Arts", cat: "Arts", x: 60, y: 78, r: 14 },
  { id: "n6", label: "Entrepreneurship", cat: "Entrepreneurship", x: 26, y: 82, r: 16 },
  { id: "n7", label: "Science", cat: "Science", x: 6, y: 55, r: 11 },
  { id: "n8", label: "History", cat: "History", x: 45, y: 48, r: 13 },
];
const NETWORK_EDGES = [
  ["n1", "n8"], ["n8", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"],
  ["n5", "n6"], ["n6", "n7"], ["n7", "n1"], ["n8", "n5"], ["n1", "n6"], ["n8", "n4"],
];
const NODE_COLOR = { Education: "#2563EB", Healthcare: "#06B6D4", Travel: "#4F46E5", Engineering: "#7C3AED", Arts: "#A5B4FC", Entrepreneurship: "#0F172A", Science: "#2563EB", History: "#7C3AED" };

function MemoryNetwork({ onNodeClick }) {
  const [hovered, setHovered] = useState(null);
  const byId = Object.fromEntries(NETWORK_NODES.map(n => [n.id, n]));
  return (
    <div className="mm-network">
      <svg viewBox="0 0 100 100" className="mm-network-svg" role="img" aria-label="Network diagram of connected memory categories">
        <defs>
          <linearGradient id="mm-edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        {NETWORK_EDGES.map(([a, b], i) => {
          const na = byId[a], nb = byId[b];
          const active = hovered && (hovered === a || hovered === b);
          return (
            <line
              key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              className={`mm-network-edge${active ? " is-active" : ""}`}
              stroke="url(#mm-edge-grad)"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          );
        })}
        {NETWORK_NODES.map(n => (
          <g
            key={n.id}
            className="mm-network-node"
            transform={`translate(${n.x} ${n.y})`}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onNodeClick && onNodeClick(n.cat)}
            tabIndex={0}
            role="button"
            aria-label={`Explore ${n.label} memories`}
            onKeyDown={(e) => { if (e.key === "Enter") onNodeClick && onNodeClick(n.cat); }}
          >
            <circle r={n.r / 3.2} fill={NODE_COLOR[n.cat]} opacity="0.16" className="mm-network-node-halo" />
            <circle r={n.r / 6} fill={NODE_COLOR[n.cat]} />
          </g>
        ))}
      </svg>
      <div className="mm-network-labels">
        {NETWORK_NODES.map(n => (
          <button
            key={n.id}
            className={`mm-network-tag${hovered === n.id ? " is-active" : ""}`}
            style={{ "--tag-color": NODE_COLOR[n.cat] }}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onNodeClick && onNodeClick(n.cat)}
          >
            <span className="mm-network-dot" style={{ background: NODE_COLOR[n.cat] }} />
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- shell ---------------------------------- */

function BrandMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className="mm-logo-mark" aria-hidden="true">
      <circle cx="9" cy="9" r="7.5" fill="#2563EB" opacity="0.62" />
      <circle cx="15.5" cy="15" r="7.5" fill="#7C3AED" opacity="0.62" />
      <circle cx="12" cy="12" r="2.4" fill="#fff" />
    </svg>
  );
}

function Sidebar({ active, go }) {
  return (
    <aside className="mm-sidebar">
      <div className="mm-brand"><BrandMark /><span>Memoria</span></div>
      <nav>
        {NAV.map(item => (
          <button key={item.id} className={`mm-nav-item${active === item.id ? " is-active" : ""}`} onClick={() => go(item.id)}>
            <item.icon size={18} />{item.label}
          </button>
        ))}
      </nav>
      <div className="mm-sidebar-foot">
        <div className="mm-sidebar-upsell">
          <p>Verified creators earn 2.4× more per license.</p>
          <button className="mm-link-btn">Get verified <ChevronRight size={14} /></button>
        </div>
      </div>
    </aside>
  );
}

function MobileNavOverlay({ active, go, onClose }) {
  return (
    <div className="mm-mobile-nav-overlay" onClick={onClose}>
      <div className="mm-mobile-nav-drawer" onClick={e => e.stopPropagation()}>
        <div className="mm-mobile-nav-head">
          <div className="mm-brand"><BrandMark /><span>Memoria</span></div>
          <button className="mm-icon-btn" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
        </div>
        <nav>
          {NAV.map(item => (
            <button key={item.id} className={`mm-nav-item${active === item.id ? " is-active" : ""}`} onClick={() => go(item.id)}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Topbar({ query, setQuery, onUpload, onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="mm-topbar">
      <button className="mm-icon-btn mm-mobile-nav-toggle" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={18} />
      </button>
      <div className="mm-search">
        <Search size={16} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search memories, creators, categories…" aria-label="Search memories" />
      </div>
      <div className="mm-topbar-actions">
        <button className="mm-btn mm-btn--primary mm-btn--upload" onClick={onUpload}><UploadCloud size={15} /><span className="mm-btn-label">Upload Memory</span></button>
        <div className="mm-dropdown-wrap">
          <button className="mm-icon-btn" onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }} aria-label="Notifications">
            <Bell size={17} /><span className="mm-dot" />
          </button>
          {notifOpen && (
            <div className="mm-dropdown mm-dropdown--wide">
              <div className="mm-dropdown-head">Notifications</div>
              {NOTIFICATIONS.map((n, i) => (
                <div className="mm-notif" key={i}>
                  <strong>{n.title}</strong><p>{n.body}</p><span>{n.when}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mm-dropdown-wrap">
          <button className="mm-profile-btn" onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}>
            <Avatar name="Sam Rivera" size={30} /><ChevronDown size={14} />
          </button>
          {profileOpen && (
            <div className="mm-dropdown">
              <button>Profile</button><button>Settings</button><div className="mm-dropdown-divider" /><button>Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function UploadPanel({ onClose }) {
  return (
    <div className="mm-modal-overlay" onClick={onClose}>
      <div className="mm-modal" onClick={e => e.stopPropagation()}>
        <div className="mm-modal-head">
          <h3>Upload a memory</h3>
          <button className="mm-icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="mm-modal-body">
          <label className="mm-field">
            <span>Title</span>
            <input placeholder="e.g. Learning to sail solo at 60" />
          </label>
          <label className="mm-field">
            <span>Category</span>
            <select><option>Select a category</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
          </label>
          <label className="mm-field">
            <span>Description</span>
            <textarea rows={3} placeholder="What does someone learn from experiencing this?" />
          </label>
          <label className="mm-field">
            <span>Who can access this?</span>
            <select><option>Private — only me</option><option>Licensed only</option><option>Public</option></select>
          </label>
        </div>
        <div className="mm-modal-foot">
          <p>This is a UI preview — publishing isn't wired up yet.</p>
          <button className="mm-btn mm-btn--primary" onClick={onClose}>Save draft</button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- screens --------------------------------- */

function HomeScreen({ go, openDetail, savedIds, toggleSave, query, onExploreCategory }) {
  const results = query.trim() ? MEMORIES.filter(m => (m.title + m.creator + m.category).toLowerCase().includes(query.toLowerCase())) : null;

  if (results) {
    return (
      <div className="mm-page">
        <h1 className="mm-h1">Search results for "{query}"</h1>
        <p className="mm-sub">{results.length} memories found</p>
        <div className="mm-grid">{results.map(m => <MemoryCard key={m.id} m={m} onOpen={openDetail} saved={savedIds.includes(m.id)} onToggleSave={toggleSave} />)}</div>
      </div>
    );
  }

  const featured = MEMORIES.slice(0, 3);
  const recommended = MEMORIES.slice(3, 6);
  const recent = [MEMORIES[7], MEMORIES[2], MEMORIES[4]];

  return (
    <div className="mm-page">
      <section className="mm-hero">
        <div className="mm-hero-grid">
          <div className="mm-hero-copy">
            <span className="mm-eyebrow"><span className="mm-eyebrow-dot" />The memory economy</span>
            <h1>
              <span className="mm-hero-line mm-hero-line--soft">Some knowledge</span>
              <span className="mm-hero-line mm-hero-line--bold">you can only <em>live</em>.</span>
            </h1>
            <p>Memoria lets you step inside a verified human experience — a first solo flight, a night shift, a negotiation that almost failed — and license exactly the part you need, on the terms the person who lived it set.</p>
            <div className="mm-hero-actions">
              <button className="mm-btn mm-btn--primary mm-btn--lg" onClick={() => go("marketplace")}><PlayCircle size={16} />Step into a memory</button>
              <button className="mm-link-btn mm-hero-link" onClick={() => go("privacy")}>See how privacy works <ArrowUpRight size={14} /></button>
            </div>
            <div className="mm-hero-stats">
              <div><strong>12,400+</strong><span>memories licensed</span></div>
              <div><strong>96%</strong><span>consent-verified</span></div>
              <div><strong>81</strong><span>countries reached</span></div>
            </div>
          </div>

          <div className="mm-hero-visual">
            <div className="mm-fragment mm-fragment--1">💬 "The quiet after a code blue."</div>
            <div className="mm-fragment mm-fragment--2">🎓 "A room finally arguing about math."</div>
            <div className="mm-player-card">
              <div className="mm-player-top">
                <Badge tone="lavender" icon={GraduationCap}>Education</Badge>
                <span className="mm-player-verified"><BadgeCheck size={13} />Verified</span>
              </div>
              <h4>Teaching Calculus to a Room That Didn't Believe in Itself</h4>
              <div className="mm-player-creator"><Avatar name="Dr. Amara Osei" size={22} />Dr. Amara Osei</div>
              <div className="mm-player-wave" aria-hidden="true">
                {HERO_WAVE.map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
              </div>
              <div className="mm-player-scrub">
                <div className="mm-player-scrub-fill" style={{ width: "42%" }} />
                <div className="mm-player-scrub-thumb" style={{ left: "42%" }} />
              </div>
              <div className="mm-player-times"><span>12:40 — the first student gets it</span><span>45:00</span></div>
              <button className="mm-player-play" onClick={() => openDetail(1)}><PlayCircle size={17} />Experience Memory</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mm-network-section">
        <div className="mm-network-copy">
          <h2>A living network of memories</h2>
          <p>Every memory on Memoria connects to others through shared themes, skills, and emotions. Explore a thread to see where it leads.</p>
        </div>
        <MemoryNetwork onNodeClick={(cat) => onExploreCategory ? onExploreCategory(cat) : go("marketplace")} />
      </section>

      <section className="mm-trending">
        {CATEGORIES.map(c => {
          const Icon = CATEGORY_ICON[c];
          const count = MEMORIES.filter(m => m.category === c).length;
          return (
            <button className="mm-trend-pill" key={c} onClick={() => onExploreCategory ? onExploreCategory(c) : go("marketplace")}>
              <Icon size={15} />{c}<span>{count}</span>
            </button>
          );
        })}
      </section>

      <SectionHead title="Featured memories" onSeeAll={() => go("marketplace")} />
      <div className="mm-grid">{featured.map(m => <MemoryCard key={m.id} m={m} onOpen={openDetail} saved={savedIds.includes(m.id)} onToggleSave={toggleSave} />)}</div>

      <SectionHead title="Recommended for you" onSeeAll={() => go("marketplace")} />
      <div className="mm-grid">{recommended.map(m => <MemoryCard key={m.id} m={m} onOpen={openDetail} saved={savedIds.includes(m.id)} onToggleSave={toggleSave} />)}</div>

      <SectionHead title="Recently viewed" />
      <div className="mm-grid">{recent.map(m => <MemoryCard key={m.id} m={m} onOpen={openDetail} saved={savedIds.includes(m.id)} onToggleSave={toggleSave} />)}</div>
    </div>
  );
}

function SectionHead({ title, onSeeAll }) {
  return (
    <div className="mm-section-head">
      <h2>{title}</h2>
      {onSeeAll && <button className="mm-link-btn" onClick={onSeeAll}>See all <ChevronRight size={14} /></button>}
    </div>
  );
}

function MarketplaceScreen({ openDetail, savedIds, toggleSave, query, initialCategory }) {
  const [category, setCategory] = useState(initialCategory || "All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [difficulty, setDifficulty] = useState("Any");
  const [emotion, setEmotion] = useState("Any");

  const filtered = MEMORIES.filter(m => {
    if (query.trim() && !(m.title + m.creator + m.category).toLowerCase().includes(query.toLowerCase())) return false;
    if (category !== "All" && m.category !== category) return false;
    if (verifiedOnly && !m.verified) return false;
    if (difficulty !== "Any" && m.skill !== difficulty) return false;
    if (emotion !== "Any" && m.emotion !== emotion) return false;
    return true;
  });

  return (
    <div className="mm-page">
      <h1 className="mm-h1">Marketplace</h1>
      <p className="mm-sub">Browse verified human experience, licensed on the originator's terms.</p>

      <div className="mm-filter-bar">
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>All</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option>Any</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option>
        </select>
        <select value={emotion} onChange={e => setEmotion(e.target.value)}>
          <option value="Any">Any emotion</option><option>Low</option><option>Medium</option><option>High</option>
        </select>
        <label className="mm-check-pill">
          <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} />
          <BadgeCheck size={13} /> Verified only
        </label>
      </div>

      <p className="mm-result-count">{filtered.length} memories</p>
      {filtered.length ? (
        <div className="mm-grid">{filtered.map(m => <MemoryCard key={m.id} m={m} onOpen={openDetail} saved={savedIds.includes(m.id)} onToggleSave={toggleSave} />)}</div>
      ) : (
        <div className="mm-empty"><ShoppingBag size={28} /><h3>No memories match those filters</h3><p>Try widening a filter or clearing your search.</p></div>
      )}
    </div>
  );
}

function MyMemoriesScreen({ go }) {
  return (
    <div className="mm-page">
      <h1 className="mm-h1">My Memories</h1>
      <p className="mm-sub">Everything you've captured and listed, in one timeline.</p>

      <div className="mm-timeline">
        {MY_UPLOADS.map(u => {
          const Icon = CATEGORY_ICON[u.category];
          return (
            <div className="mm-timeline-row" key={u.id}>
              <div className="mm-timeline-cover" style={{ background: `linear-gradient(135deg, ${u.cover[0]}, ${u.cover[1]})` }}><Icon size={18} color="#fff" /></div>
              <div className="mm-timeline-main">
                <div className="mm-timeline-head">
                  <h3>{u.title}</h3>
                  <span className="mm-timeline-ago">Uploaded {u.uploadedAgo}</span>
                </div>
                <div className="mm-timeline-stats">
                  <Badge tone={u.privacy === "Public" ? "teal" : u.privacy === "Private" ? "neutral" : "lavender"} icon={u.privacy === "Private" ? Lock : Eye}>{u.privacy}</Badge>
                  <span><DollarSign size={13} />${u.revenue.toLocaleString()} earned</span>
                  <span><Users size={13} />{u.learners.toLocaleString()} learners</span>
                </div>
                <div className="mm-timeline-progress">
                  <span>License utilization</span>
                  <ProgressBar value={u.utilization} tone="purple" />
                  <span className="mm-timeline-pct">{u.utilization}%</span>
                </div>
              </div>
              <div className="mm-timeline-actions">
                <button className="mm-btn mm-btn--ghost mm-btn--sm"><Edit3 size={14} />Edit</button>
                <button className="mm-btn mm-btn--ghost mm-btn--sm" onClick={() => go("privacy")}><ShieldCheck size={14} />Manage License</button>
                <button className="mm-btn mm-btn--ghost mm-btn--sm"><Archive size={14} />Archive</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LibraryScreen({ savedIds, openDetail, toggleSave }) {
  const saved = MEMORIES.filter(m => savedIds.includes(m.id));
  return (
    <div className="mm-page">
      <h1 className="mm-h1">Library</h1>
      <p className="mm-sub">Memories you've saved to experience later.</p>
      {saved.length ? (
        <div className="mm-grid">{saved.map(m => <MemoryCard key={m.id} m={m} onOpen={openDetail} saved onToggleSave={toggleSave} />)}</div>
      ) : (
        <div className="mm-empty"><Bookmark size={28} /><h3>Your library is empty</h3><p>Save a memory from the Marketplace and it'll show up here.</p></div>
      )}
    </div>
  );
}

function PostComposer({ placeholder, hint, onSubmit }) {
  const [draft, setDraft] = useState("");
  const submit = () => { if (!draft.trim()) return; onSubmit(draft.trim()); setDraft(""); };
  return (
    <div className="mm-composer">
      <Avatar name="Sam Rivera" size={36} />
      <div className="mm-composer-body">
        <textarea rows={2} placeholder={placeholder} value={draft} onChange={e => setDraft(e.target.value)} />
        <div className="mm-composer-foot">
          <span className="mm-composer-hint">{hint}</span>
          <button className="mm-btn mm-btn--primary mm-btn--sm" onClick={submit} disabled={!draft.trim()}>
            <Send size={13} />Post
          </button>
        </div>
      </div>
    </div>
  );
}

function PostThread({ post, onToggleLike, onAddComment }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const submit = () => { if (!comment.trim()) return; onAddComment(comment.trim()); setComment(""); setOpen(true); };
  return (
    <div className="mm-post">
      <div className="mm-post-head">
        <Avatar name={post.author} size={34} />
        <div className="mm-post-head-text">
          <strong>{post.author}</strong>
          <span>{post.when}</span>
        </div>
        <button className="mm-icon-btn mm-icon-btn--sm" aria-label="More options"><MoreHorizontal size={15} /></button>
      </div>
      <p className="mm-post-text">{post.text}</p>
      <div className="mm-post-actions">
        <button className={`mm-post-action${post.liked ? " is-liked" : ""}`} onClick={onToggleLike}>
          <Heart size={14} fill={post.liked ? "currentColor" : "none"} />{post.likes}
        </button>
        <button className="mm-post-action" onClick={() => setOpen(o => !o)}>
          <MessageCircle size={14} />{post.comments.length}
        </button>
        <button className="mm-post-action"><Share2 size={14} />Share</button>
      </div>
      {open && (
        <div className="mm-comments">
          {post.comments.map((c, i) => (
            <div className="mm-comment" key={i}>
              <Avatar name={c.author} size={24} />
              <div><strong>{c.author}</strong><p>{c.text}</p></div>
            </div>
          ))}
          <div className="mm-comment-input">
            <input
              placeholder="Write a comment…"
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") submit(); }}
            />
            <button className="mm-icon-btn mm-icon-btn--sm" onClick={submit} aria-label="Send comment"><Send size={14} /></button>
          </div>
        </div>
      )}
    </div>
  );
}

function CommunityScreen({ communities, onToggleJoin, onOpen }) {
  const [filter, setFilter] = useState("All");
  const yours = communities.filter(c => c.joined);
  const list = filter === "All" ? communities : communities.filter(c => c.category === filter);

  return (
    <div className="mm-page">
      <h1 className="mm-h1">Community</h1>
      <p className="mm-sub">Join spaces built around the memories that shaped the people who lived them.</p>

      {yours.length > 0 && (
        <>
          <SectionHead title="Your communities" />
          <div className="mm-community-strip">
            {yours.map(c => (
              <button className="mm-community-chip" key={c.id} style={{ "--chip-color": NODE_COLOR[c.category] }} onClick={() => onOpen(c.id)}>
                {React.createElement(CATEGORY_ICON[c.category], { size: 14 })}
                {c.name}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="mm-filter-bar" style={{ marginTop: yours.length ? 26 : 4, marginBottom: 22 }}>
        {["All", ...CATEGORIES].map(cat => (
          <button key={cat} className={`mm-chip${filter === cat ? " is-active" : ""}`} onClick={() => setFilter(cat)}>{cat}</button>
        ))}
      </div>

      <div className="mm-community-cards">
        {list.map(c => {
          const Icon = CATEGORY_ICON[c.category];
          return (
            <div className="mm-community-card" key={c.id} onClick={() => onOpen(c.id)}>
              <div className="mm-community-card-cover" style={{ background: `linear-gradient(135deg, ${NODE_COLOR[c.category]}, #0F172A)` }}>
                <Icon size={22} color="#fff" />
              </div>
              <div className="mm-community-card-body">
                <h3>{c.name}</h3>
                <p>{c.tagline}</p>
                <div className="mm-community-card-meta"><Users size={13} />{c.members.toLocaleString()} members</div>
                <div className="mm-community-card-actions">
                  <button className="mm-btn mm-btn--ghost mm-btn--sm" onClick={(e) => { e.stopPropagation(); onOpen(c.id); }}>Open</button>
                  <button
                    className={`mm-btn mm-btn--sm${c.joined ? " mm-btn--ghost is-saved-btn" : " mm-btn--primary"}`}
                    onClick={(e) => { e.stopPropagation(); onToggleJoin(c.id); }}
                  >
                    {c.joined ? <Check size={13} /> : <UserPlus size={13} />}{c.joined ? "Joined" : "Join"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="mm-network-section" style={{ marginTop: 40 }}>
        <div className="mm-network-copy">
          <h2>How communities connect</h2>
          <p>Every community forms around the same threads that link memories to each other. Follow a thread to a new space.</p>
        </div>
        <MemoryNetwork onNodeClick={(cat) => { const found = communities.find(c => c.category === cat); if (found) onOpen(found.id); }} />
      </section>
    </div>
  );
}

function CommunityDetailScreen({ community, members, posts, sharedMemories, onBack, onToggleJoin, onAddPost, onToggleLike, onAddComment, openDetail, savedIds, toggleSave }) {
  const [tab, setTab] = useState("posts");
  const Icon = CATEGORY_ICON[community.category];

  return (
    <div className="mm-page">
      <button className="mm-link-btn mm-back-btn" onClick={onBack}><ChevronLeft size={15} /> All communities</button>

      <div className="mm-community-header" style={{ background: `linear-gradient(135deg, ${NODE_COLOR[community.category]}, #0F172A)` }}>
        <div className="mm-community-header-icon"><Icon size={24} color="#fff" /></div>
        <div className="mm-community-header-text">
          <span className="mm-community-header-cat">{community.category}</span>
          <h1>{community.name}</h1>
          <p>{community.tagline}</p>
        </div>
        <button className={`mm-btn ${community.joined ? "mm-btn--ghost" : "mm-btn--primary"}`} onClick={() => onToggleJoin(community.id)}>
          {community.joined ? <Check size={14} /> : <UserPlus size={14} />}{community.joined ? "Joined" : "Join community"}
        </button>
      </div>

      <div className="mm-tabs">
        {[["posts", "Posts", posts.length], ["members", "Members", members.length], ["memories", "Memories", sharedMemories.length]].map(([id, label, count]) => (
          <button key={id} className={`mm-tab${tab === id ? " is-active" : ""}`} onClick={() => setTab(id)}>{label}<span>{count}</span></button>
        ))}
      </div>

      {tab === "posts" && (
        <div>
          {community.joined ? (
            <PostComposer
              placeholder={`Share something with ${community.name}…`}
              hint={`Visible to ${community.members.toLocaleString()} members`}
              onSubmit={onAddPost}
            />
          ) : (
            <div className="mm-join-prompt">
              <p>Join <strong>{community.name}</strong> to post and comment.</p>
              <button className="mm-btn mm-btn--primary mm-btn--sm" onClick={() => onToggleJoin(community.id)}><UserPlus size={13} />Join community</button>
            </div>
          )}

          {posts.length ? (
            <div className="mm-post-list">
              {posts.map(p => (
                <PostThread
                  key={p.id}
                  post={p}
                  onToggleLike={() => onToggleLike(p.id)}
                  onAddComment={(text) => onAddComment(p.id, text)}
                />
              ))}
            </div>
          ) : (
            <div className="mm-empty"><MessageCircle size={28} /><h3>No posts yet</h3><p>Be the first to share something with this community.</p></div>
          )}
        </div>
      )}

      {tab === "members" && (
        <div className="mm-member-grid">
          {members.map((m, i) => (
            <div className="mm-member-card" key={i}>
              <Avatar name={m.name} size={40} />
              <div><strong>{m.name}</strong><span>{m.role}</span></div>
            </div>
          ))}
        </div>
      )}

      {tab === "memories" && (
        sharedMemories.length ? (
          <div className="mm-grid">{sharedMemories.map(m => <MemoryCard key={m.id} m={m} onOpen={openDetail} saved={savedIds.includes(m.id)} onToggleSave={toggleSave} />)}</div>
        ) : (
          <div className="mm-empty"><Bookmark size={28} /><h3>No memories shared yet</h3><p>Members haven't shared a memory in this community yet.</p></div>
        )
      )}
    </div>
  );
}

function MemoryDetailScreen({ memory, onBack, saved, onToggleSave }) {
  const Icon = CATEGORY_ICON[memory.category];
  const related = MEMORIES.filter(m => m.category === memory.category && m.id !== memory.id).slice(0, 3);
  return (
    <div className="mm-page">
      <button className="mm-link-btn mm-back-btn" onClick={onBack}><ChevronLeft size={15} /> Back</button>
      <Cover colors={memory.cover} height={260}>
        <div className="mm-detail-cover-overlay">
          <Badge tone="lavender" icon={Icon}>{memory.category}</Badge>
          {memory.verified && <Badge tone="teal" icon={BadgeCheck}>Verified authentic</Badge>}
        </div>
      </Cover>

      <div className="mm-detail-grid">
        <div className="mm-detail-main">
          <h1 className="mm-h1 mm-h1--detail">{memory.title}</h1>
          <div className="mm-card-creator mm-detail-creator">
            <Avatar name={memory.creator} size={30} /><span>{memory.creator}</span>
            <span className="mm-detail-meta-sep" />
            <Star size={14} className="mm-star" />{memory.rating}
            <span className="mm-detail-meta-sep" />
            <Clock size={14} />{memory.duration}
            <span className="mm-detail-meta-sep" />
            <Users size={14} />{memory.learners.toLocaleString()} learners
          </div>

          <p className="mm-detail-desc">{memory.description}</p>

          <h3 className="mm-detail-h3">Learning outcomes</h3>
          <ul className="mm-outcome-list">{memory.outcomes.map(o => <li key={o}><Check size={14} />{o}</li>)}</ul>

          <h3 className="mm-detail-h3">Emotional profile</h3>
          <div className="mm-emotion-row">
            <EmotionMeter level={memory.emotion} /><span>{memory.emotion} intensity</span>
            <div className="mm-tag-row">{memory.emotionalTags.map(t => <span className="mm-tag" key={t}>{t}</span>)}</div>
          </div>

          <h3 className="mm-detail-h3">Timeline</h3>
          <div className="mm-detail-timeline">
            {memory.timeline.map(step => (
              <div className="mm-detail-timeline-step" key={step.t}>
                <span className="mm-detail-timeline-t">{step.t}</span>
                <span className="mm-detail-timeline-dot" />
                <span>{step.label}</span>
              </div>
            ))}
          </div>

          <h3 className="mm-detail-h3">Reviews</h3>
          <div className="mm-review-list">
            {memory.reviews.map((r, i) => (
              <div className="mm-review" key={i}>
                <div className="mm-review-head"><Avatar name={r.name} size={26} /><strong>{r.name}</strong><span className="mm-review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span></div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>

          {related.length > 0 && (
            <>
              <h3 className="mm-detail-h3">Related memories</h3>
              <div className="mm-related-row">
                {related.map(m => (
                  <div className="mm-related-card" key={m.id}>
                    <div className="mm-related-cover" style={{ background: `linear-gradient(135deg, ${m.cover[0]}, ${m.cover[1]})` }} />
                    <span>{m.title}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="mm-detail-side">
          <div className="mm-detail-card">
            <span className="mm-price mm-price--lg">{memory.price}</span>
            <Badge tone="lavender">{memory.license}</Badge>
            <button className="mm-btn mm-btn--primary mm-btn--lg mm-btn--block"><PlayCircle size={16} />Experience Memory</button>
            <button className={`mm-btn mm-btn--ghost mm-btn--block${saved ? " is-saved-btn" : ""}`} onClick={() => onToggleSave(memory.id)}>
              <Bookmark size={15} fill={saved ? "currentColor" : "none"} />{saved ? "Saved" : "Save for Later"}
            </button>
            <div className="mm-detail-side-meta">
              <div><Globe size={14} />{memory.language}</div>
              <div><Users size={14} />Skill level: {memory.skill}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PrivacyScreen() {
  const [state, setState] = useState(() => Object.fromEntries(MY_UPLOADS.map(u => [u.id, {
    access: u.privacy, anonymize: u.id === 103, expiration: "1 year",
    purposes: u.id === 103 ? ["Education", "Research"] : ["Education"],
  }])));
  const [openId, setOpenId] = useState(MY_UPLOADS[0].id);

  const update = (id, patch) => setState(s => ({ ...s, [id]: { ...s[id], ...patch } }));
  const togglePurpose = (id, p) => {
    const cur = state[id].purposes;
    update(id, { purposes: cur.includes(p) ? cur.filter(x => x !== p) : [...cur, p] });
  };

  return (
    <div className="mm-page">
      <h1 className="mm-h1">Privacy &amp; Permissions</h1>
      <p className="mm-sub">You decide who can access each memory, for what purpose, and for how long.</p>

      <div className="mm-privacy-list">
        {MY_UPLOADS.map(u => {
          const s = state[u.id];
          const open = openId === u.id;
          return (
            <div className="mm-privacy-card" key={u.id}>
              <button className="mm-privacy-head" onClick={() => setOpenId(open ? null : u.id)}>
                <div className="mm-privacy-head-cover" style={{ background: `linear-gradient(135deg, ${u.cover[0]}, ${u.cover[1]})` }} />
                <div className="mm-privacy-head-text">
                  <h3>{u.title}</h3>
                  <span>{u.category}</span>
                </div>
                <Badge tone={s.access === "Public" ? "teal" : s.access === "Private" ? "neutral" : "lavender"} icon={s.access === "Private" ? Lock : Eye}>{s.access}</Badge>
                <ChevronDown size={16} className={`mm-chev${open ? " is-open" : ""}`} />
              </button>

              {open && (
                <div className="mm-privacy-body">
                  <div className="mm-privacy-row">
                    <span className="mm-privacy-label">Who can access this</span>
                    <div className="mm-chip-group">
                      {["Public", "Licensed Only", "Private"].map(opt => (
                        <button key={opt} className={`mm-chip${s.access === opt ? " is-active" : ""}`} onClick={() => update(u.id, { access: opt })}>{opt}</button>
                      ))}
                    </div>
                  </div>

                  <div className="mm-privacy-row mm-privacy-row--split">
                    <span className="mm-privacy-label">Blur / anonymize other people in this memory</span>
                    <Toggle checked={s.anonymize} onChange={v => update(u.id, { anonymize: v })} label="Anonymize others" />
                  </div>

                  <div className="mm-privacy-row">
                    <span className="mm-privacy-label">Limit access by purpose</span>
                    <div className="mm-check-row">
                      {["Education", "Healthcare", "Entertainment", "Research"].map(p => (
                        <label className="mm-check-pill" key={p}>
                          <input type="checkbox" checked={s.purposes.includes(p)} onChange={() => togglePurpose(u.id, p)} />{p}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mm-privacy-row mm-privacy-row--split">
                    <span className="mm-privacy-label"><Calendar size={13} /> License expires</span>
                    <select value={s.expiration} onChange={e => update(u.id, { expiration: e.target.value })}>
                      <option>30 days</option><option>6 months</option><option>1 year</option><option>Never</option>
                    </select>
                  </div>

                  <div className="mm-activity-log">
                    <span className="mm-privacy-label"><HistoryIcon size={13} /> Activity log</span>
                    {ACTIVITY_LOG[u.id].length ? (
                      <table className="mm-table">
                        <thead><tr><th>Accessed by</th><th>Purpose</th><th>Date</th></tr></thead>
                        <tbody>{ACTIVITY_LOG[u.id].map((a, i) => <tr key={i}><td>{a.who}</td><td>{a.purpose}</td><td>{a.when}</td></tr>)}</tbody>
                      </table>
                    ) : <p className="mm-empty-inline">No access recorded yet.</p>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AnalyticsScreen() {
  const totalRevenue = MY_UPLOADS.reduce((a, u) => a + u.revenue, 0);
  const totalLearners = MY_UPLOADS.reduce((a, u) => a + u.learners, 0);
  const KPIS = [
    { label: "Memories uploaded", value: MY_UPLOADS.length, icon: Layers },
    { label: "Active learners", value: totalLearners.toLocaleString(), icon: Users },
    { label: "Revenue earned", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign },
    { label: "Avg. rating", value: "4.8", icon: Star },
  ];
  return (
    <div className="mm-page">
      <h1 className="mm-h1">Analytics</h1>
      <p className="mm-sub">How your memories are reaching learners across the platform.</p>

      <div className="mm-kpi-row">
        {KPIS.map(k => (
          <div className="mm-kpi-card" key={k.label}>
            <k.icon size={18} /><span className="mm-kpi-value">{k.value}</span><span className="mm-kpi-label">{k.label}</span>
          </div>
        ))}
      </div>

      <div className="mm-analytics-grid">
        <div className="mm-chart-card">
          <h3>Most popular categories</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={CATEGORY_LEARNERS} margin={{ top: 10, right: 10, left: -20, bottom: 30 }}>
              <CartesianGrid stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 10.5, fill: "#64748B" }} interval={0} angle={-25} textAnchor="end" height={55} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
              <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: 12, borderRadius: 10, border: "1px solid #E2E8F0" }} />
              <Bar dataKey="learners" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mm-chart-card">
          <h3>Monthly activity</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={MONTHLY_ACTIVITY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
              <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: 12, borderRadius: 10, border: "1px solid #E2E8F0" }} />
              <Line type="monotone" dataKey="views" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mm-chart-card mm-chart-card--geo">
          <h3>Geographic usage</h3>
          <div className="mm-geo-list">
            {GEO.map(g => (
              <div className="mm-geo-row" key={g.country}>
                <span className="mm-geo-country"><MapPin size={13} />{g.country}</span>
                <div className="mm-progress mm-progress--geo"><div className="mm-progress-fill mm-progress-fill--blue" style={{ width: `${g.pct}%` }} /></div>
                <span className="mm-geo-pct">{g.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsScreen() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  return (
    <div className="mm-page">
      <h1 className="mm-h1">Settings</h1>
      <p className="mm-sub">Manage your account and preferences.</p>
      <div className="mm-settings-card">
        <div className="mm-settings-row">
          <div><Avatar name="Sam Rivera" size={44} /></div>
          <div className="mm-settings-fields">
            <label className="mm-field"><span>Name</span><input defaultValue="Sam Rivera" /></label>
            <label className="mm-field"><span>Email</span><input defaultValue="sam.rivera@example.com" /></label>
          </div>
        </div>
        <div className="mm-privacy-row mm-privacy-row--split">
          <span className="mm-privacy-label">Email me about new licenses and reviews</span>
          <Toggle checked={emailNotif} onChange={setEmailNotif} label="Email notifications" />
        </div>
        <div className="mm-privacy-row mm-privacy-row--split">
          <span className="mm-privacy-label">Make my creator profile public</span>
          <Toggle checked={publicProfile} onChange={setPublicProfile} label="Public profile" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- app ------------------------------------ */

export default function App() {
  const [active, setActive] = useState("home");
  const [detailId, setDetailId] = useState(null);
  const [savedIds, setSavedIds] = useState([5]);
  const [query, setQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [marketplaceCategory, setMarketplaceCategory] = useState("All");
  const [communities, setCommunities] = useState(COMMUNITIES);
  const [communityPosts, setCommunityPosts] = useState(COMMUNITY_POSTS);
  const [communityId, setCommunityId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [active, detailId, communityId]);

  const toggleSave = (id) => setSavedIds(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const openDetail = (id) => setDetailId(id);
  const go = (id) => { setDetailId(null); setCommunityId(null); setActive(id); setMobileNavOpen(false); };
  const exploreCategory = (cat) => { setMarketplaceCategory(cat); go("marketplace"); };
  const openCommunity = (id) => setCommunityId(id);
  const backFromCommunity = () => setCommunityId(null);

  const toggleJoinCommunity = (id) => setCommunities(cs => cs.map(c => c.id === id ? { ...c, joined: !c.joined, members: c.joined ? c.members - 1 : c.members + 1 } : c));
  const addCommunityPost = (id, text) => setCommunityPosts(cp => ({ ...cp, [id]: [{ id: `p${Date.now()}`, author: "Sam Rivera", when: timeAgoLabel(), text, likes: 0, liked: false, comments: [] }, ...(cp[id] || [])] }));
  const toggleCommunityLike = (id, postId) => setCommunityPosts(cp => ({ ...cp, [id]: (cp[id] || []).map(p => p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p) }));
  const addCommunityComment = (id, postId, text) => setCommunityPosts(cp => ({ ...cp, [id]: (cp[id] || []).map(p => p.id === postId ? { ...p, comments: [...p.comments, { author: "Sam Rivera", text }] } : p) }));

  const detailMemory = useMemo(() => MEMORIES.find(m => m.id === detailId), [detailId]);
  const activeCommunity = useMemo(() => communities.find(c => c.id === communityId), [communities, communityId]);
  const activeCommunityMemories = useMemo(() => {
    if (!activeCommunity) return [];
    const extraIds = COMMUNITY_EXTRA_MEMORY_IDS[activeCommunity.id] || [];
    const base = MEMORIES.filter(m => m.category === activeCommunity.category);
    const extra = MEMORIES.filter(m => extraIds.includes(m.id));
    return [...base, ...extra];
  }, [activeCommunity]);

  let content;
  if (loading) {
    content = <div className="mm-page"><SkeletonGrid count={active === "home" ? 3 : 6} /></div>;
  } else if (detailMemory) {
    content = <MemoryDetailScreen memory={detailMemory} onBack={() => setDetailId(null)} saved={savedIds.includes(detailMemory.id)} onToggleSave={toggleSave} />;
  } else if (active === "community" && activeCommunity) {
    content = (
      <CommunityDetailScreen
        community={activeCommunity}
        members={COMMUNITY_MEMBERS[activeCommunity.id] || []}
        posts={communityPosts[activeCommunity.id] || []}
        sharedMemories={activeCommunityMemories}
        onBack={backFromCommunity}
        onToggleJoin={toggleJoinCommunity}
        onAddPost={(text) => addCommunityPost(activeCommunity.id, text)}
        onToggleLike={(postId) => toggleCommunityLike(activeCommunity.id, postId)}
        onAddComment={(postId, text) => addCommunityComment(activeCommunity.id, postId, text)}
        openDetail={openDetail}
        savedIds={savedIds}
        toggleSave={toggleSave}
      />
    );
  } else {
    switch (active) {
      case "marketplace": content = <MarketplaceScreen openDetail={openDetail} savedIds={savedIds} toggleSave={toggleSave} query={query} initialCategory={marketplaceCategory} />; break;
      case "myMemories": content = <MyMemoriesScreen go={go} />; break;
      case "library": content = <LibraryScreen savedIds={savedIds} openDetail={openDetail} toggleSave={toggleSave} />; break;
      case "community": content = <CommunityScreen communities={communities} onToggleJoin={toggleJoinCommunity} onOpen={openCommunity} />; break;
      case "analytics": content = <AnalyticsScreen />; break;
      case "privacy": content = <PrivacyScreen />; break;
      case "settings": content = <SettingsScreen />; break;
      default: content = <HomeScreen go={go} openDetail={openDetail} savedIds={savedIds} toggleSave={toggleSave} query={query} onExploreCategory={exploreCategory} />;
    }
  }

  return (
    <div className="mm-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');

        .mm-root {
          --navy: #0F172A; --blue: #2563EB; --indigo: #4F46E5; --purple: #7C3AED;
          --cyan: #06B6D4; --lavender: #EEF2FF; --lavender-ink: #4F46E5;
          --bg: #F8FAFC; --white: #FFFFFF; --ink: #0F172A; --ink-soft: #64748B;
          --border: #E2E8F0; --teal: #0D9488; --teal-bg: #ECFDF5;
          font-family: 'Inter', sans-serif; color: var(--ink); background: var(--bg);
          display: flex; min-height: 100vh; font-size: 14.5px; line-height: 1.55;
        }
        .mm-root *, .mm-root *::before, .mm-root *::after { box-sizing: border-box; }
        .mm-root button, .mm-root input, .mm-root select, .mm-root textarea { font-family: inherit; font-size: 13.5px; }
        .mm-root button { cursor: pointer; }
        .mm-root button:focus-visible, .mm-root input:focus-visible, .mm-root select:focus-visible {
          outline: 2px solid var(--blue); outline-offset: 2px;
        }
        .mm-root h1, .mm-root h2, .mm-root h3 { font-family: 'Manrope', sans-serif; color: var(--navy); }

        /* ---------- sidebar ---------- */
        .mm-sidebar {
          width: 240px; flex-shrink: 0; background: var(--navy); color: #E2E8F0;
          display: flex; flex-direction: column; padding: 22px 14px; position: sticky; top: 0; height: 100vh;
        }
        .mm-brand { display: flex; align-items: center; gap: 9px; color: #fff; font-weight: 700; font-size: 17px; padding: 6px 10px 26px; }
        .mm-sidebar nav { display: flex; flex-direction: column; gap: 3px; flex: 1; }
        .mm-nav-item {
          display: flex; align-items: center; gap: 11px; background: none; border: none; color: #94A3B8;
          padding: 10px 12px; border-radius: 10px; font-size: 13.5px; font-weight: 500; text-align: left;
          transition: background .15s ease, color .15s ease;
        }
        .mm-nav-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .mm-nav-item.is-active { background: linear-gradient(135deg, var(--blue), var(--indigo)); color: #fff; }
        .mm-sidebar-foot { padding: 12px 10px 0; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 12px; }
        .mm-sidebar-upsell p { font-size: 12px; color: #94A3B8; margin: 12px 0 6px; }
        .mm-sidebar-upsell .mm-link-btn { color: #C7D2FE; font-size: 12.5px; }

        /* ---------- topbar ---------- */
        .mm-topbar {
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          padding: 16px 32px; background: rgba(248,250,252,0.85); backdrop-filter: blur(8px);
          position: sticky; top: 0; z-index: 15; border-bottom: 1px solid var(--border);
        }
        .mm-search {
          display: flex; align-items: center; gap: 9px; background: var(--white); border: 1px solid var(--border);
          border-radius: 12px; padding: 9px 14px; flex: 1; max-width: 420px; color: var(--ink-soft);
        }
        .mm-search input { border: none; outline: none; flex: 1; background: none; color: var(--ink); }
        .mm-topbar-actions { display: flex; align-items: center; gap: 10px; }
        .mm-icon-btn {
          width: 38px; height: 38px; border-radius: 10px; border: 1px solid var(--border); background: var(--white);
          display: flex; align-items: center; justify-content: center; position: relative; color: var(--ink-soft);
        }
        .mm-dot { position: absolute; top: 8px; right: 9px; width: 6px; height: 6px; border-radius: 50%; background: var(--purple); }
        .mm-profile-btn { display: flex; align-items: center; gap: 5px; background: none; border: none; padding: 2px; color: var(--ink-soft); }
        .mm-dropdown-wrap { position: relative; }
        .mm-dropdown {
          position: absolute; right: 0; top: 46px; background: var(--white); border: 1px solid var(--border);
          border-radius: 12px; box-shadow: 0 12px 32px rgba(15,23,42,0.12); padding: 8px; min-width: 170px; z-index: 30;
        }
        .mm-dropdown--wide { min-width: 300px; padding: 6px; }
        .mm-dropdown button { display: block; width: 100%; text-align: left; background: none; border: none; padding: 9px 10px; border-radius: 8px; color: var(--ink); }
        .mm-dropdown button:hover { background: var(--bg); }
        .mm-dropdown-divider { height: 1px; background: var(--border); margin: 4px 0; }
        .mm-dropdown-head { font-weight: 600; font-size: 12.5px; color: var(--ink-soft); padding: 8px 10px 4px; }
        .mm-notif { padding: 10px; border-radius: 8px; }
        .mm-notif:hover { background: var(--bg); }
        .mm-notif strong { font-size: 13px; display: block; margin-bottom: 2px; }
        .mm-notif p { font-size: 12.5px; color: var(--ink-soft); margin: 0 0 4px; }
        .mm-notif span { font-size: 11px; color: #94A3B8; }

        /* ---------- generic ---------- */
        .mm-main { flex: 1; min-width: 0; }
        .mm-page { max-width: 1180px; margin: 0 auto; padding: 32px 32px 80px; }
        .mm-h1 { font-size: 26px; font-weight: 700; margin: 0 0 6px; letter-spacing: -0.01em; }
        .mm-h1--detail { font-size: 24px; margin-top: 20px; }
        .mm-sub { color: var(--ink-soft); font-size: 14px; margin: 0 0 26px; }
        .mm-section-head { display: flex; align-items: center; justify-content: space-between; margin: 34px 0 14px; }
        .mm-section-head h2 { font-size: 17px; font-weight: 700; margin: 0; }
        .mm-link-btn { background: none; border: none; color: var(--blue); font-weight: 600; font-size: 13px; display: inline-flex; align-items: center; gap: 3px; padding: 0; }
        .mm-back-btn { margin-bottom: 16px; }

        .mm-btn { border: none; border-radius: 10px; padding: 9px 16px; font-weight: 600; display: inline-flex; align-items: center; gap: 7px; transition: transform .1s ease, box-shadow .15s ease, background .15s ease; }
        .mm-btn--primary { background: linear-gradient(135deg, var(--blue), var(--indigo)); color: #fff; box-shadow: 0 4px 14px rgba(79,70,229,0.25); }
        .mm-btn--primary:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(79,70,229,0.32); }
        .mm-btn--ghost { background: var(--white); color: var(--ink); border: 1px solid var(--border); }
        .mm-btn--ghost:hover { border-color: var(--blue); color: var(--blue); }
        .mm-btn--sm { padding: 6px 11px; font-size: 12px; border-radius: 8px; }
        .mm-btn--lg { padding: 12px 22px; font-size: 14.5px; border-radius: 12px; }
        .mm-btn--block { width: 100%; justify-content: center; margin-top: 10px; }
        .mm-btn--upload { white-space: nowrap; }
        .is-saved-btn { color: var(--purple); border-color: var(--purple); }

        /* ---------- hero (home) ---------- */
        .mm-hero { position: relative; padding: 18px 0 12px; overflow: visible; }
        .mm-hero::before {
          content: ""; position: absolute; top: -60px; right: -8%; width: 520px; height: 520px; z-index: 0;
          background: radial-gradient(circle, rgba(37,99,235,0.14), rgba(124,58,237,0.09) 55%, transparent 72%);
          filter: blur(6px); pointer-events: none;
        }
        .mm-hero::after {
          content: ""; position: absolute; inset: -20px 0 auto 0; height: 260px; z-index: 0; opacity: 0.5;
          background-image: radial-gradient(circle, #CBD5E1 1px, transparent 1px); background-size: 22px 22px;
          -webkit-mask-image: radial-gradient(ellipse 70% 100% at 30% 0%, #000 40%, transparent 80%);
          mask-image: radial-gradient(ellipse 70% 100% at 30% 0%, #000 40%, transparent 80%);
          pointer-events: none;
        }
        .mm-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 52px; align-items: center; }
        .mm-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--indigo); background: var(--lavender); border-radius: 20px; padding: 7px 13px; margin-bottom: 20px; }
        .mm-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--purple); flex-shrink: 0; }
        .mm-hero-copy h1 { margin: 0 0 18px; }
        .mm-hero-line { display: block; line-height: 1.08; letter-spacing: -0.02em; }
        .mm-hero-line--soft { font-size: 32px; font-weight: 600; color: var(--ink-soft); font-family: 'Manrope', sans-serif; }
        .mm-hero-line--bold { font-size: 48px; font-weight: 800; color: var(--navy); font-family: 'Manrope', sans-serif; }
        .mm-hero-line--bold em { font-style: normal; background: linear-gradient(120deg, var(--indigo), var(--purple)); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .mm-hero-copy p { color: var(--ink-soft); font-size: 15.5px; line-height: 1.7; margin: 0 0 26px; max-width: 460px; }
        .mm-hero-actions { display: flex; align-items: center; gap: 24px; margin-bottom: 34px; }
        .mm-hero-link { font-size: 13.5px; }
        .mm-hero-stats { display: flex; gap: 30px; flex-wrap: wrap; }
        .mm-hero-stats strong { display: block; font-size: 20px; font-weight: 800; color: var(--navy); font-family: 'Manrope', sans-serif; }
        .mm-hero-stats span { font-size: 11px; color: var(--ink-soft); }

        .mm-hero-visual { position: relative; display: flex; justify-content: center; padding: 10px; }
        .mm-player-card { position: relative; z-index: 2; width: 100%; max-width: 340px; background: linear-gradient(160deg, rgba(15,23,42,0.96), rgba(30,27,75,0.96)); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 20px; color: #fff; box-shadow: 0 30px 60px -22px rgba(15,23,42,0.4); }
        .mm-player-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .mm-player-verified { display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #67E8F9; }
        .mm-player-card h4 { font-size: 15px; line-height: 1.4; margin: 0 0 12px; font-weight: 700; color: #fff; }
        .mm-player-creator { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #CBD5E1; margin-bottom: 18px; }
        .mm-player-wave { display: flex; align-items: flex-end; gap: 2px; height: 44px; margin-bottom: 14px; }
        .mm-player-wave span { flex: 1; border-radius: 2px; background: linear-gradient(180deg, #67E8F9, #7C3AED); opacity: 0.85; }
        .mm-player-scrub { position: relative; height: 4px; background: rgba(255,255,255,0.16); border-radius: 4px; margin-bottom: 8px; }
        .mm-player-scrub-fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 4px; background: linear-gradient(90deg, #2563EB, #7C3AED); }
        .mm-player-scrub-thumb { position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%; background: #fff; transform: translate(-50%, -50%); box-shadow: 0 0 0 4px rgba(124,58,237,0.35); }
        .mm-player-times { display: flex; justify-content: space-between; gap: 10px; font-size: 10.5px; color: #94A3B8; margin-bottom: 18px; }
        .mm-player-times span:first-child { flex: 1; }
        .mm-player-play { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; background: #fff; color: var(--navy); border: none; border-radius: 12px; padding: 12px; font-weight: 700; font-size: 13.5px; }
        .mm-player-play:hover { background: #E0E7FF; }

        .mm-fragment { position: absolute; display: flex; align-items: center; gap: 6px; background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 9px 13px; font-size: 11.5px; font-weight: 600; color: var(--ink); box-shadow: 0 14px 28px rgba(15,23,42,0.1); max-width: 190px; z-index: 3; animation: mm-float 5.5s ease-in-out infinite; }
        .mm-fragment--1 { top: -10px; left: -6px; animation-delay: 0s; }
        .mm-fragment--2 { bottom: 18px; right: -20px; animation-delay: 1.6s; }
        @keyframes mm-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @media (prefers-reduced-motion: reduce) { .mm-fragment { animation: none; } }

        .mm-trending { display: flex; flex-wrap: wrap; gap: 8px; margin: 36px 0 6px; }
        .mm-trend-pill {
          display: flex; align-items: center; gap: 7px; background: var(--white); border: 1px solid var(--border);
          border-radius: 20px; padding: 8px 14px; font-size: 12.5px; font-weight: 500; color: var(--ink);
        }
        .mm-trend-pill:hover { border-color: var(--indigo); color: var(--indigo); }
        .mm-trend-pill span { background: var(--lavender); color: var(--lavender-ink); border-radius: 10px; padding: 1px 7px; font-size: 11px; font-weight: 700; }

        /* ---------- cards / grid ---------- */
        .mm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .mm-card { position: relative; background: var(--white); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: box-shadow .15s ease, transform .15s ease; }
        .mm-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--blue), var(--indigo), var(--purple)); opacity: 0; transition: opacity .2s ease; z-index: 2; }
        .mm-card:hover::before { opacity: 1; }
        .mm-card:hover { box-shadow: 0 16px 32px -6px rgba(79,70,229,0.16); transform: translateY(-3px); }
        .mm-cover { position: relative; overflow: hidden; }
        .mm-cover-blob { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.18); filter: blur(6px); }
        .mm-cover-blob--1 { width: 130px; height: 130px; top: -40px; right: -30px; }
        .mm-cover-blob--2 { width: 90px; height: 90px; bottom: -30px; left: 10px; background: rgba(255,255,255,0.14); }
        .mm-cover-silhouette { position: absolute; bottom: 8px; right: 12px; opacity: 0.9; }
        .mm-cover-cat { position: absolute; left: 12px; bottom: 12px; display: flex; align-items: center; gap: 6px; background: rgba(15,23,42,0.35); color: #fff; font-size: 11.5px; font-weight: 600; padding: 5px 10px; border-radius: 8px; backdrop-filter: blur(4px); }
        .mm-save-btn { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 8px; border: none; background: rgba(255,255,255,0.85); color: var(--navy); display: flex; align-items: center; justify-content: center; }
        .mm-save-btn.is-saved { color: var(--purple); }
        .mm-card-body { padding: 16px; }
        .mm-card-top h3 { font-size: 14.5px; font-weight: 700; line-height: 1.35; margin: 0 0 10px; height: 39px; overflow: hidden; }
        .mm-card-creator { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--ink-soft); margin-bottom: 10px; }
        .mm-verified-icon { color: var(--indigo); }
        .mm-avatar { border-radius: 50%; background: var(--lavender); color: var(--indigo); display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
        .mm-card-meta { display: flex; gap: 12px; font-size: 12px; color: var(--ink-soft); margin-bottom: 12px; }
        .mm-card-meta span { display: flex; align-items: center; gap: 4px; }
        .mm-star { color: #F59E0B; }
        .mm-card-foot { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 12px; }
        .mm-price { font-weight: 700; font-size: 13px; margin-left: 8px; }
        .mm-price--lg { display: block; font-size: 22px; margin-bottom: 10px; }

        .mm-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 4px 9px; border-radius: 7px; }
        .mm-badge--lavender { background: var(--lavender); color: var(--lavender-ink); }
        .mm-badge--teal { background: var(--teal-bg); color: var(--teal); }
        .mm-badge--neutral { background: #F1F5F9; color: var(--ink-soft); }

        .mm-meter { display: inline-flex; gap: 3px; vertical-align: middle; }
        .mm-meter span { width: 6px; height: 14px; border-radius: 3px; background: var(--border); }
        .mm-meter span.is-filled { background: var(--purple); }

        /* ---------- filters / marketplace ---------- */
        .mm-filter-bar { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 8px; }
        .mm-filter-bar select { border: 1px solid var(--border); border-radius: 9px; padding: 8px 10px; background: var(--white); color: var(--ink); }
        .mm-check-pill { display: flex; align-items: center; gap: 6px; border: 1px solid var(--border); background: var(--white); border-radius: 9px; padding: 7px 12px; font-size: 12.5px; }
        .mm-result-count { color: var(--ink-soft); font-size: 12.5px; margin: 10px 0 18px; }
        .mm-empty { text-align: center; padding: 70px 20px; color: var(--ink-soft); }
        .mm-empty svg { color: var(--border); margin-bottom: 10px; }
        .mm-empty h3 { color: var(--ink); font-size: 15px; margin: 0 0 6px; }
        .mm-empty-inline { color: var(--ink-soft); font-size: 12.5px; }

        /* ---------- skeleton ---------- */
        .mm-skeleton-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 14px; }
        .mm-skeleton { background: linear-gradient(90deg, #EEF1F5 25%, #E4E8ED 37%, #EEF1F5 63%); background-size: 400% 100%; border-radius: 8px; animation: mm-shimmer 1.4s ease infinite; }
        .mm-skeleton--cover { height: 130px; margin-bottom: 12px; border-radius: 12px; }
        .mm-skeleton--line { height: 12px; margin-bottom: 8px; }
        @keyframes mm-shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
        @media (prefers-reduced-motion: reduce) { .mm-skeleton { animation: none; } }

        /* ---------- timeline (my memories) ---------- */
        .mm-timeline { display: flex; flex-direction: column; gap: 14px; }
        .mm-timeline-row { display: flex; gap: 16px; background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 18px; align-items: center; }
        .mm-timeline-cover { width: 56px; height: 56px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .mm-timeline-main { flex: 1; min-width: 0; }
        .mm-timeline-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px; }
        .mm-timeline-head h3 { font-size: 15px; margin: 0; }
        .mm-timeline-ago { font-size: 12px; color: var(--ink-soft); }
        .mm-timeline-stats { display: flex; align-items: center; gap: 14px; font-size: 12.5px; color: var(--ink-soft); margin-bottom: 10px; }
        .mm-timeline-stats span { display: flex; align-items: center; gap: 4px; }
        .mm-timeline-progress { display: flex; align-items: center; gap: 10px; font-size: 12px; color: var(--ink-soft); }
        .mm-timeline-progress .mm-progress { flex: 1; max-width: 200px; }
        .mm-timeline-pct { font-weight: 600; color: var(--ink); }
        .mm-timeline-actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
        .mm-progress { height: 6px; background: #EEF1F5; border-radius: 4px; overflow: hidden; }
        .mm-progress--geo { flex: 1; max-width: none; }
        .mm-progress-fill { height: 100%; border-radius: 4px; }
        .mm-progress-fill--blue { background: var(--blue); }
        .mm-progress-fill--purple { background: var(--purple); }

        /* ---------- detail ---------- */
        .mm-detail-cover-overlay { position: absolute; bottom: 16px; left: 16px; display: flex; gap: 8px; }
        .mm-detail-grid { display: grid; grid-template-columns: 1fr 300px; gap: 32px; margin-top: 24px; }
        .mm-detail-creator { font-size: 13.5px; margin: 14px 0 20px; flex-wrap: wrap; }
        .mm-detail-meta-sep { width: 1px; height: 14px; background: var(--border); margin: 0 4px; }
        .mm-detail-desc { color: var(--ink-soft); font-size: 15px; line-height: 1.7; margin-bottom: 8px; }
        .mm-detail-h3 { font-size: 15px; font-weight: 700; margin: 26px 0 12px; }
        .mm-outcome-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
        .mm-outcome-list li { display: flex; align-items: flex-start; gap: 8px; font-size: 13.5px; color: var(--ink); }
        .mm-outcome-list svg { color: var(--teal); margin-top: 2px; flex-shrink: 0; }
        .mm-emotion-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 13px; color: var(--ink-soft); }
        .mm-tag-row { display: flex; gap: 6px; margin-left: 6px; }
        .mm-tag { background: var(--lavender); color: var(--lavender-ink); font-size: 11.5px; font-weight: 600; padding: 4px 9px; border-radius: 7px; }
        .mm-detail-timeline { display: flex; flex-direction: column; gap: 0; }
        .mm-detail-timeline-step { display: flex; align-items: center; gap: 12px; padding: 8px 0; font-size: 13.5px; }
        .mm-detail-timeline-t { font-variant-numeric: tabular-nums; color: var(--ink-soft); width: 56px; font-size: 12px; }
        .mm-detail-timeline-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--indigo); flex-shrink: 0; }
        .mm-review-list { display: flex; flex-direction: column; gap: 14px; }
        .mm-review { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 14px; }
        .mm-review-head { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .mm-review-stars { margin-left: auto; color: #F59E0B; font-size: 12px; }
        .mm-review p { margin: 0; font-size: 13.5px; color: var(--ink-soft); }
        .mm-related-row { display: flex; gap: 12px; }
        .mm-related-card { flex: 1; }
        .mm-related-cover { height: 80px; border-radius: 10px; margin-bottom: 6px; }
        .mm-related-card span { font-size: 12.5px; font-weight: 600; display: block; }
        .mm-detail-side-meta { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; font-size: 12.5px; color: var(--ink-soft); }
        .mm-detail-side-meta div { display: flex; align-items: center; gap: 7px; }
        .mm-detail-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 22px; position: sticky; top: 90px; }

        /* ---------- privacy ---------- */
        .mm-privacy-list { display: flex; flex-direction: column; gap: 12px; }
        .mm-privacy-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
        .mm-privacy-head { width: 100%; display: flex; align-items: center; gap: 14px; padding: 16px 18px; background: none; border: none; text-align: left; }
        .mm-privacy-head-cover { width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0; }
        .mm-privacy-head-text { flex: 1; }
        .mm-privacy-head-text h3 { font-size: 14px; margin: 0 0 2px; }
        .mm-privacy-head-text span { font-size: 12px; color: var(--ink-soft); }
        .mm-chev { color: var(--ink-soft); transition: transform .15s ease; }
        .mm-chev.is-open { transform: rotate(180deg); }
        .mm-privacy-body { padding: 4px 18px 20px; border-top: 1px solid var(--border); }
        .mm-privacy-row { padding: 16px 0; border-bottom: 1px solid #F1F5F9; }
        .mm-privacy-row--split { display: flex; align-items: center; justify-content: space-between; }
        .mm-privacy-label { font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
        .mm-privacy-row--split .mm-privacy-label { margin-bottom: 0; }
        .mm-chip-group { display: flex; gap: 8px; }
        .mm-chip { border: 1px solid var(--border); background: var(--white); border-radius: 8px; padding: 7px 14px; font-size: 12.5px; font-weight: 500; }
        .mm-chip.is-active { background: var(--navy); color: #fff; border-color: var(--navy); }
        .mm-check-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .mm-privacy-row select { border: 1px solid var(--border); border-radius: 8px; padding: 7px 10px; }
        .mm-activity-log { padding-top: 16px; }
        .mm-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .mm-table th { text-align: left; font-size: 11.5px; color: var(--ink-soft); font-weight: 600; padding: 6px 8px; border-bottom: 1px solid var(--border); }
        .mm-table td { font-size: 13px; padding: 9px 8px; border-bottom: 1px solid #F1F5F9; }

        .mm-toggle { width: 40px; height: 22px; border-radius: 20px; background: var(--border); border: none; position: relative; flex-shrink: 0; transition: background .15s ease; }
        .mm-toggle.is-on { background: var(--indigo); }
        .mm-toggle-knob { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: left .15s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
        .mm-toggle.is-on .mm-toggle-knob { left: 20px; }

        /* ---------- analytics ---------- */
        .mm-kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 22px; }
        .mm-kpi-card { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 18px; }
        .mm-kpi-card svg { color: var(--indigo); margin-bottom: 10px; }
        .mm-kpi-value { display: block; font-size: 24px; font-weight: 800; }
        .mm-kpi-label { font-size: 12px; color: var(--ink-soft); }
        .mm-analytics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .mm-chart-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 20px; }
        .mm-chart-card h3 { font-size: 14.5px; margin: 0 0 12px; font-weight: 700; }
        .mm-chart-card--geo { grid-column: span 2; }
        .mm-geo-list { display: flex; flex-direction: column; gap: 12px; }
        .mm-geo-row { display: flex; align-items: center; gap: 12px; }
        .mm-geo-country { width: 150px; font-size: 12.5px; display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .mm-geo-pct { font-size: 12.5px; font-weight: 600; width: 32px; text-align: right; }

        /* ---------- settings ---------- */
        .mm-settings-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 22px; max-width: 640px; }
        .mm-settings-row { display: flex; gap: 18px; align-items: flex-start; margin-bottom: 20px; }
        .mm-settings-fields { flex: 1; display: flex; flex-direction: column; gap: 12px; }
        .mm-field { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; font-weight: 600; color: var(--ink-soft); }
        .mm-field input, .mm-field select, .mm-field textarea { border: 1px solid var(--border); border-radius: 9px; padding: 9px 12px; font-weight: 400; color: var(--ink); }

        /* ---------- modal ---------- */
        .mm-modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.45); display: flex; align-items: center; justify-content: center; z-index: 50; }
        .mm-modal { background: var(--white); border-radius: 18px; width: 460px; max-width: 90vw; box-shadow: 0 24px 60px rgba(15,23,42,0.25); }
        .mm-modal-head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid var(--border); }
        .mm-modal-head h3 { font-size: 16px; margin: 0; }
        .mm-modal-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
        .mm-modal-foot { padding: 16px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .mm-modal-foot p { font-size: 11.5px; color: var(--ink-soft); margin: 0; }

        /* ---------- memory network (signature visual) ---------- */
        .mm-network-section { display: flex; align-items: center; gap: 36px; margin: 44px 0 8px; padding: 28px; background: linear-gradient(135deg, #0F172A, #1E1B4B 60%, #2E1065); border-radius: 22px; overflow: hidden; }
        .mm-network-copy { flex: 1; min-width: 220px; color: #fff; }
        .mm-network-copy h2 { font-size: 20px; font-weight: 700; margin: 0 0 10px; color: #fff; }
        .mm-network-copy p { font-size: 13.5px; color: #C7D2FE; margin: 0; line-height: 1.6; max-width: 340px; }
        .mm-network { flex: 1.1; min-width: 260px; display: flex; flex-direction: column; align-items: center; gap: 14px; }
        .mm-network-svg { width: 100%; max-width: 340px; aspect-ratio: 1 / 1; overflow: visible; }
        .mm-network-edge { stroke-width: 0.35; opacity: 0.35; transition: opacity .15s ease, stroke-width .15s ease; }
        .mm-network-edge.is-active { opacity: 0.9; stroke-width: 0.6; }
        .mm-network-node { cursor: pointer; }
        .mm-network-node-halo { animation: mm-node-pulse 3.2s ease-in-out infinite; transform-origin: center; }
        .mm-network-node:nth-child(odd) .mm-network-node-halo { animation-delay: 0.6s; }
        @keyframes mm-node-pulse { 0%, 100% { transform: scale(1); opacity: 0.16; } 50% { transform: scale(1.35); opacity: 0.05; } }
        @media (prefers-reduced-motion: reduce) { .mm-network-node-halo { animation: none; } }
        .mm-network-labels { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
        .mm-network-tag { --tag-color: #2563EB; display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); color: #E2E8F0; border-radius: 20px; padding: 5px 11px; font-size: 11.5px; font-weight: 500; }
        .mm-network-tag:hover, .mm-network-tag.is-active { border-color: var(--tag-color); color: #fff; background: rgba(255,255,255,0.12); }
        .mm-network-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

        /* ---------- community ---------- */
        .mm-community-strip { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .mm-community-chip { --chip-color: #2563EB; display: inline-flex; align-items: center; gap: 7px; background: var(--white); border: 1px solid var(--border); border-radius: 20px; padding: 8px 14px; font-size: 12.5px; font-weight: 600; color: var(--ink); }
        .mm-community-chip:hover { border-color: var(--chip-color); color: var(--chip-color); }
        .mm-community-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .mm-community-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; cursor: pointer; transition: box-shadow .15s ease, transform .15s ease; }
        .mm-community-card:hover { box-shadow: 0 12px 28px rgba(15,23,42,0.08); transform: translateY(-2px); }
        .mm-community-card-cover { height: 74px; display: flex; align-items: center; justify-content: center; }
        .mm-community-card-body { padding: 16px; }
        .mm-community-card-body h3 { font-size: 15px; margin: 0 0 6px; }
        .mm-community-card-body p { font-size: 12.5px; color: var(--ink-soft); line-height: 1.5; margin: 0 0 12px; min-height: 38px; }
        .mm-community-card-meta { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--ink-soft); margin-bottom: 14px; }
        .mm-community-card-actions { display: flex; gap: 8px; border-top: 1px solid var(--border); padding-top: 12px; }
        .mm-community-card-actions .mm-btn { flex: 1; justify-content: center; }

        .mm-community-header { display: flex; align-items: center; gap: 18px; border-radius: 18px; padding: 22px; margin-bottom: 20px; color: #fff; }
        .mm-community-header-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(255,255,255,0.14); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .mm-community-header-text { flex: 1; min-width: 0; }
        .mm-community-header-cat { font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #C7D2FE; }
        .mm-community-header-text h1 { color: #fff; font-size: 21px; margin: 4px 0 6px; }
        .mm-community-header-text p { font-size: 13px; color: #E2E8F0; margin: 0; max-width: 460px; }
        .mm-community-header .mm-btn--ghost { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.3); color: #fff; }
        .mm-community-header .mm-btn--ghost:hover { background: rgba(255,255,255,0.2); }

        .mm-tabs { display: flex; gap: 6px; border-bottom: 1px solid var(--border); margin-bottom: 20px; }
        .mm-tab { background: none; border: none; padding: 10px 6px; margin-right: 18px; font-size: 13.5px; font-weight: 600; color: var(--ink-soft); border-bottom: 2px solid transparent; display: flex; align-items: center; gap: 6px; }
        .mm-tab span { background: #F1F5F9; color: var(--ink-soft); border-radius: 20px; padding: 1px 8px; font-size: 11px; font-weight: 700; }
        .mm-tab.is-active { color: var(--indigo); border-bottom-color: var(--indigo); }
        .mm-tab.is-active span { background: var(--lavender); color: var(--lavender-ink); }

        .mm-join-prompt { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; background: var(--lavender); border: 1px solid #E0E7FF; border-radius: 14px; padding: 14px 18px; margin-bottom: 18px; }
        .mm-join-prompt p { margin: 0; font-size: 13.5px; color: var(--ink); }

        .mm-member-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .mm-member-card { display: flex; align-items: center; gap: 12px; background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 14px; }
        .mm-member-card strong { font-size: 13.5px; display: block; }
        .mm-member-card span { font-size: 11.5px; color: var(--ink-soft); }

        .mm-community-grid { display: grid; grid-template-columns: 1fr 300px; gap: 28px; align-items: flex-start; }
        .mm-composer { display: flex; gap: 12px; background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 16px; margin-bottom: 18px; }
        .mm-composer-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
        .mm-composer textarea { width: 100%; border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; resize: vertical; min-height: 44px; color: var(--ink); }
        .mm-composer-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
        .mm-composer-hint { font-size: 11.5px; color: var(--ink-soft); }
        .mm-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; }
        .mm-post-list { display: flex; flex-direction: column; gap: 14px; }
        .mm-post { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 16px; }
        .mm-post-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .mm-post-head-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .mm-post-head-text strong { font-size: 13.5px; }
        .mm-post-head-text span { font-size: 11.5px; color: var(--ink-soft); display: flex; align-items: center; gap: 4px; }
        .mm-post-text { font-size: 13.5px; color: var(--ink); line-height: 1.6; margin: 0 0 12px; }
        .mm-post-actions { display: flex; gap: 18px; flex-wrap: wrap; border-top: 1px solid var(--border); padding-top: 10px; }
        .mm-post-action { display: flex; align-items: center; gap: 6px; background: none; border: none; color: var(--ink-soft); font-size: 12.5px; font-weight: 600; padding: 6px 4px; min-height: 32px; }
        .mm-post-action:hover { color: var(--indigo); }
        .mm-post-action.is-liked { color: #E11D48; }
        .mm-icon-btn--sm { width: 30px; height: 30px; border-radius: 8px; }
        .mm-comments { margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--border); display: flex; flex-direction: column; gap: 10px; }
        .mm-comment { display: flex; gap: 9px; }
        .mm-comment strong { font-size: 12.5px; display: block; }
        .mm-comment p { font-size: 12.5px; color: var(--ink-soft); margin: 2px 0 0; }
        .mm-comment-input { display: flex; gap: 8px; align-items: center; }
        .mm-comment-input input { flex: 1; border: 1px solid var(--border); border-radius: 10px; padding: 8px 12px; min-height: 36px; color: var(--ink); }
        .mm-community-side { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 90px; }
        .mm-side-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 18px; }
        .mm-side-card h3 { font-size: 14.5px; margin: 0 0 4px; }
        .mm-side-sub { font-size: 12px; color: var(--ink-soft); margin: 0 0 14px; }
        .mm-side-card .mm-network-section { background: none; padding: 0; margin: 0; flex-direction: column; }
        .mm-side-card .mm-network-copy { display: none; }
        .mm-side-card .mm-network { background: var(--navy); border-radius: 16px; padding: 18px; }
        .mm-circle-list { display: flex; flex-direction: column; gap: 12px; }
        .mm-circle-row { display: flex; align-items: center; gap: 10px; }
        .mm-circle-icon { width: 30px; height: 30px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .mm-circle-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .mm-circle-text strong { font-size: 12.5px; line-height: 1.3; }
        .mm-circle-text span { font-size: 11px; color: var(--ink-soft); }

        /* ---------- mobile nav ---------- */
        .mm-mobile-nav-toggle { display: none; }
        .mm-mobile-nav-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.5); z-index: 60; display: flex; }
        .mm-mobile-nav-drawer { width: 260px; max-width: 82vw; height: 100%; background: var(--navy); color: #E2E8F0; padding: 18px 14px; display: flex; flex-direction: column; gap: 4px; animation: mm-slide-in .18s ease; }
        .mm-mobile-nav-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .mm-mobile-nav-head .mm-brand { padding: 0; }
        .mm-mobile-nav-head .mm-icon-btn { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); color: #fff; }
        .mm-mobile-nav-drawer nav { display: flex; flex-direction: column; gap: 3px; }
        @keyframes mm-slide-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) { .mm-mobile-nav-drawer { animation: none; } }

        /* ---------- responsive buttons & touch targets ---------- */
        .mm-btn, .mm-icon-btn, .mm-chip, .mm-check-pill, .mm-trend-pill, .mm-toggle, .mm-nav-item, .mm-network-tag { min-height: 40px; }
        .mm-btn--sm { min-height: 34px; }
        .mm-toggle { min-height: 22px; }
        .mm-save-btn { min-height: 30px; }
        .mm-hero-actions, .mm-topbar-actions, .mm-filter-bar, .mm-check-row, .mm-chip-group, .mm-timeline-actions { flex-wrap: wrap; }

        @media (max-width: 1100px) {
          .mm-grid { grid-template-columns: repeat(2, 1fr); }
          .mm-detail-grid { grid-template-columns: 1fr; }
          .mm-analytics-grid { grid-template-columns: 1fr; }
          .mm-chart-card--geo { grid-column: span 1; }
          .mm-community-grid { grid-template-columns: 1fr; }
          .mm-community-side { position: static; }
          .mm-community-cards { grid-template-columns: repeat(2, 1fr); }
          .mm-hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .mm-hero-visual { order: -1; padding-top: 30px; }
          .mm-fragment { display: none; }
        }
        @media (max-width: 760px) {
          .mm-sidebar { display: none; }
          .mm-mobile-nav-toggle { display: flex; }
          .mm-grid, .mm-kpi-row, .mm-pillars { grid-template-columns: 1fr 1fr; }
          .mm-page { padding: 20px 16px 60px; }
          .mm-topbar { padding: 12px 16px; gap: 10px; }
          .mm-btn-label { display: none; }
          .mm-btn--upload { padding: 9px 12px; }
          .mm-hero-line--soft { font-size: 24px; }
          .mm-hero-line--bold { font-size: 32px; }
          .mm-hero-actions { flex-direction: column; align-items: flex-start; gap: 14px; }
          .mm-hero-actions .mm-btn { width: 100%; justify-content: center; }
          .mm-hero-stats { gap: 20px; }
          .mm-network-section { flex-direction: column; padding: 22px; }
          .mm-network-copy p { max-width: none; }
          .mm-timeline-row { flex-wrap: wrap; }
          .mm-timeline-actions { flex-direction: row; }
          .mm-detail-cover-overlay { flex-wrap: wrap; }
          .mm-community-cards { grid-template-columns: 1fr; }
          .mm-community-header { flex-wrap: wrap; }
          .mm-member-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .mm-grid, .mm-kpi-row, .mm-pillars { grid-template-columns: 1fr; }
          .mm-search { max-width: none; }
          .mm-related-row { flex-direction: column; }
          .mm-composer { flex-direction: column; }
        }
      `}</style>

      <Sidebar active={active} go={go} />
      <div className="mm-main">
        <Topbar query={query} setQuery={setQuery} onUpload={() => setShowUpload(true)} onMenuClick={() => setMobileNavOpen(true)} />
        {content}
      </div>
      {showUpload && <UploadPanel onClose={() => setShowUpload(false)} />}
      {mobileNavOpen && <MobileNavOverlay active={active} go={go} onClose={() => setMobileNavOpen(false)} />}
    </div>
  );
}
