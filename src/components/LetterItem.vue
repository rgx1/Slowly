<template>
  <div v-if="letter"
       class="letter-detail-wrapper">
    <div class="letter-detail"
         :class="{'dialog-mode': dialogMode}">
      <img :src="this.letter.stamp | stampUrl"
           class="stamp"
           alt="Stamp">
      <div v-html="highlightBody(letter)"></div>
      <div class="attachments"
           v-if="attachments">
        <div v-if="zoomInImage"
             class="zoom-in">
          <div :key="url"
               v-for="url in attachments"
               class="image-wrapper"
               @click="zoomInImage = !zoomInImage">
            <img v-lazy="url" />
            <a :href="url"
               target="_blank" />
          </div>

        </div>
        <grid-view v-else
                   :numColumns="attachments.length > 2 ? 3 : 2"
                   :spaceX="10"
                   :spaceY="10">
          <img :key="url"
               @click="zoomInImage = !zoomInImage"
               v-lazy="url"
               v-for="url in attachments" />
        </grid-view>
      </div>
    </div>
    <div class="letter-info-wrapper">
      <div class="letter-info">
        <div class="key">
          <span v-for="text in letterInfos[0]"
                :key="text">
            {{text}}
          </span>
        </div>
        <div class="value">
          <span v-for="(text, i) in letterInfos[1]"
                :key="text + i">
            {{text}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus">
.letter-detail
  .highlight
    color red
    font-weight bold
</style>

<style lang="stylus" scoped>
@require ('../styles/var.styl')
.night-mode
  .letter-detail
    background rgb(12, 11, 9)
    border-color rgb(31, 28, 23)
  .letter-info
    color rgb(115, 102, 86)
.letter-detail-wrapper
  width 100%
  max-width 500px
  margin 0 auto
  overflow hidden
  margin-bottom 40px
.letter-detail
  white-space pre-line
  word-break break-word
  width 100%
  background white
  padding 40px 20px 20px 20px
  line-height 26px
  font-size $font-letter
  box-sizing border-box
  border-radius 6px
  border 1px solid #eaeaea
  .stamp
    width 100px
    float right
    margin-right -15px
  > div
    clear both
    padding-top 10px
  .attachments
    img
      width 100%
      display block
      object-fit cover
      cursor pointer
    .zoom-in
      .image-wrapper
        margin-top 10px
        position relative
      img
        width 100%
      a
        background url('../images/icon_zoom_in.png')
        width 32px
        height 32px
        opacity 0.8
        position absolute
        right 0
        bottom 0
.letter-info-wrapper
  overflow-y hidden
  overflow-x auto
  max-width 100%
.letter-info
  font-size $font-tiny
  margin-top 10px
  color #666
  padding-right 10px
  display flex
  .key
    flex 1
    text-align right
    margin-right 10px
  span
    display block
    white-space nowrap
    line-height 18px
</style>
<script>
import { mapState, mapMutations } from "vuex"
import * as util from "../util"
import * as api from "../api"
import GridView from "./common/GridView.vue"
import Pen from "../images/pen.png"

export default {
  components: {
    GridView
  },
  data() {
    return {
      zoomInImage: false
    }
  },
  props: {
    letter: {
      type: Object,
      required: true
    },
    dialogMode: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  watch: {
    letter() {
      this.zoomInImage = false
    }
  },
  computed: {
    ...mapState(["checkedFriend", "searchValue"]),
    attachments() {
      let l = this.letter
      return l
        ? l.attachments
          ? l.attachments.split(",").map(name => api.buildAttachmentUrl(name))
          : null
        : null
    },
    letterInfos() {
      const map = Object.create(null)
      map[this.$t("word_count")] = util.countWords(this.letter.body)
      map[this.$t("sender_name")] = this.letter.name
      map[this.$t("send_time")] = this.formatTime(this.letter.created_at)
      map[this.$t("arrive_time")] = this.formatTime(this.letter.deliver_at)
      if (this.letter.read_at) {
        map[this.$t("read_time")] = this.formatTime(this.letter.read_at)
      }
      return [Object.keys(map), Object.values(map)]
    }
  },
  methods: {
    formatTime(time) {
      return util.offsetAndFormatDate(time)
    },
    highlightBody(letter) {
      let body = (letter.body && letter.body.trim()) || ""
      return this.searchValue
        ? body
            .split(this.searchValue)
            .join('<span class="highlight">' + this.searchValue + "</span>")
        : body
    }
  }
}
</script>

