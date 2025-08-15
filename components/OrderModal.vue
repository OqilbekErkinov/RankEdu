<script setup lang="ts">
const m = reactive({ name:'', phone:'' })
const sending = ref(false)

const send = async () => {
  sending.value = true
  try{
    await $fetch('/api/order', { method:'POST', body:{ ...m, source:'order-modal' }})
    m.name=''; m.phone='';
    const el = document.getElementById('orderModal')
    // yopish
    // @ts-ignore
    const modal = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el)
    modal.hide()
    alert('Заявка юборилди! Тез орада боғланамиз.')
  }catch(e){ alert('Хатолик! Кейинроқ уриниб кўринг.') }
  finally{ sending.value = false }
}
</script>

<template>
  <div class="modal fade" id="orderModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title">Буюртма қолдириш</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Yopish"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <input class="form-control" v-model="m.name" placeholder="Исмингиз" />
          </div>
          <div class="mb-3">
            <input class="form-control" v-model="m.phone" placeholder="Телефон" />
          </div>
          <button class="btn btn-brand w-100" :disabled="sending" @click="send">
            {{ sending ? 'Юкланмоқда…' : 'Юбориш' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
