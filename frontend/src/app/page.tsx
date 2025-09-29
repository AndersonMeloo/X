import { Logo } from "@/components/ui/logo";
import { redirect } from "next/navigation";

export default function Page() {

  redirect('/signin');

  return (

    <>
      <div className="min-h-screen flex justify-center items-center">
        <Logo size={80} />
      </div>
    </>
  );
}
