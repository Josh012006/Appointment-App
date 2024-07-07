export default interface Appointment {
    _id?: string,
    title: string,
    start: Date,
    end: Date,
    status: string,
    hospital: string,
    medName: string,
    medID: string,
    patientID: string,
    medSpecialty: string,
    ID: string
}