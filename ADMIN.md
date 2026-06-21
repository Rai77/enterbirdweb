# Enterbird CMS · Admin Paneli

Site içeriğinin tamamı **Payload CMS** panelinden düzenlenir. Kod değişikliğine gerek yoktur — giriş yap, istediğin alanı güncelle, kaydet, 2-3 saniye içinde siteye yansır.

---

## Giriş

**URL:** `http://localhost:3000/admin` (dev) veya `https://enterbird.com/admin` (prod)

**Admin hesabı:** İlk admin, seed sırasında `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
ortam değişkenlerinden oluşturulur (repoda düz metin şifre tutulmaz). Bu bilgileri
proje sorumlusundan alın.

İlk girişten sonra **Sistem → Kullanıcılar** menüsünden ek kullanıcı ekleyebilir,
her birine **rol** (Admin / Editör) atayabilirsiniz:
- **Admin:** her şeyi yapar — kullanıcı ekler/siler, rol atar, içeriği düzenler.
- **Editör:** yalnız içeriği düzenler; kullanıcı yönetimine erişemez. (Jr ekip için ideal.)

---

## Panel Yapısı

Panel, sol menüde üç grup halinde organize edilmiştir:

### 📦 Content (İçerik)
Tekrarlanan, liste halindeki içerikler. Yeni kayıt eklemek, silmek, sıralamak buradadır.

| Menü | Ne için? | Sıralama |
|---|---|---|
| **Services / Hizmetler** | 9 hizmet kartı (e-ticaret, performans, SEO, sosyal, pazaryeri, AI, design, operasyon, marka) | `order` field (0-99, küçükten büyüğe) |
| **Projects / Projeler** | Referans portföyündeki projeler (Lady Faith, Reyorganic, vb.) | `order` field |
| **Testimonials / Müşteri Yorumları** | Anasayfada gösterilen 3 müşteri yorumu | `order` field |
| **Team Members / Ekip Üyeleri** | Hakkımızda sayfasındaki ekip listesi | `order` field |
| **Blog Posts / Blog Yazıları** | Blog sayfasındaki yazılar | `publishedAt` tarihi |
| **Media / Görseller** | Tüm upload'lar (proje görselleri, ekip fotoları, blog kapakları) | — |

### 🗂️ Pages (Sayfalar)
Her sayfanın kendi başlık/metin blokları. Tekil (global) yapıdadır — yeni eklenemez, sadece düzenlenir.

| Global | Hangi sayfa? |
|---|---|
| **Home Page / Anasayfa** | `/` — Hero, istatistikler, platform marquee, servis/proje/testimonial/süreç başlıkları, Loom teaser |
| **Services Page / Hizmetler Sayfası** | `/services` — sayfa başlığı ve açıklaması (listeyi Services collection besler) |
| **About Page / Hakkımızda Sayfası** | `/about` — manifesto, hikaye, timeline, değerler, büyük istatistikler |
| **Loom Page / Loom Sayfası** | `/loom` — tüm Loom Commerce içeriği (hero, 5 modül, karşılaştırma, altyapı, hedef kitle, CTA) |
| **Contact Page / İletişim Sayfası** | `/contact` — sayfa başlığı, form alan etiketleri, iletişim bilgileri |

### 🎨 Layout (Yerleşim)
Her sayfada görünen ortak parçalar.

| Global | Ne için? |
|---|---|
| **Header / Başlık Çubuğu** | Menü öğeleri, CTA butonu |
| **Footer / Altbilgi** | Tagline, konum, servis/şirket kolonları, iletişim bilgisi, telif satırları |

### ✨ Shared (Ortak)
| Global | Ne için? |
|---|---|
| **CTA Block** | Anasayfa altındaki "görüşme talep et" bloku |

---

## Çok Dilli (TR + EN)

Her içerik alanının sağ üstünde **locale seçici** vardır. Sol üst varsayılan Türkçe (`TR`). İngilizce versiyonu düzenlemek için `EN`'e geçer, değişiklik yapar, kaydedersin. TR'yi kaydedip EN'de değiştirmezsen, EN dili TR'ye düşer.

**Önemli:** `slug`, `order`, `href`, `iconName`, `gradient` gibi alanlar **dil bağımsızdır** — bir kere set edilir, iki dil için aynı kalır. Sadece metin/başlık alanları lokalize edilir.

---

## Tipik İşlemler

### Yeni hizmet eklemek
1. Sol menüden **Services** seç.
2. Sağ üstte **Create New**.
3. `slug` (benzersiz, örnek: `legal-compliance`), `iconName` (lucide-react ikonu, örnek: `Scale`), `order` (mevcut 9'un sonuna koymak için 9 yaz).
4. TR dilinde `title`, `short`, `description`, `bullets` (bullet'ı yeni satır eklemek için **Add row**).
5. `Save`. Üste locale switcher'dan `EN`'e geç, İngilizce versiyonları gir. `Save`.
6. Site otomatik güncellenir.

### Proje görseli yüklemek
1. **Projects** → proje aç.
2. `image` field'ında **Upload new** → görsel seç.
3. Veya `imageExternalUrl` alanına direkt URL yapıştır (Unsplash vs.).
4. `Save`.

### Anasayfa hero metnini değiştirmek
1. **Home Page** (Pages grubu) aç.
2. `hero.title1` ve `hero.title2` alanlarını düzenle.
3. Locale switcher ile EN versiyonunu da gir.
4. `Save`.

### Yeni blog yazısı
1. **Blog Posts** → **Create New**.
2. `slug` (URL için, örnek: `shopify-checkout-optimizasyonu`).
3. `title`, `category`, `excerpt`, `content` (rich text editor — markdown benzeri).
4. `publishedAt` (tarih seç).
5. `Save`.

---

## İçeriği Dışa/İçe Aktarma

Tüm içerik `cms/.payload.db` dosyasında (SQLite) saklanır. Veritabanını başka makineye taşımak istersen bu dosyayı kopyala. Production'da Postgres'e geçmek için `.env.local` içindeki `DATABASE_URI`'yi ayarla.

---

## Sorun Giderme

**"Panel açılıyor ama içerik boş."**
Muhtemelen seed çalışmamış. Terminal'de:
```
npm run dev
curl -X POST 'http://localhost:3000/api/seed' -H 'x-seed-token: dev-only-seed'
```

**"Değişiklik yaptım ama siteye yansımıyor."**
Next.js, Payload'dan okurken RSC cache kullanır. `Ctrl+Shift+R` ile hard refresh yap; inatçıysa dev server'ı yeniden başlat.

**"Site Türkçe göstermiyor."**
URL'de `/tr` önekinin olduğundan emin ol. `/en` İngilizce, `/tr` Türkçe. Payload'da içerik eklerken locale switcher'ı kontrol et.

**"Yeni bir ekip üyesi ekledim ama Hakkımızda sayfasında görünmüyor."**
`app/[locale]/about/page.tsx` şu an team bloğunu comment-out tutuyor (fotoğraf gelince açılacak). Kod tarafında açmak için ekibi commentsiz hale getir, veya admin'den fotoğraf ekleyip bana haber ver.

---

## Geliştiriciye Notlar

- CMS foundation: `cms/localization.ts` (TR default + EN)
- Read helpers: `lib/cms.ts` (`getGlobalContent`, `getCollectionContent`)
- Seed script: `POST /api/seed` (idempotent) · `?reset=1` (wipe + re-seed)
- Seed content kaynak: `messages/tr.json` + `messages/en.json` + `lib/data.ts`
- Admin components: `cms/components/AdminIcon.tsx` + `AdminLogo.tsx`
- Tüm collection/global TypeScript tipleri Payload tarafından `cms/payload-types.ts`'e generate edilir (henüz çalıştırılmadı; `npx payload generate:types` ileride).
