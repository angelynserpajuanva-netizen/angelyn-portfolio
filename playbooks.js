/* =====================================================================
   STORYBOARD PLAYBOOKS
   One playbook per industry. Each holds the story angle, hooks, scene-by-
   scene visuals and voiceover lines that top-performing ads in that
   category tend to use. The storyboard form picks the best match from the
   visitor's answers (or the industry they choose) and fills in their brand.

   Placeholders: {brand} {hero} {Hero} {pain} {Pain} {offer} {audience}
   ===================================================================== */
window.SB_PLAYBOOKS = [
  {
    id: "carRental", label: "Car rental", hero: "the traveler",
    keys: ["car rental", "rent a car", "rent-a-car", "rental car", "carrental", "rentacar", "car hire", "self-drive", "self drive", "van rental", "van for rent", "car for rent", "airport transfer", "shuttle", "chauffeur", "transport service"],
    pain: "long taxi queues and surge prices", offer: "Clean, well-kept cars ready when you land",
    concept: { title: "The Arrival", logline: "Open on the moment a trip can go wrong (landing, a family plan, a long weekend), then show how fast {brand} gets everyone on the road." },
    patterns: [
      "Open on a real travel moment (arrivals gate, packed luggage, a road-trip plan), not on the car.",
      "Show booking on a phone in a few taps to remove friction.",
      "End on the experience the car makes possible, like the drive or the reunion, then the booking CTA."
    ],
    hooks: ["You landed. Your ride should already be waiting.", "POV: the whole family fits, and nobody waits for a Grab.", "Road trip plans shouldn't depend on a borrowed car."],
    scenes: {
      hook: { shot: "Wide to close-up", visual: "Arrivals gate. {Hero} steps out with luggage, scans the curb, and sighs.", vo: "You landed. Now what?" },
      problem: { shot: "Quick cuts", visual: "A long taxi queue, a surge price on a ride app, kids sitting on suitcases.", text: "Sound familiar?", vo: "Long queues, surge prices, and a tired family." },
      turn: { shot: "Phone insert", visual: "{Hero} opens {brand} on their phone. Three taps, booking confirmed.", text: "Booked in minutes", vo: "With {brand}, your car is booked before you reach the curb." },
      reveal: { shot: "Hero car shot", visual: "The car pulls up clean and gleaming. Slow push-in on the car, keys handed over with a smile.", text: "{brand}", vo: "Your car, ready and waiting." },
      demo: { shot: "Interior details", visual: "Inside: spacious seats, cold aircon, all the luggage fits in the trunk in one shot.", text: "Clean. Cool. Spacious.", vo: "Clean, cool and roomy enough for everyone." },
      benefit: { shot: "Golden-hour drive", visual: "Golden-hour drive along the coast, the family laughing in the back seat.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Montage", visual: "Different customers: a balikbayan reunion, a barkada road trip, a business traveler.", text: "Trusted by travelers and families", vo: "Families, friends and business travelers ride with {brand}." },
      cta: { shot: "End card", visual: "The car parked at a scenic stop, {brand} logo and booking details on screen.", vo: "Book your car with {brand} today." }
    },
    cta: "Book your car with {brand}"
  },
  {
    id: "realEstate", label: "Real estate", hero: "the couple",
    keys: ["real estate", "realty", "condo", "condominium", "house and lot", "townhouse", "property", "properties", "apartment", "lot for sale", "homes", "house for sale", "pre-selling", "subdivision", "developer"],
    pain: "paying rent with nothing to show for it", offer: "Move-in ready homes with flexible payment terms",
    concept: { title: "Come Inside", logline: "Walk the viewer from the front door into the life they want, so the home feels like theirs before the price appears." },
    patterns: [
      "Use a first-person walkthrough from the door inward, so viewers picture themselves living there.",
      "Show lifestyle moments in each room (morning coffee, kids playing), not empty spaces.",
      "Put location perks and payment terms on screen near the end, then a 'book a viewing' CTA."
    ],
    hooks: ["Come inside. This could be your morning view.", "Still paying rent for someone else's home?", "POV: you finally get the keys."],
    scenes: {
      hook: { shot: "Walk-up to the door", visual: "{Hero} walks up to the front door. It swings open to warm light inside.", vo: "Come inside." },
      problem: { shot: "Contrast cut", visual: "A cramped rented room, a rent receipt on the table, a noisy street outside.", text: "Rent again this month?", vo: "Another month of {pain}." },
      turn: { shot: "Door opens", visual: "Cut to {hero} turning a key in a new front door.", text: "What if this was yours?", vo: "What if the next key you held was yours?" },
      reveal: { shot: "Slow push-in", visual: "Wide reveal of the living room and kitchen in soft daylight, {brand} on screen.", text: "{brand}", vo: "Welcome to {brand}." },
      demo: { shot: "Room-by-room", visual: "Room by room: coffee by the window, kids in the bedroom, the view from the balcony.", text: "Space for every part of your day", vo: "A home with room for every part of your day." },
      benefit: { shot: "Aerial", visual: "Aerial of the neighborhood: nearby schools, malls and main roads, with labels.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Family moments", visual: "New homeowners holding keys, smiling at the door.", text: "Families are moving in", vo: "Families are already calling it home." },
      cta: { shot: "End card", visual: "Exterior at dusk with lights on, {brand} logo, 'Book a viewing' and contact details.", vo: "Book your viewing with {brand} today." }
    },
    cta: "Book a viewing with {brand}"
  },
  {
    id: "skincare", label: "Skincare and beauty", hero: "the customer",
    keys: ["skin", "skincare", "serum", "moisturizer", "moisturiser", "sunscreen", "spf", "acne", "pimple", "toner", "cleanser", "cosmetic", "makeup", "lipstick", "foundation", "beauty", "glow", "whitening", "lotion", "soap", "facial"],
    pain: "dull, tired-looking skin", offer: "Visibly brighter skin in weeks",
    concept: { title: "The Real Routine", logline: "A creator shows a no-filter before, the routine, and the after, so the result feels earned and believable." },
    patterns: [
      "Start with a close-up, no-filter 'before' and an honest line about the skin concern.",
      "Show texture: the product on the fingertip, then how it absorbs.",
      "Use a time-stamped result ('Day 1 to Day 14') and a simple 2-step routine."
    ],
    hooks: ["Okay, I finally understand the hype about {brand}.", "No filter. This is day one.", "If {pain} won't go away, watch this."],
    scenes: {
      hook: { shot: "Selfie close-up", visual: "{Hero} films a no-filter close-up in bathroom light.", vo: "No filter. This is day one." },
      problem: { shot: "Mirror close-up", visual: "Close-up on {pain}. {Hero} touches their cheek and frowns.", text: "{Pain}?", vo: "I tried everything for {pain}." },
      turn: { shot: "Product pickup", visual: "{Hero} picks up {brand} from the shelf and shows it to camera.", text: "Then I tried this", vo: "Then a friend told me about {brand}." },
      reveal: { shot: "Macro product", visual: "Macro shot: the bottle in soft light, then a drop on the fingertip showing texture.", text: "{brand}", vo: "Lightweight, absorbs fast, no sticky feel." },
      demo: { shot: "Application", visual: "Applying it in two steps, with a split-screen of morning and night routines.", text: "2 steps. Morning and night.", vo: "Two steps, morning and night. That's it." },
      benefit: { shot: "Before / after", visual: "Day 1 and Day 14 side by side, same light, same angle.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Comment montage", visual: "Quick shots of different people trying it, with on-screen comments.", text: "Everyone's asking what I use", vo: "Now everyone asks what I'm using." },
      cta: { shot: "End card", visual: "Product on a clean background, {brand} logo and the offer.", vo: "Try {brand} today." }
    },
    cta: "Shop {brand} now"
  },
  {
    id: "supplement", label: "Supplements and wellness", hero: "the main character",
    keys: ["supplement", "vitamin", "capsule", "tablet", "protein", "collagen", "wellness", "gut", "probiotic", "creatine", "herbal", "detox", "immune", "sleep aid", "energy drink", "nutrition", "keto", "weight loss", "slimming"],
    pain: "feeling drained by 3 PM", offer: "More energy, every day",
    concept: { title: "The Day That Changes", logline: "Show the same ordinary day twice, before and after {brand}, so the difference does the selling." },
    patterns: [
      "Open on a hyper-specific, relatable moment ('Your brain at 11:47 PM'), not on the bottle.",
      "Explain how it works with a simple visual metaphor or animated character.",
      "Repeat the same scene after, showing the changed outcome, then the offer."
    ],
    hooks: ["It's 3 PM and your energy just left the chat.", "Nobody talks about why you feel this tired.", "Same day. Same schedule. Different you."],
    scenes: {
      hook: { shot: "Close-up", visual: "{Hero} yawns at their desk as the clock hits 3 PM. Eyes half closed.", vo: "It's 3 PM and your energy just left." },
      problem: { shot: "Montage", visual: "Third coffee, skipped workout, scrolling in bed at midnight.", text: "Sound like you?", vo: "Coffee after coffee, and you still feel {pain}." },
      turn: { shot: "Explainer insert", visual: "A simple animated metaphor shows what's missing in the body, like an empty battery.", text: "Here's what's missing", vo: "Your body might just be missing what it needs." },
      reveal: { shot: "Product hero", visual: "{brand} on a kitchen counter in morning light, one capsule in hand.", text: "{brand}", vo: "Meet {brand}." },
      demo: { shot: "Routine", visual: "One serving with breakfast, added to a daily routine in a quick sequence.", text: "One step in your morning", vo: "One easy step every morning." },
      benefit: { shot: "Repeat scene", visual: "Same 3 PM, same desk: {hero} is focused, energized and smiling.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Reviews", visual: "Customer quotes and star ratings over quick lifestyle shots.", text: "Loved by customers", vo: "Join the people who made the switch." },
      cta: { shot: "End card", visual: "Product and offer on screen with {brand} logo. Include any required health disclaimer.", vo: "Try {brand} today." }
    },
    cta: "Get {brand} today"
  },
  {
    id: "fitness", label: "Fitness and gyms", hero: "the member",
    keys: ["gym", "fitness", "workout", "personal trainer", "trainer", "pilates", "yoga", "crossfit", "boxing", "muay thai", "zumba", "bootcamp", "training program"],
    pain: "starting over every Monday", offer: "Your first week free",
    concept: { title: "Day 1 vs Day 30", logline: "Follow one person from a nervous first visit to confidently owning the workout." },
    patterns: [
      "Lead with the fear of starting ('I was scared to walk in'), which is the real barrier.",
      "Show coaches and community, not just equipment.",
      "Use a clear transformation timeline and a low-risk first offer."
    ],
    hooks: ["I was scared to walk into a gym. Then this happened.", "Day 1 vs Day 30.", "Stop starting over every Monday."],
    scenes: {
      hook: { shot: "Close-up", visual: "{Hero} hesitates at the gym door, gripping a water bottle.", vo: "Day one. I almost didn't walk in." },
      problem: { shot: "Montage", visual: "Unused gym shoes, a skipped alarm, a new-year plan crossed out.", text: "{Pain}?", vo: "I was tired of {pain}." },
      turn: { shot: "Welcome", visual: "A coach greets {hero} with a smile and a quick walkthrough.", text: "You're not doing this alone", vo: "At {brand}, nobody trains alone." },
      reveal: { shot: "Wide", visual: "Wide shot of the {brand} floor full of energy, the logo on the wall.", text: "{brand}", vo: "This is {brand}." },
      demo: { shot: "Training cuts", visual: "Fast cuts of the class with the coach correcting form and people high-fiving.", text: "Coached every step", vo: "Real coaching, every session." },
      benefit: { shot: "Day 30", visual: "Day 30: {hero} finishes strong, out of breath and grinning.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Community", visual: "Group photo after class, member testimonials on screen.", text: "Join the community", vo: "Hundreds of members started exactly like you." },
      cta: { shot: "End card", visual: "{brand} logo, location and the first-visit offer.", vo: "Start at {brand} this week." }
    },
    cta: "Claim your first visit at {brand}"
  },
  {
    id: "food", label: "Food and drinks", hero: "the customer",
    keys: ["restaurant", "cafe", "café", "coffee", "bakery", "food", "kitchen", "pizza", "burger", "milk tea", "milktea", "dessert", "catering", "meal", "snack", "drink", "beverage", "juice", "smoothie", "breakfast", "chicken", "samgyup", "ramen", "sushi", "grill", "bbq", "eatery"],
    pain: "the same boring lunch every day", offer: "Fresh, made-to-order, ready in minutes",
    concept: { title: "The Craving", logline: "Build the craving with slow, sensory close-ups, then make getting it feel instant." },
    patterns: [
      "Open on a sensory money shot: cheese pull, steam, pour or sizzle.",
      "Use ASMR-style sound (crunch, sizzle, pour) to make it feel irresistible.",
      "Show how easy it is to get: the location, delivery app or a limited-time deal."
    ],
    hooks: ["Warning: do not watch this hungry.", "POV: your lunch break just got better.", "The {brand} order everyone's been posting."],
    scenes: {
      hook: { shot: "Macro", visual: "Macro money shot: a cheese pull, rising steam or a slow pour, with ASMR sound.", vo: "Don't watch this hungry." },
      problem: { shot: "Desk lunch", visual: "{Hero} stares at a sad desk lunch while the clock ticks.", text: "Same lunch again?", vo: "Tired of {pain}?" },
      turn: { shot: "Phone or doorway", visual: "{Hero} opens the {brand} menu, or walks into the shop and smiles.", text: "Not today", vo: "Not today." },
      reveal: { shot: "Hero plate", visual: "The signature item lands on the table in slow motion, {brand} logo beside it.", text: "{brand}", vo: "This is {brand}." },
      demo: { shot: "Kitchen cuts", visual: "Quick kitchen cuts: fresh ingredients, the sizzle, the plating.", text: "Made fresh, made to order", vo: "Made fresh, every single order." },
      benefit: { shot: "First bite", visual: "{Hero} takes the first bite, closes their eyes and nods.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Busy shop", visual: "A full shop, a line at the counter, customers taking photos of their food.", text: "The spot everyone's talking about", vo: "There's a reason there's always a line." },
      cta: { shot: "End card", visual: "Signature item, {brand} logo, location or delivery app, and the deal.", vo: "Order {brand} today." }
    },
    cta: "Order {brand} today"
  },
  {
    id: "fashion", label: "Fashion and accessories", hero: "the woman",
    keys: ["bag", "handbag", "clothing", "apparel", "shirt", "t-shirt", "tee", "dress", "shoes", "sneakers", "jewelry", "jewellery", "watch", "fashion", "boutique", "accessories", "wallet", "eyewear", "sunglasses", "hoodie", "streetwear"],
    pain: "outfits that feel incomplete", offer: "The piece that pulls every look together",
    concept: { title: "The Missing Piece", logline: "The outfit almost works. Add {brand} and the whole look clicks into place." },
    patterns: [
      "Start with a 'something's missing' styling moment that viewers relate to.",
      "Use the transition 'add one piece' with a snap cut or spin.",
      "Show the item styled 3 ways for different occasions, then the drop or offer."
    ],
    hooks: ["Your outfit isn't the problem. Something's missing.", "One piece, three looks.", "The {brand} piece that goes with everything."],
    scenes: {
      hook: { shot: "Mirror shot", visual: "{Hero} checks a full outfit in the mirror and tilts her head. Almost.", vo: "Your outfit isn't the problem." },
      problem: { shot: "Try-on cuts", visual: "Quick try-ons that don't feel right, clothes piling on the bed.", text: "Something's missing", vo: "But something's missing." },
      turn: { shot: "Snap transition", visual: "She reaches for {brand}, then a snap-cut transition.", text: "Add this", vo: "Add one piece." },
      reveal: { shot: "Product hero", visual: "Slow, rotating product shot showing texture, hardware and details, matched to the real product.", text: "{brand}", vo: "{brand}." },
      demo: { shot: "Styled 3 ways", visual: "The same piece styled 3 ways: office, weekend, night out.", text: "Office. Weekend. Night out.", vo: "One piece, every occasion." },
      benefit: { shot: "Walk-out", visual: "Confident walk toward camera, the look complete.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Street style", visual: "Different people wearing it on the street and tagging the brand.", text: "Seen everywhere", vo: "Everyone's asking where it's from." },
      cta: { shot: "End card", visual: "Product flat-lay, {brand} logo and the offer.", vo: "Shop {brand} now." }
    },
    cta: "Shop {brand} now"
  },
  {
    id: "pet", label: "Pet products", hero: "the dog owner",
    keys: ["pet", "dog", "cat", "puppy", "kitten", "kibble", "pet food", "grooming", "vet", "veterinary", "paw", "treats"],
    pain: "a pet who seems slower than usual", offer: "Happier, healthier days together",
    concept: { title: "Through Their Eyes", logline: "Tell the story from the owner's worry to the pet's comeback, so emotion carries the product." },
    patterns: [
      "Open on an emotional, specific owner line ('I thought he was just getting old').",
      "Let the pet be the hero; reactions sell better than product shots.",
      "Show the comeback moment (running, playing), then the offer."
    ],
    hooks: ["I thought he was just getting old.", "Your dog can't tell you something's wrong. But this can.", "POV: your best friend has his energy back."],
    scenes: {
      hook: { shot: "Close-up", visual: "An older dog resting by the window while {hero} watches, worried.", vo: "I thought he was just getting old." },
      problem: { shot: "Moments", visual: "The leash left untouched, the dog slow on the stairs, ignoring the ball.", text: "{Pain}?", vo: "He stopped running to the door." },
      turn: { shot: "Discovery", visual: "{Hero} reads about {brand} on their phone, then looks at the dog.", text: "Then we found this", vo: "Then our vet suggested {brand}." },
      reveal: { shot: "Product hero", visual: "{brand} next to the dog bowl, the dog's nose coming into frame.", text: "{brand}", vo: "Meet {brand}." },
      demo: { shot: "Mealtime", visual: "Mixing it into the meal; the dog's tail starts wagging.", text: "Easy to add to every meal", vo: "Just add it to every meal." },
      benefit: { shot: "Comeback", visual: "Weeks later: the dog sprints across the park and leaps for the ball.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Owners", visual: "Montage of happy pets with their owners.", text: "Pet parents love it", vo: "Pet parents everywhere are seeing the change." },
      cta: { shot: "End card", visual: "Dog and owner together, {brand} logo and the offer.", vo: "Give them {brand} today." }
    },
    cta: "Shop {brand} for your pet"
  },
  {
    id: "travel", label: "Hotels and travel", hero: "the traveler",
    keys: ["hotel", "resort", "travel", "tour", "staycation", "airbnb", "beach", "villa", "island", "vacation", "getaway", "glamping", "travel agency", "tour package"],
    pain: "a vacation that never seems to happen", offer: "Your escape, all planned for you",
    concept: { title: "Your Out-of-Office", logline: "Contrast a stressful week with the first deep breath at {brand}." },
    patterns: [
      "Open on the escape moment: an infinity pool, a view, the first step onto sand.",
      "Use 'POV' and first-person shots so viewers imagine themselves there.",
      "Show everything included, then a booking deadline or seasonal deal."
    ],
    hooks: ["POV: your out-of-office is finally on.", "This is your sign to finally book it.", "Some views deserve the trip."],
    scenes: {
      hook: { shot: "POV reveal", visual: "First-person POV: curtains open to a breathtaking view.", vo: "This is your sign." },
      problem: { shot: "Contrast", visual: "Flashback: overflowing inbox, traffic, a calendar with no free days.", text: "When was your last real break?", vo: "When was your last real break?" },
      turn: { shot: "Arrival", visual: "Suitcase wheels, a warm welcome at check-in, a welcome drink.", text: "Check in. Switch off.", vo: "Check in at {brand}." },
      reveal: { shot: "Aerial", visual: "Sweeping aerial of the property with {brand} on screen.", text: "{brand}", vo: "Welcome to {brand}." },
      demo: { shot: "Experience cuts", visual: "Pool, dining, room details and activities in a quick rhythm.", text: "Everything, taken care of", vo: "Every detail, taken care of." },
      benefit: { shot: "Sunset", visual: "{Hero} at sunset, finally relaxed.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Guests", visual: "Happy guests, ratings and review snippets.", text: "Guests keep coming back", vo: "Guests keep coming back." },
      cta: { shot: "End card", visual: "Hero view, {brand} logo, booking link and seasonal deal.", vo: "Book your stay at {brand}." }
    },
    cta: "Book your stay at {brand}"
  },
  {
    id: "events", label: "Weddings and events", hero: "the couple",
    keys: ["wedding", "bride", "groom", "event", "debut", "birthday party", "photographer", "videographer", "venue", "events place", "planner", "coordinator", "styling", "florist", "photo booth"],
    pain: "stressful, last-minute event planning", offer: "Every detail handled, so you can be present",
    concept: { title: "The Moment", logline: "Build to the one moment everyone remembers, and show {brand} quietly making it happen." },
    patterns: [
      "Open on the emotional peak: the first look, the toast, the tears.",
      "Cut behind the scenes to show the team handling the details.",
      "End on the feeling, then the date-availability or inquiry CTA."
    ],
    hooks: ["Some love stories deserve the world.", "You'll only get this moment once.", "Behind every perfect day is a team you never noticed."],
    scenes: {
      hook: { shot: "Slow motion", visual: "Slow-motion first look: the couple turns and both start to cry.", vo: "You only get this moment once." },
      problem: { shot: "Stress cuts", visual: "Flashback: checklists, vendor calls, a nervous couple at 2 AM.", text: "The planning can be a lot", vo: "Planning it shouldn't take the joy away." },
      turn: { shot: "Team in action", visual: "The {brand} team setting up, steadying a detail, giving a thumbs-up.", text: "Leave it to us", vo: "That's where {brand} comes in." },
      reveal: { shot: "Venue reveal", visual: "The finished venue at golden hour, lights coming on, {brand} on screen.", text: "{brand}", vo: "This is {brand}." },
      demo: { shot: "Details", visual: "Details close-up: flowers, table setting, the cake, the first dance.", text: "Every detail, handled", vo: "Every detail, handled." },
      benefit: { shot: "Celebration", visual: "Guests dancing, the couple laughing in the middle.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Couples", visual: "Past couples' highlight moments and thank-you notes.", text: "Trusted by couples", vo: "Couples trust us with their biggest day." },
      cta: { shot: "End card", visual: "The couple at sunset, {brand} logo and an inquiry CTA.", vo: "Check your date with {brand}." }
    },
    cta: "Check your date with {brand}"
  },
  {
    id: "education", label: "Courses and coaching", hero: "the student",
    keys: ["course", "coaching", "coach", "academy", "tutorial", "class", "classes", "school", "training", "review center", "mentorship", "webinar", "bootcamp", "masterclass", "learn", "lesson", "tutor"],
    pain: "feeling stuck in the same place", offer: "A step-by-step path from beginner to confident",
    concept: { title: "Before and After the Course", logline: "Show the stuck version of the student, the turning point, and who they become." },
    patterns: [
      "Open with the student's frustration in their own words.",
      "Show a peek inside the lesson, so the value is visible, not just promised.",
      "Use real outcomes (a first client, a passed exam, a new job), then enroll CTA."
    ],
    hooks: ["Six months ago I had no idea where to start.", "Stop watching random tutorials.", "The skill that changed my career took 30 days."],
    scenes: {
      hook: { shot: "Talking to camera", visual: "{Hero} speaks to camera at a desk, honest and direct.", vo: "Six months ago, I had no idea where to start." },
      problem: { shot: "Screen cuts", visual: "Dozens of open tabs, random tutorials, a blank notebook.", text: "{Pain}?", vo: "I was tired of {pain}." },
      turn: { shot: "Enroll", visual: "{Hero} clicks 'Enroll' on {brand}.", text: "Then I found this", vo: "Then I joined {brand}." },
      reveal: { shot: "Platform", visual: "A clean look at the {brand} lessons and community.", text: "{brand}", vo: "Here's what's inside." },
      demo: { shot: "Lesson peek", visual: "A short clip from a real lesson, with notes being taken.", text: "Step by step", vo: "Clear lessons, step by step." },
      benefit: { shot: "Win moment", visual: "{Hero} celebrates a real win: first client, certificate or passed exam.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Student wins", visual: "Montage of student wins and short testimonials.", text: "Real students, real results", vo: "Students like you are already seeing results." },
      cta: { shot: "End card", visual: "{brand} logo, start date and enroll CTA.", vo: "Enroll in {brand} today." }
    },
    cta: "Enroll in {brand}"
  },
  {
    id: "tech", label: "Apps and software", hero: "the user",
    keys: ["app", "software", "saas", "platform", "ai tool", "startup", "dashboard", "automation", "crm", "plugin", "website builder", "fintech", "e-wallet", "ewallet", "tool for"],
    pain: "hours lost to busywork", offer: "Hours of work done in minutes",
    concept: { title: "The 5-Minute Version", logline: "Show the slow, painful way side by side with doing it in {brand}." },
    patterns: [
      "Open with the painful old way, in a relatable workplace moment.",
      "Show the real screen; the 'how it works' moment builds trust.",
      "Quantify the win (time saved, steps removed), then a free-trial CTA."
    ],
    hooks: ["You're still doing this manually?", "This used to take me 3 hours.", "The app I wish I found sooner."],
    scenes: {
      hook: { shot: "Close-up", visual: "{Hero} stares at a messy spreadsheet late at night.", vo: "This used to take me three hours." },
      problem: { shot: "Busywork cuts", visual: "Copy-paste, endless tabs, a pile of sticky notes.", text: "{Pain}?", vo: "All that time lost to {pain}." },
      turn: { shot: "Screen", visual: "{Hero} opens {brand}. A clean screen loads.", text: "There's a faster way", vo: "Then I tried {brand}." },
      reveal: { shot: "Product UI", visual: "Hero shot of the {brand} interface on laptop and phone.", text: "{brand}", vo: "Meet {brand}." },
      demo: { shot: "Screen recording", visual: "A screen recording: three clicks and the task is done.", text: "Done in 3 clicks", vo: "Three clicks, and it's done." },
      benefit: { shot: "Free time", visual: "{Hero} closes the laptop early and heads out, smiling.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Logos and ratings", visual: "Customer logos, ratings and a short quote.", text: "Teams switch and don't look back", vo: "Teams switch and never look back." },
      cta: { shot: "End card", visual: "{brand} logo with a free-trial or download CTA.", vo: "Try {brand} free today." }
    },
    cta: "Try {brand} free"
  },
  {
    id: "homeServices", label: "Home services", hero: "the homeowner",
    keys: ["cleaning", "cleaner", "plumbing", "plumber", "aircon", "air conditioning", "pest", "termite", "repair", "electrician", "laundry", "moving", "movers", "renovation", "construction", "solar", "roofing", "painting service", "handyman", "interior design"],
    pain: "a problem at home that keeps getting worse", offer: "Fast, trusted service at your door",
    concept: { title: "Fixed Before Lunch", logline: "Show the stressful problem, the quick booking, and the team leaving the home better than they found it." },
    patterns: [
      "Open on the problem at its worst (a leak, the heat, a mess) to create urgency.",
      "Show the uniformed team, tools and process to build trust.",
      "Use a satisfying before-and-after, then 'book today, same-day service'."
    ],
    hooks: ["If your home looks like this, watch till the end.", "Don't wait until it gets worse.", "The most satisfying before and after you'll see today."],
    scenes: {
      hook: { shot: "Close-up", visual: "Close-up of the problem at its worst, like a dripping leak or a broken unit.", vo: "Don't wait until it gets worse." },
      problem: { shot: "Frustration", visual: "{Hero} sweating, calling around, getting no answer.", text: "{Pain}?", vo: "Dealing with {pain}?" },
      turn: { shot: "Booking", visual: "{Hero} books {brand} on their phone; a confirmation pops up.", text: "Booked in minutes", vo: "Book {brand} in minutes." },
      reveal: { shot: "Team arrival", visual: "The {brand} team arrives in uniform with the right tools.", text: "{brand}", vo: "Our team is on the way." },
      demo: { shot: "Process", visual: "Time-lapse of the team working carefully and cleaning up after.", text: "Done right, cleaned up after", vo: "Done right, and cleaned up after." },
      benefit: { shot: "Before / after", visual: "A satisfying before-and-after wipe transition.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Reviews", visual: "Happy homeowners and 5-star reviews on screen.", text: "Trusted by homeowners", vo: "Trusted in homes across the area." },
      cta: { shot: "End card", visual: "{brand} logo, phone number and service area.", vo: "Book {brand} today." }
    },
    cta: "Book {brand} today"
  },
  {
    id: "clinic", label: "Clinics and aesthetics", hero: "the patient",
    keys: ["clinic", "dental", "dentist", "derma", "dermatology", "aesthetic", "laser", "doctor", "medical", "therapy", "physical therapy", "hospital", "teeth", "braces", "botox", "filler", "diagnostic", "optical"],
    pain: "putting off the appointment for too long", offer: "Gentle, expert care with zero pressure",
    concept: { title: "The Confident Smile", logline: "Ease the fear of the first visit and end on the patient's new confidence." },
    patterns: [
      "Address the fear first: anxiety, cost or time.",
      "Show a calm, clean clinic and friendly staff to build trust.",
      "End on the patient's confidence moment and a consultation CTA."
    ],
    hooks: ["I put this off for 3 years. I wish I hadn't.", "Nervous about your first visit? Watch this.", "The confidence you get back is worth it."],
    scenes: {
      hook: { shot: "Close-up", visual: "{Hero} covers their mouth or face in a photo, then looks at camera.", vo: "I put this off for three years." },
      problem: { shot: "Avoidance", visual: "{Hero} hides in photos and reschedules the appointment again.", text: "{Pain}?", vo: "I kept {pain}." },
      turn: { shot: "Welcome", visual: "A warm welcome at the {brand} front desk, a calm waiting area.", text: "It was nothing like I feared", vo: "At {brand}, it was nothing like I feared." },
      reveal: { shot: "Clinic", visual: "Clean, modern clinic interior with {brand} on screen.", text: "{brand}", vo: "This is {brand}." },
      demo: { shot: "Consult", visual: "A doctor explains the plan on a screen; {hero} nods and relaxes.", text: "A clear plan, explained", vo: "Every step, clearly explained." },
      benefit: { shot: "Reveal", visual: "{Hero} sees the result in the mirror and smiles wide.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Patients", visual: "Patient smiles and reviews.", text: "Patients feel the difference", vo: "Patients love how they feel after." },
      cta: { shot: "End card", visual: "{brand} logo with a consultation CTA. Follow medical advertising rules.", vo: "Book your consultation at {brand}." }
    },
    cta: "Book a consultation at {brand}"
  },
  {
    id: "salon", label: "Salons and spas", hero: "the client",
    keys: ["salon", "spa", "massage", "nails", "nail", "lashes", "brows", "barber", "barbershop", "hair", "haircut", "keratin", "rebond", "waxing", "wellness center"],
    pain: "never having time for yourself", offer: "An hour that feels like a weekend",
    concept: { title: "The Reset", logline: "Take a stressed client from a rushed week to walking out like a new person." },
    patterns: [
      "Open on a transformation teaser or a 'walk out' moment.",
      "Use ASMR details: scissors, water, foam, the massage.",
      "End on the confident reveal and a booking or promo CTA."
    ],
    hooks: ["Walked in tired. Walked out like this.", "This is your sign to book that appointment.", "The hour that fixed my whole week."],
    scenes: {
      hook: { shot: "Walk-out reveal", visual: "{Hero} walks out of {brand} glowing, hair flip in slow motion.", vo: "Walked in tired. Walked out like this." },
      problem: { shot: "Rewind", visual: "Rewind: a frantic week, messy hair, no time for herself.", text: "{Pain}?", vo: "Between work and everything else, {pain}." },
      turn: { shot: "Arrival", visual: "Arriving at {brand}: calm lighting, a warm welcome, tea served.", text: "Your time starts now", vo: "So I booked an hour at {brand}." },
      reveal: { shot: "Interior", visual: "Beautiful interior details with {brand} on screen.", text: "{brand}", vo: "This is {brand}." },
      demo: { shot: "ASMR details", visual: "ASMR close-ups: the wash, scissors, the massage, polish going on.", text: "Every detail, done with care", vo: "Every detail, done with care." },
      benefit: { shot: "Mirror reveal", visual: "The mirror reveal; {hero} can't stop smiling.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Clients", visual: "Before-and-afters from different clients.", text: "Clients keep coming back", vo: "Our clients keep coming back." },
      cta: { shot: "End card", visual: "{brand} logo, booking link and this month's promo.", vo: "Book your appointment at {brand}." }
    },
    cta: "Book at {brand}"
  },
  {
    id: "baby", label: "Baby and kids", hero: "the parent",
    keys: ["baby", "kids", "kid", "toddler", "diaper", "toy", "toys", "mom", "mommy", "parent", "nursery", "children", "infant", "stroller"],
    pain: "sleepless nights and busy days", offer: "Made for little ones, trusted by parents",
    concept: { title: "Parent Life, Made Easier", logline: "A real, slightly chaotic parent moment that {brand} makes easier and sweeter." },
    patterns: [
      "Open on an honest, funny parenting moment parents recognize instantly.",
      "Show safety and ease of use clearly, since parents need reassurance.",
      "End on a warm parent-and-child moment and the offer."
    ],
    hooks: ["Parents, you know this moment.", "3 AM and you're the only one awake?", "The one thing that saved my mornings."],
    scenes: {
      hook: { shot: "Close-up", visual: "Funny, honest parent moment: a toddler mess, a 3 AM cry, a cold coffee.", vo: "Parents, you know this moment." },
      problem: { shot: "Montage", visual: "Juggling bags, a crying baby, a half-done chore.", text: "{Pain}?", vo: "Between {pain}, every little help counts." },
      turn: { shot: "Discovery", visual: "{Hero} reaches for {brand}.", text: "This changed everything", vo: "Then we tried {brand}." },
      reveal: { shot: "Product hero", visual: "{brand} in a soft, bright nursery setting.", text: "{brand}", vo: "Meet {brand}." },
      demo: { shot: "In use", visual: "Using it with one hand while holding the baby: easy and safe.", text: "Safe and easy to use", vo: "Safe, gentle and easy to use." },
      benefit: { shot: "Warm moment", visual: "Baby giggling, parent finally relaxed.", text: "{offer}", vo: "{offer}." },
      proof: { shot: "Families", visual: "Different families using it, with mom-review quotes.", text: "Loved by parents", vo: "Parents everywhere swear by it." },
      cta: { shot: "End card", visual: "Product, {brand} logo and the offer.", vo: "Get {brand} today." }
    },
    cta: "Get {brand} today"
  }
];

/* Used when no industry matches. Still story-led, never just "product + problem". */
window.SB_FALLBACK = {
  id: "general", label: "General product", hero: "the customer",
  pain: "that one daily hassle", offer: "A simpler, better everyday",
  concept: { title: "The Small Win", logline: "Turn one everyday frustration into a satisfying win, with {brand} as the reason it changed." },
  patterns: [
    "Open on a specific, relatable moment, not on the product.",
    "Show the product working, in hand and in real use.",
    "End on how life feels after, then a clear, single CTA."
  ],
  hooks: ["I didn't know I needed this until I tried it.", "POV: you finally fixed {pain}.", "The {brand} moment that made my day easier."],
  scenes: {
    hook: { shot: "Close-up", visual: "{Hero} caught in a relatable moment of frustration, looking straight into camera.", vo: "I didn't know I needed this until I tried it." },
    problem: { shot: "Everyday moment", visual: "The frustration in an everyday setting the audience recognizes.", text: "{Pain}?", vo: "Dealing with {pain}?" },
    turn: { shot: "Discovery", visual: "{Hero} discovers {brand}, a beat of curiosity.", text: "Then I found this", vo: "Then I found {brand}." },
    reveal: { shot: "Product hero", visual: "{brand} in a clean hero shot matched to the real product photos.", text: "{brand}", vo: "Meet {brand}." },
    demo: { shot: "In use", visual: "Using {brand} in 2 to 3 quick cuts so it's clear how it works.", text: "Here's how it works", vo: "Here's how it works." },
    benefit: { shot: "Payoff", visual: "The payoff moment: {hero} relaxed and smiling.", text: "{offer}", vo: "{offer}." },
    proof: { shot: "Montage", visual: "Different people like {audience} using {brand}.", text: "People love it", vo: "People like you are already loving it." },
    cta: { shot: "End card", visual: "{brand} logo, product and offer on screen.", vo: "Get {brand} today." }
  },
  cta: "Get {brand} today"
};
