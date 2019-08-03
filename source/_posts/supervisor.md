title: 使用 supervisor 让我们的 web 服务随系统启动
date: 2019-08-03 15:52:45
category: 知识备忘
tags: linux
---

## 安装

```
apt install supervisor
```

## 配置文件

默认位置 /etc/supervisor/supervisord.conf

``` text
; supervisor config file

[unix_http_server]
file=/var/run/supervisor.sock   ; (the path to the socket file)
chmod=0700                      ; sockef file mode (default 0700)

[supervisord]
logfile=/var/log/supervisor/supervisord.log ; (main log file;default $CWD/supervisord.log)
pidfile=/var/run/supervisord.pid ; (supervisord pidfile;default supervisord.pid)
childlogdir=/var/log/supervisor ; ('AUTO' child log dir, default $TEMP)

; the below section must remain in the config file for RPC
; (supervisorctl/web interface) to work, additional interfaces may be
; added by defining them in separate rpcinterface: sections
[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///var/run/supervisor.sock ; use a unix:// URL  for a unix socket

; The [include] section can just contain the "files" setting.  This
; setting can list multiple files (separated by whitespace or
; newlines).  It can also contain wildcards.  The filenames are
; interpreted as relative to this file.  Included files *cannot*
; include files themselves.

[include]
files = /etc/supervisor/conf.d/*.conf
```

关键看最后一句： `files = /etc/supervisor/conf.d/*.conf`，说明 `/etc/supervisor/conf.d/` 下所有以 `.conf` 为后缀的文件会被自动引入

## 使用

supervisorctl 需要 root 用户来使用

在 `conf.d`  目录下创建一个配置命名为 `pyapi.conf` ：

``` text
[program:pyapi]
environment=FLASK_APP=hello.py,FLASK_ENV=development
command=/bin/bash -c "source env/bin/activate && flask run --host=0.0.0.0"
directory=/home/feng/apps/pyapi

user=feng
autostart=true
autorestart=true
stdout_logfile=/var/log/supervisor/pyapi_out.log
stderr_logfile=/var/log/supervisor/pyapi_err.log
```

为了使我们的服务生效，命令行输入 `supervisorctl update` 然后回车（因为需要 root 用户来使用，普通用户需要加 `sudo`）

## 换一种方式使用

使用命令

``` bash
supervisorctl
```

则可以进入 supervisor 控制台（因为需要 root 用户来使用，普通用户需要加 `sudo`）

``` text
supervisor> help

default commands (type help <topic>):
=====================================
add    exit      open  reload  restart   start   tail   
avail  fg        pid   remove  shutdown  status  update 
clear  maintail  quit  reread  signal    stop    version
```

想要让我们的服务生效，输入 `update` 然后回车

想要退出控制台，输入 `exit` 然后回车

## 再换一种方式使用

往 `supervisord.conf` 里添加 `inet_http_server`

``` text
[inet_http_server]         ; inet (TCP) server disabled by default
port=*:9001                ; (ip_address:port specifier, *:port for all iface)
username=user              ; (default is no username (open server))
password=123               ; (default is no password (open server))
```
该修改需要重启 supervisor 服务，所以使用 `supervisorctl` 的方式进入 supervisor 控制台，然后输入 `reload` 回车
