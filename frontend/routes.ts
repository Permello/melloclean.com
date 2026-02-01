import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('pages/landing/landing.tsx'),
  route('login', 'pages/auth/login/login.tsx'),
  route('join', 'pages/auth/join/join.tsx'),
] satisfies RouteConfig;
