import React, {Component} from 'react'
import classes from './quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null,
        quiz:  [
            {
                question: 'What color is your eyes?',
                rightAnswerId: 1,
                id: 1,
                answers: [
                    {text: 'brown', id: 1},
                    {text: 'green', id: 2},
                    {text: 'grey', id: 3},
                    {text: 'blue', id: 4},
                ]
            },
            {
                question: 'How old are you?',
                rightAnswerId: 1,
                id: 3,
                answers: [
                    {text: '18 <', id: 1},
                    {text: '18 - 25', id: 2},
                    {text: '25 - 40', id: 3},
                    {text: '40 <', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHendler = (answerId) => {
        console.log('Answer Id', answerId);
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        this.setState({
            answerState: {[answerId]: 'success'}
        })

        const question = this.state.quiz[this.state.activeQuestion]

        if(question.rightAnswerId === answerId) {
            
            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()) {
                    console.log('Finished')
                }else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
            
            
        }else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }

        
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Make your choice</h1>
                    <ActiveQuiz 
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHendler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz