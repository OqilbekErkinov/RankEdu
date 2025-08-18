<template>
  <nav class="navbar navbar-expand-lg sticky-top nav-shadow navbar-light" style="padding-top: 2rem;">
    <div class="container py-2">
      <NuxtLink class="navbar-brand nav-logo d-flex align-items-center gap-2" to="/" style="margin-top: -1.7rem !important">
        <img src="/images/logo.svg" alt="Nevroslim" height="45" />
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
        <ul class="navbar-nav m-auto mb-2 mb-lg-0" style="margin-top: -1rem !important">
          <li class="nav-item">
            <a class="nav-link" style="color: #01101e" href="#about"
              >Неврослим ҳақида</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" style="color: #01101e" href="#diseases"
              >Касалликлар</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" style="color: #01101e" href="#experts"
              >Мутаҳассис</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" style="color: #01101e" href="#results"
              >Натижалар</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" style="color: #01101e" href="#benefits"
              >Фойдалари</a
            >
          </li>
        </ul>

        <div class="d-flex align-items-center gap-2" style="position: relative;">
          <span class="badge-sale me-2 d-none d-md-inline">-50%</span>
          <a href="#contact" class="nav-link">
          <button
            class="btn btn-brand d-flex align-items-center gap-2"
            data-bs-toggle="modal"
            data-bs-target="#orderModal"
          >
            Буйртма бериш
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13.085H7.5C8.5 13.085 9.5 14.585 10.5 14.585C11.3643 14.585 12.9757 13.838 13.7199 15.2495C13.9551 15.6956 13.641 16.2053 13.1751 16.3985C12.096 16.8459 10.8941 17.4536 10.5 17.585L7.5 16.585M14 15.585L18.576 13.7546C18.8538 13.6435 19.1559 13.6073 19.4521 13.6496C20.4989 13.7991 20.7946 15.1703 19.9025 15.738L12.2586 20.6023C11.7761 20.9093 11.1853 20.9951 10.6354 20.838L1 18.085M10.5 11.085C8.575 10.4073 5 7.49412 5 4.28957C5 2.51976 6.35434 1.08502 8.025 1.08502C9.04808 1.08502 9.95256 1.62307 10.5 2.44661C11.0474 1.62307 11.9519 1.08502 12.975 1.08502C14.6457 1.08502 16 2.51976 16 4.28957C16 7.49412 12.425 10.4073 10.5 11.085Z"
                stroke="#FDFEFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
