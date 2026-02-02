/**
 * @copyright 2026 Eduardo Turcios. All rights reserved.
 * Unauthorized use, reproduction, or distribution of this file is strictly prohibited.
 */

import { GoogleLoginButton } from './google-login-button';
import { FacebookLoginButton } from './facebook-login-button';

/**
 * Container for social authentication buttons.
 * Renders Google and Facebook login options.
 *
 * @returns Social login button group
 */
const SocialButtons: React.FC = () => {
  return (
    <div className='space-y-3'>
      <GoogleLoginButton />
      <FacebookLoginButton />
    </div>
  );
};

export { SocialButtons };
