import React from 'react'
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = ({params}) => {
  console.log(params);
    return null
}

export const action = () => {
  return null
}



const EditJob = () => {
  const params = useParams();
  return (
    <h1>EditJob</h1>
  )
}

export default EditJob