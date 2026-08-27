import { LucideLoaderCircle } from "lucide-react";

function Spinner() {
  return (
    <div className=" flex-1 flex justify-center items-center self-center">
      <LucideLoaderCircle className="animate-spin h-14 w-14" />
    </div>
  );
}

export default Spinner;
