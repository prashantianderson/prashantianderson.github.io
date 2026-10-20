// ============================================================================
// News Controls
// ============================================================================

function initNewsControls() {
  const newsList = document.getElementById('news-list');
  const newsToggle = document.querySelector('.news-toggle');
  const filterOptions = Array.from(document.querySelectorAll('.updates-filter-option'));

  if (!newsList) return;

  const collapsedCount =
    Number.parseInt(newsList.dataset.collapsedCount || '', 10) || 3;
  const items = Array.from(newsList.children);
  let isExpanded = false;
  let activeFilter =
    filterOptions.find((option) => option.classList.contains('is-active'))?.dataset.filter || 'all';

  const getMatchingItems = () =>
    items.filter((item) => {
      if (activeFilter === 'all') return true;
      const categories = (item.dataset.categories || '')
        .split(/\s+/)
        .filter(Boolean);
      return categories.includes(activeFilter);
    });

  const updateToggle = (matchingItems) => {
    if (!newsToggle) return;

    if (matchingItems.length <= collapsedCount) {
      newsToggle.hidden = true;
      newsToggle.setAttribute('aria-expanded', 'false');
      return;
    }

    newsToggle.hidden = false;
    newsToggle.innerHTML = `<i class="news-toggle-icon fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}" aria-hidden="true"></i>`;
    newsToggle.setAttribute('aria-label', isExpanded ? 'Show fewer updates' : 'Show more updates');
    newsToggle.setAttribute('aria-expanded', String(isExpanded));
  };

  const renderVisibleItems = () => {
    const matchingItems = getMatchingItems();

    items.forEach((item) => {
      item.style.display = 'none';
    });

    matchingItems.forEach((item, index) => {
      item.style.display = !isExpanded && index >= collapsedCount ? 'none' : 'grid';
    });

    updateToggle(matchingItems);
  };

  const syncFilterUI = () => {
    filterOptions.forEach((option) => {
      const isActive = option.dataset.filter === activeFilter;
      option.classList.toggle('is-active', isActive);
      option.setAttribute('aria-checked', String(isActive));
    });
  };

  filterOptions.forEach((option) => {
    option.addEventListener('click', () => {
      activeFilter = option.dataset.filter || 'all';
      syncFilterUI();
      isExpanded = false;
      renderVisibleItems();
    });
  });

  syncFilterUI();
  renderVisibleItems();

  if (newsToggle) {
    newsToggle.addEventListener('click', () => {
      isExpanded = !isExpanded;
      renderVisibleItems();
    });
  }
}

// Triggers the function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initNewsControls);