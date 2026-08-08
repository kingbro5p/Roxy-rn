# Roxy — AI Chat Companion

Roxy একটি Next.js দিয়ে বানানো AI চ্যাট ওয়েবসাইট, যা Google-এর **Gemini API** (`gemini-2.5-flash`) ব্যবহার করে উত্তর দেয়। ডিজাইন সম্পূর্ণ নিজস্ব (aurora/orb থিম) — কোনো Google ব্র্যান্ডিং বা লোগো কপি করা হয়নি।

## ⚠️ জরুরি নিরাপত্তা নোটিশ

আপনি যে Gemini API key-টি চ্যাটে পাঠিয়েছেন, সেটি ইতিমধ্যে এই কথোপকথনে লেখা হয়ে গেছে। **নিরাপত্তার জন্য শক্তভাবে পরামর্শ:**

1. [Google AI Studio](https://aistudio.google.com/app/apikey)-তে গিয়ে এই key-টি **revoke/delete** করে নতুন একটি key জেনারেট করুন।
2. নতুন key-টি নিচের ধাপ অনুযায়ী `.env.local` (লোকাল) এবং Vercel-এর Environment Variables (প্রোডাকশন)-এ বসান।
3. **কখনোই** `.env.local` ফাইলটি GitHub-এ commit করবেন না — এই প্রজেক্টের `.gitignore` ইতিমধ্যে সেটি বাদ রাখে, কিন্তু সাবধান থাকুন।

এই key ক্লায়েন্ট-সাইড কোডে (browser-এ) কখনো পাঠানো হয় না — এটি শুধু সার্ভার-সাইড API route (`/api/chat`)-এ ব্যবহৃত হয়, যাতে key ব্রাউজারে উন্মুক্ত না হয়।

## লোকালি রান করা

```bash
npm install
npm run dev
```

তারপর ব্রাউজারে যান: http://localhost:3000

`.env.local` ফাইলে আপনার key আগে থেকেই বসানো আছে (উপরের নিরাপত্তা নোটিশ অনুযায়ী নতুন key দিয়ে replace করুন)।

## GitHub-এ পুশ করা

```bash
git init
git add .
git commit -m "Initial commit: Roxy AI chat app"
git branch -M main
git remote add origin https://github.com/<আপনার-ইউজারনেম>/roxy.git
git push -u origin main
```

`.env.local` স্বয়ংক্রিয়ভাবে বাদ যাবে (`.gitignore`-এ আছে), তাই আপনার real API key GitHub-এ যাবে না।

## Vercel-এ ডিপ্লয় করা

1. [vercel.com](https://vercel.com)-এ গিয়ে **New Project** → আপনার `roxy` GitHub repo import করুন।
2. Framework preset স্বয়ংক্রিয়ভাবে **Next.js** ধরবে — কিছু পরিবর্তন করার দরকার নেই।
3. Deploy করার আগে **Environment Variables** সেকশনে গিয়ে যোগ করুন:
   - `GEMINI_API_KEY` → আপনার (নতুন/রোটেট করা) Gemini key
   - `GEMINI_MODEL` → `gemini-2.5-flash`
4. **Deploy** চাপুন। কয়েক মিনিটের মধ্যে আপনার লাইভ URL পাবেন।

কোনো env variable পরে পরিবর্তন করলে Vercel dashboard-এর **Settings → Environment Variables**-এ গিয়ে আপডেট করে **Redeploy** করতে হবে।

## প্রজেক্ট স্ট্রাকচার

```
app/
  api/chat/route.js   → Gemini API-এর সাথে সার্ভার-সাইড কল (key এখানে গোপন থাকে)
  page.js             → মূল চ্যাট UI
  layout.js           → ফন্ট ও গ্লোবাল সেটআপ
  globals.css         → Tailwind + কাস্টম স্টাইল
components/
  RoxyOrb.js          → Roxy-র সিগনেচার অ্যানিমেটেড অরব
  ChatMessage.js       → চ্যাট বাবল কম্পোনেন্ট
```

## মডেল পরিবর্তন

ভবিষ্যতে অন্য কোনো Gemini মডেল ব্যবহার করতে চাইলে শুধু `GEMINI_MODEL` env variable পরিবর্তন করুন — কোড পরিবর্তনের দরকার নেই।
