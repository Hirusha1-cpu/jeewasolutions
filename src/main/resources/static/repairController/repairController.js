document.addEventListener('DOMContentLoaded', function() {
    const myTabsEl = document.getElementById('myTabs');
    const firstTab = new bootstrap.Tab(myTabsEl.querySelector('.nav-tabs .nav-link.active'));
    firstTab.show();
  });