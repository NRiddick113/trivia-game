const question = document.querySelector('#question')
const answers = document.querySelector('#answers')
const next = document.querySelector('#next')
 const scoreSpan = document.querySelector('.score')
//  const form = document.querySelector('')
// console.log(question,answers,next)


let updatedResults;
let index = 0
let score = 0

const updateQuestions = () => {
    question.innerHTML = updatedResults[index].question

for (let i = 0; i < 4; i++) {

    const div = document.createElement('div')
    const randomNum = Math.floor(Math.random() * updatedResults[index].incorrect_answers.length)

    div.innerHTML = updatedResults[index].incorrect_answers.splice(randomNum, 1)

    answers.append(div)
}
}

const getQuestions = async () => {
   
    const qs = await fetch(`https://opentdb.com/api.php?amount=10&category=10&type=multiple`)
const qsJson = await qs.json()
// console.log(qsJson)

updatedResults = qsJson.results.map((q) => {
q.incorrect_answers.push(q.correct_answer)
return q
})

console.log(updatedResults)
updateQuestions()

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

getQuestions()

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