export const dfs = (
    condition,
    dataList,
    result = null,
    rootKey = "",
    level = 0
) => {
    if (!dataList || result) return result;
    for (let i = 0; i < dataList.length; i++) {
        const node = dataList[i];
        // rootKey: index or label
        rootKey = level === 0 ? node.index || node.label : rootKey;
        if (!result && condition(node)) {
            result = {
                rootKey,
                index: node.index,
            };
            break;
        }
        const child = node.children;
        result = dfs(condition, child, result, rootKey, level + 1);
    }
    return result;
};