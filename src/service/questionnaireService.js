import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/questionnaires/`

const index = async () => {
    try {
        const res = await axios.get(BASE_URL)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

const getCurrent = async (questionaresId) => {
    try {
        const res = await axios.get(`${BASE_URL}/${questionaresId}`)
        console.log(res)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

export { 
    index,
    getCurrent
}