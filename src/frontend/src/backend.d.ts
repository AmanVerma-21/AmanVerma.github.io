import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactFormSubmission {
    name: string;
    email: string;
    message: string;
}
export interface Profile {
    bio: string;
    title: string;
    institution: string;
    name: string;
    email: string;
}
export interface backendInterface {
    getAllSubmissions(): Promise<Array<ContactFormSubmission>>;
    getProfile(): Promise<Profile>;
    setProfile(name: string, title: string, institution: string, email: string, bio: string): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
}
