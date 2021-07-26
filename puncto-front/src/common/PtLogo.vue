<template>
  <div class="logo">
    <PtIcon name="watch" />
    <h1>puncto</h1>
  </div>
</template>

<style lang="scss">
.logo {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;

  svg {
    height: 32px;
    width: 32px;

    path {
      fill: $pt-sapphire;
    }
  }

  h1 {
    color: $pt-sapphire;
    font-family: 'Ubuntu';
    font-size: 28px;
  }
}
</style>
