# Dark Mode Implementation for Portfolio

## CSS (Add to your style.css)

:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --text-color: #333;
  --bg-color: #f9f9f9;
  --card-bg: #fff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --primary-color: #1abc9c;
  --secondary-color: #2a2a2a;
  --text-color: #e0e0e0;
  --bg-color: #121212;
  --card-bg: #1e1e1e;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

header, footer, .main-nav {
  background-color: var(--secondary-color);
  color: var(--text-color);
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--secondary-color);
}

.card, .certification-card, .experience-card, .contact-form {
  background-color: var(--card-bg);
  box-shadow: var(--shadow);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn {
  background-color: var(--primary-color);
  color: white;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: var(--secondary-color);
}

/* Add other element styles as needed */

## JavaScript (Add to your script.js or a new file)

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.createElement('button');
  themeToggle.classList.add('theme-toggle');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.prepend(themeToggle);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  }

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

## Notes

- Ensure FontAwesome is loaded for the moon and sun icons.
- Adjust CSS variables and selectors to match your project structure.
- Add transition effects for smooth theme changes.
