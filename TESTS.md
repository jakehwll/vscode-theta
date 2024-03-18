
## Definitions

This list is pretty shamelessly ripped from [here](https://github.com/target/theta-idl/blob/main/emacs/theta-mode.el).

### `version-keywords`

Keywords that specify version constraints in Theta module headers.

```
language-version
avro-version
```

### `definition-keywords`

Theta keywords that define new type names

```
type
alias
enum
```

### `primitive-types`

Types that are built into Theta.

```
Bool
Bytes
Int
Long
Float
Double
String
Date
Datetime
UUID
Time
LocalDatetime
```

### Line comment

Expression for Theta line documentation comments.

```
/// This is a line comment
```

### Block comment

Expression for Theta block documentation comments

```
/**
    This is a block comment
 */
```