const screens = document.querySelectorAll('.screen');
const choose_bug_btns = document.querySelectorAll('.choose-bug-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_bug = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_bug_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_bug = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createbug, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createbug() {
    const bug = document.createElement('div')
    bug.classList.add('bug')
    const { x, y } = getRandomLocation()
    bug.style.top = `${y}px`
    bug.style.left = `${x}px`
    bug.innerHTML = `<img src="${selected_bug.src}" alt="${selected_bug.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    bug.addEventListener('click', catchbug)

    game_container.appendChild(bug)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchbug() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addbugs()
}

function addbugs() {
    setTimeout(createbug, 1000)
    setTimeout(createbug, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}