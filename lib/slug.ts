/**
 * Panelde yazılan slug'ı adres çubuğuna girebilecek hâle getirir.
 *
 * Neden gerekli: slug alanı serbest metin ve panele "Stok ve Ürün Strateji
 * Yönetimi " gibi boşluklu, büyük harfli, Türkçe karakterli değerler
 * yazılabiliyor. Bu değer hem bağlantı adresinde hem de sayfadaki çıpa
 * kimliğinde kullanıldığı için, ham hâliyle kırık bağlantı üretiyordu.
 *
 * Dönüştürme her iki tarafta da aynı fonksiyondan geçtiği için bağlantı ile
 * çıpa her zaman birbirini tutar. Paneldeki değere dokunulmaz.
 *
 *   "Stok ve Ürün Strateji Yönetimi " → "stok-ve-urun-strateji-yonetimi"
 *   " Shopify "                       → "shopify"
 *   "ecommerce"                       → "ecommerce"  (zaten temiz olanlar aynı kalır)
 */
const TURKISH: Record<string, string> = {
  ı: "i",
  İ: "i",
  ş: "s",
  Ş: "s",
  ğ: "g",
  Ğ: "g",
  ü: "u",
  Ü: "u",
  ö: "o",
  Ö: "o",
  ç: "c",
  Ç: "c",
};

export function toAnchorId(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .trim()
    .replace(/[ıİşŞğĞüÜöÖçÇ]/g, (ch) => TURKISH[ch] ?? ch)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
