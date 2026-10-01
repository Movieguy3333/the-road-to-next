import { RedirectToast } from "@/components/redirect-toast";

/* Note: templates are basically layouts, but instead of persisting on route changes like in layout, they create a fresh instance on every navigation.

If you define both a layout and a template in the same route segment, Next.js renders them in a specific hierarchy:tsx<Layout>
  <Template>
    <Page />
  </Template>
</Layout>
*/
type RootTemplateProps = {
  children: React.ReactNode;
};

export default function Template({ children }: RootTemplateProps) {
  return (
    <>
      <>{children}</>
      <RedirectToast />
    </>
  );
}
