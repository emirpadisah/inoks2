import type { ElementType } from "react";

type AnimatedTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
};

export default function AnimatedText({
  text,
  as: Tag = "span",
  className,
  wordClassName = "animated-word"
}: AnimatedTextProps) {
  return (
    <Tag className={className}>
      {text.split(" ").map((word, index) => (
        <span aria-hidden="true" className="word-mask" key={`${word}-${index}`}>
          <span className={wordClassName}>{word}</span>
          {index < text.split(" ").length - 1 ? "\u00a0" : ""}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
