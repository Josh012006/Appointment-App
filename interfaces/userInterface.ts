export default interface User {
    _id?: string;
    type: string;
    lastName: string;
    firstName: string;
    mail: string;
    password: string;
    phone: string;

    region?: string;
    location?: string;
    requests?: string[];
    appointments?: string[];

    medID?: string;

    hospital?: string;

    gender?: string;
    speciality?: string[];
}