import { useState } from 'react'
import useAuthContext from './useAuthContext'
import axios from 'axios'

interface LoginState {
    error: string | null
    isLoading: boolean | null
}

interface LoginResponse {
    email: string,
    password: string
}

const useSignup = () => {
    const [loginState, setLoginState] = useState<LoginState>({
        error: null,
        isLoading: null
    })
    const { dispatch } = useAuthContext()

    const signup = async (email: string, password: string) => {
        setLoginState({ error: null, isLoading: true })

        try {
            const response = await axios.post<LoginResponse>('/api/user/signup', { email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                // save user to local storage 
                localStorage.setItem('user', JSON.stringify(response.data))

                // update AuthContext
                if (dispatch) {
                    dispatch({ type: 'LOGIN', payload: response.data})   
                }
                setLoginState({ error: null, isLoading: false })
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                setLoginState({ error: error.response.data.error, isLoading: false})
            } else {
                setLoginState({ error: error.message, isLoading: false})
            }
        }  
    }
    return { signup, ...loginState}
}

export default useSignup