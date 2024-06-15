import UpdatePasswordForm from "@/components/userform/UpdatePasswordForm";
import { Suspense } from "react";

export default function UpdatePassword() {
  return (
    <div className="lg:mx-96 md:shadow-lg flex justify-center items-center min-h-[91vh]">
      <div>
        <Suspense>
          <UpdatePasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
