

export default function UserAvatarHash(str) {
    const colors = ["#e51c23", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"];
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