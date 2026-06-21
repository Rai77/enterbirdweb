const script = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';var d=document.documentElement;if(t==='dark')d.classList.add('dark');d.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`;

export function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
