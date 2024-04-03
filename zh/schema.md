# 定义

Spectra 的规则定义由两个部分组成：**策略**和**表达式**，策略代表一条权限规则，例如“仅团队管理员可以删除和编辑成员”，表达式则是实现规则的成立的条件，例如“当前用户是团队管理员”。

## 策略（Policy）

策略包含了描述、权限、生效效果和表达式，例如：

```json
{
  "description": "仅团队管理员可以删除和编辑成员",
  "permissions": ["UPDATE_TEAM_MEMBER", "DELETE_TEAM_MEMBER"],
  "effect": "ALLOW",
  "filter": {
    "and": [
      ["user.isTeamAdmin", "=", "true"],
      ["team.id", "=", { "ref": "user.teamId" }]
    ]
  }
}
```

- `description` - 策略的描述，用于方便理解策略的作用。
- `permissions` - 策略的权限列表，表示这个策略可以控制的权限。
- `effect` - 策略的生效效果，可以是 `ALLOW` 或者 `DENY`。
- `filter` - 策略的表达式，用于判断策略是否生效。详见 [表达式](#表达式-expression)。

## 表达式（Expression）

表达式是策略的核心，它的基础单位是一个三元组，第一个元素是字段名，第二个是操作符，第三个元素是值。

```json
[field, operator, value]
```

|  field   |  type    | description                                                                                   |
| :-----: | :------: | :------------------------------------------------------------------------------------------- |
|  field   |  `string`  | 字段名，字符串表示，具体取决于业务系统的实现，例如：`user.teamId`、`fileId`、`team.creator_id`。                                                   |
| operator |  `string`  | 操作符，可以是 `=`, `!=`, `>`, `<`, `>=`, `<=`, `in`, `not in`                            |
|  value   | `mixed` | 值，可以是 `string`, `number`, `boolean`, `null`, `array`, 或对字段的引用 `{ "ref": "team.id"}`。 |

::: tip
引用字段的值，可以通过 `{ "ref": "team.id" }` 的方式，表示引用 `team.id`字段。
:::

表达式可以通过多层嵌套来实现复杂的条件表达，一共有三种逻辑组合：`and`, `or`, `not`。

### AND

AND 逻辑表示所有条件都必须满足，它包含一个或多个表达式，它的定义是：

```json
{
  "and": [expression1, expression2, ...]
}
```

例如：

```json
{
  "and": [
    ["user.isTeamAdmin", "=", "true"],
    ["user.id", "=", { "ref": "team.adminId" }]
  ]
}
```

### OR

OR 逻辑表示只要有一个条件满足即可，它包含一个或多个表达式，它的定义是：

```json
{
  "or": [expression1, expression2, ...]
}
```

例如：

```json
{
  "or": [
    ["user.isTeamAdmin", "=", "true"],
    ["user.id", "=", { "ref": "team.creatorId" }]
  ]
}
```

### NOT

NOT 逻辑表示条件不满足，它仅包含一个表达式，它的定义是：

```json
{
  "not": expression
}
```

例如：

```json
{
  "not": ["user.isTeamAdmin", "=", "true"]
}
```

### 组合

表达式可以通过多层嵌套来实现复杂的条件表达，例如：

```json
{
  "and": [
    {
      "or": [
        ["user.isTeamAdmin", "=", "true"],
        ["user.id", "=", { "ref": "team.creatorId" }]
      ]
    },
    ["team.id", "=", { "ref": "user.teamId" }],
    {
      "not": ["user.isDeleted", "=", "true"]
    }
  ]
}
```
