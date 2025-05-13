// This file contains the types used in the project
// It is used to define the types of the data used in the project
// and to ensure that the data is in the correct format

type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface cardInputInfo {
    username: string;
    theme: string;
    question: string | string[]
}

export interface cardProcessInfo extends cardInputInfo {
    answer: string | string[]

}

export interface cardOutput extends cardProcessInfo {
    cardOwner: string;
    cardId: UUID
    cardNumber: number;
}