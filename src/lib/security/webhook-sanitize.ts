const MARKDOWN_SPECIAL_CHARS = /([\\`*_\[\]()~#>])/g;
const MENTION_PATTERN = /@(all|everyone|here|所有人)/gi;

function neutralizeMentionsAndTags(input: string): string {
  return input
    .replace(/[<>]/g, (ch) => (ch === "<" ? "＜" : "＞"))
    .replace(MENTION_PATTERN, "@\u200B$1");
}

/**
 * Sanitizes a single-line field for safe embedding in WeCom / Feishu markdown messages.
 */
export function sanitizeWebhookSingleLine(value: string, maxLen = 200): string {
  const collapsed = value.replace(/[\r\n\t]+/g, " ").trim().slice(0, maxLen);
  const safeTags = neutralizeMentionsAndTags(collapsed);
  return safeTags.replace(MARKDOWN_SPECIAL_CHARS, "\\$1");
}

/**
 * Sanitizes a multi-line field for safe embedding in WeCom / Feishu markdown messages
 * while preserving readable line breaks.
 */
export function sanitizeWebhookMultiLine(value: string, maxLen = 2000): string {
  const normalized = value.replace(/\r\n?/g, "\n").trim().slice(0, maxLen);
  const safeTags = neutralizeMentionsAndTags(normalized);
  return safeTags.replace(MARKDOWN_SPECIAL_CHARS, "\\$1");
}

/**
 * Extracts a safe `tel:` URI value only if the contact looks like a phone number;
 * returns `null` for WeChat IDs, emails, or non-phone strings.
 */
export function sanitizeTelUri(contact: string): string | null {
  const trimmed = contact.trim();
  if (!/^[+\d\s\-()]+$/.test(trimmed)) {
    return null;
  }
  const normalized = trimmed.replace(/[^\d+]/g, "");
  const digitCount = normalized.replace(/\D/g, "").length;
  if (digitCount < 7 || digitCount > 20) {
    return null;
  }
  return normalized;
}
