/** Initial style for GSAP reveal animations — opacity:0 + translateY, animated by ScrollTrigger */
export const GSAP_REVEAL_STYLE = { opacity: 0, transform: 'translateY(60px)' } as const;

/** Canvas centering style used on all simulation canvases */
export const CANVAS_STYLE = { maxWidth: 500, margin: '0 auto', display: 'block' } as const;

/** Blob animation delay constants — avoid creating new objects every render */
export const BLOB_DELAY_0S = { animationDelay: '0s' } as const;
export const BLOB_DELAY_2S = { animationDelay: '2s' } as const;
export const BLOB_DELAY_5S = { animationDelay: '5s' } as const;
export const BLOB_DELAY_7S = { animationDelay: '7s' } as const;
export const BLOB_DELAY_10S = { animationDelay: '10s' } as const;

/** PhysicsBackground canvas opacity */
export const CANVAS_OPACITY_60 = { opacity: 0.6 } as const;
