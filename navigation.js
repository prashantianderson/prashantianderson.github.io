(() => {
  const header = document.querySelector('.site-header');
  const navigation = document.getElementById('nav');

  if (!header || !navigation || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(([entry]) => {
    navigation.classList.toggle(
      'is-in-margin',
      !entry.isIntersecting && entry.boundingClientRect.bottom <= 0
    );
  });

  observer.observe(header);
})();
