import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button } from '../shared/Elements'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../actions/auth'
import { setAlert } from '../../actions/alert'

const ResetContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    background: #3e497b;
`

const ResetPassword = () => {
    const token = useParams().token
    const location = useHistory()

    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        password: '',
        password2: '',
    })
    const { password, password2 } = userData
    const onChangeRegisterHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const onSubmitAuthFormHandler = (e) => {
        e.preventDefault()
        if (password !== password2) {
            return dispatch(
                setAlert(
                    'The password and confirmation password do not match.',
                    'danger'
                )
            )
        }

        dispatch(resetPassword(password, token))
        location.push('/login')
    }

    return (
        <ResetContainer>
            <Form onSubmit={onSubmitAuthFormHandler}>
                <FormTitle>Rest Password</FormTitle>
                <Divider marginBottom="0.8rem" />
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="password"
                        value={password}
                        onChange={onChangeRegisterHandler}
                        type="password"
                        required
                    />
                    <Label>password</Label>
                </InputHolder>
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="password2"
                        value={password2}
                        onChange={onChangeRegisterHandler}
                        type="password"
                        required
                    />
                    <Label>Password confirm</Label>
                </InputHolder>

                <Button>Submit</Button>
            </Form>
        </ResetContainer>
    )
}

export default ResetPassword
