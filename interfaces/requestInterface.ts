

export default interface MyRequest {
    _id?: string,
    patientInfo: {
        patientID: string,
        name: string,
        mail: string,
        phone: string,
        age: string,
        height: string,
        weight: string,
        placeOfBirth: string,
        profession: string,
        gender: string,
        specialty: string,
        description: string,
        background: string,
    },
    doctorInfo: {
        doctorId: string,
        medID: string,
        medName: string,
    },
    hospital: string,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date,
    appointID?: string,
}