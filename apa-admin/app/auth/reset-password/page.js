import PublicRoute from '../../components/PublicRoute';
import AuthLayout from '../AuthLayout';
import ResetPasswordForm from '../ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <PublicRoute>
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </PublicRoute>
  );
}