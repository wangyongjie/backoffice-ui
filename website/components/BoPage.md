# BoPage

## Props

<!-- @vuese:BoPage:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|formOptions|{ submitBtnText, forms, autoSearch } autoSearch: true  will triger search after mounted, other data pass to bo-search|`Object`|`false`|{}|
|tips|element-ui button with dialog|`Array`|`false`|[]|
|columns|table column for bo-table|`Array`|`false`|[]|
|tableOptions|same as element-ui table attributes|`Object`|`false`|{}|
|tabs|for nest table with tabs: [{ label, columns, tableOptions}]|`Array`|`false`|[]|
|loading|table loading|`Boolean`|`false`|false|
|hasPagination|show pagination or not|`Boolean`|`false`|true|

<!-- @vuese:BoPage:props:end -->


## Events

<!-- @vuese:BoPage:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|search|search with filter & sort|-|
|excel|donwload all excel|-|

<!-- @vuese:BoPage:events:end -->


## Slots

<!-- @vuese:BoPage:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|name|-|-|
|name|by pass slot for bo-table|-|
|name|by pass slot for bo-table|-|

<!-- @vuese:BoPage:slots:end -->


