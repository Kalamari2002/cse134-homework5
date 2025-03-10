const testProject = {
    'game-title': '',
    'game-description' : '',
    'game-src' : ''
}

const allProjects = {
    0:{
        'game-title': 'Kitchen Diver',
        'game-description': '<p><i>Brackeys Game Jam 2023.2.</i> <br>Placed <b>16th in the "Overall" category</b> and 14th in the "Fun" category <b>out of 910 entries.</b></p>',
        'game-src': 'https://k4lamari.itch.io/kitchen-diver',
        'desktop-thumb': 'https://imgur.com/KoGjbdV',
        'mobile-thumb': 'https://imgur.com/WxeHM9y'
    },
    1:{
        'game-title': 'Running Low',
        'game-description': '<p><i>Itchio Mini Jam 73: Power.</i> <br>Placed <b>14th in the "Overall" category</b> and 5th in the "Enjoyment" category <b>out of 176 entries.</b></p>',
        'game-src': 'https://mateus-ikezaki.itch.io/running-low'
    },
    2:{
        'game-title': 'Weird Boss Battle',
        'game-description': '<p><i>Bear Jams Fall 2021</i></p>',
        'game-src': 'https://mateus-ikezaki.itch.io/a-weird-boss-battle'
    }
}

const data = JSON.stringify(allProjects);
localStorage.setItem('projects', data);

function fetchFromLocal(){
    const fetchedData = localStorage.getItem('projects');
    const data = JSON.parse(fetchedData);
    console.log(data);
}

function populateCards(){
    
}