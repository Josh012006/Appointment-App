import { v4 as uuidv4 } from "uuid";


export default function generateUniqueId() {
    const uuid = uuidv4().replace(/-/g, '');
    const id = parseInt(uuid, 16).toString().substring(0, 10);
    return id;
}