import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const signup = async (formData) => {
    try {
        const res = await axios.post(`${BACKEND_URL}/users/signup`, formData)

        if (res.err) {
            throw new Error(res.err)
        }

        return res.data;
    } catch (err) {
        console.error(err)
        throw err;
    }
}

const signin = async (user) => {
    try {
        const res = await axios.post(`${BACKEND_URL}/users/signin`, user)
        if (res.data.error) {
            throw new Error(res.data.error);
        }

        if (res.data.token) {
            localStorage.setItem('token', res.data.token)

            const user = JSON.parse(atob(res.data.token.split('.')[1]));
            return user;
        }
        return res.data
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
}

const updateUser = async (userId, formData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${BACKEND_URL}/profiles/${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data
    } catch (err) {
        console.error(err);
    }
}

const signout = () => {
    localStorage.removeItem('token')
}

export {
    signup,
    signin,
    getUser,
    updateUser,
    signout
}