> Pretty printing all type of sources  

[![Build Status](https://travis-ci.org/m1ome/peyote.svg?branch=master)](https://travis-ci.org/m1ome/peyote)
[![Coverage Status](https://coveralls.io/repos/github/m1ome/peyote/badge.svg?branch=master)](https://coveralls.io/github/m1ome/peyote?branch=master)
[![Dependency Status](https://david-dm.org/m1ome/peyote.svg)](https://david-dm.org/m1ome/peyote)

# Install
```
$ npm install -g peyote
```

# About
Peyote is a simple and small flexible tool for pretty-print thing from cli!

# Usages

## Via pipe
```
$ echo '{"username": "admin", "status": 1, "is_admin": true}' | peyote
``` 

## Via cli arguments
```
$ peyote '{"username": "admin", "status": 1, "is_admin": true}'
```

# Output
![First example](https://raw.githubusercontent.com/m1ome/peyote/master/public/img/example-1.png)
