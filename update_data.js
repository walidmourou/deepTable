// Simple script to update all entries in dataList.ts with missing fields
const fs = require("fs");

// Read the current file
const filePath = "./src/app/data/dataList.ts";
let content = fs.readFileSync(filePath, "utf8");

// Function to generate random timestamp
function getRandomTimestamp(year, month) {
  const date = new Date(year, month, Math.floor(Math.random() * 28) + 1);
  return Math.floor(date.getTime() / 1000); // Convert to seconds
}

function getRandomTimestampMs(year, month) {
  const date = new Date(year, month, Math.floor(Math.random() * 28) + 1);
  return date.getTime(); // Keep in milliseconds
}

function getRandomBirthDate(year) {
  const date = new Date(
    year,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  );
  return date.getTime();
}

// Sample characteristics variations
const characteristics = [
  '["Friendly", "Active"]',
  '{"temperament": "Calm", "good_with_children": true}',
  '"Single trait description"',
  "null",
  '{"energy": "High", "trainability": "Excellent", "shedding": "Moderate"}',
  '["Protective", "Loyal", "Intelligent"]',
];

// Replace entries that don't have the new fields
const updatedContent = content.replace(
  /(\s+id: "[^"]+",\s+name: [^,]+,\s+country: [^,]+,\s+max_age: [^,]+,\s+hight: [^,]+,\s+width: [^,]+,\s+appearance_date: [^,]+,\s+is_dangerous: [^,}]+),(\s+})/g,
  (match, beforeFields, closing) => {
    const randomChar =
      characteristics[Math.floor(Math.random() * characteristics.length)];
    const regTs =
      Math.random() > 0.2
        ? getRandomTimestamp(2022, Math.floor(Math.random() * 12))
        : "null";
    const checkupTs =
      Math.random() > 0.15
        ? getRandomTimestampMs(2024, Math.floor(Math.random() * 12))
        : "null";
    const birthDate = Math.random() > 0.1 ? getRandomBirthDate(2021) : "null";

    return (
      beforeFields +
      `,
    registration_timestamp_s: ${regTs},
    last_checkup_timestamp_ms: ${checkupTs},
    birth_date: ${birthDate},
    characteristics: ${randomChar},` +
      closing
    );
  }
);

// Write back to file
fs.writeFileSync(filePath, updatedContent);
console.log("Updated dataList.ts with new fields");
