import { mockOptionData } from "@/utils/optionMocks";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { DataToggle } from "../ui/DataToggle";
import { Textarea } from "../ui/textarea";

export const Generator = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = mockOptionData;
  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Aquí ves todos los campos con `name`
  };

  return (
    <section className="flex flex-col items-center justify-center border-2 border-black rounded-lg p-5 mt-auto">
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
          className="resize-none"
          minLength={10}
          maxLength={30}
        />
        <Button className=" cursor-pointer hover:bg-blue-600 " type="submit">
          Generar Flashcard{" "}
        </Button>
      </form>
    </section>
  );
};
