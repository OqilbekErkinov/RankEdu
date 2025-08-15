<template>
  <nav class="navbar navbar-expand-lg sticky-top nav-shadow navbar-light">
    <div class="container py-2">
      <NuxtLink class="navbar-brand d-flex align-items-center gap-2" to="/">
        <img src="/images/logo.svg" alt="Nevroslim" height="28" />
      </NuxtLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
        aria-controls="nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="nav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="#about">Неврослим ҳақида</a></li>
          <li class="nav-item"><a class="nav-link" href="#diseases">Касалликлар</a></li>
          <li class="nav-item"><a class="nav-link" href="#experts">Мутаҳассис</a></li>
          <li class="nav-item"><a class="nav-link" href="#results">Натижалар</a></li>
          <li class="nav-item"><a class="nav-link" href="#benefits">Фойдалари</a></li>
        </ul>

        <div class="d-flex align-items-center gap-2">
          <span class="badge-sale me-2 d-none d-md-inline">-50%</span>
          <button class="btn btn-brand d-flex align-items-center gap-2"
                  data-bs-toggle="modal" data-bs-target="#orderModal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="white" stroke-width="2"/>
              <path d="M7 10l5 5 5-5" stroke="white" stroke-width="2" />
            </svg>
            Буйртма бериш
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
