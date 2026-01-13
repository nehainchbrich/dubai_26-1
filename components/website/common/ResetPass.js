import { Form, Formik, Field, ErrorMessage } from 'formik'
import API_URLS from '@/config/apiconfig'
import React from 'react'
import { ResetPassSchema } from '@/schema/ResetPassSchema'
import styles from '@/styles/AuthModals.module.css'

const ResetPass = () => {
  const defaultValue = { password: "", cpassword: "" }
  const handleSubmit = async (value, action) => {
    const email = localStorage.getItem("fgEmail");
    try {
      const response = await fetch(`${API_URLS.PASS_RESET}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: value.password, email: email })
      })
      const res = await response.json()
      if (res.status === true) {
        action.resetForm();
        $(".modal-close").trigger('click');
        toastr.success(res.message);
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
          <h2 className={styles.title}>New Password</h2>
          <p className={styles.subtitle}>Secure your account with a fresh password</p>
        </div>

        <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={ResetPassSchema}>
          <Form>
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <i className={`fas fa-lock ${styles.inputIcon}`}></i>
                <Field
                  type="password"
                  name="password"
                  className={styles.formControl}
                  placeholder="New Password"
                />
                <ErrorMessage name="password" component="div" className={styles.errorText} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <i className={`fas fa-check-double ${styles.inputIcon}`}></i>
                <Field
                  type="password"
                  name="cpassword"
                  className={styles.formControl}
                  placeholder="Confirm Password"
                />
                <ErrorMessage name="cpassword" component="div" className={styles.errorText} />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Update Password
            </button>

            <div className={styles.divider}>OR</div>

            <div className={styles.footer}>
              Return to security
              <button
                type="button"
                className={styles.footerAction}
                data-bs-toggle="modal"
                data-bs-target="#login"
              >
                Back to Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default ResetPass
