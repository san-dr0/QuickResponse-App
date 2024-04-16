import { AccountDTO } from "../types/User.type";

export const formatPasswordDisplay = (password?: string) => {
    let firstFiveCharacters = password?.substring(0, 5);
    const otherEndCharacters = password?.substring(5, password?.length-40);
    let characterLength = otherEndCharacters?.length ?? 0;

    while (characterLength > 0) {
        firstFiveCharacters+="*";
        characterLength --;
    }

    return firstFiveCharacters;
};

export const convertFirstCharacterOfWordToUpperCase = (param: string) => {
    const splittedWord: string[] = param.split(" ");
    const wordLen = splittedWord.length;
    let newWord: string = "";

    for(let i = 0; i < wordLen; i++) {
        const firstCharacter = splittedWord[i].substring(0, 1).toUpperCase();
        const secondToLastCharacter = splittedWord[i].substring(1, splittedWord[i].length);
        
        newWord += firstCharacter+secondToLastCharacter+" ";
    }

    return newWord;
};

export const formatActiveUserDisplayInformationToRenderOnMap = (param?: AccountDTO) => {
    return `${param?.lastname}, ${param?.firstname}`;
};
