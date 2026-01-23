import PublicRoute from '../../components/PublicRoute';
import AuthLayout from '../AuthLayout';
import ForgotPasswordForm from '../ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <PublicRoute>
      <AuthLayout>
        <ForgotPasswordForm />
      </AuthLayout>
    </PublicRoute>
  );
}