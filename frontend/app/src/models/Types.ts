// src/models/types.ts
export interface EventData {
    name: string;
    description: string;
    date: string; // ISO date format, e.g., '2024-11-25'
    time: string; // ISO time format, e.g., '14:00'
    location: string;
    event_mode: "online" | "offline";
    event_image: File | null; // File or null
}
  