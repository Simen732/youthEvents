export default function UserAvatarHash(str) {
  const colors = ["#F0F0F0", "#B2E0B2", "#FFDAB9", "#E6E6FA", "#FFFDD0"];

  // Check if the input string is valid
  if (!str || str.length === 0) {
      // Return a default color or handle as needed
      return colors[0]; // Return the first color as a default
  }

  let hash = 0;

  // Create a hash from the string
  for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
  }

  // Use the hash to pick a color
  const index = Math.abs(hash % colors.length);
  return colors[index];
}