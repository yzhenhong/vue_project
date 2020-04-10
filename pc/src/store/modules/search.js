const getters = {}

const state = {
  dragging: {
    picture: '',
    event: null
  },
  picture: '',
  // 用于判定拖拽触发的检索后是否连续操作
  // 触发检索 -> 点击x按钮 : 属于连续操作，页面回退
  // 触发检索 -> 切换导航、切换人员检索tab : 连续操作中断，页面不回退
  continuousOperation: false,
  // 用于判定拖拽触发的检索后是否来自于人员检索页面
  isDragSearchFromFace: false,
  // 用于人员检索页监听是否执行Tab回退
  isRollBackTab: false,
  // 用于时空碰撞 存储搜索条件
  conditions: []
}

const mutations = {
  UPDATE_CONTINUOUS_OPERATION (state, _continuousOperation) {
    state.continuousOperation = _continuousOperation
  },
  UPDATE_IS_DRAG_SEARCH_FROM_FACE (state, _isDragSearchFromFace) {
    state.isDragSearchFromFace = _isDragSearchFromFace
  },
  UPDATE_IS_ROLL_BACK_TAB (state, _isRollBackTab) {
    state.isRollBackTab = _isRollBackTab
  },
  UPDATE_PICTURE (state, pic) {
    state.picture = pic
  },
  UPDATE_DRAGGING (state, params) {
    state.dragging = params
  },
  RESET (state) {
    state.dragging = {
      picture: '',
      event: null
    }
    state.picture = ''
  },
  UPDATE_CONDITIONS (state, conditions) {
    state.conditions = conditions
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
