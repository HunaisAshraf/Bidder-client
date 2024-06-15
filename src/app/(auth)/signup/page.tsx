import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
// import useAuth from "@/utils/hooks/auth";
import { signIn } from "next-auth/react";
import SignupForm from "@/components/userform/SignupForm";
import GoogleSigninButton from "@/components/GoogleSigninButton";

export default function Signup() {
  // useAuth();

  return (
    <div className="lg:mx-96 lg:shadow-lg flex justify-center min-h-[91vh]">
      <div>
        <SignupForm />
        <p className="text-center text-blue-600 my-3">
          <Link href="/forgot-password">Forgot password?</Link>
        </p>
        <GoogleSigninButton />

        {/* <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-2 border-2 rounded-md p-2"
          >
            <GoogleIcon /> Google
          </button>
          {/* <button className="flex items-center gap-2 border-2 rounded-md p-2">
            <FacebookRoundedIcon />
            Facebook
          </button> 
        </div> */}

        <Link href="/login">
          <p className="text-center my-4 text-blue-600">
            Already have an account
          </p>
        </Link>
      </div>
    </div>
  );
}
