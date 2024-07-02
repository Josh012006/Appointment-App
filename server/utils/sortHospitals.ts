import Hospital from "@/interfaces/hospitalInterface";
import getDistances from "./getDistances";

export default async function sortHospitalsByDistance(userLocation: string, hospitals: Hospital[]) {

    const distances = await getDistances(userLocation, hospitals);

    distances.sort((a: any, b: any) => a.distance - b.distance);

    return distances.map((distance: any) => distance.hospital);
}