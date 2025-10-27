<template>
  <aside class="sidebar-drawer shadow-lg" role="dialog" aria-label="Yon menyu">
    <div class="d-flex align-items-center gap-2 p-3">
      <div class="logo-square">R</div>
      <span class="fw-bold fs-5">RankEdu</span>
    </div>
    <ul class="nav flex-column px-3">
      <li class="nav-item">
        <NuxtLink
          class="nav-link sdw-link"
          active-class="active"
          to="/"
          @click="$emit('close')"
        >
          <i class="bi bi-house"></i> Bosh sahifa
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink
          class="nav-link sdw-link"
          active-class="active"
          to="/profile"
          @click="$emit('close')"
        >
          <i class="bi bi-person"></i> Profil
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink
          class="nav-link sdw-link"
          active-class="active"
          to="/reyting"
          @click="$emit('close')"
          ><i class="bi bi-trophy"></i> Reyting
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink
          class="nav-link sdw-link"
          active-class="active"
          to="/messenger"
          @click="$emit('close')"
          ><i class="bi bi-messenger"></i> Messenger</NuxtLink
        >
      </li>
      <li class="nav-item">
        <NuxtLink
          class="nav-link sdw-link"
          active-class="active"
          to="/service"
          @click="$emit('close')"
          ><i class="bi bi-stars"></i> Service</NuxtLink
        >
      </li>
    </ul>
  </aside>
</template>
