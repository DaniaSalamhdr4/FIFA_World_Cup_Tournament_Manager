//Groups information
let initialGroups = [];
let matches = [];
let knockoutMatches = [];
let groupLocked = false;
let currentPhase = "groups";
const savedData = localStorage.getItem("wc_tournament_data");
let userInteracted = false; // to track if the user has interacted with the page for enabling sound effects on champion announcement
if (savedData) {
  const parsedData = JSON.parse(savedData);

  initialGroups = parsedData.groups;
  matches = parsedData.matches;
  knockoutMatches = parsedData.knockoutMatches || [];
  groupLocked = parsedData.groupLocked || false;
  currentPhase = parsedData.currentPhase || "groups";

  console.log("uploaded data from localStorage");
} else {
  initialGroups = {
    A: [
      { name: "USA", points: 0, gd: 0 },
      { name: "Germany", points: 0, gd: 0 },
      { name: "South Korea", points: 0, gd: 0 },
      { name: "Nigeria", points: 0, gd: 0 },
    ],
    B: [
      { name: "UA", points: 0, gd: 0 },
      { name: "North Korea", points: 0, gd: 0 },
      { name: "China", points: 0, gd: 0 },
      { name: "Jappan", points: 0, gd: 0 },
    ],
    C: [
      { name: "Iraq", points: 0, gd: 0 },
      { name: "UK", points: 0, gd: 0 },
      { name: "Brazil", points: 0, gd: 0 },
      { name: "Portugal", points: 0, gd: 0 },
    ],
    D: [
      { name: "Syria", points: 0, gd: 0 },
      { name: "Britain", points: 0, gd: 0 },
      { name: "Lebanon", points: 0, gd: 0 },
      { name: "Palestine", points: 0, gd: 0 },
    ],
  };
  // matches information
  matches = [
    // A group
    {
      id: 1,
      group: "A",
      team1: "USA",
      team2: "Germany",
      score1: null,
      score2: null,
    },
    {
      id: 2,
      group: "A",
      team1: "USA",
      team2: "South Korea",
      score1: null,
      score2: null,
    },
    {
      id: 3,
      group: "A",
      team1: "USA",
      team2: "Nigeria",
      score1: null,
      score2: null,
    },
    {
      id: 4,
      group: "A",
      team1: "Germany",
      team2: "South Korea",
      score1: null,
      score2: null,
    },
    {
      id: 5,
      group: "A",
      team1: "Germany",
      team2: "Nigeria",
      score1: null,
      score2: null,
    },
    {
      id: 6,
      group: "A",
      team1: "South Korea",
      team2: "Nigeria",
      score1: null,
      score2: null,
    },
    // B group
    {
      id: 7,
      group: "B",
      team1: "UA",
      team2: "North Korea",
      score1: null,
      score2: null,
    },
    {
      id: 8,
      group: "B",
      team1: "UA",
      team2: "China",
      score1: null,
      score2: null,
    },
    {
      id: 9,
      group: "B",
      team1: "UA",
      team2: "Jappan",
      score1: null,
      score2: null,
    },
    {
      id: 10,
      group: "B",
      team1: "North Korea",
      team2: "China",
      score1: null,
      score2: null,
    },
    {
      id: 11,
      group: "B",
      team1: "North Korea",
      team2: "Jappan",
      score1: null,
      score2: null,
    },
    {
      id: 12,
      group: "B",
      team1: "China",
      team2: "Jappan",
      score1: null,
      score2: null,
    },
    // C group
    {
      id: 13,
      group: "C",
      team1: "Iraq",
      team2: "UK",
      score1: null,
      score2: null,
    },
    {
      id: 14,
      group: "C",
      team1: "Iraq",
      team2: "Brazil",
      score1: null,
      score2: null,
    },
    {
      id: 15,
      group: "C",
      team1: "Iraq",
      team2: "Portugal",
      score1: null,
      score2: null,
    },
    {
      id: 16,
      group: "C",
      team1: "UK",
      team2: "Brazil",
      score1: null,
      score2: null,
    },
    {
      id: 17,
      group: "C",
      team1: "UK",
      team2: "Portugal",
      score1: null,
      score2: null,
    },
    {
      id: 18,
      group: "C",
      team1: "Brazil",
      team2: "Portugal",
      score1: null,
      score2: null,
    },
    //D group
    {
      id: 19,
      group: "D",
      team1: "Syria",
      team2: "Britain",
      score1: null,
      score2: null,
    },
    {
      id: 20,
      group: "D",
      team1: "Syria",
      team2: "Lebanon",
      score1: null,
      score2: null,
    },
    {
      id: 21,
      group: "D",
      team1: "Syria",
      team2: "Palestine",
      score1: null,
      score2: null,
    },
    {
      id: 22,
      group: "D",
      team1: "Britain",
      team2: "Lebanon",
      score1: null,
      score2: null,
    },
    {
      id: 23,
      group: "D",
      team1: "Britain",
      team2: "Palestine",
      score1: null,
      score2: null,
    },
    {
      id: 24,
      group: "D",
      team1: "Lebanon",
      team2: "Palestine",
      score1: null,
      score2: null,
    },
  ];
}
// Listen for user interactions to enable sound effects later
["click", "keydown", "touchstart"].forEach((event) => {
  window.addEventListener(
    event,
    () => {
      userInteracted = true;
    },
    { once: true },
  );
});
//local Storage
function saveToLocalStorage(data) {
  localStorage.setItem("wc_tournament_data", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem("wc_tournament_data");
  return savedData ? JSON.parse(savedData) : null;
}
function getFlag(country) {
  const flags = {
    USA: "us",
    Germany: "de",
    "South Korea": "kr",
    Nigeria: "ng",
    UA: "ua",
    "North Korea": "kp",
    China: "cn",
    Jappan: "jp",
    Iraq: "iq",
    UK: "gb",
    Brazil: "br",
    Portugal: "pt",
    Syria: "sy",
    Britain: "gb",
    Lebanon: "lb",
    Palestine: "ps",
  };

  return `https://flagcdn.com/w40/${flags[country]}.png`;
}
//match score update
function updateMatchScore(matchId, score1, score2) {
  const match = matches.find((m) => m.id === matchId);
  if (match) {
    match.score1 = parseInt(score1);
    match.score2 = parseInt(score2);
    saveToLocalStorage({ groups: initialGroups, matches: matches });
  }
}
// Reset Stats
function resetTeamStats(groups) {
  for (let group in groups) {
    groups[group].forEach((team) => {
      team.points = 0;
      team.gd = 0; // Goal Difference
    });
  }
}
// Point Calculation and Sorting
function calculateStandings() {
  //  reset all team stats before recalculating
  resetTeamStats(initialGroups);

  //
  matches.forEach((match) => {
    if (match.score1 !== null && match.score2 !== null) {
      const team1 = findTeam(match.team1);
      const team2 = findTeam(match.team2);
      // goal difference calculation
      team1.gd += match.score1 - match.score2;
      team2.gd += match.score2 - match.score1;
      // points calculation
      if (match.score1 > match.score2) {
        team1.points += 3; // team 1 wins
      } else if (match.score1 < match.score2) {
        team2.points += 3; // team 2 wins
      } else {
        team1.points += 1; // draw
        team2.points += 1;
      }
    }
  });

  //sorting teams in each group based on points and goal difference
  sortGroups();
}

function sortGroups() {
  for (let group in initialGroups) {
    initialGroups[group].sort((a, b) => {
      // sorting by points first
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      // if points are equal, sort by goal difference (GD)
      return b.gd - a.gd;
    });
  }
}
// get 2 qualifiers from each group (top 2 Teams)
function getQualifiers() {
  const qualifiers = {};
  for (const group in initialGroups) {
    // taking the top 2 teams from each group as qualifiers
    qualifiers[group] = {
      winner: initialGroups[group][0],
      runnerUp: initialGroups[group][1],
    };
  }
  return qualifiers;
}

function generateKnockoutPhase() {
  const q = getQualifiers();

  knockoutMatches = [
    {
      id: 101,
      round: "R16",
      team1: q.A.winner.name,
      team2: q.B.runnerUp.name,
      score1: null,
      score2: null,
    },
    {
      id: 102,
      round: "R16",
      team1: q.B.winner.name,
      team2: q.A.runnerUp.name,
      score1: null,
      score2: null,
    },
    {
      id: 103,
      round: "R16",
      team1: q.C.winner.name,
      team2: q.D.runnerUp.name,
      score1: null,
      score2: null,
    },
    {
      id: 104,
      round: "R16",
      team1: q.D.winner.name,
      team2: q.C.runnerUp.name,
      score1: null,
      score2: null,
    },
  ];

  // change the current phase to knockout and save all updated data to local storage
  currentPhase = "knockout";
  saveToLocalStorage({
    groups: initialGroups,
    matches: matches,
    knockoutMatches: knockoutMatches,
    groupLocked: groupLocked,
    currentPhase: currentPhase,
  });
}
// lock group stage after finishing it to prevent any changes in scores or standings
groupLocked = false;

// DOM
//draw groups and matches in the UI
function renderGroups() {
  const container = document.getElementById("groups-container");
  container.innerHTML = ""; //clean the container before rendering
  for (const groupName in initialGroups) {
    // 1.  create a card for each group
    const groupCard = document.createElement("div");
    groupCard.className = "group-card";
    groupCard.innerHTML = `<h3>Group ${groupName}</h3>`;

    // 2. create a table to display teams, points, and goal difference for this group
    const table = document.createElement("table");
    table.innerHTML = `
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Points</th>
                    <th>GD</th>
                </tr>
            </thead>
            <tbody>
                ${initialGroups[groupName]
                  .map(
                    (team) => `
                    <tr>
                        <td>
                          <div style="display:flex; align-items:center; gap:8px;">
                            <img src="${getFlag(team.name)}" width="20">
                               ${team.name}
                          </div>
                        </td>
                        <td>${team.points}</td>
                        <td>${team.gd}</td>
                    </tr>
                `,
                  )
                  .join("")}
            </tbody>
        `;
    groupCard.appendChild(table);

    // add a section for entering match results for groups
    const matchesDiv = document.createElement("div");
    matchesDiv.className = "matches-list";

    const groupMatches = matches.filter((m) => m.group === groupName);
    groupMatches.forEach((match) => {
      const matchRow = document.createElement("div");
      matchRow.className = "match-input";
      matchRow.innerHTML = `
                <span>${match.team1}</span>
                <input type="number" value="${match.score1 ?? ""}" 
                    onchange="handleScoreChange(${match.id}, 1, this.value)" 
                    ${groupLocked ? "disabled" : ""}>
                <span>-</span>
                <input type="number" min="0" value="${match.score2 ?? ""}" 
                    onchange="handleScoreChange(${match.id}, 2, this.value)" 
                    ${groupLocked ? "disabled" : ""}>
                <span>${match.team2}</span>
            `;
      matchesDiv.appendChild(matchRow);
    });

    groupCard.appendChild(matchesDiv);
    container.appendChild(groupCard);
  }
}

// handle score changes in the input fields and update the corresponding match data, recalculate standings, and re-render the groups
function handleScoreChange(matchId, teamNumber, value) {
  if (groupLocked) return;
  const match = matches.find((m) => m.id === matchId);
  if (match) {
    if (teamNumber === 1) match.score1 = value !== "" ? parseInt(value) : null;
    if (teamNumber === 2) match.score2 = value !== "" ? parseInt(value) : null;

    calculateStandings(); // recalculate points and goal difference based on the new scores
    renderGroups();
    saveToLocalStorage({ groups: initialGroups, matches: matches });
  }
}

// close group stage and move to knockout phase
function finishGroupStage() {
  // 1. check if all matches have scores entered before allowing to finish the group stage
  const allMatchesPlayed = matches.every(
    (m) => m.score1 !== null && m.score2 !== null,
  );

  if (!allMatchesPlayed) {
    alert(
      "Please enter results for all matches before finishing the group stage!",
    );
    return;
  }

  // 2.  group stage is now locked to prevent any further changes in scores or standings
  if (typeof calculateStandings === "function") calculateStandings();
  groupLocked = true;
  currentPhase = "knockout"; // change the current phase to knockout

  // 3. generate the knockout phase matches
  generateKnockoutPhase();

  // refrach the website
  document.getElementById("knockout-section").classList.remove("hidden");
  const knockoutSection = document.getElementById("knockout-section");
  knockoutSection.scrollIntoView({ behavior: "smooth" });

  renderKnockout();
  saveToLocalStorage({
    groups: initialGroups,
    matches: matches,
    knockoutMatches: knockoutMatches,
    groupLocked: groupLocked,
    currentPhase,
  });
}
// draw knockout matches in the UI and handle score changes for knockout matches with additional logic to determine winners and promote them to the next round automatically.
function renderKnockout() {
  const container = document.getElementById("knockout-bracket");
  if (!container) return;

  container.innerHTML = ""; // clear the container

  const rounds = [
    { key: "R16", title: " 16 phase" },
    { key: "QF", title: "Quarter Finals" },
    { key: "SF", title: " Semi Finals " },
  ];

  rounds.forEach((round) => {
    const roundMatches = knockoutMatches.filter((m) => m.round === round.key);

    if (roundMatches.length > 0) {
      const roundSection = document.createElement("div");
      roundSection.innerHTML = `<h3 style="margin-top:20px;">${round.title} (${round.key})</h3>`;

      roundMatches.forEach((match) => {
        const matchRow = document.createElement("div");
        matchRow.className = "match-input knockout-match";
        matchRow.innerHTML = `
                    <div style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 10px; background: #fff; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                       <span style="display:flex; align-items:center; gap:8px;">
                          <img src="${getFlag(match.team1)}" width="24">
                                 ${match.team1}
                        </span>
                        <input type="number" min="0" value="${match.score1 ?? ""}" 
                            style="width: 45px; text-align: center;"
                            onchange="handleKnockoutScore(${match.id}, 1, this.value)">
                        <span style="margin: 0 10px;">VS</span>
                        <input type="number" min="0" value="${match.score2 ?? ""}" 
                            style="width: 45px; text-align: center;"
                            onchange="handleKnockoutScore(${match.id}, 2, this.value)">
                        <span style="display:flex; align-items:center; gap:8px;">
                                ${match.team2}
                                <img src="${getFlag(match.team2)}" width="24">
                        </span>
                    </div>
                `;
        roundSection.appendChild(matchRow);
      });
      container.appendChild(roundSection);
    }
  });
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "20px";
}
// handle score changes for knockout matches and determine winners and promote them to the next round automatically, and also check for champion after semi-finals
function handleKnockoutScore(matchId, teamNumber, value) {
  const match = knockoutMatches.find((m) => m.id === matchId);
  if (!match) return;

  // 1. if the input value is empty, set the score to null, otherwise parse it as an integer
  const score = value !== "" ? parseInt(value) : null;

  // 2. update the corresponding score in the match object based on which team's score was changed
  if (teamNumber === 1) match.score1 = score;
  else match.score2 = score;

  // 3. only proceed with winner determination and promotion if both scores are entered (not null)
  if (match.score1 !== null && match.score2 !== null) {
    if (match.score1 === match.score2) {
      alert(
        "in knockout phase, draws are not allowed! please enter a valid score to determine the winner.",
      );
      return;
    }
    // select the winner
    match.winner = match.score1 > match.score2 ? match.team1 : match.team2;

    // 4. automatically promote winners to the next round
    promoteWinners();
    renderKnockout(); // update the UI

    // 5. check for champion after semi-finals
    if (match.round === "SF") {
      displayChampion(match.winner);
    }

    renderKnockout();
  }

  saveToLocalStorage({
    groups: initialGroups,
    matches: matches,
    knockoutMatches: knockoutMatches,
    groupLocked: groupLocked,
    currentPhase: currentPhase,
  });
}

function promoteWinners() {
  // Quarter Finals
  const r16Matches = knockoutMatches.filter((m) => m.round === "R16");
  const finishedR16 = r16Matches.filter((m) => m.winner);

  if (
    finishedR16.length === r16Matches.length &&
    r16Matches.length > 0 &&
    !knockoutMatches.find((m) => m.round === "QF")
  ) {
    const qfMatches = [
      {
        id: 201,
        round: "QF",
        team1: r16Matches[0].winner,
        team2: r16Matches[1].winner,
        score1: null,
        score2: null,
      },
      {
        id: 202,
        round: "QF",
        team1: r16Matches[2].winner,
        team2: r16Matches[3].winner,
        score1: null,
        score2: null,
      },
    ];
    knockoutMatches.push(...qfMatches);
    console.log("gen Quarter Finals matches done!");
  }

  // QF to SF
  const qfMatches = knockoutMatches.filter((m) => m.round === "QF");
  const finishedQF = qfMatches.filter((m) => m.winner);

  if (
    finishedQF.length === qfMatches.length &&
    qfMatches.length > 0 &&
    !knockoutMatches.find((m) => m.round === "SF")
  ) {
    const sfMatches = [
      {
        id: 301,
        round: "SF",
        team1: qfMatches[0].winner,
        team2: qfMatches[1].winner,
        score1: null,
        score2: null,
      },
    ];
    knockoutMatches.push(...sfMatches);
    console.log("gen Semi Finals matches done!");
  }
}

function checkChampion(match) {
  if (match.round === "SF" && match.winner) {
    displayChampion(match.winner);
  }
}

function findTeam(teamName) {
  for (const group in initialGroups) {
    const team = initialGroups[group].find((t) => t.name === teamName);
    if (team) return team;
  }
  return null;
}

function autoFillScores() {
  matches.forEach((match) => {
    // generate random scores between 0 and 4 for each team in the match
    match.score1 = Math.floor(Math.random() * 5);
    match.score2 = Math.floor(Math.random() * 5);
  });

  // update standings and re-render groups with the new random scores, then save everything to local storage
  calculateStandings();
  renderGroups();
  saveToLocalStorage({ groups: initialGroups, matches: matches });
  console.log("All results filled with random scores!");
}

function resetTournament() {
  if (
    confirm(
      "Are you sure you want to clear all data and start a new tournament?",
    )
  ) {
    localStorage.clear();
    location.reload();
  }
}
function displayChampion(winnerName) {
  const card = document.getElementById("winner-card");
  const name = document.getElementById("winner-name-big");
  const flag = document.getElementById("winner-flag");

  if (name) name.innerText = winnerName;
  if (flag) flag.src = getFlag(winnerName);

  if (card) card.classList.remove("hidden");

  if (userInteracted) {
    const whistle = new Audio("./sounds/whistle.mp3");
    const music = new Audio("./sounds/music.mp3");

    music.volume = 0.8;

    whistle
      .play()
      .then(() => {
        setTimeout(() => {
          music.play().catch((err) => console.log("Music Error:", err));
        }, 1000);
      })
      .catch((err) => console.log("Whistle Error:", err));
  }

  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (currentPhase === "knockout") {
    renderGroups();
    document.getElementById("knockout-section").classList.remove("hidden");

    renderKnockout();
  } else {
    renderGroups();
  }
});
if (groupLocked) {
  document.getElementById("groups-container").classList.add("group-locked");
}

function launchConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() > end) return clearInterval(interval);

    const div = document.createElement("div");
    div.className = "confetti";
    div.style.left = Math.random() * 100 + "vw";
    div.style.background = `hsl(${Math.random() * 360},100%,50%)`;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 2000);
  }, 100);
}

// hide splash
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  setTimeout(() => {
    splash.style.opacity = "0";
    splash.style.transition = "1s";
    setTimeout(() => splash.remove(), 1000);
  }, 3000);
});

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 150; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 5,
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${Math.random() * 360},100%,50%)`;
    ctx.fill();
  });

  updateConfetti();
}

function updateConfetti() {
  particles.forEach((p) => {
    p.y += p.d;
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawConfetti, 20);

function startWinnerConfetti() {
  const canvas = document.getElementById("winner-confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 200; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 5,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random() * 360},100%,50%)`;
      ctx.fill();
    });

    particles.forEach((p) => {
      p.y += p.d;
      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}
