// Fetch the CSV data from GitHub
fetch('https://raw.githubusercontent.com/your-username/your-repo/main/data.csv')
    .then(response => response.text())
    .then(data => {
        // Parse the CSV data
        const rows = data.split('\n');
        const headers = rows[0].split(',');
        const salahTimes = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(',');
            salahTimes.push({
                prayer: row[0],
                time: row[1],
                remaining: row[2]
            });
        }

        // Populate the table with salah times
        const salahTimesTable = document.getElementById('salah-times');
        salahTimes.forEach(salahTime => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${salahTime.prayer}</td>
                <td>${salahTime.time}</td>
                <td>${salahTime.remaining}</td>
            `;
            salahTimesTable.appendChild(row);

            // Highlight the current salah
            const now = new Date();
            const salahTimeObj = new Date(salahTime.time);
            if (now >= salahTimeObj && now <= new Date(salahTime.remaining)) {
                row.classList.add('current-salah');
            }
        });
    });