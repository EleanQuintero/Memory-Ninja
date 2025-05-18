import { mockOptionData } from "@/utils/optionMocks";
import { FormEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { DataToggle } from "../ui/DataToggle";
import { Textarea } from "../ui/textarea";
import { useCardInputStore } from "@/store/cardInput";
import { processToArray } from "@/utils/services/functions/processToArray";
import { omit } from "@/utils/services/functions/omitProperty";

export const Generator = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [pregunta, setPregunta] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const setQuestions = useCardInputStore((state) => state.setQuestions);
  const setTheme = useCardInputStore((state) => state.setTheme);
  const options = mockOptionData;

  const handlePreguntaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPregunta(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reinicia el alto
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // Ajusta al contenido
    }
  };

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Procesamos las preguntas como array
    const questions = processToArray(data);

    // Obtenemos el tema
    // Separamos el tema del resto de los datos
    const restData = omit(data, "pregunta");
    const theme = restData;

    //Enviamos los datos al store
    setQuestions(questions);
    setTheme(theme as unknown as string);
  };

  return (
    <section className="flex flex-row items-center justify-center border-2 border-black rounded-lg p-5 mt-auto text-xl">
      <form
        className="flex flex-col items-center justify-center gap-3"
        onSubmit={handleSumbit}
      >
        <label htmlFor="">Escoge un tema</label>
        <div>
          {options.map((option) => (
            <DataToggle
              key={option}
              option={option}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
            />
          ))}
        </div>

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
        <Button className=" cursor-pointer hover:bg-blue-600 " type="submit">
          Generar Flashcard
        </Button>
      </form>
    </section>
  );
};
