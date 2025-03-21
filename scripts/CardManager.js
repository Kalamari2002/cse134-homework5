const allProjects = {
    0:{
        'card-id': 'kitchen-diver',
        'game-title': 'Kitchen Diver',
        'game-description': '<i>Brackeys Game Jam 2023.2.</i> <br>Placed <b>16th in the "Overall" category</b> and 14th in the "Fun" category <b>out of 910 entries.</b>',
        'game-src': 'https://k4lamari.itch.io/kitchen-diver',
        'desktop-thumb': 'https://i.imgur.com/KoGjbdV.png',
        'mobile-thumb': 'https://i.imgur.com/WxeHM9y.png'
    },
    1:{
        'card-id' : 'running-low',
        'game-title': 'Running Low',
        'game-description': '<i>Itchio Mini Jam 73: Power.</i> <br>Placed <b>14th in the "Overall" category</b> and 5th in the "Enjoyment" category <b>out of 176 entries.</b>',
        'game-src': 'https://mateus-ikezaki.itch.io/running-low',
        'desktop-thumb': 'https://i.imgur.com/zooRWsu.png',
        'mobile-thumb': 'https://i.imgur.com/dcnpQED.png' 
    },
    2:{
        'card-id' : 'weird-boss-battle',
        'game-title': 'Weird Boss Battle',
        'game-description': '<i>Bear Jams Fall 2021</i>',
        'game-src': 'https://mateus-ikezaki.itch.io/a-weird-boss-battle',
        'desktop-thumb': 'https://i.imgur.com/A7ZBhzz.png',
        'mobile-thumb': 'https://i.imgur.com/Rgohb20.png' 
    },
    3:{
        'card-id':'warriors-of-the-lost-clan',
        'game-title': 'Warriors of the Lost Clan',
        'game-description':'Beatem up, made with Unity. I hold this one very close to my heart ^^',
        'game-src':'https://k4lamari.itch.io/warriors-of-the-lost-clan',
        'desktop-thumb': 'https://i.imgur.com/bKKVD5s.png',
        'mobile-thumb': 'https://i.imgur.com/QeuisXn.png'
    },
    4:{
        'card-id':'blast-2',
        'game-title': 'Blast 2.0',
        'game-description': "Mobile bullet hell, made with Unity. Mother's day gift.",
        'game-src': 'https://k4lamari.itch.io/blast-2',
        'desktop-thumb': 'https://i.imgur.com/cRXWSzd.png',
        'mobile-thumb': 'https://i.imgur.com/cjzAKhF.png'
    },
    5:{
        'card-id':'limbs',
        'game-title': 'Limbs',
        'game-description': "Platformer, made with Unity. My first game jam entry with my brother.",
        'game-src': 'https://mateus-ikezaki.itch.io/limbs',
        'desktop-thumb': 'https://i.imgur.com/hhCwA3A.png',
        'mobile-thumb': 'https://i.imgur.com/Szlsqdk.png'
    },
    6:{
        'card-id':'the-night-of-100-demons',
        'game-title': 'The Night of 100 Demons',
        'game-description': "Beatem up, made with Unity. My first published game. Where it all began!",
        'game-src': 'https://k4lamari.itch.io/the-night-of-100-demons',
        'desktop-thumb': 'https://i.imgur.com/cLEtI1k.png',
        'mobile-thumb': 'https://i.imgur.com/qqFov3m.png'
    }
}

let req = new XMLHttpRequest();
const data = JSON.stringify(allProjects);
localStorage.setItem('projects', data);

window.addEventListener("DOMContentLoaded", function(){
    const remoteLoadButton = document.querySelector("#remote-load");
    
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            remoteLoadButton.innerHTML = "Remote Load";
            const fetchedData = JSON.parse(req.responseText);
            console.log(fetchedData['record']['projects']);
            populateCards(fetchedData['record']['projects']);
        }
    }
    
});

function fetchFromLocal(){
    const fetchedData = localStorage.getItem('projects');
    const data = JSON.parse(fetchedData);
    console.log(data);
    populateCards(data);
}

function fetchFromRemote(){
    const remoteLoadButton = document.querySelector("#remote-load");
    remoteLoadButton.innerHTML="Fetching..."
    console.log("Fetch from remote");
    req.open("GET", "https://api.jsonbin.io/v3/b/67d202488a456b7966749b40", true);
    req.setRequestHeader("X-Master-Key","$2a$10$IdsqKFXWO.mMxuV4BI0SgOKLwsc3uo4ZVwWkTTotAZwhPIOzhaFPu");
    req.send();
}

function populateCards(projects){
    for(id in projects){
        const currProject = projects[id];

        const projectCard = document.querySelector(`#${currProject['card-id']}`);
        const projectInfo = projectCard.querySelector("project-info");
        const projectThumb = projectCard.querySelector("project-thumbnail");
        let description;

        if(!(description = projectCard.querySelector("p"))){
            description = document.createElement("p")
        }
    
        projectCard.setAttribute("game-title", currProject['game-title']);
        projectCard.setAttribute("game-src", currProject['game-src']);
    
        projectThumb.setAttribute("game-title", currProject['game-title']);
        projectThumb.setAttribute("game-src", currProject['game-src']);
        projectThumb.setAttribute("desktop-src", currProject['desktop-thumb']);
        projectThumb.setAttribute("mobile-src", currProject['mobile-thumb']);
        projectThumb.querySelector("a").setAttribute("target", "_blank");
    
        projectInfo.setAttribute("game-title", currProject['game-title']);
        projectInfo.setAttribute("game-src", currProject['game-src']);
        projectInfo.querySelector("a").setAttribute("target","_blank");
        description.innerHTML = currProject['game-description'];
        projectInfo.appendChild(description);
    }
}