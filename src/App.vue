<script setup>
import site from 'virtual:site'
</script>

<template>
  <div class="shell">
    <header>
      <RouterLink to="/" class="brand">{{ site.siteName }}</RouterLink>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <span>© {{ new Date().getFullYear() }} {{ site.owner }}</span>
      <a v-if="site.githubRepo" :href="site.githubRepo">Source</a>
    </footer>
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  max-width: 44rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 2rem 0;
}

.brand {
  font-size: 1.15rem;
  font-weight: 650;
  color: var(--fg);
  letter-spacing: -0.01em;
}

nav {
  display: flex;
  gap: 1.25rem;
}

nav a {
  color: var(--muted);
  font-size: 0.95rem;
}

nav a:hover,
nav a.router-link-active {
  color: var(--theme);
}

main {
  flex: 1;
  padding: 1rem 0 4rem;
}

footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 0;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.875rem;
}
</style>
