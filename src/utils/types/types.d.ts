// This file contains the types used in the project
// It is used to define the types of the data used in the project
// and to ensure that the data is in the correct format

//General types:
type UUID = `${string}-${string}-${string}-${string}-${string}`;

//Mock data types:
type Pregunta = {
    pregunta: string;
    respuesta: string;
};

type mocksData = {
    theme?: string;
    data: Pregunta[];
};


//Card types:
export interface cardInputInfo {
    userName: string;
    theme: string;
    questions: string[]
}

export interface cardProcessInfo {
    answers: string[]

}

export interface cardOutput extends cardProcessInfo, cardInputInfo {
    cardOwner: string;
    cardId: UUID
    cardNumber: number;
}


  