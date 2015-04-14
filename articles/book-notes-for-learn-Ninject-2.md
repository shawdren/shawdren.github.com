Introduction
==
Recently, our project needs to add a new feature, the project did use DI tool [Ninject](http://www.ninject.org/index.html), I have reading a book which Mastering Ninject for Dependency Injection to learn it. this article does record my book notes.

The book notes of The chapter 2
###Hello Ninject
1 Create a hello world project to use Ninject.
* Create a project in vs2012
* open Package Manage console window
```
Install-package Ninject
```
add Ninject to project.

2 Create an interface class 
I had used the classic function code to demo this where I am implements a log function.
```c
public interface ILog
{
    void WriteLog();
}
```
Add two implements class base on this interface
```c
public class DefaultLog : ILog
{
     public void WriteLog()
     {
          Console.WriteLine("[Default log], this log from default log");
     }
}
public class FileLog : ILog
{
     public void WriteLog()
     {
          Console.WriteLine("[File log], this log from file log");
     }
}
```
In the Main method
```c
using (var kernel = new Ninject.StandardKernel())
{
      kernel.Bind<ILog>().To<FileLog>();
      var logDefault = kernel.Get<DefaultLog>();
      var logFile = kernel.Get<FileLog>();
      logDefault.WriteLog();
      kernel.Release(logFile);
      logFile.WriteLog();
}
```
**Note**
* It is very simple to use Bind and to method to finish the register.
```c
 kernel.Bind<ILog>().To<FileLog>();
```
* Use get method to get the implemetion class.
```c
 var logFile = kernel.Get<FileLog>();
```




