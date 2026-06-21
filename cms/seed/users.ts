import type { Payload } from "payload";

/**
 * Seeds the standard Sperra admin user.
 * Safe to run multiple times — skips if email already exists.
 */
export async function seedAdminUser(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  // Kimlik bilgileri env'den okunur — repoda düz metin şifre tutulmaz.
  // Prod'da SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD set edilmeli.
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@enterbird.com";
  const password =
    process.env.SEED_ADMIN_PASSWORD ??
    (process.env.NODE_ENV === "production"
      ? (() => {
          throw new Error(
            "SEED_ADMIN_PASSWORD tanımlı değil. Prod'da admin seed'i için zorunludur.",
          );
        })()
      : "ChangeMe123!");
  const name = process.env.SEED_ADMIN_NAME ?? "Enterbird Admin";

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    if (!reset) return;
    await payload.delete({
      collection: "users",
      id: (existing.docs[0] as { id: string | number }).id,
    });
  }

  await payload.create({
    collection: "users",
    data: { email, password, name, role: "admin" },
  });
}
