Introduction
==
Recently, our project needs to add a new feature, the project did use DI tool [Ninject](http://www.ninject.org/index.html), I have reading a book which Mastering Ninject for Dependency Injection to learn it. this article does record my book notes.

In Ninject it also could manage object lifetime. It allows create temporary object and full life object.
* Transient scope
In Transient scope, the object lifetime is not managed by Ninject. Whenever we
request an instance of a type, a new one will be created. Ninject does not take care of
keeping the created instance or disposing of it in this scope. This is the default object
scope in Ninject. If no scope is explicitly specified, they are transient-scoped. In the
previous code, both ConsoleLogger and MailService were treated in the Transient
scope because the object scope was not specified.

* Singleton scope 

There are two approaches to achieve this. The first one
is using one of the Singleton patterns:
```c
class ConsoleLogger:ILogger
{
public static readonly ConsoleLogger Instance = new ConsoleLogger();
 private static ConsoleLogger()
 {
   // Hiding constructor
 }
  public void Log(string message)
  {
    Console.WriteLine("{0}: {1}", DateTime.Now, message);
  }
}
```
And instructing the binding to always use the provided instance rather than every
time creating a new instance of ConsoleLogger. We can achieve this by using the
ToConstant method:
```c
kernel.Bind<ILogger>().ToConstant(ConsoleLogger.Instance);
```
This way is inconvenece to test, there is another way to do this
```c
kernel.Bind<ILogger>().To<ConsoleLogger>().InSingletonScope();
```
* Thread scope 

```c
[Test]
public void ReturnsTheSameInstancesInOneThread()
{
using (var kernel = new StandardKernel())
{
kernel.Bind<object>().ToSelf().InThreadScope();
var instance1 = kernel.Get<object>();
var instance2 = kernel.Get<object>();
Assert.AreEqual(instance1, instance2);
}
}
```
* Request scope 

Request scope is useful in web applications when we need to get a single instance
of a type from Ninject as long as we are handling the same request. Once the request
is processed and a new request arrives, Ninject creates a new instance of the type
and keeps it until the end of the request processing. Note that Request scope behaves
like Transient scope outside of a web request (for example, during startup) or in
non-web applications.
```c
kernel.Bind<MailServerConfig>().ToSelf().InRequestScope();
```
The InRequestScope method is not available unless we add a reference to the
Ninject.Web.Common library, which makes sense only in web applications.

* Custom scope 

Custom scope lets us define our own scopes in which to keep an instance of a type
unique.
```c
kernel.Bind<object>().ToSelf().InScope(ctx=>Thread.CurrentThread);

kernel.Bind<object>().ToSelf().InScope(ctx=>HttpContext.Current);
```
* Dispose an object 

```c
var myObject = kernel.Get<MyService>();

kernel.Release(myObject);
```


