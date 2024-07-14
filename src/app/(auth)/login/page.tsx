import Link from "next/link";
import LoginForm from "@/components/userform/LoginForm";
import GoogleSigninButton from "@/components/GoogleSigninButton";

export default function Login() {
  return (
    <div className="lg:mx-96 md:shadow-lg flex justify-center items-center min-h-[91vh]">
      <div>
        <LoginForm />
        <p className="text-center text-blue-600 my-3">
          <Link href="/forgot-password">Forgot password?</Link>
        </p>
        <GoogleSigninButton />

        <Link href="/signup">
          <p className="text-center my-4 text-blue-600">Create new account</p>
        </Link>
      </div>
    </div>
  );
}
