// components/w-tab-control/w-tab-control.js
Component({
  properties: {
    titles: {
      type: Array,
      value: [],
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    handleItemClick(event) {
      // 获取点击的index
      const index = event.currentTarget.dataset.index;

      // 修改index
      this.setData({
        currentIndex: index
      })

      // 发出事件
      this.triggerEvent("tabclick", {index}, {})
    }
  }
})
