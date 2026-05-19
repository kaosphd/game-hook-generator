// ==========================================
// GOOGLE SHEET CSV URLS
// ==========================================

const sheetURLs = {

  Who:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=1635706100&single=true&output=csv",

  Where:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=0&single=true&output=csv",

  When:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=1712047057&single=true&output=csv",

  What:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=793795044&single=true&output=csv",

  Why:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=700876301&single=true&output=csv",

  How:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=1945825130&single=true&output=csv",

  WorkingIn:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=1819449839&single=true&output=csv",

  Adjective:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_5zWPlvOCNffXkC7cq1GtUt-inijCocyStwl8WCeZzt7Riei15QdUE1BfM1_6tf4nTMx9xMBpZII/pub?gid=1874611889&single=true&output=csv"
};

// ==========================================
// FETCH SHEET DATA
// ==========================================

async function fetchSheet(tabName) {

  const response = await fetch(sheetURLs[tabName]);

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
