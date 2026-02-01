import { Form, Link, useActionData, useNavigation } from 'react-router';
import type { Route } from './+types/join';
import { AuthLayout } from '../components/auth-layout';
import { SocialButtons } from '../components/social-buttons';
import { PasswordInput } from '../components/password-input';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Heading } from '~/components/ui/heading';
import { Text } from '~/components/ui/text';
import { validators, validateForm, type ValidationErrors } from '~/core/util/validation';

interface ActionData {
  errors?: ValidationErrors;
  success?: boolean;
}

export async function action({ request }: Route.ActionArgs): Promise<ActionData> {
  const formData = await request.formData();
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const street = formData.get('street') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const zipCode = formData.get('zipCode') as string;

  const errors = validateForm(
    { firstName, lastName, email, password, street, city, state, zipCode },
    {
      firstName: [(v) => validators.required(v, 'First name')],
      lastName: [(v) => validators.required(v, 'Last name')],
      email: [(v) => validators.required(v, 'Email'), validators.email],
      password: [(v) => validators.required(v, 'Password'), (v) => validators.minLength(v, 8)],
      street: [(v) => validators.required(v, 'Street address')],
      city: [(v) => validators.required(v, 'City')],
      state: [(v) => validators.required(v, 'State')],
      zipCode: [(v) => validators.required(v, 'Zip code'), validators.zipCode],
    },
  );

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { success: true };
}

export default function JoinPage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <AuthLayout title='Create your account' subtitle='Join us to book your cleaning services'>
      <Form method='post' className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <Input
            name='firstName'
            label='First Name'
            placeholder='John'
            autoComplete='given-name'
            error={actionData?.errors?.firstName}
          />
          <Input
            name='lastName'
            label='Last Name'
            placeholder='Doe'
            autoComplete='family-name'
            error={actionData?.errors?.lastName}
          />
        </div>

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
          placeholder='Create a password'
          autoComplete='new-password'
          showRequirements
          error={actionData?.errors?.password}
        />

        <div className='mt-4 border-t border-slate-200 pt-4'>
          <Heading level={6} className='mb-3 text-sm font-medium'>
            Service Address
          </Heading>

          <div className='space-y-4'>
            <Input
              name='street'
              label='Street Address'
              placeholder='123 Main St'
              autoComplete='street-address'
              error={actionData?.errors?.street}
            />

            <div className='grid grid-cols-2 gap-4'>
              <Input
                name='city'
                label='City'
                placeholder='Houston'
                autoComplete='address-level2'
                error={actionData?.errors?.city}
              />
              <Input
                name='state'
                label='State'
                placeholder='TX'
                autoComplete='address-level1'
                error={actionData?.errors?.state}
              />
            </div>

            <Input
              name='zipCode'
              label='Zip Code'
              placeholder='77001'
              autoComplete='postal-code'
              error={actionData?.errors?.zipCode}
            />
          </div>
        </div>

        <Button type='submit' disabled={isSubmitting} isLoading={isSubmitting} className='w-full'>
          Create Account
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
        Already have an account?{' '}
        <Link to='/login' className='font-medium text-emerald-600 hover:text-emerald-700'>
          Sign in
        </Link>
      </Text>
    </AuthLayout>
  );
}
