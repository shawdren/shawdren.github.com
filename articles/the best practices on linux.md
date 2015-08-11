## The best practices on Linux

### 1. create bat file for cp file.
whenever do edit config file that's need backup the files, the suggest command should be 
````shell
    sudo cp xxx xxx_`date +%y%m%d_%H:%M`
````
it's not convenient for every time.
here, we could be create a bat file
````shell
    #!/bin/bash
    sudo cp $1  $1_`date +%y%m%d_%H:%M
````
 save this file in home folder for example,
 when use it just execute  sh /home/bak xxx, then the xxx file should be backup as xxx_yymmdd_HH:MM  in the same folder.