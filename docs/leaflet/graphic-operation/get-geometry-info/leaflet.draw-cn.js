L.drawLocal = {
  // format: {
  // 	numeric: {
  // 		delimiters: {
  // 			thousands: ',',
  // 			decimal: '.'
  // 		}
  // 	}
  // },
  draw: {
    toolbar: {
      // #TODO: this should be reorganized where actions are nested in actions
      // ex: actions.undo  or actions.cancel
      actions: {
        title: '取消绘图',
        text: '取消',
      },
      finish: {
        title: '完成绘图',
        text: '完成',
      },
      undo: {
        title: '删除最后绘制的点',
        text: '删除最后一点',
      },
      buttons: {
        polyline: '绘制一个多段线',
        polygon: '绘制一个多边形',
        rectangle: '绘制一个矩形',
        circle: '绘制一个圆',
        marker: '绘制一个标记',
        circlemarker: '绘制一个圆形标记',
      },
    },
    handlers: {
      circle: {
        tooltip: {
          start: '单击并拖动可绘制圆',
        },
        radius: '半径',
      },
      circlemarker: {
        tooltip: {
          start: '点击地图放置圆圈标记',
        },
      },
      marker: {
        tooltip: {
          start: '点击地图放置标记',
        },
      },
      polygon: {
        tooltip: {
          start: '单击开始绘制形状',
          cont: '单击可继续绘制形状',
          end: '单击第一个点关闭此形状',
        },
      },
      polyline: {
        error: '<strong>错误:</strong> 形状边缘不能交叉!',
        tooltip: {
          start: '单击开始绘制直线',
          cont: '单击继续绘制直线',
          end: '单击“最后一点”以结束绘制',
        },
      },
      rectangle: {
        tooltip: {
          start: '单击并拖动绘制矩形',
        },
      },
      simpleshape: {
        tooltip: {
          end: '松开鼠标完成绘制',
        },
      },
    },
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: '保存更改',
          text: '保存',
        },
        cancel: {
          title: '取消编辑，放弃所有更改',
          text: '取消',
        },
        clearAll: {
          title: '清除所有图层',
          text: '全部清除',
        },
      },
      buttons: {
        edit: '编辑图层',
        editDisabled: '不需要编辑图层',
        remove: '删除图层',
        removeDisabled: '没有需要删除的图层',
      },
    },
    handlers: {
      edit: {
        tooltip: {
          text: '拖动手柄或标记来编辑要素',
          subtext: '单击“取消”可撤消更改',
        },
      },
      remove: {
        tooltip: {
          text: '单击要删除的要素',
        },
      },
    },
  },
}
