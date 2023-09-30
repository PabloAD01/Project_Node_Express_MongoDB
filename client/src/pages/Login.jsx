import React from 'react'
import { Form, Link, redirect, useActionData, useNavigate } from 'react-router-dom'
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success(`User successfully logged in as ${data.email}`)
    return redirect('/dashboard')
  } catch (error) {
  toast.error(error?.response?.data?.msg)
    return error
  }
  

}
const Login = () => {
  const navigate = useNavigate()
  
  const errors = useActionData()

  const loginDemoUser = async () =>{
    const data = {
      email: 'pedro@pedro.com',
      password: 'secret123'
    }
    try {
      await customFetch.post('/auth/login', data);
    toast.success("Logged in as a Test User")
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
      <FormRow type="email" name="email"/>
      <FormRow type="password" name="password"/>
      <SubmitBtn/> 
      <button type='button' className='btn btn-block' onClick={loginDemoUser} >
        Explore the App
        </button>
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