export const dogRaces = [
  {
    id: "1",
    name: "Golden Retriever",
    country: "Scotland",
    max_age: 12,
    hight: 24.0,
    width: 65.0,
    is_dangerous: false,
    registration_timestamp_s: 1640995200, // 2022-01-01 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1704067200000, // 2024-01-01 00:00:00 UTC in milliseconds
    birth_date: 1609459200000, // 2021-01-01 00:00:00 UTC (epoch milliseconds)
    characteristics: {
      temperament: ["Friendly", "Intelligent", "Devoted"],
      energy_level: "High",
      good_with_kids: true,
      training_difficulty: "Easy",
    },
  },
  {
    id: "2",
    name: "German Shepherd",
    country: "Germany",
    max_age: 13,
    hight: 26.0,
    width: 75.0,
    is_dangerous: false,
    registration_timestamp_s: 1672531200, // 2023-01-01 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1706745600000, // 2024-02-01 00:00:00 UTC in milliseconds
    birth_date: 1612137600000, // 2021-02-01 00:00:00 UTC (epoch milliseconds)
    characteristics: ["Loyal", "Courageous", "Versatile", "Confident"],
  },
  {
    id: "3",
    name: "Rottweiler",
    country: "Germany",
    max_age: 10,
    hight: 27.0,
    width: 110.0,
    is_dangerous: true,
    registration_timestamp_s: 1641081600, // 2022-01-02 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1709424000000, // 2024-03-03 00:00:00 UTC in milliseconds
    birth_date: 1614556800000, // 2021-03-01 00:00:00 UTC (epoch milliseconds)
    characteristics: {
      temperament: "Protective",
      size_category: "Large",
      guard_dog: true,
      exercise_needs: ["Daily walks", "Mental stimulation"],
    },
  },
  {
    id: "4",
    name: "Labrador Retriever",
    country: "Canada",
    max_age: 14,
    hight: 24.5,
    width: 70.0,
    is_dangerous: false,
    registration_timestamp_s: 1643760000, // 2022-02-01 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1712016000000, // 2024-04-02 00:00:00 UTC in milliseconds
    birth_date: 1617235200000, // 2021-04-01 00:00:00 UTC (epoch milliseconds)
    characteristics: null,
  },
  {
    id: "5",
    name: "Bulldog",
    country: "England",
    max_age: 10,
    hight: 16.0,
    width: 50.0,
    is_dangerous: false,
    registration_timestamp_s: null,
    last_checkup_timestamp_ms: undefined,
    birth_date: null,
    characteristics: ["Docile", "Willful", "Friendly"],
  },
  {
    id: "6",
    name: "Poodle",
    country: "France",
    max_age: 15,
    hight: 24.0,
    width: 60.0,
    is_dangerous: false,
    registration_timestamp_s: 1646092800, // 2022-03-01 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1714694400000, // 2024-05-03 00:00:00 UTC in milliseconds
    birth_date: 1619827200000, // 2021-05-01 00:00:00 UTC (epoch milliseconds)
    characteristics: {
      coat_type: "Curly",
      hypoallergenic: true,
      intelligence_rank: 2,
      variations: ["Standard", "Miniature", "Toy"],
    },
  },
  {
    id: "7",
    name: "Siberian Husky",
    country: "Russia",
    max_age: 14,
    hight: 23.5,
    width: 60.0,
    is_dangerous: false,
    registration_timestamp_s: 1648771200, // 2022-04-01 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1717372800000, // 2024-06-03 00:00:00 UTC in milliseconds
    birth_date: 1622505600000, // 2021-06-01 00:00:00 UTC (epoch milliseconds)
    characteristics: ["Energetic", "Outgoing", "Mischievous"],
  },
  {
    id: "8",
    name: "Doberman Pinscher",
    country: "Germany",
    max_age: 13,
    hight: 28.0,
    width: 88.0,
    is_dangerous: true,
    registration_timestamp_s: 1651363200, // 2022-05-01 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1720051200000, // 2024-07-04 00:00:00 UTC in milliseconds
    birth_date: 1625097600000, // 2021-07-01 00:00:00 UTC (epoch milliseconds)
    characteristics: {
      purpose: "Protection",
      alertness: "Very High",
      loyalty: true,
      training: {
        difficulty: "Moderate",
        specialties: ["Guard work", "Police work"],
      },
    },
  },
  {
    id: "9",
    name: "Border Collie",
    country: "Scotland",
    max_age: 16,
    hight: 22.0,
    width: 45.0,
    is_dangerous: false,
    registration_timestamp_s: 1654041600, // 2022-06-01 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1722729600000, // 2024-08-04 00:00:00 UTC in milliseconds
    birth_date: 1627776000000, // 2021-08-01 00:00:00 UTC (epoch milliseconds)
    characteristics: "Extremely intelligent and highly trainable",
  },
  {
    id: "10",
    name: "Pit Bull Terrier",
    country: "United States",
    max_age: 12,
    hight: 21.0,
    width: 65.0,
    is_dangerous: true,
    registration_timestamp_s: 1656720000, // 2022-07-02 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1725408000000, // 2024-09-04 00:00:00 UTC in milliseconds
    birth_date: 1630454400000, // 2021-09-01 00:00:00 UTC (epoch milliseconds)
    characteristics: {
      misconceptions: [
        "Often misunderstood",
        "Can be gentle with proper training",
      ],
      requires: ["Experienced owner", "Early socialization"],
      strength: 9.5,
    },
  },
  {
    id: "10a",
    name: "Mixed Breed",
    country: "Unknown",
    max_age: 12,
    hight: 20.0,
    width: 50.0,
    is_dangerous: null,
    registration_timestamp_s: 1659398400, // 2022-08-02 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: null,
    birth_date: 1633046400000, // 2021-10-01 00:00:00 UTC (epoch milliseconds)
    characteristics: ["Variable traits", "Unique personality"],
  },
  {
    id: "10b",
    name: "Unknown Breed",
    country: "Unknown",
    max_age: 10,
    hight: 18.0,
    width: 45.0,
    appearance_date: "2000-01-01",
    is_dangerous: undefined,
  },
  {
    id: "10c",
    name: "Stray Dog",
    country: "Unknown",
    max_age: null,
    hight: 16.0,
    width: 40.0,
    appearance_date: "2020-01-01",
    is_dangerous: false,
  },
  {
    id: "10d",
    name: "Rescue Dog",
    country: "Unknown",
    max_age: undefined,
    hight: 22.0,
    width: 55.0,
    appearance_date: "2021-01-01",
    is_dangerous: false,
  },
  {
    id: "11",
    name: "Chihuahua",
    country: "Mexico",
    max_age: 18,
    hight: 8.0,
    width: 6.0,
    appearance_date: "1904-01-01",
    is_dangerous: false,
  },
  {
    id: "12",
    name: "Great Dane",
    country: "Germany",
    max_age: 10,
    hight: 32.0,
    width: 140.0,
    appearance_date: "1876-01-01",
    is_dangerous: false,
  },
  {
    id: "13",
    name: "Beagle",
    country: "England",
    max_age: 15,
    hight: 15.0,
    width: 30.0,
    appearance_date: "1885-01-01",
    is_dangerous: false,
  },
  {
    id: "14",
    name: "Yorkshire Terrier",
    country: "England",
    max_age: 16,
    hight: 8.0,
    width: 7.0,
    is_dangerous: false,
    registration_timestamp_s: 1672531200, // 2023-01-01 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1677628800000, // 2023-03-01 00:00:00 UTC in milliseconds
    birth_date: 1609459200000, // 2021-01-01 00:00:00 UTC (epoch milliseconds)
    characteristics: {
      size: "Toy",
      personality: ["Energetic", "Brave", "Determined"],
      grooming_needs: "High",
      apartment_suitable: true,
    },
  },
  {
    id: "15",
    name: "Boxer",
    country: "Germany",
    max_age: 12,
    hight: 25.0,
    width: 70.0,
    appearance_date: "1895-01-01",
    is_dangerous: false,
  },
  {
    id: "16",
    name: "Dachshund",
    country: "Germany",
    max_age: 14,
    hight: 9.0,
    width: 32.0,
    appearance_date: "1885-01-01",
    is_dangerous: false,
  },
  {
    id: "17",
    name: "Australian Shepherd",
    country: "United States",
    max_age: 15,
    hight: 23.0,
    width: 65.0,
    appearance_date: "1957-01-01",
    is_dangerous: false,
  },
  {
    id: "18",
    name: "Shih Tzu",
    country: "Tibet",
    max_age: 16,
    hight: 10.5,
    width: 16.0,
    appearance_date: "1969-01-01",
    is_dangerous: false,
  },
  {
    id: "19",
    name: "Boston Terrier",
    country: "United States",
    max_age: 13,
    hight: 17.0,
    width: 25.0,
    appearance_date: "1893-01-01",
    is_dangerous: false,
  },
  {
    id: "20",
    name: "Pomeranian",
    country: "Germany",
    max_age: 16,
    hight: 7.0,
    width: 7.0,
    appearance_date: "1888-01-01",
    is_dangerous: false,
  },
  {
    id: "21",
    name: "Australian Cattle Dog",
    country: "Australia",
    max_age: 16,
    hight: 20.0,
    width: 50.0,
    appearance_date: "1903-01-01",
    is_dangerous: false,
  },
  {
    id: "22",
    name: "Mastiff",
    country: "England",
    max_age: 10,
    hight: 30.0,
    width: 230.0,
    appearance_date: "1885-01-01",
    is_dangerous: true,
  },
  {
    id: "23",
    name: "Cocker Spaniel",
    country: "England",
    max_age: 14,
    hight: 16.0,
    width: 30.0,
    appearance_date: "1946-01-01",
    is_dangerous: false,
  },
  {
    id: "24",
    name: "Brittany",
    country: "France",
    max_age: 14,
    hight: 20.5,
    width: 40.0,
    appearance_date: "1907-01-01",
    is_dangerous: false,
  },
  {
    id: "25",
    name: "Springer Spaniel",
    country: "England",
    max_age: 14,
    hight: 20.0,
    width: 50.0,
    appearance_date: "1910-01-01",
    is_dangerous: false,
  },
  {
    id: "26",
    name: "Bernese Mountain Dog",
    country: "Switzerland",
    max_age: 8,
    hight: 27.0,
    width: 115.0,
    appearance_date: "1937-01-01",
    is_dangerous: false,
  },
  {
    id: "27",
    name: "Cane Corso",
    country: "Italy",
    max_age: 12,
    hight: 28.0,
    width: 110.0,
    appearance_date: "2010-01-01",
    is_dangerous: true,
  },
  {
    id: "28",
    name: "Collie",
    country: "Scotland",
    max_age: 14,
    hight: 26.0,
    width: 75.0,
    appearance_date: "1885-01-01",
    is_dangerous: false,
  },
  {
    id: "29",
    name: "Weimaraner",
    country: "Germany",
    max_age: 13,
    hight: 27.0,
    width: 90.0,
    is_dangerous: false,
    registration_timestamp_s: 1698796800, // 2023-11-01 00:00:00 UTC in seconds
    last_checkup_timestamp_ms: 1730332800000, // 2024-10-31 00:00:00 UTC in milliseconds
    birth_date: 1640995200000, // 2022-01-01 00:00:00 UTC (epoch milliseconds)
    characteristics: "Gray ghost - elegant hunting companion",
  },
  {
    id: "30",
    name: "Basset Hound",
    country: "France",
    max_age: 12,
    hight: 15.0,
    width: 65.0,
    appearance_date: "1885-01-01",
    is_dangerous: false,
  },
  {
    id: "31",
    name: "Newfoundland",
    country: "Canada",
    max_age: 10,
    hight: 28.0,
    width: 150.0,
    appearance_date: "1886-01-01",
    is_dangerous: false,
  },
  {
    id: "32",
    name: "Rhodesian Ridgeback",
    country: "Zimbabwe",
    max_age: 12,
    hight: 27.0,
    width: 85.0,
    appearance_date: "1955-01-01",
    is_dangerous: false,
  },
  {
    id: "33",
    name: "Shiba Inu",
    country: "Japan",
    max_age: 16,
    hight: 16.5,
    width: 23.0,
    appearance_date: "1992-01-01",
    is_dangerous: false,
  },
  {
    id: "34",
    name: "Akita",
    country: "Japan",
    max_age: 13,
    hight: 28.0,
    width: 130.0,
    appearance_date: "1972-01-01",
    is_dangerous: true,
  },
  {
    id: "35",
    name: "Vizsla",
    country: "Hungary",
    max_age: 14,
    hight: 24.0,
    width: 60.0,
    appearance_date: "1960-01-01",
    is_dangerous: false,
  },
  {
    id: "36",
    name: "Whippet",
    country: "England",
    max_age: 15,
    hight: 22.0,
    width: 40.0,
    appearance_date: "1888-01-01",
    is_dangerous: false,
  },
  {
    id: "37",
    name: "Havanese",
    country: "Cuba",
    max_age: 16,
    hight: 11.5,
    width: 13.0,
    appearance_date: "1996-01-01",
    is_dangerous: false,
  },
  {
    id: "38",
    name: "Portuguese Water Dog",
    country: "Portugal",
    max_age: 14,
    hight: 23.0,
    width: 60.0,
    appearance_date: "1983-01-01",
    is_dangerous: false,
  },
  {
    id: "39",
    name: "Cavalier King Charles",
    country: "England",
    max_age: 14,
    hight: 13.0,
    width: 18.0,
    appearance_date: "1995-01-01",
    is_dangerous: false,
  },
  {
    id: "40",
    name: "Saint Bernard",
    country: "Switzerland",
    max_age: 10,
    hight: 30.0,
    width: 180.0,
    appearance_date: "1885-01-01",
    is_dangerous: false,
  },
  {
    id: "41",
    name: "Not existing",
    country: "",
    max_age: 10,
    hight: 30.0,
    width: 180.0,
    appearance_date: "1885-01-01",
    is_dangerous: false,
  },
  {
    id: "42",
    name: "Unknown Breed",
    country: null,
    max_age: null,
    hight: 25.0,
    width: null,
    appearance_date: null,
    is_dangerous: false,
  },
  {
    id: "43",
    name: null,
    country: "Unknown",
    max_age: 8,
    hight: null,
    width: 50.0,
    is_dangerous: null,
    registration_timestamp_s: undefined,
    last_checkup_timestamp_ms: 1704067200000, // 2024-01-01 00:00:00 UTC in milliseconds
    birth_date: undefined,
    characteristics: {
      status: "Unknown breed",
      note: "Needs genetic testing",
      estimated_mix: null,
    },
  },
];

// Utility function to add missing fields to entries that don't have them
export const addMissingFieldsToEntries = () => {
  const sampleCharacteristics = [
    ["Loyal", "Friendly"],
    { temperament: "Gentle", energy: "Medium" },
    "Well-balanced breed",
    null,
    { training: "Easy", exercise_needs: "Daily walks" },
    ["Protective", "Alert"],
    undefined,
  ];

  return dogRaces.map((entry, index) => {
    // If entry already has the new fields, return as is
    if ("registration_timestamp_s" in entry) {
      return entry;
    }

    // Add missing fields with sample data
    const baseYear = 2022;
    const registrationDate = new Date(baseYear, index % 12, (index % 28) + 1);
    const checkupDate = new Date(
      2024,
      (index + 3) % 12,
      ((index + 5) % 28) + 1
    );
    const birthDate = new Date(2021, (index + 6) % 12, ((index + 2) % 28) + 1);

    return {
      ...entry,
      registration_timestamp_s:
        Math.random() > 0.1
          ? Math.floor(registrationDate.getTime() / 1000)
          : null,
      last_checkup_timestamp_ms:
        Math.random() > 0.05 ? checkupDate.getTime() : null,
      birth_date: Math.random() > 0.05 ? birthDate.getTime() : null,
      characteristics:
        sampleCharacteristics[index % sampleCharacteristics.length],
    };
  });
};

// Uncomment the line below to populate missing fields for all entries
// export const enrichedDogRaces = addMissingFieldsToEntries();
