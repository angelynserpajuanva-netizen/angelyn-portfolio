/* =====================================================================
   PORTFOLIO CONTENT — edit this file to update the site.
   Everything visible on the page comes from here. No design changes needed.
   ===================================================================== */

window.PORTFOLIO = {

  /* ---------- Site settings ---------- */
  settings: {
    // While true, empty video slots and missing case-study fields show a
    // dashed "to add" label so you can see what still needs content.
    // Set to false before you share the site publicly.
    draftMode: false,
    // Show your WhatsApp / Telegram number in the contact section?
    showPhone: true
  },

  /* ---------- Identity (from resume) ---------- */
  person: {
    name: "Angelyn Serpa Juan",
    shortName: "Angelyn",
    title: "AI Video Creator & Graphic Designer",
    location: "Nueva Ecija, Philippines",
    availability: "Part-time · Flexible across EST/PST, GMT and AEST",
    headline: ["AI-Powered Visuals.", "Built to Make Brands Stand Out."],
    intro: "I create cinematic AI videos, product commercials, and scroll-stopping ad creatives using AI-powered production workflows."
  },

  /* ---------- New site copy: written to a client, as one story ----------
     Every line is about what the client gets. Edit freely. */
  hero: {
    kicker: "AI video ads for brands that need attention",
    // big headline: lead line, then "I make the one they ___" with the last words rolling
    lead: "Your customers scroll past ads all day.",
    rollLead: "I make the one they",
    words: ["stop for.", "remember.", "click.", "buy from."],
    intro: "I'm Angelyn, an AI video creator. I build every short-form ad around one job: grab your customer in the first 3 seconds, hold them all the way to your product, and give them a reason to act.",
    proof: ["Skincare · Supplements · Fashion · Cars · Pets", "English · Danish · Taglish", "Client work for NineOne Car Rental"]
  },

  /* Chapter 2: one real ad broken down beat by beat (frames are beat-01.webp ... beat-08.webp) */
  anatomy: {
    project: "nineone-snow-winter",
    beats: [
      { t: "0:00", name: "The hook", img: "beat-01.webp",
        text: "A breaking-news alert: it snowed in Laguna?! On a hot Filipino street, that can't be true, so the viewer stops to find out.",
        why: "Pattern interrupt" },
      { t: "0:08", name: "The twist", img: "beat-02.webp",
        text: "The reporter reveals that Snow and Winter are in Biñan: the two new rental cars, named after their plates. The product arrives as the punchline, not as an ad.",
        why: "Product as the payoff" },
      { t: "0:17", name: "The doubt", img: "beat-03.webp",
        text: "A lolo asks what every customer is thinking: “Aabot ba ’yan hanggang Baguio?” (Can that make it all the way to Baguio?)",
        why: "Say the objection out loud" },
      { t: "0:20", name: "The answer", img: "beat-04.webp",
        text: "An animated route map counts the kilometers and lands on Unlimited Mileage. The objection is answered on screen, not in small print.",
        why: "Show, don't claim" },
      { t: "0:24", name: "The offer", img: "beat-05.webp",
        text: "Rate cards for each destination, from within Laguna to La Union, Baguio and Bicol, so every viewer finds their own price.",
        why: "Make it personal" },
      { t: "0:44", name: "The best deal", img: "beat-06.webp",
        text: "25 days or more: the lowest daily rate, plus free delivery, 24/7 chat and no hidden charges.",
        why: "Anchor the value" },
      { t: "0:53", name: "The urgency", img: "beat-07.webp",
        text: "“Limited units ngayong Pasko! Book na!” (Limited units this Christmas, book now!)",
        why: "A reason to act today" },
      { t: "0:55", name: "The call to action", img: "beat-08.webp",
        text: "One clear end card: the number, the Facebook page, the services and where to find them.",
        why: "Make the next step easy" }
    ]
  },

  skills: [
    { name: "AI Video Ads", tag: "Product & DTC",
      text: "A product ad that opens on a hook, shows the problem, reveals your product and ends on a clear call to action.",
      projects: ["bag-ugc", "sunster-grey-to-golden", "dtc-supplement-vsl", "clay-cartoon"] },
    { name: "AI Avatars & UGC", tag: "Talking heads",
      text: "A realistic presenter who talks to your customer the way a creator would, in English, Danish or Taglish.",
      projects: ["facelove-photo-quiz", "centrum-advance", "ugc-skincare", "viva-blend"] },
    { name: "Motion Graphics", tag: "AI + motion",
      text: "Prices, maps, offers and features animated on screen, so the details land without slowing the story down.",
      projects: ["nineone-snow-winter"] },
    { name: "AI Animation", tag: "Characters",
      text: "A mascot or character people remember, who explains your product, from clay-style to 3D cartoon.",
      projects: ["sunster-mascot", "creatine-explainer", "cozy-clouds", "talking-babies"] },
    { name: "Scripts & Storyboards", tag: "Pre-production",
      text: "Already have a team? I write the hook, the script and a scene-by-scene storyboard, plus AI voiceovers matched to your audience.",
      projects: [], cta: "#storyboard" },
    { name: "Graphic Design", tag: "Brand visuals",
      text: "Posters and social graphics in your brand colors and type, to run next to your video ads.",
      projects: [] }
  ],

  /* Chapter 5: how working together goes, from the client's side */
  clientProcess: [
    { step: "You tell me about the product", text: "Your brand, your customer and your offer. Send your website, references, or just a few lines." },
    { step: "I find the hook", text: "The angle and the first 3 seconds, with hook options for you to choose from." },
    { step: "You approve the storyboard", text: "The script and a scene-by-scene plan, before anything is generated." },
    { step: "I produce the ad", text: "AI scenes with your product and characters kept consistent, plus voiceover, music and captions." },
    { step: "You get the final cut", text: "Vertical video ready for TikTok, Reels, Shorts and Facebook." }
  ],

  aboutStory: [
    "An AI video creator and graphic designer from Nueva Ecija, Philippines. I don't start with a prompt. I start with your customer: what makes them stop, what they doubt, and what makes them buy.",
    "Then I plan every second: the hook, the script, and a storyboard you can approve. I generate the scenes, keep your product and characters consistent from shot to shot, and finish with voiceover, music and captions.",
    "Since 2021 I've also built user interfaces for enterprise brands at Accenture and Myridius. That's why the details in my ads hold up: clear hierarchy, consistent branding, and nothing left to chance."
  ],

  /* ---------- Sound (all optional, nothing plays until the visitor presses "Sound on") ----------
     music.src: an MP3 in the site folder, e.g. "soundtrack.mp3" (loops quietly).
     voiceLines: one short MP3 per line, played once when that chapter comes into view.
     Leave a src empty ("") to skip it. */
  music: { src: "", volume: 0.35 },
  sound: {
    label: "Sound on",
    tick: "tick.mp3",
    voiceLines: [
      { at: "#hooks", src: "", text: "You've got three seconds. Starting… now." },
      { at: "#anatomy", src: "", text: "Still scrolling? Good. That's the whole point." },
      { at: "#work", src: "", text: "These ads made people stop. Like you just did." },
      { at: "#storyboard", src: "", text: "Try me before you hire me. It's free." },
      { at: "#contact", src: "", text: "Okay, you made it to the end. Let's make your ad." }
    ]
  },

  /* ---------- Contact ---------- */
  contact: {
    "email": "serpajuanangelyn@gmail.com",
    "phone": "+63 908 820 0901",
    "messaging": [
      {
        "label": "WhatsApp",
        "url": "https://wa.me/639088200901"
      },
      {
        "label": "Telegram",
        "url": "https://t.me/+639088200901"
      }
    ],
    "links": [
      {
        "label": "All videos (Google Drive)",
        "url": "https://drive.google.com/drive/folders/1ljXCkA34nzPmHHNbV-sjaNnxFktHwgOc?usp=sharing"
      }
    ]
  },

  /* ---------- Showreel (hero) ----------
     A short muted montage that loops in the hero. */
  showreel: {
    src: "showreel.mp4",
    poster: "showreel.webp",
    label: "Showreel 2026"
  },

  /* ---------- Services (scrolling strip under the hero) ---------- */
  services: [
    "AI Video Ads",
    "Product Commercials",
    "UGC-Style Ads",
    "VSL Ads",
    "AI Video + Motion Graphics",
    "AI Animation",
    "AI Talking Heads",
    "AI Voiceovers",
    "Scripts & Storyboards",
    "Social Media Reels",
    "Explainer Videos",
    "Brand Graphics & Posters"
  ],

  /* ---------- Hook Wall ----------
     The big sideways-scrolling "You get 3 seconds" section under the hero.
     id = project to open when clicked, hook = the big line, sub = optional translation. */
  hookWall: [
    { id: "facelove-photo-quiz", hook: "One of these photos is me at 40. I'm 60 now." },
    { id: "dtc-supplement-vsl", hook: "Your brain at 11:47 PM." },
    { id: "nineone-snow-winter", hook: "Nag-snow sa Laguna?!", sub: "It snowed in Laguna?!" },
    { id: "clay-cartoon", hook: "I thought he was just getting old." },
    { id: "sunster-mascot", hook: "Når selvbruneren gør dig orange", sub: "When the self-tanner turns you orange" },
    { id: "creatine-explainer", hook: "Your muscles have a secret battery." },
    { id: "bag-ugc", hook: "Your outfit isn't the problem." },
    { id: "shiesty-zip-hoodie", hook: "POV: the anti-social hoodie" }
  ],

  /* ---------- Photo ---------- */
  photo: { src: "angelyn.webp", alt: "Portrait of Angelyn Serpa Juan" },

  /* ---------- Video projects ----------
     HOW TO ADD OR CHANGE A VIDEO
     video.type: "drive" (a Google Drive FILE link set to "Anyone with the link"),
                 "file" (an MP4 in /videos), "youtube" or "vimeo".
     thumbnail:  the cover image. Use a still that shows the hook text, saved in
                 /thumbs (e.g. "thumbs/ugc-skincare.jpg"). If left empty, Google
                 Drive's automatic thumbnail is used, which may not be the hook frame.
     aspect:     "9:16", "16:9", "1:1" or "4:5".
     featured:   true = shown in the hero (keep it to 3).
     shortTitle: optional shorter name used on the cover card.
     cardHook:   short hook line shown on the gallery card.
     duration:   video length shown on the card, e.g. "0:30".
     audience / objective were inferred from each file name and format. Correct them
     if they're wrong. Any field left "" is hidden on the site.
  ------------------------------------------------------------------- */
  projects: [
    {
      "id": "sunster-grey-to-golden",
      "title": "Sunster Self-Tanner: Grey to Golden (Danish)",
      "shortTitle": "Sunster: Grey to Golden",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": true,
      "video": {
        "type": "file",
        "src": "sunster-grey-to-golden.mp4"
      },
      "thumbnail": "sunster-grey-to-golden.webp",
      "summary": "A Danish-language DTC ad for Sunster self-tanner that follows one night from winter-pale to golden: the 22:00 routine, the glow developing overnight, the 07:00 reveal, and a friend asking if she's been on vacation.",
      "audience": "Danish women who feel pale during the long, sunless winter",
      "objective": "Show the full routine and believable results, then drive purchases of the self-tanning set.",
      "concept": "A time-stamped night-to-morning story (22:00 to 07:00 to Day 5) that makes the result feel real and the routine feel easy.",
      "hook": "“Vinterbleg?” (Winter pale?) “Ingen sol før april… og jeg ligner et spøgelse.” (No sun until April… and I look like a ghost.)",
      "production": "Live-action AI scenes with on-screen clock timestamps, a step-by-step routine (drops in day cream for the face, mousse and mitt for the body, 10 minutes), a skin close-up showing the glow developing over 6–8 hours, and a before-and-after mirror shot.",
      "tools": [],
      "editing": "Danish captions with highlighted keywords, step cards and a progress bar, a before/after split, and social proof on Day 5 (“Har du været på ferie?” – Have you been on vacation?). End card: “Danmarks bedste selvbruner”, Danish Beauty Award 2025 nominee, “Køb sættet nu” (Buy the set now), 45-day risk-free trial.",
      "deliverables": "30-second vertical (9:16) ad in Danish for TikTok, Reels and Shorts.",
      "cardHook": "Vinterbleg? (Winter pale?)",
      "duration": "0:30",
      "preview": "sunster-grey-to-golden-p.mp4"
    },
    {
      "id": "sunster-mascot",
      "title": "Sunster Self-Tanner: Mousse Mascot (Danish)",
      "shortTitle": "Sunster: Mousse Mascot",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "sunster-mascot.mp4"
      },
      "thumbnail": "sunster-mascot.webp",
      "summary": "A Danish-language DTC ad starring an animated mousse mascot who calls out common self-tanner problems, then introduces Sunster Mousse as the fix, backed by ratings and a risk-free trial.",
      "audience": "Danish women frustrated by streaky, orange self-tan results",
      "objective": "Turn common self-tanner frustrations into a reason to try Sunster, and drive trial sign-ups.",
      "concept": "Problem-solution DTC ad with a lovable product mascot as the narrator, so the pain points feel playful instead of preachy.",
      "hook": "“Når selvbruneren gør dig orange” (When the self-tanner turns you orange). The mascot gasps: “Åh nej… ikke igen.” (Oh no… not again.)",
      "production": "A 3D animated foam mascot combined with realistic product and skin shots: pain points (streaks, orange hands, the smell), the product reveal, application with a tanning mitt, and a before-and-after leg comparison.",
      "tools": [],
      "editing": "Danish captions and animated checklist cards (✗ streaks, ✗ orange hands, ✗ the smell, then ✓ natural glow, ✓ no streaks, ✓ no orange), sparkle effects, and a star-rating social proof scene (4.6 stars, 1,100+ reviews, loved by 50,000+ Danish women). CTA: “Prøv risikofrit i 45 dage” (Try it risk-free for 45 days), sunster.dk.",
      "deliverables": "32-second vertical (9:16) ad in Danish for TikTok, Reels and Shorts.",
      "cardHook": "Når selvbruneren gør dig orange (When the self-tanner turns you orange)",
      "duration": "0:32",
      "preview": "sunster-mascot-p.mp4"
    },
    {
      "id": "bag-ugc",
      "title": "CARRIE Handbag Commercial",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": true,
      "video": {
        "type": "file",
        "src": "bag-ugc.mp4"
      },
      "thumbnail": "bag-ugc.webp",
      "summary": "A premium-looking AI commercial for a real fashion handbag, with consistent product appearance, deliberate pacing, captions and sound design.",
      "audience": "Fashion and e-commerce shoppers",
      "objective": "Turn a real fashion product into a premium commercial an e-commerce brand could run.",
      "concept": "",
      "hook": "Your outfit isn’t the problem… but something’s missing.",
      "production": "AI video generation, with Claude used to refine prompts and creative and editing direction.",
      "tools": [
        "AI video generation",
        "Claude",
        "CapCut",
        "Gemini (music)"
      ],
      "editing": "Final assembly, captions and sound design in CapCut. Background music generated with Gemini.",
      "deliverables": "",
      "shortTitle": "CARRIE Handbag",
      "marquee": "Your outfit isn’t the problem",
      "cardHook": "Your outfit isn’t the problem… but something’s missing.",
      "duration": "0:26",
      "preview": "bag-ugc-p.mp4"
    },
    {
      "id": "facelove-photo-quiz",
      "title": "Facelove: Photo Quiz (AI Avatar Ad)",
      "shortTitle": "Facelove: Photo Quiz",
      "category": "UGC-Style Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "facelove-photo-quiz.mp4"
      },
      "thumbnail": "facelove-photo-quiz.webp",
      "preview": "facelove-photo-quiz-p.mp4",
      "summary": "A 30-second sample ad for Facelove led by a realistic AI avatar: a 60-year-old woman shows two photos of herself, one at 40 and one from last week, asks viewers to guess which is which, then tells the story of how her skin looked 12 weeks ago.",
      "audience": "Women 50 and over who are worried about wrinkles, fine lines and dark spots",
      "objective": "Stop the scroll with an interactive guessing game, drive comments, and keep viewers watching until the reveal.",
      "concept": "An engagement-bait photo quiz. A countdown over a side-by-side of two photos, then the presenter talks straight to camera: “I look BETTER right now than I did at 40. But 12 weeks ago, I didn’t.”",
      "hook": "“One of these photos is me at 40. The other was taken last week. I’m 60 now. Can you guess which is which?” over a 5-4-3-2-1 countdown",
      "production": "One consistent AI avatar across every scene: the photo comparison, a selfie-style talking head, a sit-down confession on the sofa, and moody flashback shots (the bathroom mirror, close-ups of forehead wrinkles, mouth lines and sun spots, and a low moment after her divorce).",
      "tools": [],
      "editing": "Word-by-word captions with key words in caps (BEFORE, BETTER), a countdown number overlay, and a shift from warm, bright present-day scenes to a cold, desaturated grade for the “12 weeks ago” story.",
      "deliverables": "30-second vertical (9:16) sample ad for TikTok, Reels and Shorts.",
      "cardHook": "One of these photos is me at 40. I’m 60 now.",
      "duration": "0:29"
    },
    {
      "id": "clay-cartoon",
      "title": "Clay-Style Pet Supplement VSL",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": true,
      "video": {
        "type": "file",
        "src": "clay-cartoon.mp4"
      },
      "thumbnail": "clay-cartoon.webp",
      "summary": "A clay-style, story-driven ad for a pet supplement, built on a full direct-response structure.",
      "audience": "Dog owners who care about their pet's well-being",
      "objective": "Show an end-to-end video ad workflow, from hook to CTA.",
      "concept": "Hook, problem, emotional story, product solution, benefits, call to action.",
      "hook": "“I thought he was just getting old.” An emotional pet-owner problem that makes viewers care before the product appears.",
      "production": "AI image and video generation with reference images for character consistency. ChatGPT for concept and scripting support.",
      "tools": [
        "AI image & video generation",
        "ChatGPT",
        "CapCut"
      ],
      "editing": "Voiceover, music, sound effects, captions and transitions in CapCut.",
      "deliverables": "Clay-style ad sample made with the employer's product and submitted.",
      "shortTitle": "Pet Supplement VSL",
      "caseStudy": {
        "videos": [
          "clay-cartoon"
        ],
        "brief": "Create a narrative-driven pet supplement ad in a clay style, using the employer's actual product.",
        "audience": "Dog owners who care about their pet's well-being.",
        "storyboard": "Open on an emotional pet-owner problem, then move through the story to the product as the solution, its benefits, and a clear call to action.",
        "visualDirection": "Clay-style characters and scenes made with AI image and video generation. ChatGPT supported the concept and script.",
        "consistency": "Reference images kept the characters consistent from scene to scene.",
        "finalDeliverable": "Edited in CapCut with voiceover, music, sound effects, captions and transitions, then submitted as a sample."
      },
      "marquee": "I thought he was just getting old",
      "cardHook": "I thought he was just getting old.",
      "duration": "0:59",
      "preview": "clay-cartoon-p.mp4"
    },
    {
      "id": "cozy-clouds",
      "title": "Cozy Cloud: A Little Cup of Comfort",
      "category": "AI Animation & Characters",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "cozy-clouds.mp4"
      },
      "thumbnail": "cozy-clouds.webp",
      "summary": "Pip, a grumpy little cloud, makes storms over everyday annoyances until a cup of hot chocolate calms him down.",
      "audience": "",
      "objective": "Show original concept development, character-led storytelling, scene continuity and emotional pacing.",
      "concept": "",
      "hook": "Bad mood. Bad weather.",
      "production": "Scenes generated in Google Flow with AI-generated music.",
      "tools": [
        "Google Flow",
        "AI music generation",
        "CapCut"
      ],
      "editing": "Story assembled and edited in CapCut.",
      "deliverables": "",
      "shortTitle": "Cozy Cloud",
      "marquee": "Bad mood. Bad weather.",
      "cardHook": "Bad mood. Bad weather.",
      "duration": "1:00",
      "preview": "cozy-clouds-p.mp4"
    },
    {
      "id": "uhp-sample",
      "title": "UHP Wellness AI Video Sample",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "uhp-sample.mp4"
      },
      "thumbnail": "uhp-sample.webp",
      "summary": "A wellness commercial sample produced against a potential client's brief and submitted.",
      "audience": "Busy professionals and business owners",
      "objective": "Follow a client brief, develop a commercial visual direction, and deliver a sample.",
      "concept": "",
      "hook": "Your business has a system. What about your health?",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "Submitted video sample for a potential client.",
      "shortTitle": "UHP Wellness",
      "cardHook": "Your business has a system. What about your health?",
      "duration": "0:32",
      "preview": "uhp-sample-p.mp4"
    },
    {
      "id": "creatine-explainer",
      "title": "Creatine Animation: Your Muscles Have a Secret Battery",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "creatine-explainer.mp4"
      },
      "thumbnail": "creatine-explainer.webp",
      "summary": "An educational animation where expressive muscle characters, an exhausted ATP worker and creatine as the backup energy helper explain how creatine works.",
      "audience": "Fitness and supplement buyers",
      "objective": "Make a supplement topic entertaining and easy to follow with memorable characters.",
      "concept": "",
      "hook": "Your muscles have a secret battery.",
      "production": "AI-generated clips and reference images, with Claude used to refine prompts.",
      "tools": [
        "AI video generation",
        "Claude",
        "CapCut"
      ],
      "editing": "Captions, sound design and final edit in CapCut.",
      "deliverables": "",
      "shortTitle": "Creatine Animation",
      "marquee": "Your muscles have a secret battery",
      "cardHook": "Your muscles have a secret battery.",
      "duration": "0:42",
      "preview": "creatine-explainer-p.mp4"
    },
    {
      "id": "shiesty-zip-hoodie",
      "title": "Shiesty Zip: The Anti-Social Hoodie (UGC POV Ad)",
      "shortTitle": "Shiesty Zip Hoodie",
      "category": "UGC-Style Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "shiesty-zip-hoodie.mp4"
      },
      "thumbnail": "shiesty-zip-hoodie.webp",
      "preview": "shiesty-zip-hoodie-p.mp4",
      "summary": "A 9-second TikTok-style POV sample ad for the Shiesty Zip hoodie, a full-zip hoodie that zips all the way up over the face.",
      "audience": "Young streetwear buyers on TikTok and Instagram",
      "objective": "Show the product’s one standout feature in a few seconds and push viewers to the link in bio.",
      "concept": "A native POV trend format: one model on a foggy, neon-lit city street at night zips the hoodie up over his face, then pulls the hood on.",
      "hook": "“POV: the anti-social hoodie”",
      "production": "A single realistic AI-generated shot with a moody night-street setting (wet pavement, street lights, red neon) and one clear product demo: the zip going all the way up.",
      "tools": [],
      "editing": "Native TikTok-style caption, a switch to “link in bio ❄️” for the call to action, and music timed to the zip-up.",
      "deliverables": "9-second vertical (9:16) sample ad for TikTok and Reels.",
      "cardHook": "POV: the anti-social hoodie",
      "duration": "0:09"
    },
    {
      "id": "nineone-snow-winter",
      "title": "NineOne Car Rental: Snow & Winter (AI Video + Motion Graphics)",
      "shortTitle": "NineOne: Snow & Winter",
      "category": "Client Work",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "nineone-snow-winter.mp4"
      },
      "thumbnail": "nineone-snow-winter.webp",
      "summary": "An AI video with full motion graphics for NineOne Car Rental Services, styled as a Taglish breaking-news report: snow falls in Biñan, Laguna, and the “Snow” and “Winter” turn out to be the two rental cars. It launches the new units and their Christmas rates.",
      "audience": "Families and travelers in Laguna and Luzon planning holiday road trips",
      "objective": "Introduce two rental units, the Xpander GLS 2026 (plate “SNOW”, 7–8 seats) and the Kia Sonet LX AT (plate “WINTER”, 5–6 seats), show rates by destination, and drive bookings before Christmas.",
      "concept": "A fake live news broadcast. A tita and a kid react to snow on a hot Laguna street, a field reporter goes live, and the reveal lands: “Snow at Winter, nasa Biñan na!” (Snow and Winter are now in Biñan!). The pun is on the cars’ plate names.",
      "hook": "BREAKING: “Nag-snow sa Laguna?!” (It snowed in Laguna?!), followed by the sticker “Teka… snow?!” (Wait… snow?!)",
      "production": "AI-generated scenes: a sunny Filipino street turning snowy, a field reporter in a red jacket, a lolo interview (“Aabot ba ’yan hanggang Baguio?”, Can that make it to Baguio?), and both cars driving through Laguna, beach, rice-field, mountain and pine-road locations.",
      "tools": [
        "Claude (motion graphics)"
      ],
      "editing": "Motion graphics carry the whole ad: a news-broadcast package (BREAKING and LIVE lower thirds, a scrolling ticker, a REC timecode), pop-in stickers, car callout labels, an animated Luzon route map with a kilometer counter and an “Unlimited Mileage” stamp, a destination progress bar (Laguna → Nearby → North → Tarlac+ → Baguio+), animated rate cards for each region, a “25 days or more” best-deal burst (₱1,950/day Xpander, ₱1,650/day Kia Sonet), falling snow particles, glitch transitions, and a branded end card with the booking number and mascot.",
      "deliverables": "60-second vertical (9:16) Taglish ad for Facebook, TikTok and Reels. CTA: “Limited units ngayong Pasko! Book na!” (Limited units this Christmas, book now!)",
      "cardHook": "Nag-snow sa Laguna?! (It snowed in Laguna?!)",
      "duration": "1:00",
      "preview": "nineone-snow-winter-p.mp4"
    },
    {
      "id": "nineone",
      "title": "NineOne Car Rental: Christmas Homecoming",
      "category": "Client Work",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "nineone.mp4"
      },
      "thumbnail": "nineone.webp",
      "summary": "A Christmas campaign for NineOne Car Rental Services about making the trip home for the holidays.",
      "audience": "Families traveling home for the holidays",
      "objective": "Promote the fleet and rental availability.",
      "concept": "",
      "hook": "This Christmas, make your way home.",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "caseStudy": {
        "videos": [
          "nineone-snow-winter",
          "nineone",
          "nineone-ofw"
        ],
        "brief": "Keep a car rental business visible on social media with vehicle ads, rental offers, availability updates and seasonal promotions.",
        "audience": "Families heading home for Christmas, plus a Taglish version for Overseas Filipino Workers (OFWs) landing in the Philippines, and travelers across Luzon for the Snow & Winter fleet launch.",
        "storyboard": "",
        "visualDirection": "",
        "consistency": "",
        "finalDeliverable": ""
      },
      "shortTitle": "NineOne Christmas",
      "marquee": "This Christmas, make your way home",
      "cardHook": "This Christmas, make your way home.",
      "duration": "0:53",
      "preview": "nineone-p.mp4"
    },
    {
      "id": "nineone-ofw",
      "shortTitle": "NineOne OFW",
      "title": "NineOne Car Rental: OFW Airport Pickup",
      "category": "Client Work",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "nineone-ofw.mp4"
      },
      "thumbnail": "nineone-ofw.webp",
      "summary": "A Taglish airport-homecoming ad for OFWs arriving in the Philippines who need a ride home.",
      "audience": "Overseas Filipino Workers (OFWs) and their families",
      "objective": "",
      "concept": "",
      "hook": "Ready na umuwi sa Pinas? May ride ka na ba? (Ready to come home? Got a ride yet?)",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "marquee": "Ready na umuwi sa Pinas?",
      "cardHook": "Ready na umuwi sa Pinas? May ride ka na ba?",
      "duration": "0:28",
      "preview": "nineone-ofw-p.mp4"
    },
    {
      "id": "dtc-supplement-vsl",
      "shortTitle": "Brain at 11:47 PM",
      "title": "Your Brain at 11:47 PM",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "dtc-supplement-vsl.mp4"
      },
      "thumbnail": "dtc-supplement-vsl.webp",
      "summary": "A VSL-inspired direct-to-consumer supplement ad that opens on a relatable late-night overthinking moment, told through a cartoon brain character.",
      "audience": "People who struggle to switch off at night",
      "objective": "Walk viewers from problem to product to purchase with a story-driven pitch.",
      "concept": "",
      "hook": "Your brain at 11:47 PM. Remember that embarrassing thing?",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "marquee": "Your brain at 11:47 PM",
      "cardHook": "Your brain at 11:47 PM. Remember that embarrassing thing?",
      "duration": "0:36",
      "preview": "dtc-supplement-vsl-p.mp4"
    },
    {
      "id": "dtc-ad",
      "title": "Christmas T-Shirt Ad",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "dtc-ad.mp4"
      },
      "thumbnail": "dtc-ad.webp",
      "summary": "A holiday apparel ad for a “Merry & Bright” Christmas T-shirt, set in a cozy tree-decorating scene.",
      "audience": "Holiday shoppers looking for festive apparel",
      "objective": "Drive seasonal T-shirt sales.",
      "concept": "",
      "hook": "Your Christmas outfit just got better.",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "shortTitle": "Christmas Tee Ad",
      "cardHook": "Your Christmas outfit just got better.",
      "duration": "0:29",
      "preview": "dtc-ad-p.mp4"
    },
    {
      "id": "wedding-multilanguage",
      "shortTitle": "Destination Wedding",
      "title": "Destination Wedding Ad (Multilingual)",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "wedding-multilanguage.mp4"
      },
      "thumbnail": "wedding-multilanguage.webp",
      "summary": "A Santorini destination wedding ad produced in multiple languages.",
      "audience": "Couples planning a destination wedding",
      "objective": "",
      "concept": "",
      "hook": "Some love stories deserve the world.",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "marquee": "Some love stories deserve the world",
      "cardHook": "Some love stories deserve the world.",
      "duration": "0:29",
      "preview": "wedding-multilanguage-p.mp4"
    },
    {
      "id": "ugc-skincare",
      "title": "Skincare UGC Ad",
      "category": "UGC-Style Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "ugc-skincare.mp4"
      },
      "thumbnail": "ugc-skincare.webp",
      "summary": "A creator-style skincare ad made with AI, in the casual first-person UGC format.",
      "audience": "Skincare shoppers on social media",
      "objective": "Feel like a real customer recommendation rather than a polished commercial.",
      "concept": "",
      "hook": "Okay, I finally understand the hype.",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "marquee": "Okay, I finally understand the hype",
      "cardHook": "Okay, I finally understand the hype.",
      "duration": "0:40",
      "preview": "ugc-skincare-p.mp4"
    },
    {
      "id": "centrum-advance",
      "title": "Centrum Advance: Healthy Breakfast, Zero Complications",
      "shortTitle": "Centrum Advance",
      "category": "UGC-Style Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "centrum-advance.mp4"
      },
      "thumbnail": "centrum-advance.webp",
      "summary": "A talking-head wellness ad that opens with an easy banana-berry smoothie recipe, then introduces Centrum Advance multivitamins as the way to cover the nutritional gaps one breakfast can't.",
      "audience": "Health-conscious adults looking for a simple daily routine",
      "objective": "Build trust with a useful tip first, then introduce the product as a natural next step.",
      "concept": "Value first, product second: a quick breakfast recipe earns attention before the multivitamin appears.",
      "hook": "Healthy breakfast. Zero complications. “Here's something interesting. A healthy breakfast doesn't have to be complicated.”",
      "production": "An AI talking-head presenter, a recipe demo with ingredient labels (banana, berries, plain yogurt, milk), blending and pouring shots, and product hero shots of Centrum Advance.",
      "tools": [],
      "editing": "Word-by-word captions with highlighted keywords, animated on-screen titles (“Vitamins + Protein + Calcium”, “Variety Matters”), and an end card: “Your daily routine, made simple.”",
      "deliverables": "66-second vertical (9:16) ad for TikTok, Reels and Shorts.",
      "cardHook": "Healthy breakfast. Zero complications.",
      "duration": "1:06",
      "preview": "centrum-advance-p.mp4"
    },
    {
      "id": "viva-blend",
      "title": "Viva Blend UGC Ad",
      "category": "UGC-Style Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "viva-blend.mp4"
      },
      "thumbnail": "viva-blend.webp",
      "summary": "A day-in-the-life UGC ad for Viva Blend, built around a rushed morning that still ends with breakfast.",
      "audience": "Busy people who tend to skip breakfast",
      "objective": "",
      "concept": "",
      "hook": "Woke up late. Still made breakfast.",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "marquee": "Woke up late. Still made breakfast.",
      "cardHook": "Woke up late. Still made breakfast.",
      "duration": "0:30",
      "preview": "viva-blend-p.mp4"
    },
    {
      "id": "real-estate",
      "title": "Real Estate Ad",
      "category": "Real Estate",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "real-estate.mp4"
      },
      "thumbnail": "real-estate.webp",
      "summary": "A luxury home ad that walks a couple up to the front door and inside.",
      "audience": "Property buyers and investors",
      "objective": "Generate property inquiries.",
      "concept": "",
      "hook": "Come inside.",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "marquee": "Come inside",
      "cardHook": "Come inside.",
      "duration": "0:20",
      "preview": "real-estate-p.mp4"
    },
    {
      "id": "talking-babies",
      "title": "Talking Babies",
      "category": "AI Animation & Characters",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "talking-babies.mp4"
      },
      "thumbnail": "talking-babies.webp",
      "summary": "Two babies hold a “board meeting” in their crib in this comedic AI character skit.",
      "audience": "",
      "objective": "",
      "concept": "",
      "hook": "POV: The board meeting has been called to order.",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "marquee": "The board meeting has been called to order",
      "cardHook": "POV: The board meeting has been called to order.",
      "duration": "0:45",
      "preview": "talking-babies-p.mp4"
    },
    {
      "id": "acoustic-singing",
      "title": "The Light You Left On: AI Music Performance",
      "category": "AI Animation & Characters",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "file",
        "src": "acoustic-singing.mp4"
      },
      "thumbnail": "acoustic-singing.webp",
      "summary": "An AI-generated acoustic performance of “The Light You Left On,” credited on screen to Noah Reed.",
      "audience": "",
      "objective": "",
      "concept": "",
      "hook": "I leave the porch light on…",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "shortTitle": "The Light You Left On",
      "cardHook": "I leave the porch light on…",
      "duration": "0:25",
      "preview": "acoustic-singing-p.mp4"
    },
    {
      "id": "oopsie-ep2",
      "shortTitle": "Oopsie Ep. 2",
      "title": "Oopsie, Episode 2: Nursery Rhymes",
      "category": "AI Animation & Characters",
      "aspect": "16:9",
      "featured": false,
      "video": {
        "type": "file",
        "src": "oopsie-ep2.mp4"
      },
      "thumbnail": "oopsie-ep2.webp",
      "summary": "Episode two of an AI-animated nursery rhyme series.",
      "audience": "Young children and their parents",
      "objective": "",
      "concept": "",
      "hook": "Oh no! Catch that bubble!",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "",
      "cardHook": "Oh no! Catch that bubble!",
      "duration": "0:50",
      "preview": "oopsie-ep2-p.mp4"
    }
  ],

  /* ---------- Career timeline (from resume, oldest first) ---------- */
  career: [
    {
      dates: "2020",
      title: "B.S. Industrial Engineering",
      org: "Bulacan State University",
      kind: "Education",
      points: [],
      skills: []
    },
    {
      dates: "Aug 2021 – Jul 2024",
      title: "Associate Software Engineer",
      org: "Accenture Inc.",
      kind: "Frontend",
      points: [
        "Developed and maintained reusable website components for enterprise brands.",
        "Implemented UI designs with designers and stakeholders using Figma and Storybook.",
        "Worked with QA and developers to keep implementation quality and consistency high."
      ],
      skills: ["Figma", "Storybook", "HTML", "CSS", "JavaScript"]
    },
    {
      dates: "Jul 2024 – Dec 2024",
      title: "AEM Enhancement Program",
      org: "Myridius (formerly RCG Global Services)",
      kind: "Frontend",
      points: [
        "Developed reusable UI components and configurable authoring experiences across four enterprise websites.",
        "Standardized component configuration to improve consistency and maintainability."
      ],
      skills: ["Reusable components", "Authoring UX"]
    },
    {
      dates: "Dec 2024 – Feb 2026",
      title: "Sustainment – Talent Management Platform",
      org: "Myridius",
      kind: "Frontend",
      points: [
        "Troubleshot application issues and shipped fixes through root cause analysis and systematic testing.",
        "Helped maintain application reliability, quality and consistency."
      ],
      skills: ["Root cause analysis", "Testing"]
    },
    {
      dates: "Feb 2026 – Present",
      title: "Senior Developer",
      org: "Myridius",
      kind: "Frontend",
      points: [
        "Develop and maintain user-facing applications with Angular, TypeScript, JavaScript, HTML and CSS.",
        "Build reusable interface components with a focus on consistency and usability.",
        "Use AI-assisted tools for research, problem-solving, documentation and productivity."
      ],
      skills: ["Angular", "TypeScript", "AI-assisted development"]
    },
    {
      dates: "Feb 2026 – Present",
      title: "Independent AI Video Creator & Graphic Designer",
      org: "Freelance & personal business projects",
      kind: "Creative",
      points: [
        "Develop AI-assisted video ads and promotional content built around strong hooks, product presentation and clear calls to action.",
        "Write concepts, scripts and storyboards, then turn them into AI-generated scenes with detailed prompts and visual references.",
        "Produce short-form videos in Google Flow and CapCut with scene sequencing, music, dialogue or voiceover, and captions.",
        "Generate AI voiceovers and match delivery style to each campaign's tone and audience.",
        "Design social graphics and promotional posters in Canva with consistent branding and typography.",
        "Create promotional content for NineOne Car Rental Services."
      ],
      skills: ["Google Flow", "CapCut", "Canva", "ChatGPT", "AI voiceovers", "Storyboarding"]
    }
  ],

  certifications: ["AI Fundamentals — 2025", "Artificial Intelligence Fundamentals — 2026"],

  /* ---------- About ---------- */
  about: [
    "I'm Angelyn, an AI video creator and graphic designer based in the Philippines. I turn scripts, visual references and brand guidelines into short-form video ads and social creatives, from the first concept and storyboard through prompting, AI voiceover and the final edit.",
    "Since 2021 I've also built user interfaces for enterprise brands at Accenture and Myridius. That background shows in my creative work: clear visual hierarchy, consistent branding, and close attention to detail."
  ],

  /* ---------- Tools (only tools listed on the resume) ----------
     To add a tool you actually use (e.g. Kling, Higgsfield, Runway), add it here. */
  tools: [
    { name: "Google Flow", use: "AI video generation" },
    { name: "CapCut", use: "Editing, captions, sound" },
    { name: "Canva", use: "Graphics, posters, brand visuals" },
    { name: "Canva AI", use: "AI-assisted design" },
    { name: "ChatGPT", use: "Concepts, scripts, prompts" },
    { name: "Gemini", use: "Music" },
    { name: "Claude", use: "Motion graphics, writing, planning" },
    { name: "AI Studio", use: "Voiceover" },
    { name: "Vibe", use: "Image to video" }
  ],

  /* ---------- Storyboard request form ----------
     Submissions are emailed to you through FormSubmit (free, no account).
     The FIRST time someone submits, FormSubmit emails you an activation link.
     Click it once, and every request after that arrives in your inbox. */
  storyboard: {
    endpoint: "https://formsubmit.co/ajax/angelynserpajuan.va@gmail.com"
  },

  workflow: [
    { step: "Concept", text: "Hook, angle and message for the audience and platform." },
    { step: "Storyboard", text: "Script and scene-by-scene plan with visual references." },
    { step: "AI Generation", text: "Detailed prompts, then refining outputs for consistency." },
    { step: "Editing & Sound", text: "Sequencing, music, voiceover and captions in CapCut." },
    { step: "Final Creative", text: "Exported and adapted for each marketing platform." }
  ]
};
