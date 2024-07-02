import Hospital from "@/interfaces/hospitalInterface";
import axios from "axios";





export default async function getDistances(userLocation: string, hospitalLocations: Hospital[]) {
    const apiKey = await process.env.NEXT_PUBLIC_DISTANCE_MATRIX_API_KEY; // Remplacez par votre clé d'API
    const origins = [userLocation].join('|');
    const destinations =( hospitalLocations.map(hospital => `${hospital.lat},${hospital.lng}`)).join('|');

    try {
        const response = await axios.get(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`, {validateStatus: status => status >= 200});

        const { rows } = response.data;
        return rows[0].elements.map((element: any, index: any) => ({
            hospital: hospitalLocations[index],
            distance: element.distance.value
        }));
    } catch (error) {
        console.error('Error fetching distances:', error);
        throw error;
    }
}
