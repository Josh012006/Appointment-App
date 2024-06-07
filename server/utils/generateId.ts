import { v4 as uuidv4 } from "uuid";


export default function generateUniqueId() {
    let uuid = uuidv4().replace(/[^0-9]/g, ''); // Enlever tout ce qui n'est pas un nombre
    
    // S'assurer qu'il y a au moins 10 chiffres
    while (uuid.length < 10) {
        uuid += uuidv4().replace(/[^0-9]/g, '');
    }
    
    return uuid.substring(0, 10); // Renvoyer l'id de 10 chiffres
}