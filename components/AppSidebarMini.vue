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
        <NuxtLink
          class="nav-link sdw-link"
          active-class="active"
          to="/reyting"
          @click="$emit('close')"
          ><i class="bi bi-trophy"></i>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink
          class="nav-link sdw-link"
          active-class="active"
          to="/messenger"
          @click="$emit('close')"
          ><i class="bi bi-messenger"></i
        ></NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink
          class="nav-link sdw-link"
          active-class="active"
          to="/service"
          @click="$emit('close')"
          ><i class="bi bi-stars"></i></NuxtLink
        >
      </li>
    </ul>
  </aside>
</template>
