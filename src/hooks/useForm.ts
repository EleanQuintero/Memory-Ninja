import { useFlashCardsStore } from "@/store/flashCardsStore";
import { useThemeStore } from "@/store/interestThemes";
import { processQuestions } from "@/utils/services/functions/process/processQuestion";
import { FormEvent, useRef, useState } from "react";
import { useErrorMessage } from "./useErrorMessage";
import { useGetAnswers } from "./useGetAnswers";
import { validatePregunta } from "@/utils/schemes/formValidation";



export const useForm = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [pregunta, setPregunta] = useState("");
    const addNewFlashcards = useFlashCardsStore((state) => state.addNewFlashcards);
    const selectedTheme = useThemeStore((state) => state.selectedTheme); 
    const {showError, debouncedSetError } = useErrorMessage();
    const {  getAnswers } = useGetAnswers() 

    const resetForm = () => {
        setPregunta("");
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      };
    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const result = processQuestions({data})
    
        if(result.error) {
          
          return;
        }
          const questions = result.questions as string[];
    
        try {
          // Obtenemos el tema
          const theme = selectedTheme;
          
          //Enviamos los datos a la API
          const userLevel = "basic";
          
          // La respuesta ya es el array de respuestas directamente
          const answers = await getAnswers({ theme, questions, userLevel });
          
          if (!answers) {
            throw new Error("No se recibieron respuestas de la API");
          }
    
          //Enviamos los datos al store para mostrar de forma local
          addNewFlashcards(theme, questions, answers);
    
          resetForm();
        } catch (error) {
          if (error instanceof Error) showError("Error al obtener la respuesta", 2000)
        }
      }
    
      const handlePreguntaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setPregunta(value);
    
        const errorMessage = validatePregunta(value);
        debouncedSetError(errorMessage);
    
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto"; // Reinicia el alto
          textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px"; // Ajusta al contenido
        } 
      };

      return { handleSubmit, handlePreguntaChange, pregunta, textareaRef}

}