import { createStore } from 'vuex'
import state from './state'
import actions from './actions'

export default createStore({
  state,
  actions
})
