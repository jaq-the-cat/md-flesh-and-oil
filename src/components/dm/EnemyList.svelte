<script lang="ts">
  import { localization } from "$i18n";
</script>

<section id="enemyList">
  <h1>{localization().dm.enemies}</h1>
  <p class="empty">{localization().dm.enemies_missing}</p>
</section>

<style lang="scss">
  #enemyList {
    grid-area: enemyList;
  }

  h1 {
    text-align: center;
  }

  .empty {
    margin-top: 10px;
    text-align: center;
    opacity: 0.8;
  }
</style>
