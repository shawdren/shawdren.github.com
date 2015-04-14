Introduction
==
Recently, our project needs to add a new feature, the project did use DI tool [Ninject](http://www.ninject.org/index.html), I have reading a book which Mastering Ninject for Dependency Injection to learn it. this article does record my book notes.

In article [book notes for learn Ninject - 2](book-notes-for-learn-Ninject-2.html), there is a basic usage of Ninject. Ninject also could register module to container.

```c
public class LogHandlerModule : NinjectModule
{
    public override void Load()
    {
         Bind<Program.ILog>().To<DefaultLog>();
    }
}
public class FileLogHandlerModule : NinjectModule
{
    public override void Load()
    {
         Bind<Program.ILog>().To<FileLog>();
    }
}
static void Main(string[] args)
{
     using (var kernel = new StandardKernel(new LogHandlerModule()))
     {
         var log = kernel.Get<Program.ILog>();
         log.WriteLog();
     }
     using (var kernel = new StandardKernel(new FileLogHandlerModule()))
     {
         var log = kernel.Get<Program.ILog>();
         log.WriteLog();
     }
         Console.ReadLine();
}

public interface ILog
{
      void WriteLog();
}
publie class DefaultLog : ILog
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
Here I had create class **LogHandlerModule** and **FileLogHandlerModule** inherits from **NinjectModule** , in the override method Load() use 'bind' and 'to' method to register module to Ninject.

when get the concrte class that just need new **LogHandlerModule**
```c
using (var kernel = new StandardKernel(new LogHandlerModule()))
{
    var log = kernel.Get<ILog>();
    log.WriteLog();
}
```
 
