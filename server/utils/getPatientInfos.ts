import axios from "axios";



export default async function getPatientInfos (patientID: string) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/findUser`, JSON.stringify({ type: 'pat', fields: { _id: patientID } }), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

        if(response.status === 200) {
            return response.data;
        }
        else {
            throw Error('An error occured while fetching patient infos!');
        }
        
    } catch (error) {
        console.log(error);
        location.reload();
    }
}