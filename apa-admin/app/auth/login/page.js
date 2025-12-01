import AuthLayout from '../AuthLayout';
import LoginForm from '../LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout title="Se connecter">
      <LoginForm />
    </AuthLayout>
  );
}