import bcrypt from 'bcryptjs';

// Fonction de hashage de mot de passe
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Fonction de vérification de mot de passe
export async function verifyPassword(password: string | null | FormDataEntryValue, hashedPassword: string): Promise<boolean> {
    if(typeof password !== "string") {
        return false;
    }
    else {
        return await bcrypt.compare(password, hashedPassword);
    }
}