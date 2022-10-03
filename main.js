const main = document.querySelectorAll('main')
const question = document.querySelector('#question')
const answers = document.querySelector('#answers')
const next = document.querySelector('#next')
 const scoreSpan = document.querySelector('.score')
 const input = document.querySelectorAll('input')
 const select = document.querySelectorAll('select')
 const form = document.querySelector('form')
console.log(question)


let updatedResults;
let index = 0
let score = 0


form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    // console.log(main[0].style.display)
    main[0].style.display = 'block'
    getQuestions()
    form.style.display = 'none'
})

function getQuestions () {
    if (input[0].checked && select[0].options[0].selected) {
        fetch(`https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple`)
        .then(res => res.json())
        .then(res => { 
            console.log(res) 
            updatedResults = res.results.map((q) => {
                q.incorrect_answers.push(q.correct_answer)
                return q
            })
            updateQuestions()
        })
        .catch(err => console.log(err))
    }else if (input[0].checked && select[0].options[1].selected) {
        fetch(`https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple`)
        .then(res => res.json())
        .then(res => { console.log(res) 
            updatedResults = res.results.map((q) => {
                q.incorrect_answers.push(q.correct_answer)
                return q
            })
            updateQuestions()
        })
        .catch(err => console.log(err))
    }else if (input[0].checked && select[0].options[2].selected) {
        fetch(`https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple`)
        .then(res => res.json())
        .then(res => { console.log(res) 
            updatedResults = res.results.map((q) => {
                q.incorrect_answers.push(q.correct_answer)
                return q
            })
            updateQuestions()
        })
        .catch(err => console.log(err))
    }
    
    if (input[1].checked && select[0].options[0].selected) {
        fetch(`https://opentdb.com/api.php?amount=10&category=16&difficulty=easy&type=multiple`)
        .then(res => res.json())
        .then(res => { console.log(res) 
            updatedResults = res.results.map((q) => {
                q.incorrect_answers.push(q.correct_answer)
                return q
            })
            updateQuestions()
        })
        .catch(err => console.log(err))
    }else if (input[1].checked && select[0].options[1].selected) {
        fetch(`https://opentdb.com/api.php?amount=10&category=16&difficulty=medium&type=multiple`)
        .then(res => res.json())
        .then(res => { console.log(res) 
            updatedResults = res.results.map((q) => {
                q.incorrect_answers.push(q.correct_answer)
                return q
            })
            updateQuestions()
        })
        .catch(err => console.log(err))
    }else if (input[1].checked && select[0].options[2].selected) {
        fetch(`https://opentdb.com/api.php?amount=10&category=16&difficulty=hard&type=multiple`)
        .then(res => res.json())
        .then(res => { console.log(res) 
            updatedResults = res.results.map((q) => {
                q.incorrect_answers.push(q.correct_answer)
                return q
            })
            updateQuestions()
        })
        .catch(err => console.log(err))
    }
    
    // console.log(updatedResults)
    
    
}

const updateQuestions = () => {
    question.innerHTML = updatedResults[index].question
    
    for (let i = 0; i < 4; i++) {
        
        const div = document.createElement('div')
        const randomNum = Math.floor(Math.random() * updatedResults[index].incorrect_answers.length)
        
        div.innerHTML = updatedResults[index].incorrect_answers.splice(randomNum, 1)
        
        answers.append(div)
    }
}

next.addEventListener('click', () => {
    index++
    if (index >= updatedResults.length) {
        question.innerHTML = " Game Over"
    }else{
        answers.innerHTML = ''
        updateQuestions()
    }
    answers.style.pointerEvents = 'auto'
})

// getQuestions()

answers.addEventListener('click', (event) =>{
    if (event.target.innerHTML === updatedResults[index].correct_answer) {
        score += 10
        scoreSpan.innerHTML = score
        event.target.style.backgroundColor = "#00E35F "
        event.target.style.border = '2px solid green'
    } else {
        event.target.style.backgroundColor = "#E30049"
        event.target.style.border = '2px solid #880000'
    }

    answers.style.pointerEvents = 'none'

})