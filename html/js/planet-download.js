// Function to download planet information
function downloadPlanetInfo() {
    const planetName = document.querySelector('h1').textContent;
    const overview = document.querySelector('h2 + p').textContent;
    const keyFactsList = document.querySelector('h3 + ul');
    let keyFacts = '';
    if (keyFactsList) {
        const items = keyFactsList.querySelectorAll('li');
        items.forEach(item => {
            keyFacts += '- ' + item.textContent + '\n';
        });
    }

    const content = `Planet: ${planetName}\n\nOverview:\n${overview}\n\nKey Facts:\n${keyFacts}\nSources: ${document.querySelector('p:last-of-type a') ? document.querySelector('p:last-of-type a').href : 'N/A'}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${planetName.toLowerCase()}-info.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Track download activity
    trackDownload('Planet Info', planetName);
}

// Function to track downloads
function trackDownload(type, item) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const downloadData = {
        userName: currentUser.name,
        userEmail: currentUser.email,
        type: type,
        item: item,
        timestamp: new Date().toISOString()
    };

    const downloads = JSON.parse(localStorage.getItem('downloads')) || [];
    downloads.push(downloadData);
    localStorage.setItem('downloads', JSON.stringify(downloads));
}

// Add event listener to download button
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadPlanetInfo);
    }
});