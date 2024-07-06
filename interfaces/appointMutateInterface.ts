import Appointment from "./appointmentInterface";
import User from "./userInterface";

export default interface AppointMut {
    appointment: Appointment,
    patientInfos: User
}