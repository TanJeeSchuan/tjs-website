<script setup>
import site from 'virtual:site'
</script>

<template>
  <section>
    <h1>{{ site.siteName }}</h1>
    <p class="tagline">{{ site.tagline }}</p>

    <p>
      This is the landing page. Edit <code>src/views/Home.vue</code> to make it
      yours, or change <code>site.config.json</code> to rename the site and swap
      the accent colour.
    </p>

    <ul v-if="site.links?.length" class="links">
      <li v-for="link in site.links" :key="link.url">
        <a :href="link.url">{{ link.label }}</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
h1 {
  font-size: 2.25rem;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.tagline {
  color: var(--muted);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.links {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.links a {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.9rem;
}

.links a:hover {
  border-color: var(--theme);
}
</style>
