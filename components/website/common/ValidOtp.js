import { Form, Formik, Field, ErrorMessage } from 'formik'
import API_URLS from '@/config/apiconfig'
import React from 'react'
import { ValidateSchema } from '@/schema/ValidateSchema'
import styles from '@/styles/AuthModals.module.css'

const ValidOtp = () => {
  const defaultValue = { otp: "" }
  const handleSubmit = async (value, action) => {
    const email = localStorage.getItem("fgEmail");
    try {
      const response = await fetch(`${API_URLS.VALID_OTP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ otp: value.otp, email: email })
      })
      const res = await response.json()
      if (res.status === true) {
        $(".reset_pass").trigger('click')
      } else {
        toastr.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authBackground}></div>
      <div className={styles.authBackgroundBottom}></div>

      <div className={styles.authContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>Verify OTP</h2>
          <p className={styles.subtitle}>Please enter the 6-digit code sent to your device</p>
        </div>

        <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={ValidateSchema}>
          <Form>
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <i className={`fas fa-shield-alt ${styles.inputIcon}`}></i>
                <Field
                  type="text"
                  name="otp"
                  className={styles.formControl}
                  placeholder="Enter OTP Code"
                />
                <ErrorMessage name="otp" component="div" className={styles.errorText} />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Confirm & Continue
            </button>

            <div className={styles.divider}>OR</div>

            <div className={styles.footer}>
              Didn't get the code?
              <button
                type="button"
                className={styles.footerAction}
                onClick={() => {/* Resend logic if available */ }}
              >
                Resend OTP
              </button>
            </div>

            <button type="button" className='hide reset_pass' data-bs-toggle="modal" data-bs-target="#reset_pass" style={{ display: 'none' }} />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default ValidOtp
