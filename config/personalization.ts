export interface PhotoMemory {
  url: string;
  caption: string;
  date?: string;
}

export interface SiteConfig {
  /**
   * Her name or nickname.
   * If provided, it can be seamlessly woven into the greeting and letter.
   * If left empty, defaults to gentle poetic phrasing ("for you").
   */
  herName: string;

  /**
   * Your name or nickname for the signature.
   */
  myName: string;

  /**
   * Title of the mobile experience.
   */
  title: string;

  /**
   * Main poetic tagline.
   */
  tagline: string;

  /**
   * Scene 1 button text.
   */
  enterButtonText: string;

  /**
   * Scene 4 Letter heading and contents.
   */
  letter: {
    heading: string;
    paragraphs: string[];
    closing: string;
    readAgainText: string;
  };

  /**
   * Optional custom note added inside the letter.
   */
  personalNote?: string;

  /**
   * Optional photos / polaroids for the letter section.
   */
  photos: PhotoMemory[];

  /**
   * Personal closing message on final card.
   */
  closingMessage: string;

  /**
   * Background audio settings.
   */
  music: {
    title: string;
    artist: string;
    customAudioUrl: string;
    defaultVolume: number; // 0.3 = 30%
  };
}

export const siteConfig: SiteConfig = {
  herName: "", // e.g. "My Moon", "Sarah" (Leave empty for default poetic phrasing)
  myName: "", // e.g. "Alex" (Leave empty for default signature)
  title: "A Little Light Beside Me",
  tagline: "Not every light is meant to become our moon.",
  enterButtonText: "Come a little closer ✨",
  closingMessage: "May your nights always have a gentle light beside you.",
  letter: {
    heading: "And there's something I wanted you to know...",
    paragraphs: [
      "Some people bring a little warmth into our lives without even realizing it.",
      "Maybe the most beautiful thing isn't always the light we spend our nights wishing for, but the light we finally learn to notice and appreciate.",
      "You deserve to be seen, valued, and cared for — simply for being you. ♡",
    ],
    closing: "A little story, with a little warmth, just for you.",
    readAgainText: "Read it again",
  },
  personalNote: "", // Optional extra personal message
  photos: [],
  music: {
    title: "Love Story",
    artist: "Indila",
    customAudioUrl: "/LoveStory_Indila.mp3",
    defaultVolume: 0.3, // 30% volume
  },
};
