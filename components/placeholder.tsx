import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement;
  button?: React.ReactElement | null;
};

function Placeholder({
  label,
  icon = <LucideMessageSquareWarning />,
  button = null,
}: PlaceholderProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 ">
      {/* Note:
          gap is usually used instead of margin to create space between elements. It is a shorthand for "row-gap" and "column-gap". In this case, we are using "gap-2" to create a gap of 0.5rem (8px) between the icon and the label.
        */}
      {/* Note:
          The "cloneElement" function is used to clone the icon element and add additional props to it. It is a common pattern and is used to alter the icon prop that is passed down to the Placeholder component.
        */}
      {cloneElement(icon, {
        // @ts-expect-error: Note: You may encounter a type error: No overload matches this call for cloneElement. This is related to React changing the React.ReactElement type from any to unknown.
        className: "w-16 h-16",
      })}

      <h2 className="text-lg text-center">{label}</h2>

      {/* Only execute cloneElement if the button prop is not null */}
      {button &&
        cloneElement(button, {
          // @ts-expect-error: React.ReactElement typing issue
          className: "h-10",
        })}
    </div>
  );
}

export default Placeholder;
