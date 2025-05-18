
import { FormEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useCardInputStore } from "@/store/cardInput";
import { processToArray } from "@/utils/services/functions/processToArray";
import { useCardAnswerStore } from "@/store/cardProcess";
import { formSchema } from "@/utils/schemes/formValidation";
import ThemeSelectorComponent from "./ThemeSelector";
import { useThemeStore } from "@/store/interestThemes";

export const Generator = () => {
  const [pregunta, setPregunta] = useState("");
  const [error, setError] = useState<null | string>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const setQuestions = useCardInputStore((state) => state.setQuestions);
  const setTheme = useCardInputStore((state) => state.setTheme);
  const getAnswers = useCardAnswerStore((state) => state.getAnswer);
  const selectedTheme = useThemeStore((state) => state.selectedTheme)

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

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
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

    // Procesamos las preguntas como array
    const questions = processToArray(data);

    // Obtenemos el tema
    const theme = selectedTheme

    //Enviamos los datos al store
    setQuestions(questions);
    setTheme(theme as string);
    getAnswers();
    resetForm();
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
          disabled={error ? true : false}
          className=" cursor-pointer hover:bg-blue-600 "
          type="submit"
        >
          Generar Flashcard
        </Button>
        {error ? <p>{error}</p> : ""}
      </form>
    </section>
  );
};
