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
}

// Add event listener to download button
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadPlanetInfo);
    }
});