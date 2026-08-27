import Spinner from "@/components/spinner";

function Loading() {
  // Note: Suspense gives you fine-grained control over loading states. It is essentially a suspense boundary for the entire page. If you want to show a loading state for a specific component, you can use Suspense inside that component.
  return <Spinner />;
}

export default Loading;
