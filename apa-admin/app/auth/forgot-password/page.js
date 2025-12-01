import AuthLayout from '../AuthLayout';
import ForgotPasswordForm from '../ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Mot de passe oublié">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}