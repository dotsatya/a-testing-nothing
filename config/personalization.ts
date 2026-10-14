export interface SiteConfig {
  /**
   * Her name or nickname.
   * If provided, it can be woven into the opening dedication and salutation.
   * If left empty, defaults to gentle poetic phrasing ("for you").
   */
  herName: string;

  /**
   * Your name or nickname for the closing signature.
   * If left empty, defaults to "A little story, with a little warmth, just for you."
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
   * Hero opening heading, supporting text, and CTA.
   */
  hero: {
    heading: string;
    supportingText: string;
    ctaButton: string;
  };

  /**
   * The 4 Story Scenes.
   */
  scenes: {
    scene1: {
      title: string;
      text: string;
    };
    scene2: {
      title: string;
      text: string;
    };
    scene3: {
      title: string;
      text: string;
      revelation: string;
    };
  };

  /**
   * Scene 4 Personal Love Letter settings.
   */
  letter: {
    heading: string;
    paragraphs: string[];
    closing: string;
    hiddenLanternMessage: string;
    replayButtonText: string;
  };

  /**
   * Optional custom note added inside the letter.
   */
  personalNote?: string;

  /**
   * Optional photos / polaroids for the letter section.
   */
  photos?: { url: string; caption: string; date?: string }[];

  /**
   * Closing message fallback.
   */
  closingMessage?: string;

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
  myName: "", // e.g. "Yours", "Alex" (Leave empty for default signature)
  title: "A Little Light Beside Me",
  tagline: "Not every light is meant to become our moon.",
  closingMessage: "May your nights always have a gentle light beside you.",
  photos: [],

  hero: {
    heading: "Somewhere between the moon and the light...",
    supportingText: "There is a little story I want to share with you.",
    ctaButton: "Come a little closer ✨",
  },

  scenes: {
    scene1: {
      title: "The Moon",
      text: "He spent his nights wishing for the moon, hoping that one day it might come a little closer.",
    },
    scene2: {
      title: "The Lantern",
      text: "All the while, a little lantern kept glowing beside him, offering its warmth without asking to be noticed.",
    },
    scene3: {
      title: "The Realization",
      text: "Perhaps he had been so busy longing for a distant light that he forgot to notice the warmth already beside him.",
      revelation: "The moon was never wrong for being far away. And the lantern was never wrong for shining.",
    },
  },

  letter: {
    heading: "And there's something I wanted you to know...",
    paragraphs: [
      "Some people bring a little warmth into our lives without even realizing it.",
      "Maybe the most beautiful thing isn't always the light we spend our nights wishing for, but the light we learn to notice and appreciate.",
      "You deserve to be seen, valued, and cared for — simply for being you.",
      "And I hope this little story makes you smile, because it was made especially for you. ♡",
    ],
    closing: "A little story, with a little warmth, just for you.",
    hiddenLanternMessage: "If this little light made you smile, then it has already done something beautiful tonight. ♡",
    replayButtonText: "Read our story again",
  },

  personalNote: "", // Optional extra personal message

  music: {
    title: "Love Story",
    artist: "Indila",
    customAudioUrl: "/LoveStory_Indila.mp3",
    defaultVolume: 0.3, // 30% volume
  },
};
