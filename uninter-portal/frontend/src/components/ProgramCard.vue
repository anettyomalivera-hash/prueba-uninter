<template>
  <article class="card" :class="`card--${nivelSlug}`">
    <div class="card__badge">{{ program.nivel }}</div>
    <div class="card__icon" aria-hidden="true">{{ program.icono }}</div>
    <h3 class="card__title">{{ program.nombre }}</h3>
    <p class="card__desc">{{ program.descripcion }}</p>
    <div class="card__footer">
      <span class="card__tag card__tag--modalidad">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        {{ program.modalidad }}
      </span>
      <span class="card__tag card__tag--duracion">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        {{ program.duracion }}
      </span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  program: { type: Object, required: true },
})

const nivelSlug = computed(() =>
  props.program.nivel === 'Lic.' ? 'lic' : 'posgrado'
)
</script>

<style scoped>
.card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--gray-100);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--navy);
  transition: var(--transition);
}

.card--posgrado::before {
  background: linear-gradient(90deg, var(--gold), var(--gold-light));
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: transparent;
}

.card__badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  width: fit-content;
  background: var(--gray-100);
  color: var(--navy);
}

.card--posgrado .card__badge {
  background: var(--gold-pale);
  color: var(--gold);
}

.card__icon {
  font-size: 2rem;
  line-height: 1;
}

.card__title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--navy-dark);
  line-height: 1.3;
  flex: 1;
}

.card__desc {
  font-size: 0.875rem;
  color: var(--gray-500);
  line-height: 1.55;
  flex: 1;
}

.card__footer {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--gray-100);
}

.card__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gray-500);
  background: var(--gray-50);
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  border: 1px solid var(--gray-100);
}
</style>
