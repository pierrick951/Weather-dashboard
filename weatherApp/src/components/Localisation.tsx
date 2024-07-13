import { MapPin } from "lucide-react";

interface Props {
  cityname: string;
  country: string;
}

function Localisation({ cityname, country }: Props) {
  return (
    <div>
      <p className="font-bold py-3 flex gap-2 items-center">
        <MapPin color="#ffffff" className="w-4" />
        <span>{cityname}</span> |
        <span className="font-mono">{country}</span>
      </p>
    </div>
  );
}

export default Localisation;
