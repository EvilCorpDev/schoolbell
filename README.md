# schoolbell
Simple school bell scheduler

Bell scheduler with profile support and web ui configuration

# How to build
- Unix Systems  
Run `build.sh` script and it will
build app. Final jar file you can find in `target` folder.
- Windows  
    a) Build web-ui client at `src/main/web-client by` `npm run build` command  
    b) Move files from `src/main/web-client/build/static/css` into 
    `src/main/web-client/build/css`  
    c) Move files from `src/main/web-client/build/static/js` into 
        `src/main/web-client/build/js`  
    d) Replace all `/static/` in imports in `src/main/web-client/build/index.html` 
        by empty space  
    e) Move all files from `src/main/web-client/build` into `src/main/resources/public`  
    f) From project root folder (where pom.xml placed) run `mvn clean package` command.
    Final jar file will be placed in `target` folder.

# How to run
For both UNIX and Windows you can run app with `java -jar school-bell-1.0-SNAPSHOT.jar` 
command or by simple double click on `school-bell-1.0-SNAPSHOT.jar` file.

# After app start
When app started go to `localhost:9000/bell` for web UI

# Develop mode
For developing mode:  
   a) Run `npm start` from `src/main/web-client`  
   b) Run `.jar` file or start app from `Intellij`  
App will be available at `localhost:3000`
