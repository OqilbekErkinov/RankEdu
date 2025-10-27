<template>
  <aside class="sidebar-mini bg-white border-end">
    <ul class="nav flex-column align-items-center py-3">
      <li class="nav-item">
        <NuxtLink
          class="smini-link"
          active-class="active"
          to="/"
          title="Bosh sahifa"
        >
          <i class="bi bi-house"></i>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink
          class="smini-link"
          active-class="active"
          to="/profile"
          title="Profil"
        >
          <i class="bi bi-person"></i>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <a class="smini-link" href="#" title="Kurslar"
          ><i class="bi bi-journal-bookmark"></i
        ></a>
      </li>
      <li class="nav-item">
        <a class="smini-link" href="#" title="Reyting"
          ><i class="bi bi-trophy"></i
        ></a>
      </li>
      <li class="nav-item">
        <a class="smini-link" href="#" title="AI Tavsiyalar"
          ><i class="bi bi-stars"></i
        ></a>
      </li>
    </ul>
  </aside>
</template>
