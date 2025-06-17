
import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";


const Page = async () => {
   const session = await auth()

    if(!session) redirect('/')
  return (
    <>
      <section
        style={{
          backgroundImage: `linear-gradient(
      to right,
      transparent 49.5%,
      rgba(251, 232, 67, 0.2) 49.5%,
      rgba(251, 232, 67, 0.6) 50.5%,
      transparent 50.5%
    )`,
          backgroundSize: "5% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-x",
        }}
        className="w-full bg-[#EE2B69] min-h-[230px] pattern flex justify-center items-center flex-col py-10 px-6"
      >
        <h1 className="heading">Submit Your Startup Pitch</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default Page;
