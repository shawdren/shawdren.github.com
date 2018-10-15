Surfing the internet on the science way
=======================

On the Ubuntu is much easy to install ss, only below 3 steps
````javascript
apt-get update
apt-get install python-pip
pip install s-h-a-d-o-w-s-o-c-k-s
````
pip is installation tool for python, like apt-get

if installed sucessful and no error, the s-s should be instal completely. the next is deploy thing.

write a config file and save as etc/s-h-a-d-o-w-s-o-c-k-s.json, as following
````{
    "server":"my_server_ip",
    "server_port":8388,
    "local_address": "127.0.0.1",
    "local_port":1080,
    "password":"mypassword",
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}
````
server, server_port, password these are parameters, change it by yourself.
the config file is ok, then try to run it.

````
ssserver -c /etc/s-h-a-d-o-w-s-o-c-k-s.json -d start
````
of cause, we don't want to setup every time on start server. 
then put the start command copy into below file. 

````
/etc/rc.d/rc.local
````

That's ok, then open the client, hooray!!!

android client download path:　http://s-h-a-d-o-w-s-o-c-k-s.en.uptodown.com/android/download

Note: the last thing is replace the hyphen with empty space. 