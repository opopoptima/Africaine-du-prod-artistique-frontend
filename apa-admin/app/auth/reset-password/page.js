import AuthLayout from '../AuthLayout';
import ResetPasswordForm from '../ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <AuthLayout title={<>Réinitialiser votre<br />mot de passe</>}>
      <ResetPasswordForm />
    </AuthLayout>
  );
}