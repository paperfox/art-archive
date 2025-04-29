<script setup>
import footerLinks from '../data/footerContent.js';

const socials = footerLinks;
</script>

<template>
  <footer class="responsive">
    <ul class="social-links">
      <li v-for="social of socials" :key="social.icon.slice(0, 5)">
        <a :href="social.link" target="_blank" rel="noreferrer">
          <picture>
            <source :srcset="`./logos/white/${social.icon}`" media="(prefers-color-scheme: dark)" />
            <img :src="`./logos/${social.icon}`" :alt="social.title" media="(prefers-color-scheme: light)" />
          </picture>
        </a>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  margin: var(--xs-spacing) auto;
}

.social-links {
  padding: var(--base-spacing);
  justify-content: space-between;

  img {
    height: 3.2rem;
  }
}

/* Responsive */
@media (min-width: 768.02px) {
  main + .responsive {
    display: none;
  }
}

@media (max-width: 768px) {
  aside .responsive {
    display: none;
  }

  .social-links {
    width: 80%;
    margin-inline: auto;
  }
}
</style>
