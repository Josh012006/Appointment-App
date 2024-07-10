import axios from "axios";



export default async function getAppointInfos(id: string) {
    try {
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/appointment/getInfos/${id}`, { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

        if(response.status === 404) {
            console.log('Appointment not found!');
            return null;
        }
        else if (response.status === 200) {
            return response.data;
        }
        else {
            throw Error('An error occurred while getting appoint Infos!');
        }
        
    } catch (error) {
        console.error(error);
        return null;
    }
}