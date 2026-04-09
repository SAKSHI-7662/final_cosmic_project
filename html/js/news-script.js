const universePages = {
    1: [
        {
            title: "NASA’s Roman Observatory Passes Final Major Prelaunch Tests",
            img: "https://www.nasa.gov/wp-content/uploads/2026/03/acoustic2.jpg?resize=2000,1333",
            read: "4 MIN READ",
            desc: "NASA’s Nancy Grace Roman Space Telescope team recently tested the observatory."
        },
        {
            title: "NASA Discovers Crash of Extreme Stars",
            img: "https://www.nasa.gov/wp-content/uploads/2026/03/nsmerger.jpg",
            read: "6 MIN READ",
            desc: "A fleet of NASA missions has uncovered a collision between stars."
        }
    ],

    2: [
        {
            title: "Two Observatories, One Cosmic Eye: Hubble and Euclid View Cat’s Eye Nebula",
            img: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/hubble/nebulae/planetary/cats_eye_2026/Hubble_Euclid_CatsEye_2026_PubTiff_4K_potm2602c.tif?w=1536",
            read: "3 MIN READ",
            desc: "This new NASA/ESA Hubble Space Telescope image features one of the most visually intricate remnants of a dying star: the Cat’s Eye Nebula, also known as NGC 6543. This extraordinary planetary nebula lies in the constellation Draco and has captivated astronomers for decades with…"
        },
        {
            title: "NASA’s Webb Examines Cranium Nebula",
            img: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/science/2026/02/STScI-01K843KG664WG1FD061J0AFCSH.jpg?w=2000&h=1027&fit=crop&crop=faces%2Cfocalpoint",
            read: "5 MIN READ",
            desc: "Two heads are better than one in the latest images from NASA’s James Webb Space Telescope, which reveal new detail in a mysterious, little-studied nebula surrounding a dying star.  Nebula PMR 1 is a cloud of gas and dust that…"
        }
    ],

    3: [
        {
            title: "NASA Telescopes Spot Surprisingly Mature Cluster in Early Universe",
            img: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/science/2026/02/STScI-01K5YFY0K6RHAYK583GH49EECC.jpg?w=2000&h=1678&fit=crop&crop=faces%2Cfocalpoint",
            read: "7 MIN READ",
            desc: "Black holes show unexpected behavior."
        }
    ],

    4: [
        {
            title: "Journey to Center of Milky Way With Upcoming NASA Roman Core Survey",
            img: "https://www.nasa.gov/wp-content/uploads/2025/04/roman-survey-infographic-mkiv-gbs.jpg",
            read: "7 MIN READ",
            desc: "At the heart of our own galaxy, there is a dense thicket of stars with a supermassive black hole at the very center. NASA’s Nancy Grace Roman Space Telescope will provide the deepest-ever view of this zone, revealing stars, planets,…"
        }
    ]
};

let currentPage = 1;

function loadPage(page) {
    const container = document.getElementById("universe-articles-container");
    container.innerHTML = "";

    universePages[page].forEach(article => {
        container.innerHTML += `
            <div class="universe-article-card">
                <img src="${article.img}" class="article-image">
                <div class="article-content">
                    <h2>${article.title}</h2>
                    <p class="article-meta">${article.read}</p>
                    <p class="article-description">${article.desc}</p>
                </div>
            </div>
        `;
    });

    currentPage = page;
}

function changePage(page) {
    loadPage(page);
}

function nextPage() {
    if (currentPage < 4) {
        currentPage++;
        loadPage(currentPage);
    }
}

loadPage(1);