// ==========================================
// SHEET URLS
// ==========================================

const sheetURLs = {

  "Who":
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=1635706100&single=true&output=csv",

  "Where":
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=0&single=true&output=csv",

  "When":
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=1712047057&single=true&output=csv",

  "What":
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=793795044&single=true&output=csv",

  "Why":
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=700876301&single=true&output=csv",

  "How":
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=1945825130&single=true&output=csv",

  "WorkingIn":
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=1819449839&single=true&output=csv",

  "Adjective":
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=1874611889&single=true&output=csv"
};

// ==========================================
// CACHE
// ==========================================

const cachedData = {};

// ==========================================
// LOAD ALL SHEETS
// ==========================================

async function preloadSheets() {

  for (const key in sheetURLs) {

    try {

      const response = await fetch(sheetURLs[key]);

      const text = await response.text();

      cachedData[key] = text
        .split("\n")
        .slice(1)
        .map(row => row.trim())
        .filter(row => row !== "");

      console.log(`Loaded: ${key}`);

    } catch (error) {

      console.error(`Failed loading ${key}`, error);

    }
  }

  console.log("All sheets preloaded.");
}

// ==========================================
// GENERATE RANDOM ITEM
// ==========================================

function generate(sheetName, outputId) {

  const entries = cachedData[sheetName];

  if (!entries || entries.length === 0) {

    document.getElementById(outputId).innerText =
      "No data loaded.";

    return;
  }

  const randomItem =
    entries[Math.floor(Math.random() * entries.length)];

  const outputElement =
  document.getElementById(outputId);

if (!outputElement) {

  console.error(`Missing output element: ${outputId}`);
  return;
}

outputElement.innerText = randomItem;
}

// ==========================================
// BUTTON EVENTS
// ==========================================

document.querySelectorAll("button").forEach(button => {

  button.addEventListener("click", () => {

    const sheet =
      button.dataset.sheet;

    const output =
      button.dataset.output;

    generate(sheet, output);

  });
});

// ==========================================
// STARTUP
// ==========================================

preloadSheets();
