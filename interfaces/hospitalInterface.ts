export default interface Hospital {
    _id?: string,
    hospitalName: string,
    region: string,
    address: string,
    lat: number,
    lng: number,
    phoneNumber: string,
    availableSpecialities: string[],
    doctorsID : string []
}