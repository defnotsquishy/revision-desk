export function screenShakeAllowed(enabled: boolean, websiteMotion: string | undefined, systemReducedMotion: boolean): boolean {
  return enabled && websiteMotion !== 'reduce' && !systemReducedMotion;
}
