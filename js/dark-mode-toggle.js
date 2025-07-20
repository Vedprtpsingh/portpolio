// Dark Mode Toggle JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Create the toggle button
  const themeToggle = document.createElement('button');
  themeToggle.classList.add('theme-toggle');
  themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  // Set initial icon to moon for light mode by default
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.prepend(themeToggle);

  // Load saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    // For light mode, ensure icon is moon
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    }
  });
});
