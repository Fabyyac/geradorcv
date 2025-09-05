// src/types.ts
export type SkillLevel = 1 | 2 | 3 | 4 | 5;


export interface Skill {
id: string;
name: string;
level: SkillLevel; // 1 a 5
}


export interface Experience {
id: string;
role: string;
company: string;
start: string; // AAAA-MM
end: string; // AAAA-MM ou "Atual"
description: string;
}


export interface Personal {
fullName: string;
email: string;
phone: string;
linkedin: string;
summary: string;
}


export interface ResumeData {
personal: Personal;
skills: Skill[];
experiences: Experience[];
}