(function () {
  const list = document.getElementById('nameList');
  const frame = document.getElementById('contentFrame');
  const search = document.getElementById('searchInput');
  const noResults = document.getElementById('noResults');
  if (!list || !frame) return;

  const entries = Array.from(list.querySelectorAll('.entry'));
  const headings = Array.from(list.querySelectorAll('.letter-heading'));

  entries.forEach((entry) => {
    entry.addEventListener('click', () => {
      const src = entry.getAttribute('data-src');
      if (!src) return;
      entries.forEach((e) => e.classList.remove('active'));
      entry.classList.add('active');
      frame.src = src;
    });
  });

  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();

      entries.forEach((entry) => {
        const name = entry.getAttribute('data-name') || '';
        const match = name.includes(q);
        entry.classList.toggle('hidden', !match);
      });

      headings.forEach((heading) => {
        let node = heading.nextElementSibling;
        let hasVisible = false;
        while (node && node.classList.contains('entry')) {
          if (!node.classList.contains('hidden')) hasVisible = true;
          node = node.nextElementSibling;
        }
        heading.classList.toggle('hidden', !hasVisible);
      });

      const anyVisible = entries.some((e) => !e.classList.contains('hidden'));
      if (noResults) noResults.classList.toggle('visible', !anyVisible);
    });
  }
})();
