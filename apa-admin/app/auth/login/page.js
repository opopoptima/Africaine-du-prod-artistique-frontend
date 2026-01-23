import PublicRoute from '../../components/PublicRoute';
import AuthLayout from '../AuthLayout';
import LoginForm from '../LoginForm';

export default function LoginPage() {
  return (
    <PublicRoute>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </PublicRoute>
  );
}