<script></script>
<template>
  <div class="desktop-only">
    <div class="bg-white p-24 border-rounded-5 mx-12">
      <div class="flex-center gap-8 text-m-26 text-sunset-700 mb-24">
        <span class="fa-solid fa-heart-crack"></span>
        <h1>Sorry :(</h1>
      </div>

      <div class="text-r-20 d-flex flex-column align-items-center gap-4 px-32">
        <p>This is not available on smaller screens at the moment. Please switch to a desktop or a bigger screen.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desktop-only {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;

  svg {
    height: 2.8rem;
    width: 2.8rem;
  }
  p {
    text-align: center;
  }
}
</style>