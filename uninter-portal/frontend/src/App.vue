<template>
  <div class="portal">
    <header class="site-header">
      <div class="site-header__inner">
        <div class="logo">
          <div class="logo__emblem" aria-hidden="true">U</div>
          <div class="logo__text">
            <span class="logo__name">UNINTER</span>
            <span class="logo__sub">Cuernavaca</span>
          </div>
        </div>
        <nav class="site-nav" aria-label="Navegación principal">
          <a href="#oferta" class="site-nav__link">Oferta Educativa</a>
          <a href="#" class="site-nav__link">Admisiones</a>
          <a href="#" class="site-nav__link">Campus</a>
          <a href="#" class="site-nav__cta">Solicitar Informes</a>
        </nav>
      </div>
    </header>

    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="hero__content">
        <p class="hero__eyebrow">Educación Superior de Calidad</p>
        <h1 class="hero__title" id="hero-title">
          Transforma tu futuro<br />con UNINTER
        </h1>
        <p class="hero__subtitle">
          Programas académicos flexibles, con respaldo institucional y enfoque en tu desarrollo profesional.
        </p>
        <a href="#oferta" class="btn btn--primary">
          Explorar programas
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </a>
      </div>
    </section>

    <main id="oferta">
      <section class="programs-section" aria-labelledby="programs-title">
        <div class="container">
          <header class="section-header">
            <p class="section-eyebrow">Catálogo Académico</p>
            <h2 class="section-title" id="programs-title">Oferta Educativa</h2>
            <p class="section-desc">
              Elige el programa que se adapte a tus metas. Contamos con licenciaturas y posgrados
              en modalidades presencial, mixta y en línea.
            </p>
          </header>

          <!-- filtros por nivel -->
          <div class="filters" role="group" aria-label="Filtrar por nivel académico">
            <button
              v-for="f in filters"
              :key="f.value"
              class="filter-btn"
              :class="{ 'filter-btn--active': activeFilter === f.value }"
              @click="activeFilter = f.value"
              :aria-pressed="activeFilter === f.value"
            >
              {{ f.label }}
            </button>
          </div>

          <!-- cargando -->
          <div v-if="loading" class="state-container" role="status" aria-live="polite">
            <p>Cargando programas…</p>
          </div>

          <!--  error -->
          <div v-else-if="error" class="state-container" role="alert">
            <div class="error-box">
              <div class="error-box__icon" aria-hidden="true">ERROR</div>
              <h3 class="error-box__title">No se pudo cargar la información</h3>
              <p class="error-box__msg">{{ error }}</p>
              <button class="btn btn--outline" @click="fetchPrograms">Reintentar</button>
            </div>
          </div>

          <!-- vacio -->
          <div v-else-if="filteredPrograms.length === 0" class="state-container" role="status">
            <div class="empty-box">
              <div class="empty-box__icon" aria-hidden="true">No encontradas</div>
              <p class="empty-box__msg">No hay programas para el filtro seleccionado.</p>
              <button class="btn btn--outline" @click="activeFilter = 'todos'">Ver todos</button>
            </div>
          </div>

          <!-- grid de programas -->
          <TransitionGroup
            v-else
            tag="div"
            class="programs-grid"
            name="card"
            aria-live="polite"
            :aria-label="`${filteredPrograms.length} programa${filteredPrograms.length !== 1 ? 's' : ''} encontrado${filteredPrograms.length !== 1 ? 's' : ''}`"
          >
            <ProgramCard
              v-for="program in filteredPrograms"
              :key="program.id"
              :program="program"
            />
          </TransitionGroup>
        </div>
      </section>
    </main>

    <!-- footer -->
    <footer class="site-footer">
      <div class="container">
        <p class="site-footer__text">
          © {{ new Date().getFullYear() }} UNINTER Cuernavaca · Todos los derechos reservados
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProgramCard from './components/ProgramCard.vue'

const programs     = ref([])
const loading      = ref(false)
const error        = ref(null)
const activeFilter = ref('todos')

const filters = [
  { value: 'todos', label: 'Todos' },
  { value: 'Lic.', label: 'Licenciatura' },
  { value: 'Posgrado', label: 'Posgrado' },
]

const filteredPrograms = computed(() =>
  activeFilter.value === 'todos'
    ? programs.value
    : programs.value.filter(p => p.nivel === activeFilter.value)
)

async function fetchPrograms() {
  loading.value = true
  error.value   = null
  try {
    const res = await fetch('/api/programs')
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
    const json = await res.json()
    programs.value = json.data
  } catch (err) {
    error.value = err.message || 'Error de conexión con el servidor. Por favor, inténtalo de nuevo.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchPrograms)
</script>

<style scoped>
.portal { min-height: 100vh; display: flex; flex-direction: column; }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.site-header {
  background: var(--navy-dark);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 0 rgba(255,255,255,0.08);
}

.site-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo__emblem {
  width: 40px; height: 40px;
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--navy-dark);
}

.logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo__name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.04em;
}

.logo__sub {
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--gray-300);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.site-nav__link {
  color: var(--gray-300);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 400;
}

.site-nav__link:hover { color: var(--white); }

.site-nav__cta {
  background: var(--gold);
  color: var(--navy-dark);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.site-nav__cta:hover { background: var(--gold-light); }

.hero {
  background: var(--navy-dark);
  position: relative;
  padding: 5rem 1.5rem 4rem;
  text-align: center;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200, 146, 10, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 100%, rgba(26, 68, 144, 0.4) 0%, transparent 50%);
  pointer-events: none;
}

.hero__content {
  position: relative;
  max-width: 680px;
  margin: 0 auto;
}

.hero__eyebrow {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1rem;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 700;
  color: var(--white);
  line-height: 1.15;
  margin-bottom: 1.25rem;
}

.hero__subtitle {
  font-size: 1.05rem;
  color: var(--gray-300);
  line-height: 1.65;
  margin-bottom: 2rem;
  font-weight: 300;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.7rem 1.5rem;
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
}

.btn--primary {
  background: var(--gold);
  color: var(--navy-dark);
}

.btn--primary:hover { background: var(--gold-light); transform: translateY(-1px); }

.btn--outline {
  background: transparent;
  border-color: var(--navy);
  color: var(--navy);
}

.btn--outline:hover { background: var(--navy); color: var(--white); }

.hero__stats {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.hero__stat { text-align: center; }

.hero__stat-num {
  display: block;
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--gold-light);
  line-height: 1;
}

.hero__stat-label {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--gray-300);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 0.25rem;
  display: block;
}

.programs-section {
  padding: 4rem 0 5rem;
  flex: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.5rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 700;
  color: var(--navy-dark);
  margin-bottom: 0.75rem;
}

.section-desc {
  font-size: 1rem;
  color: var(--gray-500);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.65;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1.1rem;
  border-radius: 99px;
  border: 2px solid var(--gray-300);
  background: var(--white);
  color: var(--gray-700);
  cursor: pointer;
}

.filter-btn:hover { border-color: var(--navy); color: var(--navy); }

.filter-btn--active {
  background: var(--navy);
  border-color: var(--navy);
  color: var(--white);
}

.filter-btn__count {
  background: rgba(255,255,255,0.2);
  border-radius: 99px;
  padding: 0.05rem 0.4rem;
  font-size: 0.7rem;
  font-weight: 700;
}

.filter-btn:not(.filter-btn--active) .filter-btn__count {
  background: var(--gray-100);
  color: var(--gray-500);
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.card-enter-active { transition: all 0.3s ease; }
.card-leave-active { transition: all 0.2s ease; }
.card-enter-from   { opacity: 0; transform: translateY(16px); }
.card-leave-to     { opacity: 0; transform: scale(0.95); }

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.skeleton-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  border: 1px solid var(--gray-100);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

.skeleton {
  background: linear-gradient(90deg, var(--gray-100) 25%, var(--gray-50) 50%, var(--gray-100) 75%);
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-sm);
}

.skeleton--badge  { height: 22px; width: 60px; border-radius: 99px; }
.skeleton--icon   { height: 36px; width: 36px; border-radius: 4px; }
.skeleton--title  { height: 20px; width: 80%; }
.skeleton--text   { height: 14px; }
.skeleton--short  { width: 60%; }

.state-container {
  padding: 3rem 0;
  display: flex;
  justify-content: center;
}

.error-box, .empty-box {
  text-align: center;
  max-width: 360px;
}

.error-box__icon, .empty-box__icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.error-box__title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--navy-dark);
  margin-bottom: 0.5rem;
}

.error-box__msg, .empty-box__msg {
  font-size: 0.9rem;
  color: var(--gray-500);
  margin-bottom: 1.5rem;
}

.site-footer {
  background: var(--navy-dark);
  padding: 1.5rem 0;
}

.site-footer__text {
  font-size: 0.8rem;
  color: var(--gray-500);
  text-align: center;
}

.visually-hidden {
  position: absolute; width: 1px; height: 1px;
  padding: 0; overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

@media (max-width: 768px) {
  .site-nav { display: none; }

  .hero { padding: 3rem 1.5rem 2.5rem; }

  .hero__stats {
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .programs-grid,
  .skeleton-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .hero__stats { gap: 1rem; }
  .hero__stat-num { font-size: 1.4rem; }
  .filters { gap: 0.4rem; }
  .filter-btn { font-size: 0.8rem; padding: 0.4rem 0.9rem; }
}
</style>
