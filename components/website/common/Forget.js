import { Form, Formik, Field, ErrorMessage } from 'formik'
import API_URLS from '@/config/apiconfig'
import React from 'react'
import { ForgetSchema } from '@/schema/ForgetSchema'
import styles from '@/styles/AuthModals.module.css'

const Forget = () => {
  const defaultValue = { username: "" }
  const handleSubmit = async (value, action) => {
    try {
      const response = await fetch(`${API_URLS.FORGET}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      const res = await response.json()
      if (res.status === true) {
        localStorage.clear();
        action.resetForm();
        localStorage.setItem('fgEmail', res.email);
        $(".valid_otp").trigger('click')
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
          <h2 className={styles.title}>Reset Access</h2>
          <p className={styles.subtitle}>Enter your email or mobile to receive an OTP</p>
        </div>

        <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={ForgetSchema}>
          <Form>
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <i className={`fas fa-paper-plane ${styles.inputIcon}`}></i>
                <Field
                  type="text"
                  name="username"
                  className={styles.formControl}
                  placeholder="Email or Mobile"
                />
                <ErrorMessage name="username" component="div" className={styles.errorText} />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Verification Code
            </button>

            <div className={styles.divider}>OR</div>

            <div className={styles.footer}>
              Wait, I remember!
              <button
                type="button"
                className={styles.footerAction}
                data-bs-toggle="modal"
                data-bs-target="#login"
              >
                Back to Login
              </button>
            </div>

            <button type="button" className='hide valid_otp' data-bs-toggle="modal" data-bs-target="#valid_Otp" style={{ display: 'none' }} />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Forget
