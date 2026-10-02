// ─────────────────────────────────────────────────────────────
// Structural product data. Prose lives in src/i18n/locales/*.js
// under `productCopy.<id>` so it can be translated.
//
// Everything here is sourced from the GitBook docs and the Unity
// Asset Store publisher page. Fields marked `unverified` are
// claims the store makes that the documentation does not support —
// do not surface them as facts. See docs/PRODUCT-NOTES.md.
// ─────────────────────────────────────────────────────────────

export const LINKS = {
  assetStore: 'https://assetstore.unity.com/publishers/55731',
  docs: 'https://glitch9.gitbook.io/docs',
  docsAiDevKit: 'https://glitch9.gitbook.io/ai-dev-kit',
  docsNativeMediaPlayer: 'https://glitch9.gitbook.io/native-media-player',
  apiReference: 'https://glitch9inc.github.io/DocFx.AIDevKit/',
  aidevkit: 'https://aidevkit.dev',
  github: 'https://github.com/brainfrags',
  discord: 'https://discord.gg/hgajxPpJYf',
  x: 'https://x.com/Glitch9359327',
  xHandle: '@Glitch9359327',
  email: 'munchkin@brainfrags.com',
}

export const PRODUCTS = [
  {
    id: 'aidevkit-pro',
    slug: 'ai-dev-kit-pro',
    group: 'ai',
    name: 'AI Dev Kit PRO',
    price: '$39.99',
    featured: true,
    tags: ['Agents', 'RAG', 'Local AI'],
    version: '5.5.2',
    updated: '2026-07-26',
    minUnity: '6000.3.8',
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'Console'],
    dependencies: ['Newtonsoft.Json', 'UniTask'],
    providers: [
      'OpenAI',
      'Anthropic Claude',
      'Google Gemini',
      'ElevenLabs',
      'OpenRouter',
      'DeepSeek',
      'Ollama',
      'LM Studio',
      'Sherpa-ONNX',
    ],
    docsUrl: 'https://glitch9.gitbook.io/ai-dev-kit',
    url: 'https://assetstore.unity.com/packages/tools/ai-ml-integration/ai-devkit-pro-local-ai-rag-tools-281225',
  },
  {
    id: 'aidevkit-lab',
    slug: 'ai-dev-kit-research-lab',
    group: 'ai',
    name: 'AI Dev Kit RESEARCH LAB',
    price: '$79.99',
    tags: ['Gateway', 'Enterprise', 'Proxy'],
    version: '5.5.2',
    minUnity: '6000.3.8',
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'Console'],
    dependencies: ['Newtonsoft.Json', 'UniTask'],
    providers: [
      'Everything in PRO',
      'Microsoft Azure',
      'Amazon AWS',
      'GroqCloud',
      'Perplexity',
      'xAI Grok',
      'Cohere',
      'Mistral',
      'Replicate',
      'AI21',
      'Stability AI',
    ],
    docsUrl:
      'https://glitch9.gitbook.io/ai-dev-kit/introduction/enterprise-proxy-server-security',
    url: 'https://assetstore.unity.com/packages/tools/ai-ml-integration/ai-devkit-enterprise-327128',
  },
  {
    id: 'aidevkit-free',
    slug: 'ai-dev-kit',
    group: 'ai',
    name: 'AI Dev Kit',
    price: 'Free',
    tags: ['Text', 'Image', 'Audio'],
    version: '5.5.2',
    updated: '2026-07-26',
    minUnity: '6000.3.8',
    dependencies: ['Newtonsoft.Json', 'UniTask'],
    providers: ['OpenAI', 'ElevenLabs', 'OpenRouter'],
    docsUrl:
      'https://glitch9.gitbook.io/ai-dev-kit/introduction/readme/package-tiers',
    url: 'https://assetstore.unity.com/publishers/55731',
  },
  {
    id: 'ai-sheets',
    slug: 'ai-sheets',
    group: 'ai',
    name: 'AI Sheets',
    price: '$24.99',
    tags: ['Spreadsheet', 'Localization', 'Database'],
    version: '1.0.5',
    updated: '2026-07-22',
    minUnity: '6000.3.8',
    dependencies: ['Newtonsoft.Json', 'UniTask'],
    docsUrl:
      'https://glitch9.gitbook.io/ai-dev-kit/introduction/readme/add-ons/ai-sheets',
    url: 'https://assetstore.unity.com/packages/tools/ai-ml-integration/aidevkit-localization-ai-powered-spreadsheets-283657',
  },
  {
    id: 'ai-image-studio',
    slug: 'ai-image-studio',
    group: 'ai',
    name: 'AI Image Studio',
    price: '$29.99',
    tags: ['Generation', 'Editing', 'Editor tool'],
    version: '1.0.5',
    updated: '2026-08-03',
    minUnity: '6000.3.8',
    providers: ['Stability AI', 'Replicate'],
    docsUrl:
      'https://glitch9.gitbook.io/ai-dev-kit/introduction/readme/add-ons/image-studio',
    url: 'https://assetstore.unity.com/publishers/55731',
  },
  {
    id: 'native-media-player',
    slug: 'native-media-player',
    group: 'mobile',
    name: 'Native Media Player',
    price: '$39.99',
    featured: true,
    tags: ['Background audio', 'Playlists'],
    version: '5.3.8',
    updated: '2026-07-09',
    minUnity: '6.1.3f',
    platforms: ['Android 7.0+', 'iOS 11.0+'],
    dependencies: ['JDK 17+'],
    docsUrl: 'https://glitch9.gitbook.io/native-media-player',
    url: 'https://assetstore.unity.com/publishers/55731',
  },
  {
    id: 'background-audio-timer',
    slug: 'background-audio-timer',
    group: 'mobile',
    name: 'Background Audio Timer',
    price: '$14.99',
    tags: ['Background audio', 'Looping'],
    version: '6.0.1',
    updated: '2025-09-23',
    minUnity: '2022.3.17',
    platforms: ['Android 5.0+', 'iOS 11.0+'],
    docsUrl:
      'https://glitch9.gitbook.io/docs/mobile-plugins-for-unity/background-music-looper',
    url: 'https://assetstore.unity.com/publishers/55731',
  },
  {
    id: 'status-nav-bar',
    slug: 'status-and-navigation-bar',
    group: 'mobile',
    name: 'Status & Navigation Bar',
    price: '$14.99',
    tags: ['System UI', 'Android', 'iOS'],
    version: '2.0.2',
    updated: '2025-08-15',
    minUnity: '6000.1.3',
    // iOS landed in v2 — the GitBook page still says Android-only and is
    // stale. Values below follow the current store cover art.
    platforms: ['Android 5.0+', 'iOS 13.0+'],
    docsUrl:
      'https://glitch9.gitbook.io/docs/mobile-plugins-for-unity/status-and-navigation-bar',
    url: 'https://assetstore.unity.com/publishers/55731',
  },
  {
    id: 'lock-task',
    slug: 'lock-task',
    group: 'mobile',
    name: 'Lock Task',
    price: '$4.99',
    tags: ['Kiosk mode', 'Android'],
    version: '1.1.1',
    updated: '2024-05-09',
    minUnity: '2022.3.5',
    platforms: ['Android 6.0+'],
    docsUrl: 'https://glitch9.gitbook.io/docs/mobile-plugins-for-unity/lock-task',
    url: 'https://assetstore.unity.com/publishers/55731',
  },
  {
    id: 'serialization-saver',
    slug: 'serialization-saver',
    group: 'mobile',
    name: 'Serialization Saver',
    price: 'Free',
    tags: ['Editor tool', 'Backup'],
    version: '0.1.3',
    updated: '2024-07-06',
    minUnity: '2022.3.21',
    docsUrl: 'https://glitch9.gitbook.io/docs/unity-assets/serialization-saver',
    url: 'https://assetstore.unity.com/publishers/55731',
  },
]

// Bundled editor tooling — documented but not sold separately.
// Commit Gen was retired, so this is empty; the Tools page hides the
// whole section when it is. Add entries here if another one ships.
export const BUNDLED_TOOLS = []

export const SUPPORT_GUIDES = [
  {
    id: 'newtonsoft',
    title: 'How to set up Newtonsoft.Json',
    url: 'https://glitch9.gitbook.io/docs/support/how-to-setup-newtonsoft-json',
  },
  {
    id: 'unitask',
    title: 'How to set up UniTask',
    url: 'https://glitch9.gitbook.io/docs/support/how-to-setup-unitask',
  },
  {
    id: 'apikeys',
    title: 'API key setup & security',
    url: 'https://glitch9.gitbook.io/ai-dev-kit/getting-started/api-key-setup',
  },
  {
    id: 'troubleshooting',
    title: 'AI Dev Kit troubleshooting',
    url: 'https://glitch9.gitbook.io/ai-dev-kit/support/troubleshooting',
  },
]

// Store cover art lives in public/covers/<slug>-{480,1200}.webp.
// Every current product has one; guard anyway so a new entry without
// art degrades to no image instead of a broken one.
const WITH_COVERS = new Set(PRODUCTS.map((p) => p.slug))
export const coverSrc = (slug, width = 1200) =>
  WITH_COVERS.has(slug) ? `/covers/${slug}-${width}.webp` : null

export const bySlug = (slug) => PRODUCTS.find((p) => p.slug === slug)
export const byGroup = (group) => PRODUCTS.filter((p) => p.group === group)
