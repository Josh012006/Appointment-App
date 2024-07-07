import { v4 as uuidv4 } from 'uuid';

export default function generateAppointID(): string {
    const uuid = uuidv4().replace(/-/g, ''); // Remove dashes from UUID
    let letters = '';
    let numbers = '';
    let hasUppercase = false;
    let hasLowercase = false;

    for (let char of uuid) {
        if (letters.length < 3 && /[a-zA-Z]/.test(char)) {
            letters += char;
            if (/[A-Z]/.test(char)) hasUppercase = true;
            if (/[a-z]/.test(char)) hasLowercase = true;
        } else if (numbers.length < 7 && /[0-9]/.test(char)) {
            numbers += char;
        }

        // Break the loop when we have enough letters and numbers
        if (letters.length === 3 && numbers.length === 7) {
            break;
        }
    }

    // In case we don't get enough letters or numbers, pad with additional characters from the UUID
    if (letters.length < 3 || numbers.length < 7) {
        for (let char of uuid) {
            if (letters.length < 3 && /[a-zA-Z]/.test(char)) {
                letters += char;
                if (/[A-Z]/.test(char)) hasUppercase = true;
                if (/[a-z]/.test(char)) hasLowercase = true;
            } else if (numbers.length < 7 && /[0-9]/.test(char)) {
                numbers += char;
            }
        }
    }

    // Ensure there is at least one uppercase and one lowercase letter
    if (!hasUppercase) {
        for (let char of uuid) {
            if (/[A-Z]/.test(char)) {
                letters = letters.slice(0, -1) + char;
                break;
            }
        }
    }

    if (!hasLowercase) {
        for (let char of uuid) {
            if (/[a-z]/.test(char)) {
                letters = letters.slice(0, -1) + char;
                break;
            }
        }
    }

    // Combine and shuffle the characters
    const combined = (letters + numbers).split('');
    for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    return combined.join('');
}
