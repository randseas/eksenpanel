export function extractOS(userAgent: string): string | null {
  const match = userAgent.match(/\(([^)]+)\)/);
  if (match && match[1]) {
    const osInfo = match[1].split(";").slice(0, 2)[0].trim();
    return osInfo;
  }
  return null;
}
export function detectDeviceType(
  userAgent: string
): "desktop" | "mobile" | "tablet" | "watch" | "tv" | "console" | "unknown" {
  userAgent = userAgent.toLowerCase();
  if (/watch|sm-r|gt-i91|applewatch|wear\s?os|tizen|garmin/i.test(userAgent)) {
    return "watch";
  }
  if (
    /smart-tv|tv|apple\s?tv|android\s?tv|fire\s?tv|tizen\s?tv|hbbtv/i.test(
      userAgent
    )
  ) {
    return "tv";
  }
  if (/playstation|xbox|nintendo|wii|switch/i.test(userAgent)) {
    return "console";
  }
  if (
    /ipad|tablet|nexus\s(7|9|10)|sm-t|lenovo tab|gt-p|android(?!.*mobile)|kindle|silk/i.test(
      userAgent
    )
  ) {
    return "tablet";
  }
  if (
    /iphone|android.*mobile|blackberry|windows\s?phone|opera\s?mini|nokia|webos/i.test(
      userAgent
    )
  ) {
    return "mobile";
  }
  if (/windows nt|macintosh|linux|x11|cros/i.test(userAgent)) {
    return "desktop";
  }
  return "unknown";
}
