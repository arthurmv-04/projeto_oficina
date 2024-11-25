import { GiSteeringWheel } from "react-icons/gi";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-zinc-900">
            <GiSteeringWheel className="w-16 h-16 animate-spin text-red-600" />
            <p className="text-white text-lg">Carregando...</p>
        </div>
    );
}
