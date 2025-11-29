export type Role = 'CLIENT' | 'TALENT' | 'ADMIN';

export interface UserBase {
    id: string;
    role: Role;
    name: string;
    email: string;
    city: string;
    avatarUrl?: string;
}

export interface Client extends UserBase {
    role: 'CLIENT';
    verified: boolean;          // KYC approved
    membershipTier: 'Standard' | 'Premium' | 'Founder';
    bio?: string;
    eventsHostedCount: number;
    applicationStatus: 'Pending' | 'Approved' | 'Rejected';
}

export interface TalentAvailabilitySlot {
    dayOfWeek: number;          // 0-6
    from: string;               // '19:00'
    to: string;                 // '02:00'
}

export interface Talent extends UserBase {
    role: 'TALENT';
    gender: 'Female' | 'Male' | 'NonBinary';
    stageName?: string;
    ageRange: string;           // '24–28', etc.
    languages: string[];
    styleTags: string[];        // ['elegant', 'nightlife', ...]
    gallery: string[];          // image URLs
    availabilityStatus: 'Available' | 'Limited' | 'Unavailable';
    weeklyAvailability: TalentAvailabilitySlot[];
    isProfileActive: boolean;
    rating: number;
    bio: string;
}

export interface Event {
    id: string;
    title: string;
    hostClientId: string;
    city: string;
    area: string;
    type: 'Dinner' | 'Yacht' | 'Villa' | 'Rooftop' | 'Gallery';
    dressCode: string;
    vibeTags: string[];         // ['black tie', 'intimate', ...]
    date: string;               // ISO
    startTime: string;          // '20:00'
    endTime: string;            // '01:00'
    expectedGuests: number;
    desiredTalentCount: number;
    description: string;
    status: 'Draft' | 'Upcoming' | 'Completed' | 'Cancelled';
    interestedTalentIds: string[];
    invitedTalentIds: string[];
    confirmedTalentIds: string[];
}

export interface Message {
    id: string;
    threadId: string;
    senderId: string;
    recipientId: string;
    eventId: string;
    sentAt: string;
    content: string;
    flagged?: boolean;
}

export interface MessageThread {
    id: string;
    eventId: string;
    clientId: string;
    talentId: string;
    lastMessageAt: string;
}

export interface Application {
    id: string;
    clientId: string;
    createdAt: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    notes: string;
}

export interface Report {
    id: string;
    reporterId: string;
    reportedUserId: string;
    threadId?: string;
    createdAt: string;
    reason: string;
    status: 'Open' | 'UnderReview' | 'Closed';
}
