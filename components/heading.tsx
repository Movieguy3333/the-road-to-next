import { Separator } from "@/components/ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
  tabs?: React.ReactNode;
};
{
  /* Note: optional description prop is used to provide additional context or information about the heading. If provided, it will be displayed below the title in a smaller font size. If not provided, only the title will be displayed. */
}

function Heading({ title, description, tabs }: HeadingProps) {
  return (
    <>
      {tabs}
      <div className="px-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <Separator />
    </>
  );
}

export default Heading;
