export interface StoryPart {
  partNumber: number;
  subtitle: string;
  text: string;
}

export interface SiteConfig {
  herName: string;
  myName: string;
  creatorName?: string;
  footerCredit?: string;
  title: string;
  tagline: string;

  /**
   * Initial screen content.
   */
  intro: {
    badge: string;
    heading: string;
    passage: string;
    buttonText: string;
  };

  /**
   * The 4 concise story parts.
   */
  storyParts: StoryPart[];

  /**
   * Replay button label on the final part.
   */
  replayButtonText: string;

  /**
   * Background audio settings.
   */
  music: {
    title: string;
    artist: string;
    customAudioUrl: string;
    defaultVolume: number;
  };

  /**
   * Optional legacy properties for backwards compatibility.
   */
  opening?: {
    introText: string;
    heading: string;
    story: string[];
    buttonText: string;
  };
  revealed?: {
    heading: string;
    message: string[];
    closingSignature: string;
    replayButtonText: string;
  };
  lantern?: {
    hiddenMessage: string;
    hintText: string;
  };
  hero?: {
    heading: string;
    supportingText: string;
    ctaButton: string;
  };
  scenes?: Record<string, { title: string; text: string; revelation?: string }>;
  letter?: {
    heading: string;
    paragraphs: string[];
    closing: string;
    hiddenLanternMessage: string;
    replayButtonText: string;
  };
  personalNote?: string;
  photos?: { url: string; caption: string; date?: string }[];
  closingMessage?: string;
}

export const siteConfig: SiteConfig = {
  herName: "", // e.g. "My Moon" (Leave empty for default poetic phrasing)
  myName: "Ranajit", // e.g. "Ranajit"
  creatorName: "Ranajit",
  footerCredit: "Created by Ranajit",
  title: "A Light That Never Asked to Be the Moon",
  tagline: "A little story for someone special ♡",

  intro: {
    badge: "A little story for someone special ♡",
    heading: "A Light That Never Asked to Be the Moon",
    passage:
      "There was once a boy who spent his nights wishing for the moon, never noticing the little lantern that quietly glowed beside him.",
    buttonText: "Read the story ✨",
  },

  storyParts: [
    {
      partNumber: 1,
      subtitle: "The Moon",
      text: "He spent his nights admiring the moon, wishing that one day it would come a little closer.",
    },
    {
      partNumber: 2,
      subtitle: "The Lantern",
      text: "Beside his window, a little lantern kept glowing quietly. But he was too busy wishing for the moon to notice.",
    },
    {
      partNumber: 3,
      subtitle: "The Night",
      text: "One night, clouds covered the sky. The moon disappeared, but the little lantern was still there, shining beside him.",
    },
    {
      partNumber: 4,
      subtitle: "The Realization",
      text: "He finally understood that the moon was never wrong for being far away, and the lantern was never wrong for shining. He learned to see its warmth for what it truly was.",
    },
  ],

  replayButtonText: "Read again",

  music: {
    title: "Love Story",
    artist: "Indila",
    customAudioUrl: "/LoveStory_Indila.mp3",
    defaultVolume: 0.3,
  },

  // Backwards compatibility fallbacks
  opening: {
    introText: "A little story for someone special ♡",
    heading: "A Light That Never Asked to Be the Moon",
    story: [
      "There was once a boy who spent his nights wishing for the moon, never noticing the little lantern that quietly glowed beside him.",
    ],
    buttonText: "Read the story ✨",
  },
  revealed: {
    heading: "The Realization",
    message: [
      "He finally understood that the moon was never wrong for being far away, and the lantern was never wrong for shining. He learned to see its warmth for what it truly was.",
    ],
    closingSignature: "With a little warmth, just for you.",
    replayButtonText: "Read again",
  },
  lantern: {
    hiddenMessage: "Some lights make the night feel warmer. ♡",
    hintText: "tap the lantern",
  },
};


