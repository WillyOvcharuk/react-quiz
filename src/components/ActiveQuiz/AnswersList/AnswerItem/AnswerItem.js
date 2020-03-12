import React from 'react'
import classes from './AnswerItem.module.css'

const AnswerItem = props => {
    return (
        <li 
            className={classes.AnswerItem}
            onClick={() => {
                    console.log('AnswerItem',props)
                    props.onAnswerClick(props.answer.id);
                }
            }
        >
            { props.answer.text }
        </li>
    )
}

export default AnswerItem