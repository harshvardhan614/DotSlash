/** @format */
import AiPerson from "./AiPerson";
import UserVideo from "./UserVideo";

export default function Home() {
  

  return (
    <div className="flex items-center justify-between"> 
      <AiPerson/>
      <UserVideo/>
    </div>
  );
}