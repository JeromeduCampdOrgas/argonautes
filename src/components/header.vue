<template>
  <div class="header">
    <div>
      <div class="logo">
        <img
          src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
          alt="Wild Code School logo"
        />
      </div>
      <h1>Les Argonautes</h1>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 100px;
  text-align: center;
  padding: 30px;
  background: lightgrey;
  & div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    margin: auto;
    & img {
      height: 100%;
    }
    & h1 {
      margin: auto auto auto -530px;
      font-weight: bold;
    }
  }
}
@media only screen and (max-width: 883px) {
  .header {
    & div {
      display: flex;
      flex-direction: column;
      & h1 {
        margin: auto;
      }
    }
  }
}
</style>
