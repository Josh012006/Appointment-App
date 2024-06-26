import axios from "axios";

import Hospital from "@/interfaces/hospitalInterface";


export default async function generateHospitalTab() {

    const tab : string[] = [];

    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getHospitals`, { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

        if(result.status === 500) {
            throw Error('Une erreur interne est survene au niveau du generateHospitalTab!');
        }
        else if(result.status === 404) {
            throw Error('Aucun hôpital enrégistré!');
        }
        else if(result.status === 200) {
            result.data.forEach((element : Hospital) => {
                tab.push(element.hospitalName);
            });

            return tab;
        }

    } catch(error) {
        console.log(error);
        return tab;
    }

}