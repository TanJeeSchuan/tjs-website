<template>
  <section>
    <h1>404</h1>
    <p>That page doesn't exist.</p>
    <RouterLink to="/">← Back home</RouterLink>
  </section>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  color: var(--theme);
  margin-bottom: 0.5rem;
}

p {
  color: var(--muted);
  margin-bottom: 1.5rem;
}
</style>
