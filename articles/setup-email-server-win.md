Setup the mail server on windows
=======================
The eamil function is part of application, which can be send email automatically, or recevid mail from pop server.

For test purpose, to record the setup steps.
The mail server software is hMailServer.

1. following the [install steps](http://peterkellner.net/2012/03/11/how-to-setup-your-own-pop3imap-email-server-for-local-development-testing/) to in install hMailServer
2. config SSL certificate

download [openssl](http://slproweb.com/products/Win32OpenSSL.html) run following command to generate new .cer file.

into the openssl install folder/bin
````
openssl genrsa –out private-rsa.key 1024
````
generate no key file

````
openssl req –new –x509 –key private-rsa.key –days 750 –outpublic-rsa.cer
````

## Configuring hMailServer to use the SSL certificate

1. Start hMailServer Administrator
2. Navigate to Settings->Advanced->TCP/IP ports
3. Select a port 
4. Select "Use SSL" and the certificate.
5. Save the changes
6. Restart hMailServer

Then test it in the application.