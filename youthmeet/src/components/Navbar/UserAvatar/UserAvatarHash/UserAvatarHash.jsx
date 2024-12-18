

export default function UserAvatarHash(str) {
    const colors = ["#F0F0F0", "#B2E0B2", "#FFDAB9", "#E6E6FA", "#FFFDD0"];
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