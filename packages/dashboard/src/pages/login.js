import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';
import { login } from '../services/auth.service';

export default function Login() {
  const router = useRouter();
  const [sent, setSent] = React.useState(false);

  const handleSubmit = React.useCallback((values) => {
    return login({ ...values, ...router.query })
      .then(() => setSent(true));
  }, [router.query]);

  if (sent) return (
    <div className="text-gray-500 dark:text-gray-400 text-center">
      We've sent you a temporary login link. Please check your email to log in.
    </div>
  );

  return (
    <>
      <NextSeo title="Login – Hyper" noindex />

      <div className="bg-gray-50 dark:bg-gray-800 min-h-screen flex flex-col justify-center items-center px-5 py-20">
        <Text size="2xl" weight="semibold" className="mt-5">Sign in to GitHelp</Text>
        <div className="mt-5 max-w-xs">
          <div className="w-full">
            <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="w-full max-w-xs mx-auto space-y-3">
                  <div className="inline-flex text-left w-full">
                    <Field
                      as={Input}
                      size="lg"
                      name="email"
                      placeholder="Enter your email address..."
                      autoFocus
                      type="email"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
                    Continue with email
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
