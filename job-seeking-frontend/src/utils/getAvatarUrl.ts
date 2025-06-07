export function getAvatarUrl(avatarPath?: string | null) {
  if (!avatarPath) return undefined;
  if (avatarPath.startsWith('http')) return avatarPath;
  // Ưu tiên lấy domain từ biến môi trường API, fallback sang window.location.origin
  const domain =
    process.env.API ||
    (typeof window !== 'undefined' ? window.location.origin : '');
  return `${domain}${avatarPath}`;
}