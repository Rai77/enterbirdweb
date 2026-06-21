/**
 * Greeting block shown ABOVE the Payload login form.
 * Styled via `.eb-before-login` in app/(payload)/custom.scss.
 */
export const BeforeLogin = () => (
  <div className="eb-before-login">
    <span className="eb-before-login__eyebrow">Hoş geldin</span>
    <h2 className="eb-before-login__title">İçerik yönetim paneli</h2>
    <p className="eb-before-login__subtitle">
      Sitenin tüm içeriğini tek bir yerden güncelle — hizmetler, projeler, blog,
      sayfalar ve iletişim bilgileri.
    </p>
  </div>
);

export default BeforeLogin;
