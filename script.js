const playerRows = document.getElementById("player-rows");
const searchInput = document.getElementById("search");
const teamFilter = document.getElementById("team-filter");
const darkModeToggle = document.getElementById("dark-mode-toggle");

function getTeamCode(team) {
    return team.split("(")[1].replace(")", "");
}

function displayPlayers(players) {
    playerRows.innerHTML = "";

    players.forEach(player => {
        const row = document.createElement("tr");

        const values = [
            player.name,
            getTeamCode(player.team),
            player.points,
            player.rebounds,
            player.assists
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        playerRows.appendChild(row);
    });
}

function populateTeams() {
    const teams = [...new Set(data.map(player => getTeamCode(player.team)))];

    teams.sort();

    teams.forEach(team => {
        const option = document.createElement("option");
        option.value = team;
        option.textContent = team;
        teamFilter.appendChild(option);
    });
}

function filterPlayers() {
    const searchText = searchInput.value.toLowerCase();
    const selectedTeam = teamFilter.value;

    const filteredPlayers = data.filter(player => {
        const matchesName = player.name.toLowerCase().includes(searchText);
        const matchesTeam = selectedTeam === "all" || getTeamCode(player.team) === selectedTeam;

        return matchesName && matchesTeam;
    });

    displayPlayers(filteredPlayers);
}

searchInput.addEventListener("input", filterPlayers);

teamFilter.addEventListener("change", filterPlayers);

darkModeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

playerRows.addEventListener("mouseover", function(event) {
    const row = event.target.closest("tr");

    if (row) {
        row.style.cursor = "pointer";
    }
});

populateTeams();
displayPlayers(data);
