import React from 'react'
import { Form, Link, redirect, useActionData, useNavigate } from 'react-router-dom'
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = {msg:''}
  if (data.password.length < 3) {
    errors.msg = 'Password must be at least 3 characters'
    return errors
  }
  try {
    await customFetch.post('/auth/login', data);
    toast.success(`User successfully logged in as ${data.email}`)
    return redirect('/dashboard')
  } catch (error) {
/*   toast.error(err?.response?.data?.msg) */
    errors.msg = error.response.data.msg
    return errors
  }
  

}
const Login = () => {
  const navigate = useNavigate()
  
  const errors = useActionData()

  const loginDemoUser = async () =>{
    const data = {
      email: 'pablo@gmail.com',
      password: 'pablo123'
    }
    try {
      await customFetch.post('/auth/login', data);
    toast.success(`User successfully logged in as ${data.email}`)
    navigate('/dashboard')
      
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }
  return (
    <Wrapper>
    <Form method='post' className='form'>
      <Logo/>
      <h4>login</h4>
      {errors?.msg && <p style={{color:'red'}}>{errors.msg}</p>}
      <p></p>
      <FormRow type="email" name="email" defaultValue="pablo@gmail.com"/>
      <FormRow type="password" name="password" defaultValue="password123"/>
      <SubmitBtn/> 
      <button type='button' className='btn btn-block' onClick={loginDemoUser} >Explore the App</button>
      <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
    </Form>
    </Wrapper>
  )
}

export default Login