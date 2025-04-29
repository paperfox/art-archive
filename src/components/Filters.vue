<script setup>
import { ref, computed, onMounted } from 'vue';
import artwork from '../data/artData';
import ArtLists from './ArtLists.vue';

const props = defineProps({
  artwork: {
    type: Array,
  },
});

const activeFilters = ref([{ filterType: 'featured', filterValue: 'true', filterName: 'Featured' }]);
const activeFilterClass = ref({
  true: true, // featured selected by default - this naming is confusing
});

// preloading images
const newImages = ref([]);
const images = artwork.map((art) => `./art/${art.link}`);

// Filter buttons
const filterButtons = [
  { filterType: 'featured', filterValue: 'true', filterName: 'Featured' },
  { filterType: 'media', filterValue: 'watercolor', filterName: 'Watercolor' },
  { filterType: 'media', filterValue: 'ink', filterName: 'Ink' },
  { filterType: 'media', filterValue: 'micron pen', filterName: 'micron pen' },
  { filterType: 'media', filterValue: 'printmaking', filterName: 'Printmaking' },
  { filterType: 'media', filterValue: 'digital', filterName: 'Digital' },
  { filterType: 'media', filterValue: 'painting', filterName: 'Acrylic/Oil' },
  { filterType: 'media', filterValue: 'sculpture', filterName: 'Sculpture' },
  { filterType: 'content', filterValue: 'animal', filterName: 'Animal' },
  { filterType: 'content', filterValue: 'fanart', filterName: 'Fan Art' },
  { filterType: 'content', filterValue: 'fantasy', filterName: 'Fantasy' },
  { filterType: 'content', filterValue: 'landscape', filterName: 'Landscape' },
  { filterType: 'content', filterValue: 'people', filterName: 'People' },
  { filterType: 'content', filterValue: 'plant', filterName: 'Plants' },
  { filterType: 'content', filterValue: 'vehicle', filterName: 'Vehicles' },
];

// Computed property for filters
const filteredArts = computed(() => {
  if (activeFilters.value.length === 0) {
    return artwork;
  }
  return artwork.filter((art) => {
    return activeFilters.value.every((filter) => {
      return art[filter.filterType].includes(filter.filterValue);
    });
  });
});

// Method to apply filter and toggle active button class
const applyFilter = (filter) => {
  const index = activeFilters.value.findIndex(
    (f) => f.filterType === filter.filterType && f.filterValue === filter.filterValue,
  );
  if (index === -1) {
    activeFilters.value.push(filter);
  } else {
    activeFilters.value.splice(index, 1);
  }
  activeFilterClass.value[filter.filterValue] = !activeFilterClass.value[filter.filterValue];
};
</script>

<template>
  <div>
    <details>
      <summary>Filters</summary>
      <div id="filters">
        <button
          v-for="filter in filterButtons"
          :key="filter.filterValue"
          class="btn-badge"
          :class="{ 'active-filters': activeFilterClass[filter.filterValue] }"
          :id="filter.filterValue === 'sculpture' ? 'separator' : null"
          @click="applyFilter(filter)"
        >
          {{ filter.filterName }}
        </button>
      </div>
      <p>Showing {{ filteredArts.length }} of {{ artwork.length }} art pieces</p>
    </details>
    <ArtLists :images="filteredArts" />
  </div>
</template>

<style scoped>
summary {
  cursor: pointer;
  padding-bottom: var(--base-spacing);
  margin-bottom: var(--base-spacing);

  &:hover {
    text-decoration: underline;
  }
}

.btn-badge {
  position: relative;
  border: 0.1rem solid var(--text-body);
  border-radius: 4rem;
  color: var(--text-body);
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: var(--base-spacing) var(--xs-spacing);
  letter-spacing: 0.1rem;
  margin: 0 var(--base-spacing) var(--xs-spacing) 0;

  &.active-filters {
    background-color: var(--text-body);
    color: var(--main-bg);
  }

  &:hover {
    color: var(--text-body);
    border-color: var(--link);

    &.active-filters {
      color: var(--main-bg);
    }
  }

  &:focus-visible {
    outline: 0.2rem dotted var(--link);
    outline-offset: 0.2rem;
  }
}

#separator {
  margin-right: 3rem;

  &::after {
    content: ' |';
    margin-left: 3rem;
    position: absolute;
    color: var(--text-body);
  }
}
</style>
