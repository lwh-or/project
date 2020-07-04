
/**
 * 申请状态
 */
export function applyStatus (value) {
  let status = ''
  if (value === 1) {
    status = '已申请'
  } else if (value === 2) {
    status = '成功'
  } else if (value === 4) {
    status = '已拒绝'
  } else {
    status = '-'
  }
  return status
}

/**
 * 店铺等级
 */
export function storeLevel (value) {
  console.log(value)
  let status = ''
  if (value === 1) {
    status = 'LV1'
  } else if (value === 2) {
    status = 'LV2'
  } else if (value === 4) {
    status = 'LV3'
  } else if (value === 8) {
    status = 'LV4'
  } else {
    status = '-'
  }
  return status
}

/**
 * 通用状态
 */
export function commonStatus (value) {
  let status = ''
  if (value === 1) {
    status = '正常'
  } else if (value === 2) {
    status = '删除'
  } else if (value === 3) {
    status = '禁用'
  } else {
    status = '-'
  }
  return status
}

/**
 * 是否显示
 */
export function dis (value) {
  let status = ''
  if (value === 1) {
    status = '显示'
  } else {
    status = '隐藏'
  }
  return status
}

/**
 * 是否是叶子节点
 */
export function leaf (value) {
  let status = ''
  if (value === 'Y' || value === 'y') {
    status = '是'
  } else {
    status = '否'
  }
  return status
}

/**
 * 是否是数字类型单位
 */
export function numericStatus (value) {
  let status = ''
  if (value === 0) {
    status = '否'
  } else {
    status = '是'
  }
  return status
}

/**
 * 是否是数字类型单位
 */
export function featuresKeyType (value) {
  let status = '-'
  if (value === 1) {
    status = '普通'
  } else if (value === 2) {
    status = '特殊'
  }
  return status
}
/**
 * 参数类型
 */
export function paramType (value) {
  let status = '-'
  if (value === 1) {
    status = '普通'
  } else if (value === 2) {
    status = '特殊'
  }
  return status
}
/**
 * 参数使用类型
 */
export function paramUseType (value) {
  let status = '-'
  if (value === 1) {
    status = '单选'
  } else if (value === 2) {
    status = '多选'
  } else if (value === 3) {
    status = '自选'
  }
  return status
}
/**
 * 分类级别
 */
export function foramtCategoryLevel (value) {
  let status = '-'
  if (value === 1) {
    status = '一级分类'
  } else if (value === 2) {
    status = '二级分类'
  } else if (value === 3) {
    status = '三级分类'
  }
  return status
}

/**
 * 允许输入格式化 Y | N
 */
export function foramtProductAutomatic (row, column, cellValue) {
  let yes = 'Y'
  let no = 'N'
  return cellValue !== yes && cellValue !== no ? '' : cellValue === 'Y' ? 'Y' : 'N'
}

/**
 * 广告管理终端类型
 */
export function advertTerminalForamt (row) {
  const { advertTerminal } = row
  let advertTerminalForamt = {
    1: '小程序',
    2: 'PC',
    3: 'H5'
  }
  return advertTerminalForamt[parseInt(advertTerminal)] ? advertTerminalForamt[parseInt(advertTerminal)] : ''
}

/**
 * 广告管理状态
 */
export function statusForamt (row) {
  const { status } = row
  let statusForamt = {
    1: '生效',
    2: '失效'
  }
  return statusForamt[parseInt(status)] ? statusForamt[parseInt(status)] : ''
}
/**
 * 广告管理使用场景
 */
export function usageScenarioForamt (row) {
  const { usageScenario } = row
  let usageScenarioForamt = {
    1: 'banner',
    2: '首页活动页'
  }
  return usageScenarioForamt[parseInt(usageScenario)] ? usageScenarioForamt[parseInt(usageScenario)] : ''
}
/**
 * 活动管理上线下线
 */
export function foramtActivityPos (row) {
  const { pos } = row
  return pos === 1 ? '上线' : '下线'
}
/**
 * 活动显示和不显示
 */
export function foramtActivityDis (row) {
  const { dis } = row
  return dis === 1 ? '显示' : '不显示'
}

/**
 * 活动显示和不显示
 */
export function advertStatusForamt (row) {
  const { status } = row
  return status === 1 ? '上线' : '下线'
}
