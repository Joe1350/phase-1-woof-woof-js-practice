    // url
const allPupsURL = 'http://localhost:3000/pups'

    // helpers
const create = el => document.createElement(el)
const select = el => document.querySelector(el)

    // grab stuff
const dogBar = select('#dog-bar')
const dogInfo = select('#dog-info')
const goodBadToggle = select('#good-dog-filter')

    // render functions
function renderPupBar(pup) {
    const dogIcon = create('span')
    dogIcon.textContent = pup.name
    dogIcon.addEventListener('click', () => {
        dogInfo.innerText = ''
        const img = create('img')
        const pupName = create('h2')
        const button = create('button')
        img.src = pup.image
        pupName.innerText = pup.name
        button.className = pup.isGoodDog
        if(pup.isGoodDog === true) {
            button.innerText = 'Good Dog!'
            button.className = false
            button.addEventListener('click', () => {
                button.innerText = 'Bad Dog!'
                updateGoodDog(pup)
            })
        } else if (pup.isGoodDog === false){
            button.innerText = 'Bad Dog!'
            button.className = true
            button.addEventListener('click', () => {
                button.innerText = 'Good Dog!'
                updateBadDog(pup)
            })
        }
        dogInfo.append(img, pupName, button)
    })
        // append
    dogBar.append(dogIcon)
} 

    // crud
fetch(allPupsURL)
    .then(r => r.json())
    .then(pups => pups.forEach(pup => renderPupBar(pup)))

function updateGoodDog(pup) {
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({isGoodDog: false})
    })
    .then(r => r.json())
    .then(pup => pup)
}

function updateBadDog(pup) {
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({isGoodDog: true})
    })
    .then(r => r.json())
    .then(pup => pup)
}