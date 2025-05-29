function generatePassword(name) {
  if (!name) return "";

  // Convert to uppercase and remove special characters
  const cleanName = name
    .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
    .trim()
    .toUpperCase();

  // Split words and take the first letter of each
  const initials = cleanName.split(" ").map(word => word.charAt(0)).join("");

  // Append a random number (for uniqueness)
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number

  return `${initials}${randomNum}`;
}

export default generatePassword;
