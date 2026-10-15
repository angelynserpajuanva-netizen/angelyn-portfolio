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

  /* ---------- Photo ---------- */
  photo: { src: "images/angelyn.webp", alt: "Portrait of Angelyn Serpa Juan" },

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
     audience / objective were inferred from each file name and format. Correct them
     if they're wrong. Any field left "" is hidden on the site.
  ------------------------------------------------------------------- */
  projects: [
    {
      "id": "bag-ugc",
      "title": "CARRIE Handbag Commercial",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": true,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1MnJRkbELeo08trdvZrm91lwoyX3fawlZ/view"
      },
      "thumbnail": "",
      "summary": "A premium-looking AI commercial for a real fashion handbag, with consistent product appearance, deliberate pacing, captions and sound design.",
      "audience": "Fashion and e-commerce shoppers",
      "objective": "Turn a real fashion product into a premium commercial an e-commerce brand could run.",
      "concept": "",
      "hook": "The right bag doesn't just complete your outfit. It changes the whole look.",
      "production": "AI video generation, with Claude used to refine prompts and creative and editing direction.",
      "tools": [
        "AI video generation",
        "Claude",
        "CapCut",
        "Gemini (music)"
      ],
      "editing": "Final assembly, captions and sound design in CapCut. Background music generated with Gemini.",
      "deliverables": "",
      "shortTitle": "CARRIE Handbag"
    },
    {
      "id": "clay-cartoon",
      "title": "Clay-Style Pet Supplement VSL",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": true,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1YNmuhpnoPqiMIGTCmYnM3cE8lrMnz1xe/view"
      },
      "thumbnail": "",
      "summary": "A clay-style, story-driven ad for a pet supplement, built on a full direct-response structure.",
      "audience": "Dog owners who care about their pet's well-being",
      "objective": "Show an end-to-end video ad workflow, from hook to CTA.",
      "concept": "Hook, problem, emotional story, product solution, benefits, call to action.",
      "hook": "An emotional pet-owner problem that makes viewers care about their dog's well-being before the product appears.",
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
      }
    },
    {
      "id": "cozy-clouds",
      "title": "Cozy Cloud: A Little Cup of Comfort",
      "category": "AI Animation & Characters",
      "aspect": "9:16",
      "featured": true,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1dHa1tdldBiMDFwoBgU2xy1poCSzObKkQ/view"
      },
      "thumbnail": "",
      "summary": "An original, character-led brand story about comfort, starring Pip, a fluffy cloud.",
      "audience": "",
      "objective": "Show original concept development, character-led storytelling, scene continuity and emotional pacing.",
      "concept": "",
      "hook": "A lonely child meets Pip, a fluffy cloud character, in a heartwarming story about comfort.",
      "production": "Scenes generated in Google Flow with AI-generated music.",
      "tools": [
        "Google Flow",
        "AI music generation",
        "CapCut"
      ],
      "editing": "Story assembled and edited in CapCut.",
      "deliverables": "",
      "shortTitle": "Cozy Cloud"
    },
    {
      "id": "uhp-sample",
      "title": "UHP Wellness AI Video Sample",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/13_kjXndyM32cT8cZ3M5MwUXE5Jds0zvL/view"
      },
      "thumbnail": "",
      "summary": "A wellness commercial sample produced against a potential client's brief and submitted.",
      "audience": "",
      "objective": "Follow a client brief, develop a commercial visual direction, and deliver a sample.",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": "Submitted video sample for a potential client.",
      "shortTitle": "UHP Wellness"
    },
    {
      "id": "creatine-explainer",
      "title": "Creatine Animation: Your Muscles Have a Secret Battery",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1wYJcEpRUqSZ93FwoyxhaNNM5MYSnlDRP/view"
      },
      "thumbnail": "",
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
      "shortTitle": "Creatine Animation"
    },
    {
      "id": "nineone",
      "title": "NineOne Car Rental",
      "category": "Client Work",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1Xgk2_RtAlmSRLoV6V_92m6snSTw_HbDr/view"
      },
      "thumbnail": "",
      "summary": "Promotional video for NineOne Car Rental Services.",
      "audience": "Customers looking for a rental car",
      "objective": "Promote the fleet and rental availability.",
      "concept": "",
      "hook": "",
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
        "audience": "Local renters, plus a dedicated version for Overseas Filipino Workers (OFWs) and their families.",
        "storyboard": "",
        "visualDirection": "",
        "consistency": "",
        "finalDeliverable": ""
      }
    },
    {
      "id": "nineone-ofw",
      "shortTitle": "NineOne: OFW Campaign",
      "title": "NineOne Car Rental: OFW Campaign",
      "category": "Client Work",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1FV9igZpPY9WhvHmrQMRqbEocz3_P_Ql_/view"
      },
      "thumbnail": "",
      "summary": "A NineOne Car Rental video aimed at Overseas Filipino Workers.",
      "audience": "Overseas Filipino Workers (OFWs) and their families",
      "objective": "",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": ""
    },
    {
      "id": "dtc-supplement-vsl",
      "shortTitle": "Supplement VSL Ad",
      "title": "DTC Supplement Ad: VSL-Inspired Storytelling",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1cIZtsjluvHEN1N6fLI4alBwHdVPXkrO9/view"
      },
      "thumbnail": "",
      "summary": "A direct-to-consumer supplement ad told in the story-led style of a video sales letter.",
      "audience": "Health-conscious online shoppers",
      "objective": "Walk viewers from problem to product to purchase with a story-driven pitch.",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": ""
    },
    {
      "id": "dtc-ad",
      "title": "DTC Product Ad",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1bh3fmMWlxIj1QfWOukD7le5XJP1PlQMT/view"
      },
      "thumbnail": "",
      "summary": "A direct-to-consumer product ad made for social feeds.",
      "audience": "Online shoppers",
      "objective": "Drive purchases from social media.",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": ""
    },
    {
      "id": "wedding-multilanguage",
      "shortTitle": "Multilingual Wedding",
      "title": "Multilingual Wedding Video",
      "category": "Product & DTC Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/18XrPf0cTl7doYxJi0YiYgon9X6aajzSk/view"
      },
      "thumbnail": "",
      "summary": "A wedding-themed AI video ad produced in multiple languages.",
      "audience": "",
      "objective": "",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": ""
    },
    {
      "id": "ugc-skincare",
      "title": "Skincare UGC Ad",
      "category": "UGC-Style Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1xsj8XcdTNQteEqSMr2jfXzdXAzvihr75/view"
      },
      "thumbnail": "",
      "summary": "A creator-style skincare ad made with AI, in the casual first-person UGC format.",
      "audience": "Skincare shoppers on social media",
      "objective": "Feel like a real customer recommendation rather than a polished commercial.",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": ""
    },
    {
      "id": "viva-blend",
      "title": "Viva Blend UGC Ad",
      "category": "UGC-Style Ads",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1xjHDkRBDttJs0rk1dJbcLAoHFxkT-76x/view"
      },
      "thumbnail": "",
      "summary": "A creator-style ad for Viva Blend made with AI.",
      "audience": "",
      "objective": "",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": ""
    },
    {
      "id": "real-estate",
      "title": "Real Estate Ad",
      "category": "Real Estate",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1BzHeugGudaZC1POssnQQgphZy-wuxPA7/view"
      },
      "thumbnail": "",
      "summary": "An AI-produced real estate ad.",
      "audience": "Property buyers and investors",
      "objective": "Generate property inquiries.",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": ""
    },
    {
      "id": "oopsie-ep2",
      "shortTitle": "Oopsie Ep. 2",
      "title": "Oopsie, Episode 2: Nursery Rhymes",
      "category": "AI Animation & Characters",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1P3R0dhlgEkFfN7iWbQ5Z8GOQCrNyuSHz/view"
      },
      "thumbnail": "",
      "summary": "Episode two of an AI-animated nursery rhyme series.",
      "audience": "Young children and their parents",
      "objective": "",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": ""
    },
    {
      "id": "talking-babies",
      "title": "Talking Babies",
      "category": "AI Animation & Characters",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/1v5owwl4pez1VoSMYyqET3rhHEIQug4y-/view"
      },
      "thumbnail": "",
      "summary": "AI-generated talking baby characters in a short-form format.",
      "audience": "",
      "objective": "",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": ""
    },
    {
      "id": "acoustic-singing",
      "title": "Acoustic Performance",
      "category": "AI Animation & Characters",
      "aspect": "9:16",
      "featured": false,
      "video": {
        "type": "drive",
        "src": "https://drive.google.com/file/d/17xRdxGpIvklDMcqZdAo9dFlhzqNGlzyB/view"
      },
      "thumbnail": "",
      "summary": "An AI-generated acoustic singing performance.",
      "audience": "",
      "objective": "",
      "concept": "",
      "hook": "",
      "production": "",
      "tools": [],
      "editing": "",
      "deliverables": ""
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
    { name: "Gemini", use: "Research and prompting" },
    { name: "Claude", use: "Writing and planning" },
    { name: "AI Studio", use: "AI generation" },
    { name: "Vibe", use: "AI creative" }
  ],

  workflow: [
    { step: "Concept", text: "Hook, angle and message for the audience and platform." },
    { step: "Storyboard", text: "Script and scene-by-scene plan with visual references." },
    { step: "AI Generation", text: "Detailed prompts, then refining outputs for consistency." },
    { step: "Editing & Sound", text: "Sequencing, music, voiceover and captions in CapCut." },
    { step: "Final Creative", text: "Exported and adapted for each marketing platform." }
  ]
};
