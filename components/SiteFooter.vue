<template>
  <footer class="footer mt-5 py-4">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
      <div>
        <img src="/images/logo-light.svg" height="26" alt="Nevroslim" class="mb-2">
        <div class="small text-white-50">© {{ new Date().getFullYear() }} Nevroslim</div>
      </div>
      <div>
        <div><a href="tel:+998901234567">+998 (90) 123-45-67</a></div>
        <div><a href="mailto:info@nevroslim.uz">info@nevroslim.uz</a></div>
      </div>
      <div>
        <button class="btn btn-brand" data-bs-toggle="modal" data-bs-target="#orderModal">Буюртма бериш</button>
      </div>
    </div>
  </footer>
</template>
