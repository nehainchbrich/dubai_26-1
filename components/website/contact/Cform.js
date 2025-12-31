import React, { useEffect, useState } from 'react'
import { Form, Formik } from "formik";
import { ContactSchema } from '@/schema/ContactSchema';
import API_URLS from '@/config/apiconfig';
import TextField from '@/form/TextField';
import TextAreaField from '@/form/TextAreaField';
import { mobileInput } from '@/helper/Helper';
const Cform = ({ page }) => {
  const defaultValue = {
    name: "",
    email: "",
    mobile: "",
    subject: "",
    page: page,
    message: ""
  }
  const [dialCode, setDialCode] = useState('+91');
  useEffect(() => {
    const cleanup = mobileInput('cmobile', setDialCode);
    return cleanup;
  }, []);

  const handleSubmit = async (value, action) => {
    try {
      const modifiedValues = {
        ...value,
        mobile: `${dialCode}${value.mobile}`, // Combine dial code with mobile number
      };
      const response = await fetch(`${API_URLS.CONTACT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedValues)
      })
      const res = await response.json()
      if (res.status === true) {
        action.resetForm();
        window.location.href = '/thank-you';
      }
    } catch (error) {
      throw Error(error);
    }
  }

  return (
    <>
      <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={ContactSchema}>
        <Form>
          <TextField type="text" name="name" label="Full Name" />
          <TextField type="text" name="email" label="Email ID" />
          <TextField type="tel" name="mobile" id="cmobile" label="Mobile" />
          <TextField type="text" name="subject" label="Subject" />
          <TextAreaField name="message" label="Message" />
          <TextField type="hidden" name="page" label="" />
          <button type="submit" className="btns btn-blue btn-100">Submit</button>
        </Form>
      </Formik>
      <style jsx>
        {`
      :global(.form-group) {
        margin-bottom: 25px;
      }
      :global(label) {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #888;
        margin-bottom: 8px;
        display: block;
      }
      :global(input),
      :global(textarea) {
        width: 100%;
        padding: 12px 20px;
        border: 1px solid #eef0f2;
        border-radius: 12px;
        font-size: 1rem;
        color: #111;
        background: #fdfdfd;
        transition: all 0.3s ease;
      }
      :global(input:focus),
      :global(textarea:focus) {
        border-color: #d3122a;
        background: #fff;
        outline: none;
        box-shadow: 0 10px 25px rgba(211, 18, 42, 0.05);
      }
      .btns.btn-blue.btn-100 {
        background: #d3122a;
        color: #fff;
        padding: 15px;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
        margin-top: 10px;
        box-shadow: 0 10px 30px rgba(211, 18, 42, 0.2);
      }
      .btns.btn-blue.btn-100:hover {
        background: #000;
        transform: translateY(-3px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
      }
     `}
      </style>
    </>
  )
}

export default Cform
