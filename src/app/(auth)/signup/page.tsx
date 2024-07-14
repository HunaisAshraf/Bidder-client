import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { signIn } from "next-auth/react";
import SignupForm from "@/components/userform/SignupForm";
import GoogleSigninButton from "@/components/GoogleSigninButton";

export default function Signup() {
  return (
    <div className="lg:mx-96 lg:shadow-lg flex justify-center min-h-[91vh]">
      <div>
        <SignupForm />
        <p className="text-center text-blue-600 my-3">
          <Link href="/forgot-password">Forgot password?</Link>
        </p>
        <GoogleSigninButton />

        <Link href="/login">
          <p className="text-center my-4 text-blue-600">
            Already have an account
          </p>
        </Link>
      </div>
    </div>
  );
}
