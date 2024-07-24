import Link from "next/link";
import SignupForm from "@/components/userform/SignupForm";
import GoogleSigninButton from "@/components/GoogleSigninButton";

export default function Signup() {
  return (
    <div className="lg:mx-96 lg:shadow-lg flex justify-center min-h-[91vh]">
      <div>
        <SignupForm />

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
