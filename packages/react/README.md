# Express Router Equivalent

```
/test/:foo -> `/test/${required()}`
/test/:foo+ -> `/test/${oneOrMore()}`
/test/:foo? -> `/test/${optional()}`
/test/:foo* -> `/test/${zeroOrMore()}`
/test/:foo([^0-9]) -> `/test/${regexp()}`
```
