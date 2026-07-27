export function createSubmissionTokenGuard(windowMs = 30 * 60_000) {
  const processedTokens = new Map<string, number>();

  return {
    isDuplicate(token: string, now = Date.now()) {
      for (const [knownToken, processedAt] of processedTokens) {
        if (now - processedAt >= windowMs) processedTokens.delete(knownToken);
      }
      if (processedTokens.has(token)) return true;
      processedTokens.set(token, now);
      return false;
    },
  };
}
