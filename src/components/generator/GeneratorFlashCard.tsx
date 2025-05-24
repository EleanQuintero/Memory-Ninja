import { FormEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useCardInputStore } from "@/store/cardInput";
import { processToArray } from "@/utils/services/functions/processToArray";
import { formSchema } from "@/utils/schemes/formValidation";
import ThemeSelectorComponent from "./ThemeSelector";
import { useThemeStore } from "@/store/interestThemes";
import { getMockData } from "@/utils/services/getMockData";
import { useCardAnswerStore } from "@/store/cardProcess";

export const Generator = () => {
  const [pregunta, setPregunta] = useState("");
  const [error, setError] = useState<null | string>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const setQuestions = useCardInputStore((state) => state.setQuestions);
  const setTheme = useCardInputStore((state) => state.setTheme);
  const setAnswers = useCardAnswerStore((state) => state.setAnswers);
  const selectedTheme = useThemeStore((state) => state.selectedTheme);

  const handlePreguntaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPregunta(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reinicia el alto
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // Ajusta al contenido
    }
  };

  const resetForm = () => {
    setPregunta("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    //Validamos los datos introducidos al formulario
    const result = formSchema.safeParse(data);

    if (!result.success) {
      setError(result.error.errors[0].message);
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }

    try {
      // Procesamos las preguntas como array
      const questions = processToArray(data);

      // Obtenemos el tema
      const theme = selectedTheme;

      //Enviamos los datos a la API
      const userLevel = "basic";
      const answer = await getMockData(theme as string, questions, userLevel);

      if (!answer) {
        throw new Error("No se recibieron respuestas de la API");
      }

      //Enviamos los datos al store
      setQuestions(questions);
      setTheme(theme as string);
      await setAnswers(answer);
      resetForm();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al procesar la solicitud"
      );
    }
  };

  return (
    <section className="flex flex-row items-center justify-center rounded-lg p-5 mt-auto text-xl">
      <form
        className="flex flex-col items-center justify-center gap-3"
        onSubmit={handleSumbit}
      >
        <ThemeSelectorComponent />
        <label htmlFor="pregunta">Introduce aquí tu pregunta</label>
        <Textarea
          id="pregunta"
          name="pregunta"
          className="resize-none w-80 text-lg md:w-[45em] md:text-xl overflow-hidden"
          minLength={10}
          maxLength={200}
          value={pregunta}
          onChange={handlePreguntaChange}
          ref={textareaRef}
          rows={1}
          placeholder="Escribe aquí tu pregunta..."
        />
        <Button
          className="cursor-pointer hover:bg-blue-600"
          type="submit"
        ></Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </section>
  );
};
