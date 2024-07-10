import MyRequest from "./requestInterface";


export default interface RequestMut {
    requestInfo: MyRequest,
    ID: string,
    appointmentDate: Date,
}