import React from "react";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import {toast} from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData);

try {
  await customFetch.post('/auth/register', data);
  toast.success('User created successfully')
  return redirect('/login')

} catch (err) {
toast.error(err?.response?.data?.msg)

  return err
}

}

const Register = () => {

  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' defaultValue='pablo'/>
        <FormRow type='text' name='lastName' labelText='lastName' defaultValue='pablo'/>
        <FormRow type='text' name='location' defaultValue='chile'/>
        <FormRow type='email' name='email' defaultValue='pablo@gmail.com'/>
        <FormRow type='password' name='password' defaultValue='secret123'/>
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'submit'}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
