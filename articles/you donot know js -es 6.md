## The book memo of you don't know js - ES 6
---------
The book memo of <You Don't Know JS - ES6>.
It's a essential book for ECMA Script 6.

### Syntax

* let Declarations
    * it's easy to understand that if use the let to declare a variable which scope is only under the block.
    * try to put let declaration on the top of the block, if use the variable before the let declaration, the referenceError will be ecountered, it's called a TDZ(temporal dead zone) error.
* const Declarations
    * It's a variable that's read-only after its initial value is set.
    * It's cannot be able to garbage collected.
    * Don't use const on variables.
* Spread and Rest
    *  the oprator ... that's typically reffered to as the spread or rest which depending on where it's used.
* Default parameter values
    * something like that function plusNo(x = 0, y = 1){}, it's void to judge parameters in function for default values.
* Default value expressions
    * It same as default parameter, function plusNo(){x = 0, y = foo(z)}
* Destructuring

