// ==========================================
// PASTE YOUR GOOGLE SHEET ID HERE
// ==========================================

const SHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";

// ==========================================
// FETCH TAB DATA
// ==========================================

async function fetchSheet(tabName) {

  const url =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${tabName}`;

  const response = await fetch(url);

  const data = await response.text();

  return data
    .split("\n")
    .slice(1)
    .map(row => row.trim())
    .filter(row => row !== "");
}

// ==========================================
// RANDOM GENERATOR
// ==========================================

async function generate(tabName, outputId) {

  const entries = await fetchSheet(tabName);

  const randomItem =
    entries[Math.floor(Math.random() * entries.length)];

  document.getElementById(outputId).innerText =
    randomItem;
}
