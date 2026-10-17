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
    poster: "showreel.jpg",
    label: "Showreel 2026"
  },

  /* ---------- Services (scrolling strip under the hero) ---------- */
  services: [
    "AI Video Ads",
    "Product Commercials",
    "UGC-Style Ads",
    "VSL Ads",
    "AI Animation",
    "AI Talking Heads",
    "AI Voiceovers",
    "Scripts & Storyboards",
    "Social Media Reels",
    "Explainer Videos",
    "Brand Graphics & Posters"
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
      "thumbnail": "sunster-grey-to-golden.jpg",
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
      "duration": "0:30"
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
      "thumbnail": "sunster-mascot.jpg",
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
      "duration": "0:32"
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
      "thumbnail": "bag-ugc.jpg",
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
      "duration": "0:26"
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
      "thumbnail": "clay-cartoon.jpg",
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
      "duration": "0:59"
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
      "thumbnail": "cozy-clouds.jpg",
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
      "duration": "1:00"
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
      "thumbnail": "uhp-sample.jpg",
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
      "duration": "0:32"
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
      "thumbnail": "creatine-explainer.jpg",
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
      "duration": "0:42"
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
      "thumbnail": "nineone.jpg",
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
          "nineone",
          "nineone-ofw"
        ],
        "brief": "Keep a car rental business visible on social media with vehicle ads, rental offers, availability updates and seasonal promotions.",
        "audience": "Families heading home for Christmas, plus a Taglish version for Overseas Filipino Workers (OFWs) landing in the Philippines.",
        "storyboard": "",
        "visualDirection": "",
        "consistency": "",
        "finalDeliverable": ""
      },
      "shortTitle": "NineOne Christmas",
      "marquee": "This Christmas, make your way home",
      "cardHook": "This Christmas, make your way home.",
      "duration": "0:53"
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
      "thumbnail": "nineone-ofw.jpg",
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
      "duration": "0:28"
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
      "thumbnail": "dtc-supplement-vsl.jpg",
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
      "duration": "0:36"
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
      "thumbnail": "dtc-ad.jpg",
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
      "duration": "0:29"
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
      "thumbnail": "wedding-multilanguage.jpg",
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
      "duration": "0:29"
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
      "thumbnail": "ugc-skincare.jpg",
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
      "duration": "0:40"
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
      "thumbnail": "centrum-advance.jpg",
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
      "duration": "1:06"
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
      "thumbnail": "viva-blend.jpg",
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
      "duration": "0:30"
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
      "thumbnail": "real-estate.jpg",
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
      "duration": "0:20"
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
      "thumbnail": "talking-babies.jpg",
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
      "duration": "0:45"
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
      "thumbnail": "acoustic-singing.jpg",
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
      "duration": "0:25"
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
      "thumbnail": "oopsie-ep2.jpg",
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
      "duration": "0:50"
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
    { name: "Claude", use: "Writing and planning" },
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
