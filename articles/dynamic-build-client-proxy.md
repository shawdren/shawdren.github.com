##How to build dynamic proxy for WCF and WebService

In my daily job recnetly I got a bug which cannot generate assembly for services, but we don't which is wcf or web service,
in our code only support for webservice to create proxy dynamically. In order to memo the research result, show some snippet here.

* For Webservice which is use ServiceDescriptionImporter
* For SVC which is use ServiceContractGenerator

the difference for those classes refer from stackoverflow

>ServiceDescriptionImporter is the class that is used by the "Add Web Reference" dialog in VS and the "wsdl.exe" tool in the SDK to generate "asmx"-style client web service proxies. ServiceContractGenerator is the WCF equivalent, for the "Add Service Reference" dialog in VS and the "svcutil.exe" >tool in the SDK. The former uses the asmx client infrastructure (System.Web.Services.Protocols.SoapHttpClientProtocol and friends) and the latter uses the WCF client infrastructure (System.ServiceModel.ClientBase and friends).

>Either will be able to talk to most services -- that is, it is intended for both the WCF and asmx client infrastructures to be broadly interoperable with a range of web services standards. A WCF client can talk to an asmx server (as well as servers from other vendors) and vice versa.

>That said, WCF is newer, richer, better supported, and supports more WS standards than does asmx. You will certainly not be locked into only supporting WCF services    
[ServiceContractGenerator vs ServiceDescriptionImporter](http://stackoverflow.com/a/1772461/3986569)

### Create demo project
create demo project, add console project and wcf project

1 In wcf project add asmx and svc files

2 in console project add below code to test

3 The third way is using service hosting 


> ServiceDescription extenstion class

````csharp
using System;
using System.Net;
using System.Web.Services.Description;
using System.Xml;


public static class ServiceDescriptionExt
{

    public static ServiceDescription ReadEx(string wsdlUrl, NetworkCredential credential)
    {
        XmlTextReader reader = GetXmlTextReader(wsdlUrl, credential);

        if (!ServiceDescription.CanRead(reader))
        {

        }

        ServiceDescription wsdl = ServiceDescription.Read(reader);

        return wsdl;
    }

    public static System.ServiceModel.Description.WsdlImporter GetWsdlImporter(string wsdlUrl)
    {
        var mexMode = System.ServiceModel.Description.MetadataExchangeClientMode.HttpGet;
        var wsdlUri = new Uri(wsdlUrl);
        var mexClient = new System.ServiceModel.Description.MetadataExchangeClient(wsdlUri, mexMode);
        //mexClient.HttpCredentials = credential;
        mexClient.ResolveMetadataReferences = true;
        var metaDocs = mexClient.GetMetadata();
        return new System.ServiceModel.Description.WsdlImporter(metaDocs);
    }

    public static XmlTextReader GetXmlTextReader(string wsdlUrl, NetworkCredential credential)
    {
        Uri uri;
        Uri.TryCreate(wsdlUrl, UriKind.Absolute, out uri);

        XmlTextReader reader;
        if (((uri == null) || (uri.Scheme != "https")) && (credential == null))
        {
            reader = new XmlTextReader(wsdlUrl);
        }
        else
        {
            var request = WebRequest.Create(wsdlUrl);
            request.Credentials = credential;

            if ((uri != null) && (uri.Scheme == "https") && request is HttpWebRequest)
                ((HttpWebRequest)request).ServerCertificateValidationCallback += RemoteCertificateValidationCallback;

            WebResponse response = request.GetResponse();
            reader = new XmlTextReader(response.GetResponseStream());
        }

        return reader;
    }

    private static bool RemoteCertificateValidationCallback(object sender, System.Security.Cryptography.X509Certificates.X509Certificate certificate, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
    {
        if (sslPolicyErrors == System.Net.Security.SslPolicyErrors.None)
            return true;
        else if (sslPolicyErrors == System.Net.Security.SslPolicyErrors.RemoteCertificateNotAvailable)
            return false;
        else if (sslPolicyErrors == System.Net.Security.SslPolicyErrors.RemoteCertificateNameMismatch)
            return true;
        return true;

    }
}

````

 the methods for generate proxy

````csharp

        private static void GenerateAssemblyForASMX()
        {
            var codeNamespace = new CodeNamespace();
            var codeUnit = new CodeCompileUnit();
            GenerateCSCodeForService(new EndpointAddress(@"http://localhost:55771/Service1.svc"), @"D:\test.wsdl");
            GenerateAssemblyForSVC(@"c:\HEATService.wsdl");
            codeUnit.Namespaces.Add(codeNamespace);
            System.Web.Services.Description.ServiceDescription serviceDescription = ServiceDescriptionExt.ReadEx(@"http://localhost:55771/WebService1.asmx?wsdl", new NetworkCredential());
            var descriptionImporter = new ServiceDescriptionImporter { ProtocolName = "Soap12" };
            descriptionImporter.AddServiceDescription(serviceDescription, null, null);
            descriptionImporter.Style = ServiceDescriptionImportStyle.Client;
            descriptionImporter.CodeGenerationOptions =
                System.Xml.Serialization.CodeGenerationOptions.GenerateProperties;
            ServiceDescriptionImportWarnings importWarnings = descriptionImporter.Import(codeNamespace, codeUnit);
            if (importWarnings == 0)
            {
                var compiler = CodeDomProvider.CreateProvider("CSharp");

                var references = new[] { "System.Web.Services.dll", "System.Xml.dll" };

                var parameters = new CompilerParameters(references);
                var results = compiler.CompileAssemblyFromDom(parameters, codeUnit);

                if (results.Errors.Cast<CompilerError>().Any())
                {
                    throw new Exception("Compilation Error Creating Assembly");
                }
                var a  = results.CompiledAssembly;
            }
            else
            {
                throw new Exception("Invalid WSDL");
            }
        }
        static void GenerateCSCodeForService(EndpointAddress metadataAddress, string outputFile)
        {
            MetadataExchangeClient mexClient = new MetadataExchangeClient(
                new Uri(@"http://localhost:55771/Service1.svc?wsdl"), MetadataExchangeClientMode.HttpGet);

            mexClient.ResolveMetadataReferences = true;
            MetadataSet metaDocs = mexClient.GetMetadata();

            WsdlImporter importer = new WsdlImporter(metaDocs);
            ServiceContractGenerator generator = new ServiceContractGenerator();

            object dataContractImporter;
            XsdDataContractImporter xsdDCImporter;
            if (!importer.State.TryGetValue(typeof(XsdDataContractImporter), out dataContractImporter))
            {
                Console.WriteLine("Couldn't find the XsdDataContractImporter! Adding custom importer.");
                xsdDCImporter = new XsdDataContractImporter();
                xsdDCImporter.Options = new ImportOptions();
                importer.State.Add(typeof(XsdDataContractImporter), xsdDCImporter);
            }
            else
            {
                xsdDCImporter = (XsdDataContractImporter)dataContractImporter;
                if (xsdDCImporter.Options == null)
                {
                    Console.WriteLine("There were no ImportOptions on the importer.");
                    xsdDCImporter.Options = new ImportOptions();
                }
            }
           // xsdDCImporter.Options.DataContractSurrogate = new DCAnnotationSurrogate();

            // Uncomment the following code if you are going to do your work programmatically rather than add 
            // the WsdlDocumentationImporters through a configuration file. 
            /*
            // The following code inserts a custom WsdlImporter without removing the other 
            // importers already in the collection.
            System.Collections.Generic.IEnumerable<IWsdlImportExtension> exts = importer.WsdlImportExtensions;
            System.Collections.Generic.List<IWsdlImportExtension> newExts 
              = new System.Collections.Generic.List<IWsdlImportExtension>();
            foreach (IWsdlImportExtension ext in exts)
            {
              Console.WriteLine("Default WSDL import extensions: {0}", ext.GetType().Name);
              newExts.Add(ext);
            }
            newExts.Add(new WsdlDocumentationImporter());
            System.Collections.Generic.IEnumerable<IPolicyImportExtension> polExts = importer.PolicyImportExtensions;
            importer = new WsdlImporter(metaDocs, polExts, newExts);
            */

            System.Collections.ObjectModel.Collection<ContractDescription> contracts
              = importer.ImportAllContracts();
            importer.ImportAllEndpoints();
            foreach (ContractDescription contract in contracts)
            {
                generator.GenerateServiceContractType(contract);
            }
            if (generator.Errors.Count != 0)
                throw new Exception("There were errors during code compilation.");

            //Write the code dom
            System.CodeDom.Compiler.CodeGeneratorOptions options
              = new System.CodeDom.Compiler.CodeGeneratorOptions();
            options.BracingStyle = "C";
            System.CodeDom.Compiler.CodeDomProvider codeDomProvider
              = System.CodeDom.Compiler.CodeDomProvider.CreateProvider("C#");
            System.CodeDom.Compiler.IndentedTextWriter textWriter
              = new System.CodeDom.Compiler.IndentedTextWriter(new System.IO.StreamWriter(outputFile));
            codeDomProvider.GenerateCodeFromCompileUnit(
              generator.TargetCompileUnit, textWriter, options
            );
            textWriter.Close();
        }

        public static void GenerateAssemblyForSVC(string url)
        {
            Uri address = new Uri(url);
            MetadataExchangeClientMode mexMode = MetadataExchangeClientMode.HttpGet;
            MetadataExchangeClient metadataExchangeClient = new MetadataExchangeClient(address, mexMode);
            metadataExchangeClient.ResolveMetadataReferences = true;

            //Trust all certificates
            System.Net.ServicePointManager.ServerCertificateValidationCallback = ((sender, certificate, chain, sslPolicyErrors) => true);
            ICredentials networkCredential = new NetworkCredential("username", "password", "domain");
            metadataExchangeClient.HttpCredentials = networkCredential;

            MetadataSet metadataSet = metadataExchangeClient.GetMetadata();
            WsdlImporter wsdlImporter = new WsdlImporter(metadataSet);
            Collection<ContractDescription> contracts = wsdlImporter.ImportAllContracts();
            ServiceEndpointCollection allEndpoints = wsdlImporter.ImportAllEndpoints();

            ServiceContractGenerator serviceContractGenerator = new ServiceContractGenerator();
            foreach (ContractDescription contract in contracts)
            {
                serviceContractGenerator.GenerateServiceContractType(contract);
            }

            // Generate a code file for the contracts.
            CodeGeneratorOptions codeGeneratorOptions = new CodeGeneratorOptions();
            codeGeneratorOptions.BracingStyle = "C";

            // Create Compiler instance of a specified language.
            CompilerResults compilerResults;
            using (CodeDomProvider codeDomProvider = CodeDomProvider.CreateProvider("CSharp"))
            {

                // Adding WCF-related assemblies references as copiler parameters, so as to do the compilation of particular service contract.
                CompilerParameters compilerParameters = new CompilerParameters(new string[] { "System.dll", "System.ServiceModel.dll", "System.Runtime.Serialization.dll" });

                compilerParameters.GenerateInMemory = true;
                compilerParameters.WarningLevel = 1;

                compilerResults = codeDomProvider.CompileAssemblyFromDom(compilerParameters, serviceContractGenerator.TargetCompileUnit);
            }

            if (compilerResults.Errors.Count <= 0)
            {
                var assembly = compilerResults.CompiledAssembly;
            }
            else
            {
                foreach (CompilerError error in compilerResults.Errors)
                {
                    Console.WriteLine(error.ErrorNumber + ": " + error.ErrorText + " " + error.IsWarning + " " + error.Line);
                }

                throw new Exception("Compiler Errors - unable to build Web Service Assembly");
            }
        }
````

>Using self-service hosting way to deply WCF

````csharp
using System;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.ServiceModel.Web;


public static class HostService
{

    [ServiceContract(Namespace = "WCFServiceHost")]
    public interface ICalculator
    {
        [WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        MathResult DoMathJson(double n1, double n2);

        [WebInvoke(ResponseFormat = WebMessageFormat.Xml, BodyStyle = WebMessageBodyStyle.Wrapped)]
        MathResult DoMathXml(double n1, double n2);

    }

    public class CalculatorService : ICalculator
    {

        public MathResult DoMathJson(double n1, double n2)
        {
            return DoMath(n1, n2);
        }

        public MathResult DoMathXml(double n1, double n2)
        {
            return DoMath(n1, n2);
        }

        private MathResult DoMath(double n1, double n2)
        {
            MathResult mr = new MathResult();
            mr.sum = n1 + n2;
            mr.difference = n1 - n2;
            mr.product = n1 * n2;
            mr.quotient = n1 / n2;
            return mr;
        }
    }

    [DataContract]
    public class MathResult
    {
        [DataMember]
        public double sum;

        [DataMember]
        public double difference;

        [DataMember]
        public double product;

        [DataMember]
        public double quotient;
    }

    public static void Host()
    {
        var adrs = new Uri[1];
        adrs[0] = new Uri("http://localhost:3980/service");
        using (ServiceHost serviceHost = new ServiceHost(typeof(CalculatorService), adrs))
        {
            try
            {

                ServiceMetadataBehavior smb = new ServiceMetadataBehavior();
                smb.HttpGetEnabled = true;
                smb.MetadataExporter.PolicyVersion = PolicyVersion.Policy15;
                serviceHost.Description.Behaviors.Add(smb);

                // Open the ServiceHost to start listening for messages.
                serviceHost.Open();

                // The service can now be accessed.
                Console.WriteLine("The service is ready.");
                Console.WriteLine("Press <ENTER> to terminate service.");
                Console.ReadLine();

                // Close the ServiceHost.
                serviceHost.Close();
            }
            catch (TimeoutException timeProblem)
            {
                Console.WriteLine(timeProblem.Message);
                Console.ReadLine();
            }
            catch (CommunicationException commProblem)
            {
                Console.WriteLine(commProblem.Message);
                Console.ReadLine();
            }
        }
    }
}

````

Once we generated assembly, then we can use that to call service

````csharp

        private static void Execute(string wsdlUrl)
        {
            var clientProxyType = asm.GetTypes().First(
                t => t.IsClass && t.Name == "Calculator" + "Client" &&
                     t.GetInterface(typeof(ICommunicationObject).Name) != null);

            var interfaces = clientProxyType.GetInterfaces();
            var currentServiceEndpoint = (from itm in interfaces select allEndpoints).FirstOrDefault();

            if (currentServiceEndpoint == null)
            {
                throw new Exception("No endpoint found");
            }

            var endpoint = currentServiceEndpoint.FirstOrDefault(itm => wsdlUrl.Contains(itm.Address.ToString()));
            if (endpoint == null)
            {
                throw new Exception("No binding found");
            }

            object obj = asm.CreateInstance(
               clientProxyType.Name,
               false,
               BindingFlags.CreateInstance,
               null,
               new object[] { endpoint.Binding, endpoint.Address },
               CultureInfo.CurrentCulture,
               null);
            Type type = obj.GetType();
            List<object> args = new List<object>();
            var methodName = "DoMathXml";

            var memInfo = type.GetMethod(methodName);
            var memParams = memInfo.GetParameters();
            args.Add(2);
            args.Add(2);
            var result = type.InvokeMember("DoMathXml", BindingFlags.InvokeMethod, null, obj, args.ToArray());
        }

````
 