import Link from "next/link";
// import useAuth from "@/utils/hooks/auth";
import LoginForm from "@/components/userform/LoginForm";
import GoogleSigninButton from "@/components/GoogleSigninButton";

export default function Login() {
  // useAuth();

  return (
    <div className="lg:mx-96 md:shadow-lg flex justify-center items-center min-h-[91vh]">
      <div>
        <LoginForm />
        <h1 className="text-center text-blue-600 my-3">Forgot password?</h1>
        <GoogleSigninButton />

        <Link href="/signup">
          <p className="text-center my-4 text-blue-600">Create new account</p>
        </Link>
      </div>
    </div>
  );
}
