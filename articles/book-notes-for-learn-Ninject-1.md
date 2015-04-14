Introduction
==
Recently, our project needs to add a new feature, the project did use DI tool [Ninject](http://www.ninject.org/index.html), I have reading a book which Mastering Ninject for Dependency Injection to learn it. this article does record my book notes.

The book notes of The chapter 1

> "it's more about a way of thinking and designing code than it is about tools and techniques"
>

Understanding Dependency Injection
--
1. Dependency Injection is one of the techniques in software enginerring which improves the maintainability of a software application by managing the dependent components.

2. DI or Inversion of Control(IoC)
Martin Fowler defines Inversion of Control as a style of programming in which the framework takes the conrol of the flow instead of your code. 
Di is a specific type of IoC, because instad of your components concern about their dependencies, they are provided with the dependencies by the framework.

3. IoC is also know as the Hollywood principle: "Don't call us, we'll call you".
4. The key principle leading to loose coupling is the "Program to an *Interface*, not an *implementation*"
5. Di Contaainers
A DI container is an injector object that injects the dependencies into a dependent object.
 the others DI container introdcution from Scott Hanselmen blog [http://www.hanselman.com/blog/
ListOfNETDependencyInjectionContainersIOC.aspx](http://www.hanselman.com/blog/
ListOfNETDependencyInjectionContainersIOC.aspx) about Unity, Castle Windsor, StructureMap, Spring.NET, and Autofac

Dependency Injection is a technique to help us produce loosely coupled code by moving the concern of creating the dependencies to another object known as a DI container.


