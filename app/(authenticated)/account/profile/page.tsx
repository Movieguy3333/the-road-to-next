import Heading from "@/components/heading";

import { AccountTabs } from "@/app/(authenticated)/account/_navigation/tabs";
import ChangeUsernameForm from "@/features/auth/components/change-username";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
export default async function ProfilePage() {
  const { user } = await getAuthOrRedirect();
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        description="Your profile information"
        tabs={<AccountTabs />}
      />
      <ChangeUsernameForm user={user} />
    </div>
  );
}
