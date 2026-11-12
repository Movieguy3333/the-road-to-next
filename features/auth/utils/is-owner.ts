import { User as AuthUser } from "lucia";

type Entity = {
  // Note: userId could be null, because if we delete a user, the ticket will can still stay and not have a userId.
  userId: string | null;
};

export function isOwner(
  authUser: AuthUser | null | undefined,
  entity: Entity | null | undefined,
) {
  if (!authUser || !entity) {
    return false;
  }

  // Note: if the ticket doesn't have a userId, it means that the ticket is not owned by the user and is not the owner.
  if (!entity.userId) {
    return false;
  }
  if (entity.userId !== authUser.id) {
    return false;
  } else {
    return true;
  }
}
