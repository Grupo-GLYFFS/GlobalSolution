window.UIComponents = {
  init() {
    this.initDropdowns();
    this.initDrawers();
    this.initTabs();
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-dropdown-toggle]') && !e.target.closest('.dropdown-menu')) {
        document.querySelectorAll('.dropdown-menu:not(.hidden)').forEach(menu => {
          menu.classList.add('hidden');
        });
      }
    });
  },

  initDropdowns() {
    const toggleBtns = document.querySelectorAll('[data-dropdown-toggle]');
    toggleBtns.forEach(btn => {
      if (btn.hasAttribute('data-ui-init')) return;
      btn.setAttribute('data-ui-init', 'true');
      
      const targetId = btn.getAttribute('data-dropdown-toggle');
      const targetMenu = document.getElementById(targetId);
      
      if (targetMenu) {
        targetMenu.classList.add('dropdown-menu'); // mark for global click listener
        btn.addEventListener('click', (e) => {
          e.stopPropagation(); // prevent global click from hiding immediately
          // Hide all other dropdowns first
          document.querySelectorAll('.dropdown-menu:not(.hidden)').forEach(menu => {
            if (menu.id !== targetId) menu.classList.add('hidden');
          });
          
          if (targetMenu.classList.contains('hidden')) {
            targetMenu.classList.remove('hidden');
            targetMenu.style.visibility = 'hidden';
            
            const btnRect = btn.getBoundingClientRect();
            const menuHeight = targetMenu.offsetHeight;
            const spaceBelow = window.innerHeight - btnRect.bottom;
            
            if (targetMenu.classList.contains('top-full') || targetMenu.classList.contains('bottom-full')) {
                if (spaceBelow < menuHeight + 20 && btnRect.top > menuHeight + 20) {
                    targetMenu.classList.remove('top-full', 'mt-2');
                    targetMenu.classList.add('bottom-full', 'mb-2');
                } else {
                    targetMenu.classList.remove('bottom-full', 'mb-2');
                    targetMenu.classList.add('top-full', 'mt-2');
                }
            }
            targetMenu.style.visibility = '';
          } else {
            targetMenu.classList.add('hidden');
          }
        });
      }
    });
  },

  initDrawers() {
    // Show buttons
    const showBtns = document.querySelectorAll('[data-drawer-show], [data-drawer-target]');
    showBtns.forEach(btn => {
      if (btn.hasAttribute('data-ui-init-drawer-show')) return;
      btn.setAttribute('data-ui-init-drawer-show', 'true');
      
      const targetId = btn.getAttribute('data-drawer-show') || btn.getAttribute('data-drawer-target');
      const targetDrawer = document.getElementById(targetId);
      
      if (targetDrawer) {
        btn.addEventListener('click', () => {
          targetDrawer.classList.remove('-translate-x-full');
          this.showBackdrop(targetDrawer);
        });
      }
    });

    // Hide buttons
    const hideBtns = document.querySelectorAll('[data-drawer-hide]');
    hideBtns.forEach(btn => {
      if (btn.hasAttribute('data-ui-init-drawer-hide')) return;
      btn.setAttribute('data-ui-init-drawer-hide', 'true');
      
      const targetId = btn.getAttribute('data-drawer-hide');
      const targetDrawer = document.getElementById(targetId);
      
      if (targetDrawer) {
        btn.addEventListener('click', () => {
          targetDrawer.classList.add('-translate-x-full');
          this.hideBackdrop();
        });
      }
    });
  },

  initTabs() {
    const tabLists = document.querySelectorAll('[data-tabs-toggle]');
    tabLists.forEach(list => {
      if (list.hasAttribute('data-ui-init-tabs')) return;
      list.setAttribute('data-ui-init-tabs', 'true');
      
      const tabs = list.querySelectorAll('[role="tab"]');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => {
            t.setAttribute('aria-selected', 'false');
            const tId = t.getAttribute('data-tabs-target');
            if (tId) document.querySelector(tId)?.classList.add('hidden');
          });
          tab.setAttribute('aria-selected', 'true');
          const targetId = tab.getAttribute('data-tabs-target');
          if (targetId) document.querySelector(targetId)?.classList.remove('hidden');
        });
      });
      
      const activeTab = list.querySelector('[aria-selected="true"]') || tabs[0];
      if (activeTab) {
        tabs.forEach(t => {
          const tId = t.getAttribute('data-tabs-target');
          if (tId) document.querySelector(tId)?.classList.add('hidden');
        });
        const targetId = activeTab.getAttribute('data-tabs-target');
        if (targetId) document.querySelector(targetId)?.classList.remove('hidden');
      }
    });
  },

  showBackdrop(drawerElement) {
    if (!document.getElementById('ui-backdrop')) {
      const backdrop = document.createElement('div');
      backdrop.id = 'ui-backdrop';
      backdrop.className = 'fixed inset-0 bg-gray-900/50 z-40 transition-opacity';
      document.body.appendChild(backdrop);
      
      backdrop.addEventListener('click', () => {
        drawerElement.classList.add('-translate-x-full');
        this.hideBackdrop();
      });
    }
  },

  hideBackdrop() {
    const backdrop = document.getElementById('ui-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
};

// Initialize immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.UIComponents.init());
} else {
  window.UIComponents.init();
}
