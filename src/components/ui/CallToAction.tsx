import { Button } from "./button";

interface props {
  title: string;
  description: string;
  showButton?: boolean;
  url?: string;
}

export const CallToAction: React.FC<props> = ({
  title,
  description,
  showButton,
  url,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 text-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-lg">{description}</p>
      <a
        className={`${showButton ? "flex" : "hidden"} flex-col gap-4 `}
        href={url}
      >
        <Button
          variant="default"
          size="lg"
          className="w-full sm:w-auto hover:cursor-pointer"
        >
          ¡Comienza ahora!
        </Button>
      </a>
    </div>
  );
};
