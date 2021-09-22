# BoDialog

## Props

<!-- @vuese:BoDialog:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|attr|same as element-ui dialog attributes|`Object`|`false`|-|
|form|same as element-ui form attributes (model, labelWidth, rules... )|`Object`|`false`|-|
|formItems|formItems combine with form.model { prop, label, itemType (defult: input, others:  "select", "multSelect", "date", "daterange", "switch", "checkbox", "radio", "textarea", "slot"), options }|`Array`|`false`|[]|
|visible|visibility of Dialog|`Boolean`|`false`|false|
|loading|button loading|`Boolean`|`false`|false|

<!-- @vuese:BoDialog:props:end -->


## Events

<!-- @vuese:BoDialog:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|confirm|return form model|-|

<!-- @vuese:BoDialog:events:end -->


