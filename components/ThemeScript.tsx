// Varsayılan açık tema. Yalnız ziyaretçi tema düğmesine kendisi bastıysa
// "eb-theme" kaydı vardır. Eski "theme" anahtarı bilerek okunmuyor: eski sürüm
// onu her ziyaretçiye "dark" olarak yazıyordu, gerçek bir tercih değil.
const script = `(function(){try{var t=localStorage.getItem('eb-theme');if(t!=='light'&&t!=='dark')t='light';var d=document.documentElement;if(t==='dark')d.classList.add('dark');d.style.colorScheme=t;}catch(e){document.documentElement.style.colorScheme='light';}})();`;

export function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
