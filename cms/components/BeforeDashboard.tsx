/**
 * Welcome banner shown at the TOP of the Payload dashboard.
 * Styled via `.eb-before-dashboard` in app/(payload)/custom.scss.
 */
import { ArrowUpRight, FileText, Layout, Briefcase } from "lucide-react";

export const BeforeDashboard = () => (
  <section className="eb-before-dashboard" aria-label="Hoş geldiniz">
    <div className="eb-before-dashboard__inner">
      <span className="eb-before-dashboard__eyebrow">— Enterbird CMS</span>
      <h1 className="eb-before-dashboard__title">
        Hoş geldin, Enterbird ekibi.
      </h1>
      <p className="eb-before-dashboard__subtitle">
        Buradan sitenin tüm içeriğini düzenleyebilirsin — hizmetleri, projeleri,
        ekip üyelerini, blog yazılarını ve sayfa içeriklerini. Değişiklikler birkaç
        saniye içinde canlıya yansır.
      </p>
      <div className="eb-before-dashboard__actions">
        <a
          href="/admin/collections/services"
          className="eb-before-dashboard__chip"
        >
          <Briefcase />
          Hizmetleri düzenle
          <ArrowUpRight />
        </a>
        <a
          href="/admin/collections/projects"
          className="eb-before-dashboard__chip"
        >
          <FileText />
          Projeleri yönet
          <ArrowUpRight />
        </a>
        <a
          href="/admin/globals/home-page"
          className="eb-before-dashboard__chip"
        >
          <Layout />
          Anasayfa
          <ArrowUpRight />
        </a>
        <a
          href="/tr"
          target="_blank"
          rel="noopener noreferrer"
          className="eb-before-dashboard__chip"
        >
          <ArrowUpRight />
          Siteyi aç
        </a>
      </div>
    </div>
  </section>
);

export default BeforeDashboard;
