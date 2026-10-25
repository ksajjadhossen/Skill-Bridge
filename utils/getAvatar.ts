export interface UserAvatarProps {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

export function getUserAvatar(
  user: UserAvatarProps | null | undefined,
): string | null {
  if (!user) return null;

  if (user.image) {
    return user.image;
  }

  if (user.name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name,
    )}&background=0D9488&color=fff&bold=true`;
  }

  if (user.email) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.email,
    )}&background=0D9488&color=fff&bold=true`;
  }

  return null;
}
