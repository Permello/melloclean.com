import { Form, Link, useActionData, useNavigation } from 'react-router';
import type { Route } from './+types/login';
import { AuthLayout } from '../components/auth-layout';
import { SocialButtons } from '../components/social-buttons';
import { PasswordInput } from '../components/password-input';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { validators, validateForm, type ValidationErrors } from '~/core/util/validation';

interface ActionData {
  errors?: ValidationErrors;
  success?: boolean;
}

export async function action({ request }: Route.ActionArgs): Promise<ActionData> {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors = validateForm(
    { email, password },
    {
      email: [
        (v) => validators.required(v, 'Email'),
        validators.email,
      ],
      password: [
        (v) => validators.required(v, 'Password'),
        (v) => validators.minLength(v, 8),
      ],
    }
  );

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { success: true };
}

export default function LoginPage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <AuthLayout title='Welcome back' subtitle='Sign in to your account'>
      <Form method='post' className='space-y-4'>
        <Input
          name='email'
          label='Email'
          type='email'
          placeholder='you@example.com'
          autoComplete='email'
          error={actionData?.errors?.email}
        />

        <PasswordInput
          name='password'
          label='Password'
          placeholder='Enter your password'
          autoComplete='current-password'
          error={actionData?.errors?.password}
        />

        <Button
          type='submit'
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className='w-full'
        >
          Sign In
        </Button>
      </Form>

      <div className='relative my-6'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-slate-200' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-white px-4 text-slate-500'>Or continue with</span>
        </div>
      </div>

      <SocialButtons />

      <Text className='mt-6 text-center text-sm'>
        Don&apos;t have an account?{' '}
        <Link to='/join' className='text-emerald-600 hover:text-emerald-700 font-medium'>
          Create one
        </Link>
      </Text>
    </AuthLayout>
  );
}
