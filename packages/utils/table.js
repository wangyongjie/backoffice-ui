export const flatColumns = (columns) => {
    const result = []
    const iterate = (arr) => {
      arr.forEach(item => {
        if (item.children) {
          iterate(item.children)
        } else {
          result.push(item)
        }
      })
    }
    iterate(columns)
    return result
  }
  