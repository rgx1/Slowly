<template>
  <div class="modal"
       v-if="visible"
       @click="visible = false">
    <div class="content soft-scrollable">{{$t('about_poem')}}</div>
  </div>
</template>
<style lang="stylus" scoped>
@require ('../styles/var.styl')
.night-mode
  .content
    color $color-white-night
.content
  position absolute
  top 5%
  bottom 5%
  right 10%
  left 10%
  color white
  white-space pre-line
  line-height 40px
  font-size 25px
  overflow-y auto
  font-family Georgia, Times New Roman, serif
  -ms-overflow-style none
  &::-webkit-scrollbar
    display none
.mobile-mode .content
  font-size 18px
  line-height 30px
</style>
<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
}
</script>


