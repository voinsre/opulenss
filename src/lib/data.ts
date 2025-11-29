import { Client, Event, Message, MessageThread, Talent } from "@/types";

// --- Talent Data ---
const FEMALE_IMAGES = [
    "/talent_t1_sophia_blonde_1764280498962.png",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515161318750-781d6122e367?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    "/talent_t13_portrait_1764279948058.png",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519671482538-518b5c2fa33d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop"
];

const MALE_IMAGES = [
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop"
];

const GALLERY_EXTRAS = [
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519671482538-518b5c2fa33d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop"
];

const generateTalent = (id: string, name: string, gender: 'Female' | 'Male', img: string, i: number): Talent => ({
    id,
    role: "TALENT",
    name,
    stageName: name.split(' ')[0],
    email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
    city: i % 3 === 0 ? "Dubai" : i % 3 === 1 ? "London" : "New York",
    gender,
    ageRange: "21-30",
    languages: ["English"],
    styleTags: i % 2 === 0 ? ["luxury", "fashion"] : ["classic", "artistic"],
    gallery: [img, ...GALLERY_EXTRAS.slice(0, 3)],
    avatarUrl: img,
    availabilityStatus: "Available",
    weeklyAvailability: [],
    isProfileActive: true,
    rating: 4.5 + (i * 0.02),
    bio: `A professional ${gender === 'Female' ? 'model' : 'artist'} with a passion for creating unique experiences.`
});

export const MOCK_TALENT: Talent[] = [
    // 15 Females
    ...FEMALE_IMAGES.slice(0, 15).map((img, i) => generateTalent(`t${i + 1}`, i === 0 ? "Sophia" : `Model ${i + 1}`, "Female", img, i)),
    // 5 Males
    ...MALE_IMAGES.map((img, i) => generateTalent(`t${i + 16}`, `Talent ${i + 16}`, "Male", img, i + 15))
];

// --- Client Data ---
export const MOCK_CLIENTS: Client[] = [
    {
        id: "c1",
        role: "CLIENT",
        name: "Alexander Sterling",
        email: "alex@sterling.com",
        city: "London",
        verified: true,
        membershipTier: "Founder",
        eventsHostedCount: 12,
        applicationStatus: "Approved",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
        id: "c2",
        role: "CLIENT",
        name: "James Thorne",
        email: "james@thorne.com",
        city: "New York",
        verified: true,
        membershipTier: "Premium",
        eventsHostedCount: 5,
        applicationStatus: "Approved",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
];

// --- Event Data ---
export const MOCK_EVENTS: Event[] = [
    {
        id: "e1",
        title: "Mayfair Private Dinner",
        hostClientId: "c1",
        city: "London",
        area: "Mayfair",
        type: "Dinner",
        dressCode: "Black Tie",
        vibeTags: ["intimate", "gastronomy"],
        date: "2025-12-01",
        startTime: "20:00",
        endTime: "23:00",
        expectedGuests: 8,
        desiredTalentCount: 4,
        description: "An intimate dinner at a private residence in Mayfair. Michelin star chef catering.",
        status: "Upcoming",
        interestedTalentIds: ["t1", "t3"],
        invitedTalentIds: ["t2"],
        confirmedTalentIds: ["t17"],
    },
    {
        id: "e2",
        title: "Soho Rooftop Drinks",
        hostClientId: "c2",
        city: "New York",
        area: "Soho",
        type: "Rooftop",
        dressCode: "Cocktail Chic",
        vibeTags: ["lively", "views"],
        date: "2025-12-05",
        startTime: "21:00",
        endTime: "01:00",
        expectedGuests: 20,
        desiredTalentCount: 8,
        description: "Casual drinks with a view. Great music and atmosphere.",
        status: "Upcoming",
        interestedTalentIds: ["t2", "t4"],
        invitedTalentIds: ["t1", "t3"],
        confirmedTalentIds: [],
    },
];

// --- Message Data ---
export const MOCK_THREADS: MessageThread[] = [
    {
        id: "th1",
        eventId: "e1",
        clientId: "c1",
        talentId: "t1",
        lastMessageAt: "2025-11-27T10:30:00Z",
    }
];

export const MOCK_MESSAGES: Message[] = [
    {
        id: "m1",
        threadId: "th1",
        senderId: "c1",
        recipientId: "t1",
        eventId: "e1",
        sentAt: "2025-11-27T10:00:00Z",
        content: "Hello Elena, I saw your profile and thought you'd be a great fit for my dinner party.",
    },
    {
        id: "m2",
        threadId: "th1",
        senderId: "t1",
        recipientId: "c1",
        eventId: "e1",
        sentAt: "2025-11-27T10:15:00Z",
        content: "Hi Alexander, thank you for the invite. The event sounds lovely. What is the dress code specifically?",
    },
    {
        id: "m3",
        threadId: "th1",
        senderId: "c1",
        recipientId: "t1",
        eventId: "e1",
        sentAt: "2025-11-27T10:30:00Z",
        content: "It is strictly Black Tie. Elegant evening gowns would be perfect.",
    }
];
