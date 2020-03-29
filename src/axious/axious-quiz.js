import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-a51e3.firebaseio.com/'
})