import { LoginSchema } from '@/schema/LoginSchema'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import API_URLS from '@/config/apiconfig'
import React from 'react'
import { useAuth } from '@/helper/Auth'
import styles from '@/styles/AuthModals.module.css'

const LoginFrm = () => {
  const { handleAuth } = useAuth();
  const defaultValue = { username: "", password: "" }

  const handleSubmit = async (value, action) => {
    try {
      const response = await fetch(`${API_URLS.USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      const res = await response.json()
      if (res.status === true) {
        action.resetForm();
        $(".modal-close").trigger('click');
        handleAuth(res.token);
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
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>Login to experience luxury living in Dubai</p>
        </div>

        <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={LoginSchema}>
          <Form>
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <i className={`fas fa-user ${styles.inputIcon}`}></i>
                <Field
                  type="text"
                  name="username"
                  className={styles.formControl}
                  placeholder="Email or Mobile"
                />
                <ErrorMessage name="username" component="div" className={styles.errorText} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <i className={`fas fa-lock ${styles.inputIcon}`}></i>
                <Field
                  type="password"
                  name="password"
                  className={styles.formControl}
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className={styles.errorText} />
              </div>
            </div>

            <a href="#" className={styles.forgetPass} data-bs-toggle="modal" data-bs-target="#forget">
              Forgot Password?
            </a>

            <button type="submit" className={styles.submitBtn}>
              Secure Login
            </button>

            <div className={styles.divider}>OR</div>

            <div className={styles.footer}>
              Don't have an account?
              <button
                type="button"
                className={styles.footerAction}
                data-bs-toggle="modal"
                data-bs-target="#signup"
              >
                Create Account
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default LoginFrm
