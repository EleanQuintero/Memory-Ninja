import { FormEvent } from "react";
import ThemeSelectorComponent from "./ThemeSelector";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { RefObject } from "react";
import type { UserResource } from "@clerk/types"; 

interface GeneratorProps {
error: string | null
pregunta: string
textareaRef: RefObject<HTMLTextAreaElement | null>
loadingAnswers: boolean
handleSubmit: (e: FormEvent<HTMLFormElement>) => void
handlePreguntaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
user: UserResource | null | undefined

}


export const FlashCardGenerator = ({ textareaRef, error, handlePreguntaChange, handleSubmit, loadingAnswers, pregunta, user }: GeneratorProps) => {

    console.log("esto se renderiza")

    return (
        <form
          className="flex flex-col items-center justify-center gap-3"
          onSubmit={handleSubmit}
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
            placeholder="¿Que es una flashcard?"
          />
          <Button
            className="cursor-pointer hover:bg-blue-600"
            type="submit"
            disabled={!user || !user.id || !!error || loadingAnswers}
          >
            Generar Flashcard
          </Button>
          {error && (
            <p className="text-red-500" aria-live="assertive">
              {error}
            </p>
          )}
        </form>
    )

}