/** @format */
import AiPerson from "./AiPerson";
import UserVideo from "./UserVideo";

export default function Home() {
  

  return (
    <div className="flex items-center justify-between max-w-6xl  min-h-screen w-full md:flex-row mx-auto"> 
      <AiPerson/>
      <UserVideo/>
    </div>
  );
}