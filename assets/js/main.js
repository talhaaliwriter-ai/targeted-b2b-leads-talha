(() => {
  'use strict';
  const WHATSAPP_NUMBER = '923251567109';
  const EMAIL_ADDRESS = 'talhahashim816@gmail.com';

  // Mobile navigation
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (menuToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      document.body.classList.remove('menu-open');
    };
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', isOpen);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });
  }

  // Demo lead grid filtering and searching
  const table = document.querySelector('#lead-table');
  const sectorFilter = document.querySelector('#sector-filter');
  const searchInput = document.querySelector('#sample-search');
  if (table && sectorFilter && searchInput) {
    const tbody = table.querySelector('tbody');
    const originalRows = [...tbody.querySelectorAll('tr')].map((row) => row.cloneNode(true));
    const filterRows = () => {
      const sector = sectorFilter.value;
      const query = searchInput.value.trim().toLowerCase();
      let visible = 0;
      [...tbody.querySelectorAll('tr')].forEach((row) => row.remove());
      originalRows.forEach((row) => {
        const sectorMatch = sector === 'all' || row.dataset.sector === sector;
        const queryMatch = !query || row.textContent.toLowerCase().includes(query);
        if (sectorMatch && queryMatch) {
          tbody.appendChild(row.cloneNode(true));
          visible += 1;
        }
      });
      if (!visible) {
        const row = document.createElement('tr');
        row.className = 'no-results';
        const cell = document.createElement('td');
        cell.colSpan = 8;
        cell.textContent = 'No demo rows match those filters. Try another search.';
        row.appendChild(cell);
        tbody.appendChild(row);
      }
    };
    sectorFilter.addEventListener('change', filterRows);
    searchInput.addEventListener('input', filterRows);
  }

  // Download the sample records as a CSV file
  const downloadButton = document.querySelector('#download-csv');
  if (downloadButton && table) {
    downloadButton.addEventListener('click', () => {
      const rows = [...table.querySelectorAll('thead tr, tbody tr')].filter((row) => !row.classList.contains('no-results'));
      const csvEscape = (value) => `"${String(value).replace(/"/g, '""')}"`;
      const csv = rows.map((row) => [...row.querySelectorAll('th,td')].map((cell) => csvEscape(cell.innerText.trim())).join(',')).join('\r\n');
      const blob = new Blob([`\uFEFF${csv}\r\n"Note","Illustrative demo rows only; not real prospect data."`], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'illustrative-b2b-lead-sample.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    });
  }

  const form = document.querySelector('#quote-form');
  const note = document.querySelector('#form-note');
  const whatsappButton = document.querySelector('#quote-whatsapp');
  const getFormMessage = () => {
    if (!form) return '';
    const data = new FormData(form);
    const lines = [
      'Hello, I would like to discuss a B2B research / data project.',
      '',
      `Name: ${data.get('name') || ''}`,
      `Business email: ${data.get('email') || ''}`,
      `Company: ${data.get('company') || 'Not provided'}`,
      `Phone / WhatsApp: ${data.get('phone') || 'Not provided'}`,
      `Service: ${data.get('service') || ''}`,
      `Approximate list size: ${data.get('volume') || 'Not sure yet'}`,
      `Target industry: ${data.get('industry') || ''}`,
      `Target location: ${data.get('location') || ''}`,
      `Job titles / roles: ${data.get('jobTitles') || 'Not specified'}`,
      `Additional requirements: ${data.get('requirements') || 'None provided'}`
    ];
    return lines.join('\n');
  };
  const formIsValid = () => {
    if (!form) return false;
    if (!form.reportValidity()) return false;
    return true;
  };
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!formIsValid()) return;
      const subject = encodeURIComponent('B2B Lead Research Quote Request');
      const body = encodeURIComponent(getFormMessage());
      if (note) {
        note.textContent = 'Your email app should open with the project brief. Review it and press Send to submit your request.';
        note.classList.remove('is-error');
        note.classList.add('is-success');
      }
      window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
    });
  }
  if (whatsappButton && form) {
    whatsappButton.addEventListener('click', () => {
      if (!formIsValid()) return;
      const text = encodeURIComponent(getFormMessage());
      if (note) {
        note.textContent = 'WhatsApp is opening with your message prepared. Review it and press Send in WhatsApp.';
        note.classList.remove('is-error');
        note.classList.add('is-success');
      }
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
    });
  }

  // Keep the footer year current
  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
