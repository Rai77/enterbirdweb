import type { Access, FieldAccess } from "payload";

/**
 * Erişim kuralları — panelin tek güvenlik katmanı.
 *
 * İki rol var:
 *   - `admin`  → her şeyi yapabilir (kullanıcı ekler/siler, rol atar)
 *   - `editor` → içeriği düzenler, kullanıcı yönetimine dokunamaz
 *
 * Genel (public) site içeriği herkese AÇIK okunur; yazma işlemleri yalnız
 * giriş yapmış kullanıcılara, kullanıcı/rol yönetimi yalnız admin'e kapalıdır.
 */

type MaybeUser = { role?: "admin" | "editor" } | null | undefined;

function roleOf(user: MaybeUser): "admin" | "editor" | null {
  if (!user) return null;
  return user.role ?? "editor";
}

/** Herkese açık — public site içeriğinin okunması için. */
export const anyone: Access = () => true;

/** Giriş yapmış herhangi bir kullanıcı (admin veya editor). */
export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Sadece admin. */
export const adminOnly: Access = ({ req }) => roleOf(req.user as MaybeUser) === "admin";

/** Admin her kullanıcıyı, editor yalnız kendini güncelleyebilir/okuyabilir. */
export const adminOrSelf: Access = ({ req }) => {
  const user = req.user as MaybeUser;
  if (!user) return false;
  if (roleOf(user) === "admin") return true;
  // editor → sadece kendi kaydı
  return { id: { equals: (user as { id?: string | number }).id } };
};

/** Field düzeyinde: yalnız admin yazabilir (rol alanı yükseltmesini engeller). */
export const adminFieldLevel: FieldAccess = ({ req }) =>
  roleOf(req.user as MaybeUser) === "admin";

/**
 * İçerik koleksiyonları için standart erişim:
 * okuma herkese açık, yazma yalnız giriş yapmışlara.
 */
export const contentAccess = {
  read: anyone,
  create: authenticated,
  update: authenticated,
  delete: authenticated,
} satisfies { read: Access; create: Access; update: Access; delete: Access };
