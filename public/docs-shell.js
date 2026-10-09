(function () {
  function initializeShell() {
    var root = document.documentElement;
    var themeButton = document.querySelector('[data-theme-toggle]');
    var searchButton = document.querySelector('[data-search-open]');
    var dialog = document.getElementById('docs-search');
    var theme;
    try { theme = localStorage.getItem('ash-docs-theme'); } catch { /* Storage is optional. */ }
    if (theme !== 'light' && theme !== 'dark') theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    function setTheme(value) {
      root.dataset.theme = value;
      themeButton.textContent = value === 'dark' ? '浅色' : '深色';
      themeButton.setAttribute('aria-label', value === 'dark' ? '切换为浅色主题' : '切换为深色主题');
    }
    setTheme(theme);
    themeButton.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
      try { localStorage.setItem('ash-docs-theme', next); } catch { /* Storage is optional. */ }
    });
    var priorFocus;
    function openSearch() {
      var search = document.querySelector('.sidebar .search');
      if (search) dialog.appendChild(search);
      priorFocus = document.activeElement;
      if (!dialog.open) dialog.showModal();
      var input = dialog.querySelector('input');
      if (input) input.focus();
    }
    searchButton.addEventListener('click', openSearch);
    dialog.querySelector('button').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('close', function () { if (priorFocus && priorFocus.isConnected) priorFocus.focus(); });
    dialog.addEventListener('click', function (event) {
      if (event.target.closest('.matching-post a')) dialog.close();
    });
    document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeShell);
  else initializeShell();
})();
