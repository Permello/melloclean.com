import { GoogleLoginButton } from './google-login-button';
import { FacebookLoginButton } from './facebook-login-button';

const SocialButtons: React.FC = () => {
  return (
    <div className='space-y-3'>
      <GoogleLoginButton />
      <FacebookLoginButton />
    </div>
  );
};

export { SocialButtons };
