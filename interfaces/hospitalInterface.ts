export default interface Hospital {
    _id?: string,
    hospitalName: string,
    region: string,
    address: string,
    phoneNumber: string,
    availableSpecialities: string[],
    doctorsID : string []
}