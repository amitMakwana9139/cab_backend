import CryptoJS from "crypto-js";

export const generateRandomPassword = (min = 4, max = 6) => {
    const chars = process.env.RANDOM_PASSWORD;
    const passwordLength = Math.floor(Math.random() * (max - min + 1)) + min; // random between min & max
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    return password;
}

// Encrypt
export const encryptData = async (data) => {
    try {
        var encryptedText = await CryptoJS.AES.encrypt(data, process.env.SECRET_KEY).toString();
        return encryptedText;
    } catch (error) {
        throw new Error("Internal server error!");
    }
}

// Decrypt
export const decryptData = async (data) => {
    try {
        var decryptedText = await CryptoJS.AES.decrypt(data, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        return decryptedText;
    } catch (error) {
        throw new Error("Internal server error!");
    }
}
