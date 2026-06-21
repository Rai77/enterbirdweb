/* eslint-disable @next/next/no-img-element */
/**
 * Logo block on Payload admin login / forgot-password screens.
 * Styled via `.eb-admin-logo` in app/(payload)/custom.scss.
 */
export const AdminLogo = () => (
  <div className="eb-admin-logo" aria-label="Enterbird AI Digital">
    <div className="eb-admin-logo__mark">
      <img src="/logo_tr.png" alt="Enterbird" />
    </div>
    <div className="eb-admin-logo__wordmark">Enterbird CMS</div>
    <div className="eb-admin-logo__tag">AI Digital · İçerik Yönetimi</div>
  </div>
);

export default AdminLogo;
