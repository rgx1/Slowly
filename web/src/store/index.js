import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    checkedFriend: null,
    friendList: []
  },
  mutations: {
    setFriendList(state, list) {
      state.friendList = list
    },
    checkFriend(state, friend) {
      state.checkedFriend = friend
    }
  }
})