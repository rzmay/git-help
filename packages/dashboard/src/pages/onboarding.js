import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Label from '../components/Label';
import Text from '../components/Text';
import DashboardContext from '../context/DashboardContext';
import useAccount from '../hooks/useAccount';
import useLogin from '../hooks/useLogin';
import useUser from '../hooks/useUser';
import { createAccount } from '../services/account.service';

export default function Onboarding() {
  useLogin();

  const router = useRouter();
  const user = useUser();
  const { setAccount } = useContext(DashboardContext);
  const { data: account } = useAccount();

  React.useEffect(() => {
    console.log(account);
    if (account) router.push('/quickstart');
  }, [account, router]);

  const handleSubmit = React.useCallback(async (values) => {
    const account = await createAccount({
      ...values,
    });

    if (!account) return;

    setAccount(account.id);
    localStorage.setItem('account', account.id);

    await user.mutate();
    router.push('/quickstart');
  }, [router, setAccount, user]);

  return (
    <>
      <NextSeo title="Onboarding – GitHelp" noindex />

      <div className="h-screen relative flex justify-center items-center p-5">
        <Card className="mx-auto max-w-lg p-5">
          <Card.Header>
            <Text as="h1" size="3xl" weight="bold">Welcome to GitHelp! 👋</Text>
            <Text opacity={50} className="mt-3">
              Just a few quick questions while we set up your account. We'll help you get started based on your
              responses.
            </Text>
          </Card.Header>
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Please enter an account name.'),
            })}
            onSubmit={handleSubmit}
            validateOnMount
            validateOnBlur
            enableReinitialize
          >
            {({
              dirty, isValid, isSubmitting,
            }) => (
              <Form>
                <Label for="name">What's your website's name?</Label>
                <Field
                  as={Input}
                  name="name"
                  placeholder="Potato Shop"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full group mt-5"
                  variant="dark"
                  disabled={!dirty || !isValid}
                  loading={isSubmitting}
                >
                  Get Started
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </>
  );
}
