export default interface User {
    type: string;
    lastName: string;
    firstName: string;
    mail: string;
    password: string;
    phone: string;

    region?: string;

    medID?: string;

    hospital?: string;

    gender?: string;
    speciality?: string[];
}