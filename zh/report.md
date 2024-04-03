# Debug 报告

Spectra 提供了一个[在线调试工具](/zh/debug)，可以方便的查看权限规则的生效情况。以下是调试报告的格式，如果你想要在自己的系统中使用或者封装更高级的调试工具，可以参考这个格式。

::: warning 请注意
此页面的类型定义仅在调试报告中使用，不是 Spectra 其他部分的类型定义，请勿混淆。
:::

## 表达式 Expression

### 语法

```typescript
// 字段名称，用于标识字段，例如：user.id, team.adminId, 或者 isOrgAdmin
type FieldName = string;

// 字段值，可以是 string, number, boolean, null, array<string | number | boolean | null>
type Value = string | number | boolean | null | array<string | number | boolean | null>;

// 操作符，例如：=, !=, >, <, >=, <=, in, not_in
type Operation = '=' | '!=' | '<>' | '>' | '<' | '>=' | '<=' | 'in' | 'not_in';

type ExpressionDebugResult = {
  // 表达式名称，用于标识表达式，例如：And, Or, Not, 或者在业务系统自定义的 isOrgAdmin
  name: string;

  // 表达式的运行结果，true 表示表达式成立，false 表示表达式不成立
  value: boolean;


  // 表达式的子表达式列表，包含一个或多个表达式, 仅在 And, Or, Not 表达式中有值
  expressions?: Array<ExpressionDebugResult>;

  // 表达式的字段左值，拥有两个属性，name 为字段名称，value 为字段运行时的值
  left?: {
    name: FieldName;
    value: Value;
  };

  // 表达式的操作符，例如：=, !=, >, <, >=, <=, in, not_in
  operation?: Operation;

  // 表达式的字段右值，拥有两个属性，name 为字段名称，value 为字段运行时的值
  right?: {
    name: FieldName|null; // 仅在字段引用时有值，否则为 null
    value: Value;
  };
};
```

### 示例

```json
{
    "name": "And",
    "value": true,
    "expressions": [
        {
            "name": "Binary",
            "value": true,
            "left": {
                "name": "user.id",
                "value": 1
            },
            "operation": "=",
            "right": {
                "name": "team.adminId",
                "value": 1
            }
        },
        {
            "name": "Binary",
            "value": true,
            "left": {
                "name": "user.isTeamAdmin",
                "value": true
            },
            "operation": "=",
            "right": {
                "name": null,
                "value": true
            }
        }
    ]
}
```

## 策略 Policy

### 语法

```typescript
type Effect = 'ALLOW' | 'DENY';

type PolicyDebugResult = {
  // 策略描述，用于描述策略的规则，例如：仅管理员可以修改团队信息
  description: string;

  // 策略的生效效果，ALLOW 表示策略通过，DENY 表示策略不通过
  effect: Effect;

  // 策略的权限列表，表示这个策略可以控制的权限，例如：['UPDATE_TEAM', 'DELETE_TEAM']
  permissions: Array<string>;

  // 策略表达式用到的字段列表，包含一个或多个字段名
  fields: Array<FieldName>;

  // 策略的应用状态
  // true: 表示这条策略被执行过判定，但不一定命中
  // false: 表示这条策略未被执行过判定
  applied: boolean;

  // 策略的运行结果
  // true: 表示这条策略被命中，则终止后续策略的判定
  // false: 表示这条策略未被命中，继续后续策略的判定
  matched: boolean;

  // 策略的表达式列表，包含一个或多个表达式
  filter: ExpressionDebugResult;
};
```

## 示例

```json
{
    "description": "仅团队管理员可以删除和编辑成员",
    "effect": "ALLOW",
    "permissions": ["UPDATE_TEAM_MEMBER", "DELETE_TEAM_MEMBER"],
    "fields": ["user.isTeamAdmin", "team.id"],
    "applied": true,
    "matched": true,
    "filter": {
        "name": "And",
        "value": true,
        "expressions": [
            {
                "name": "Binary",
                "value": true,
                "left": {
                    "name": "user.isTeamAdmin",
                    "value": true
                },
                "operation": "=",
                "right": {
                    "name": null,
                    "value": true
                }
            },
            {
                "name": "Binary",
                "value": true,
                "left": {
                    "name": "team.id",
                    "value": 1
                },
                "operation": "=",
                "right": {
                    "name": "user.teamId",
                    "value": 1
                }
            }
        ]
    }
}
```

## 调试报告 Debug Report

### 语法

```typescript
type DebugReport = {
  // 策略列表，包含一个或多个策略
  policies: Array<PolicyDebugResult>;

  // 所用到的字段列表，包含一个或多个数据
  fields: Array<FieldName>;

  // 运行过程中的数据，包含一个或多个数据
  data: {
    [key: string]: Value;
  };
};
```

### 示例

```json
{
    "policies": [
        {
            "description": "仅团队管理员可以删除和编辑成员",
            "effect": "ALLOW",
            "permissions": ["UPDATE_TEAM_MEMBER", "DELETE_TEAM_MEMBER"],
            "fields": ["user.isTeamAdmin", "team.id"],
            "applied": true,
            "matched": true,
            "filter": {
                "name": "And",
                "value": true,
                "expressions": [
                    {
                        "name": "Binary",
                        "value": true,
                        "left": {
                            "name": "user.isTeamAdmin",
                            "value": true
                        },
                        "operation": "=",
                        "right": {
                            "name": null,
                            "value": true
                        }
                    },
                    {
                        "name": "Binary",
                        "value": true,
                        "left": {
                            "name": "team.id",
                            "value": 1
                        },
                        "operation": "=",
                        "right": {
                            "name": "user.teamId",
                            "value": 1
                        }
                    }
                ]
            }
        }
    ],
    "fields": ["user.isTeamAdmin", "team.id", "user.teamId"],
    "data": {
        "user.isTeamAdmin": true,
        "team.id": 1,
        "user.teamId": 1
    }
}
```
