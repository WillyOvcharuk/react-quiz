import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        { /*console.log(props)*/
         props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    key={index} 
                    answer={answer}
                />
            )
        })}
    </ul>
)

export default AnswersList