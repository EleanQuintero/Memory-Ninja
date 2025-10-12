import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, useReducedMotion } from "motion/react";

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  priceSubtext?: string;
  features: PricingFeature[];
  buttonText: string;
  buttonHref: string;
  isHighlighted?: boolean;
  highlightText?: string;
}

export default function PricingCard({
  title,
  description,
  price,
  priceSubtext,
  features,
  buttonText,
  buttonHref,
  isHighlighted = false,
  highlightText = "Recomendado",
}: PricingCardProps) {
  const prefersReduced = useReducedMotion();

  const cardClasses = isHighlighted
    ? "relative p-1 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500"
    : "relative p-0.5 rounded-2xl bg-gradient-to-r from-gray-600/50 to-gray-700/50";

  const innerCardClasses = isHighlighted
    ? "bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 h-full border border-blue-500/30 shadow-2xl"
    : "bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 h-full border border-gray-600/30 shadow-2xl";

  const priceClasses = isHighlighted
    ? "text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
    : "text-4xl font-extrabold text-white";

  const buttonClasses = isHighlighted
    ? "w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-[1.02]"
    : "w-full bg-gray-700 hover:bg-gray-600 hover:scale-[1.02]";

  return (
    <motion.div
      className={cardClasses}
      whileHover={
        prefersReduced
          ? {}
          : {
              y: -12,
              scale: 1.03,
              boxShadow: isHighlighted
                ? "0 25px 50px rgba(59, 130, 246, 0.3)"
                : "0 25px 50px rgba(0, 0, 0, 0.4)",
            }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {isHighlighted && highlightText && (
        <div className="absolute -top-4 right-4 z-10 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {highlightText}
        </div>
      )}
      <div className={innerCardClasses}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-base text-gray-400">{description}</p>
        <p className="mt-4">
          <span className={priceClasses}>{price}</span>
          {priceSubtext && (
            <span className="text-lg font-medium text-gray-400">
              {priceSubtext}
            </span>
          )}
        </p>
        <ul className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-blue-400 mt-0.5" />
              </div>
              <p className="ml-3 text-sm text-gray-300">{feature.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button
            asChild
            variant={isHighlighted ? "default" : "secondary"}
            className={buttonClasses}
          >
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
