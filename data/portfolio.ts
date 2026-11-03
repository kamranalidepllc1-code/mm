// ✏️ Edit all of your information here. The rest of the website updates automatically.
// Every project below is a sample. Replace the videos/images and text with your own work.

export const profile = {
  name: "Your Name",
  brand: "YOUR NAME",
  role: "Fashion Designer & Couturier",
  city: "Lahore",
  since: "2023",
  available: true,
  headline: ["Designed, cut", "& stitched by hand."],
  tagline:
    "Bespoke bridal, evening and formal wear, sketched, cut and stitched in my own studio, made to fit you and only you.",
  intro:
    "I'm a fashion designer who creates every garment from start to finish, with my own hands. From the first sketch to the final stitch, nothing leaves my studio until it fits perfectly.",
  about:
    "Every client gets the same care: a personal consultation, precise measurements, hand-picked fabrics and as many fittings as it takes. The result is clothing that feels made for you, because it is.",
  whatsapp: "923001234567", // with country code, without the +
  phone: "+92 300 1234567",
  email: "hello@yourname.com",
  instagram: "https://instagram.com/yourhandle",
  instagramHandle: "@yourhandle",
  pinterest: "https://pinterest.com/yourhandle",
  studio: "Studio 12, Gulberg III, Lahore",
  hours: "Mon – Sat · 11:00 – 19:00 (by appointment)",
};

// 🎬 HERO BACKGROUND VIDEO STORY: the clips play one after another, in this order.
export type HeroClip = { src: string; label: string; poster?: string };

export const heroClips: HeroClip[] = [
  { src: "/videos/01-cutting.mp4", label: "Cutting the fabric", poster: "/images/sections/hero-poster.jpg" },
  { src: "/videos/02-stitching.mp4", label: "Stitching every detail" },
  { src: "/videos/03-photoshoot.mp4", label: "Ready for the shoot" },
];

export const marquee = [
  "Bridal Couture",
  "Evening Wear",
  "Custom Tailoring",
  "Formal Suits",
  "Hand Embroidery",
  "Editorial Styling",
  "Made to Measure",
];

export const stats = [
  { value: "150+", label: "Outfits created" },
  { value: "80+", label: "Happy clients" },
  { value: "100%", label: "Handmade" },
  { value: "3–4", label: "Weeks per piece" },
];

// Each service card plays the video from public/videos/sections/<file>.mp4
// with the poster image from public/images/sections/<file>.jpg.
const s = (title: string, text: string, file: string) => ({
  title,
  text,
  video: `/videos/sections/${file}.mp4`,
  poster: `/images/sections/${file}.jpg`,
});

export const services = [
  s("Design & Sketching", "Original concepts and sketches built around your style, body and occasion.", "sketching"),
  s("Draping", "Shaping fabric directly on the form to find the perfect flow and silhouette.", "design"),
  s("Pattern & Cutting", "Patterns drafted to your exact measurements and cut with precision.", "cutting"),
  s("Machine Stitching", "Strong, clean seams sewn with care on professional machines.", "machine"),
  s("Hand Finishing", "Hems, linings and closures finished by hand for a couture feel.", "stitching"),
  s("Hand Embroidery", "Intricate thread work and embellishment, stitched one detail at a time.", "embroidery"),
  s("Bridal Couture", "Bespoke wedding outfits with lace, embroidery and flawless fitting.", "bridal"),
  s("Evening & Party Wear", "Statement gowns and dresses designed to turn heads.", "evening"),
  s("Tailored Suits", "Sharp, structured suits and co-ords cut to your exact shape.", "suits"),
  s("Fittings & Alterations", "Multiple fittings and fine adjustments until the fit is perfect.", "fittings"),
  s("Fabric Sourcing", "Hand-picked silks, satins, lace and linens chosen for each design.", "fabric"),
  s("Styling & Photoshoots", "Final styling and lookbook-ready shoots for your big moment.", "styling"),
];

export const steps = [
  { title: "Consultation", text: "We talk about your occasion, style, budget and timeline." },
  { title: "Design & Measurements", text: "I sketch your design, pick fabrics and take precise measurements." },
  { title: "Cutting & Stitching", text: "Your garment is cut and stitched by hand in my studio." },
  { title: "Fitting & Delivery", text: "Final fittings and adjustments, delivered on time, ready to wear." },
];

export const testimonials = [
  {
    quote:
      "My bridal outfit was beyond anything I imagined. Every detail was perfect, and the fitting was flawless on the day.",
    name: "Ayesha K.",
    detail: "Bride · Bridal Couture",
  },
  {
    quote:
      "Professional, patient and incredibly talented. She understood exactly what I wanted from just a few references.",
    name: "Sara M.",
    detail: "Client · Evening Gown",
  },
  {
    quote:
      "The tailoring on my suit is the best I've ever had. It fits like it was made for me, because it was.",
    name: "Hina R.",
    detail: "Client · Formal Suit",
  },
];

export const categories = ["All", "Bridal", "Evening", "Formal", "Editorial"] as const;
export type Category = (typeof categories)[number];

export type WorkItem = {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  year: string;
  fabric: string;
  // Put files in public/images/ and public/videos/ and add the paths here.
  image: string; // cover photo (also used as video poster)
  video?: string; // short, light clip that loops in the grid
  videoHd?: string; // higher-quality clip for the full-screen viewer
  note?: string;
};

const w = (slug: string) => ({
  image: `/images/work/${slug}.jpg`,
  video: `/videos/work/${slug}-sd.mp4`,
  videoHd: `/videos/work/${slug}-hd.mp4`,
});

// 8 projects per category, each with its own unique 1080p video.
// The "All" view mixes them so the categories alternate in the grid.
type Entry = Omit<WorkItem, "id" | "image" | "video" | "videoHd">;
const item = (slug: string, e: Entry): Omit<WorkItem, "id"> => ({ ...e, ...w(slug) });

const bridal = [
  item("bridal-bouquet", { title: "The White Bouquet", category: "Bridal", year: "2026", fabric: "Silk mikado · Lace", note: "A classic bridal silhouette finished with a hand-tied bouquet." }),
  item("bridal-final-dressing", { title: "The Final Lacing", category: "Bridal", year: "2026", fabric: "Duchess satin · Corset back", note: "The last moments of dressing, every hook and loop fastened by hand." }),
  item("bridal-first-fitting", { title: "First Fitting", category: "Bridal", year: "2026", fabric: "Tulle · Beaded bodice", note: "The first time the bride sees her gown come to life in the mirror." }),
  item("bridal-garden-portrait", { title: "Garden Vows", category: "Bridal", year: "2025", fabric: "Chiffon · Floral appliqué", note: "A light, airy gown made for an outdoor ceremony." }),
  item("bridal-lace-back", { title: "Lace Heirloom", category: "Bridal", year: "2025", fabric: "Chantilly lace · Silk lining", note: "Vintage-inspired lace, cut and finished to feel like an heirloom." }),
  item("bridal-garden-walk", { title: "The Long Aisle", category: "Bridal", year: "2025", fabric: "Organza · Cathedral train", note: "A flowing train designed to move beautifully with every step." }),
  item("bridal-white-gown", { title: "Pure Ivory", category: "Bridal", year: "2024", fabric: "Crepe · Clean lines", note: "Minimal and modern: a gown that lets the fit do the talking." }),
  item("bridal-soft-smile", { title: "Blush Morning", category: "Bridal", year: "2024", fabric: "Silk georgette · Pearls", note: "Soft draping and pearl details for a romantic morning wedding." }),
];

const evening = [
  item("evening-noir-column", { title: "Noir Column", category: "Evening", year: "2026", fabric: "Jersey · Floor length", note: "A long black column dress that moves like liquid." }),
  item("evening-champagne", { title: "Champagne Hour", category: "Evening", year: "2026", fabric: "Satin · Cowl neck", note: "Effortless evening glamour designed for a cocktail toast." }),
  item("evening-kimono-silk", { title: "Silk Kimono", category: "Evening", year: "2026", fabric: "Printed silk · Obi belt", note: "A kimono-inspired evening wrap with a modern, fitted cut." }),
  item("evening-black-chiffon", { title: "Black Chiffon", category: "Evening", year: "2025", fabric: "Chiffon · Layered skirt", note: "Layers of chiffon cut to float and swirl in motion." }),
  item("evening-gala-night", { title: "Gala Night", category: "Evening", year: "2025", fabric: "Sequins · Velvet", note: "Celebration-ready looks for a New Year's gala." }),
  item("evening-silhouette", { title: "The Silhouette", category: "Evening", year: "2025", fabric: "Crêpe de chine · Bias cut", note: "A sculpted long dress that draws a perfect line." }),
  item("evening-scarlet-motion", { title: "Scarlet in Motion", category: "Evening", year: "2024", fabric: "Silk chiffon · Hand-dyed", note: "A red dress designed to come alive on the dance floor." }),
  item("evening-red-city", { title: "City Red", category: "Evening", year: "2024", fabric: "Stretch crepe · Midi", note: "A bold red midi made for nights out in the city." }),
];

const formal = [
  item("formal-heritage-coat", { title: "Heritage Overcoat", category: "Formal", year: "2026", fabric: "Wool melton · Half-lined", note: "A vintage-inspired overcoat cut with a strong, clean shoulder." }),
  item("formal-black-tie", { title: "Black Tie", category: "Formal", year: "2026", fabric: "Barathea wool · Satin lapels", note: "A tailored tuxedo finished with a hand-tied bow tie." }),
  item("formal-midnight-suit", { title: "Midnight Suit", category: "Formal", year: "2026", fabric: "Super 120s wool", note: "A midnight-navy suit made to measure, down to the cuff." }),
  item("formal-red-jacket", { title: "Scarlet Jacket", category: "Formal", year: "2025", fabric: "Wool crepe · Structured", note: "A statement red jacket, fitted and styled in the studio." }),
  item("formal-ivory-blazer", { title: "Ivory Blazer", category: "Formal", year: "2025", fabric: "Linen blend · Soft tailoring", note: "A crisp white blazer paired with a sheer veil for a modern formal look." }),
  item("formal-gentleman", { title: "The Gentleman", category: "Formal", year: "2025", fabric: "Tweed · Three-piece", note: "Old-world tailoring with a waistcoat and pocket square." }),
  item("formal-velvet-evening", { title: "Velvet Evening", category: "Formal", year: "2024", fabric: "Velvet · Peak lapel", note: "Rich velvet tailoring for formal evenings." }),
  item("formal-city-jacket", { title: "City Tailoring", category: "Formal", year: "2024", fabric: "Wool flannel · Single-breasted", note: "Everyday tailoring that fits perfectly from morning to night." }),
];

const editorial = [
  item("editorial-studio-turn", { title: "Studio Turn", category: "Editorial", year: "2026", fabric: "Lookbook · Studio", note: "A movement-led studio shoot for the new collection." }),
  item("editorial-behind-the-lens", { title: "Behind the Lens", category: "Editorial", year: "2026", fabric: "Campaign · Creative studio", note: "A behind-the-scenes look at a full campaign shoot." }),
  item("editorial-flash", { title: "Flash", category: "Editorial", year: "2026", fabric: "Editorial · Strobe lighting", note: "High-energy poses under flashing studio light." }),
  item("editorial-shoot-day", { title: "Shoot Day", category: "Editorial", year: "2025", fabric: "Magazine feature", note: "Styled and shot for a fashion magazine feature." }),
  item("editorial-red-catwalk", { title: "Red Catwalk", category: "Editorial", year: "2025", fabric: "Runway · White tailoring", note: "A white outfit walking against a vivid red backdrop." }),
  item("editorial-red-boots", { title: "Red Boots", category: "Editorial", year: "2025", fabric: "Cotton poplin · Statement boots", note: "A clean white dress styled with bold red boots." }),
  item("editorial-silver", { title: "Silver Frost", category: "Editorial", year: "2024", fabric: "Beauty · Concept", note: "A winter concept story with silver, frosted makeup." }),
  item("editorial-mirrors", { title: "Hall of Mirrors", category: "Editorial", year: "2024", fabric: "Concept · Reflection", note: "An editorial shot surrounded by mirrors and reflections." }),
];

// Interleave the categories so "All" shows a mix, then number them.
export const works: WorkItem[] = bridal
  .flatMap((_, i) => [bridal[i], evening[i], formal[i], editorial[i]])
  .map((wk, i) => ({ id: i + 1, ...wk }));

export const media = {
  about: { video: "/videos/sections/about.mp4", poster: "/images/sections/about.jpg" },
  cta: { video: "/videos/sections/cta.mp4", poster: "/images/sections/cta.jpg" },
};
