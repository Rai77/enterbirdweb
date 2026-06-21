import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";
import { clearCollection, isCollectionEmpty } from "./_utils";

type TeamMemberSource = { name: string; role: string };

export async function seedTeam(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  const slug = "team-members";

  if (reset) {
    await clearCollection(payload, slug);
  } else if (!(await isCollectionEmpty(payload, slug))) {
    return;
  }

  const trMembers = (trMessages.about as { team: { members: TeamMemberSource[] } })
    .team.members;
  const enMembers = (enMessages.about as { team: { members: TeamMemberSource[] } })
    .team.members;

  for (const [i, mTr] of trMembers.entries()) {
    const mEn = enMembers[i];
    const doc = await payload.create({
      collection: "team-members",
      locale: "tr",
      data: {
        order: i,
        name: mTr.name,
        role: mTr.role,
      },
    });

    if (mEn) {
      await payload.update({
        collection: "team-members",
        id: doc.id,
        locale: "en",
        data: { role: mEn.role },
      });
    }
  }
}
