<script setup>
import site from 'virtual:site'
</script>

<template>
  <section>
    <h1>About</h1>
    <p>
      Hi — I'm {{ site.owner }}. This site lives at
      <strong>{{ site.subdomain }}</strong> and is built with Vue 3 and Vite.
    </p>
    <p>
      It deploys automatically: push to <code>main</code>, and a GitHub Action
      builds it and ships the static files. No servers to manage, nothing to
      restart.
    </p>
  </section>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

p + p {
  margin-top: 1rem;
}
</style>
