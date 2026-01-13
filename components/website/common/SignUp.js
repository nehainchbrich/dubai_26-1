import { Form, Formik, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react';
import API_URLS from '@/config/apiconfig'
import { SignUpSchema } from '@/schema/SignUpSchema'
import { useAuth } from '@/helper/Auth'
import { mobileInput } from '@/helper/Helper';
import styles from '@/styles/AuthModals.module.css'

const SignUp = () => {
  const { handleAuth } = useAuth();
  const defaultValue = { fullName: "", email: "", password: "", mobile: "", ReferralCode: "" }
  const [dialCode, setDialCode] = useState('+91');

  useEffect(() => {
    const cleanup = mobileInput('smobile', setDialCode);
    return cleanup;
  }, []);

  const handleSubmit = async (value, action) => {
    try {
      const modifiedValues = {
        ...value,
        mobile: `${dialCode}${value.mobile}`,
      };
      const response = await fetch(`${API_URLS.REGISTER_USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedValues)
      })
      const res = await response.json()
      if (res.status === true) {
        action.resetForm();
        $(".modal-close").trigger('click');
        handleAuth(res.token);
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
          <h2 className={styles.title}>Join Us</h2>
          <p className={styles.subtitle}>Start your luxury real estate journey in Dubai</p>
        </div>

        <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={SignUpSchema}>
          <Form>
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <i className={`fas fa-user-circle ${styles.inputIcon}`}></i>
                <Field
                  type="text"
                  name="fullName"
                  className={styles.formControl}
                  placeholder="Full Name"
                />
                <ErrorMessage name="fullName" component="div" className={styles.errorText} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <i className={`fas fa-envelope ${styles.inputIcon}`}></i>
                <Field
                  type="email"
                  name="email"
                  className={styles.formControl}
                  placeholder="Email Address"
                />
                <ErrorMessage name="email" component="div" className={styles.errorText} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <i className={`fas fa-phone-alt ${styles.inputIcon}`}></i>
                <Field
                  type="text"
                  name="mobile"
                  id="smobile"
                  className={`${styles.formControl} auth-mobile-input`}
                  placeholder="Mobile Number"
                />
                <ErrorMessage name="mobile" component="div" className={styles.errorText} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <i className={`fas fa-key ${styles.inputIcon}`}></i>
                <Field
                  type="password"
                  name="password"
                  className={styles.formControl}
                  placeholder="Strong Password"
                />
                <ErrorMessage name="password" component="div" className={styles.errorText} />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Register Now
            </button>

            <div className={styles.divider}>OR</div>

            <div className={styles.footer}>
              Already a member?
              <button
                type="button"
                className={styles.footerAction}
                data-bs-toggle="modal"
                data-bs-target="#login"
              >
                Sig In Here
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      {/* Fix for mobile input dial code styling if needed */}
      <style jsx global>{`
                .iti { width: 100% !important; }
                .auth-mobile-input { padding-left: 95px !important; }
                .iti__country-list { color: #333 !important; }
            `}</style>
    </div>
  )
}

export default SignUp
