import CryptoJS from 'crypto-js';
let SECRET_KEY = '';

export const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
        .slice(0, 15);
};

generateSecretKey();

export default function generateSecretKey() {
    SECRET_KEY = CryptoJS.lib.WordArray.random(256 / 8).toString();
    console.log("Generated Secret Key:", SECRET_KEY);
    return SECRET_KEY;
};

export const encrypt = (text: string | number) => {
    const textStr = text.toString();
    return CryptoJS.AES.encrypt(textStr, SECRET_KEY).toString();
};



export const decrypt = (encryptedText: string, secretKey: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);  // Retorna a string descriptografada
};
