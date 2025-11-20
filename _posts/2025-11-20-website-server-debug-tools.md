---
layout: post
title:  "Web Server Debug Tools and Tricks"
---

# Linux/Debian helpful tools when a server I manage isn't responding

## Top

Unix `top` command can indicate if CPU or memory is saturated:

```
# top
top - 19:43:23 up 14 days,  3:01,  1 user,  load average: 0.00, 0.00, 0.00
Tasks: 104 total,   1 running, 103 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.3 us,  0.0 sy,  0.0 ni, 99.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.2 st
MiB Mem :    939.7 total,     83.3 free,    672.6 used,    455.1 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.    267.2 avail Mem

PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
643 root      20   0   18808   4444   2876 S   0.3   0.5   0:43.76 systemd-logind
 128013 admin     20   0  209360  91420  21996 S   0.3   9.5   0:17.44 fastapi
```

## Disc Free aka File System Space Usage

```
# df
Filesystem      1K-blocks    Used Available Use% Mounted on
udev               468644       0    468644   0% /dev
tmpfs               96232     504     95728   1% /run
/dev/nvme0n1p1    8025124 3313412   4282504  44% /
tmpfs              481144    1052    480092   1% /dev/shm
tmpfs                5120       0      5120   0% /run/lock
tmpfs              481148       4    481144   1% /tmp
```

### If it _is_ a storage issue

#### find
`find / -xdev -type f -size +100M`

#### to find files larger than a Gigabyte:

`find . -type f -size +1000000k -exec ls -lh {} \; | awk '{ print $9 ": " $5 }'`

### Disc Usage

#### 20 largest files or dirs:
`du -ax / | sort -rn | head -20`

#### Current dir only:
`du -ax . | sort -rn | head -20`

# DNS issue?

The Domain Name Server can be characterized as the most essential part of your link to the internet.

## ping
`ping example.com`

## traceroute
`traceroute6 2403:5803:bf48:1::1`

## dig
`dig -x 2403:5803:bf48::1 +trace`
`dig -x 64.225.60.217 +trace`
`dig -x example.com +trace`
`dig maps.google.com +trace`

## /etc/resolv.conf
This is where the local system stores DNS resolver address(es).
`cat /etc/resolv.conf`

## systemd-resolve
eg `sudo systemd-resolve --flush-caches`
May need to run `sudo systemctl enable systemd-resolved.service` first.
If `systemd-resolve` not found you may have `resolvectl` (`resolvectl --help`)

# Ports

## lsof
`sudo lsof -i -P -n | grep LISTEN`
(May need to `apt install lsof`)
```
# lsof -i -P -n | grep LISTEN
sshd         657            root  6u  IPv4    4932      0t0  TCP *:22 (LISTEN)
sshd         657            root  7u  IPv6    4942      0t0  TCP *:22 (LISTEN)
postgres     682        postgres  6u  IPv6    5082      0t0  TCP [::1]:5432 (LISTEN)
postgres     682        postgres  7u  IPv4    5083      0t0  TCP 127.0.0.1:5432 (LISTEN)
python      9806           admin  5u  IPv4   99465      0t0  TCP 127.0.0.1:4242 (LISTEN)
nginx      38741            root  5u  IPv4 1274152      0t0  TCP *:80 (LISTEN)
nginx      38741            root  6u  IPv6 1274153      0t0  TCP *:80 (LISTEN)
nginx      38741            root  7u  IPv6 1274154      0t0  TCP *:443 (LISTEN)
nginx      38741            root  8u  IPv4 1274155      0t0  TCP *:443 (LISTEN)
nginx      44339        www-data  5u  IPv4 1274152      0t0  TCP *:80 (LISTEN)
nginx      44339        www-data  6u  IPv6 1274153      0t0  TCP *:80 (LISTEN)
nginx      44339        www-data  7u  IPv6 1274154      0t0  TCP *:443 (LISTEN)
nginx      44339        www-data  8u  IPv4 1274155      0t0  TCP *:443 (LISTEN)
nginx      44340        www-data  5u  IPv4 1274152      0t0  TCP *:80 (LISTEN)
nginx      44340        www-data  6u  IPv6 1274153      0t0  TCP *:80 (LISTEN)
nginx      44340        www-data  7u  IPv6 1274154      0t0  TCP *:443 (LISTEN)
nginx      44340        www-data  8u  IPv4 1274155      0t0  TCP *:443 (LISTEN)
systemd-r  83925 systemd-resolve 12u  IPv4 1637436      0t0  TCP *:5355 (LISTEN)
systemd-r  83925 systemd-resolve 14u  IPv6 1637444      0t0  TCP *:5355 (LISTEN)
systemd-r  83925 systemd-resolve 21u  IPv4 1637450      0t0  TCP 127.0.0.53:53 (LISTEN)
systemd-r  83925 systemd-resolve 23u  IPv4 1637452      0t0  TCP 127.0.0.54:53 (LISTEN)
exim4     118795     Debian-exim  5u  IPv4 1789114      0t0  TCP 127.0.0.1:25 (LISTEN)
exim4     118795     Debian-exim  6u  IPv6 1789115      0t0  TCP [::1]:25 (LISTEN)
fastapi   128013           admin 15u  IPv4 1818544      0t0  TCP *:8000 (LISTEN)
```

## netstat
`netstat -tuln`
(may need to `apt install net-tools`)
```
# netstat -tuln
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.54:53           0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:4242          0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:5432          0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:5355            0.0.0.0:*               LISTEN
tcp6       0      0 ::1:25                  :::*                    LISTEN
tcp6       0      0 :::443                  :::*                    LISTEN
tcp6       0      0 :::80                   :::*                    LISTEN
tcp6       0      0 ::1:5432                :::*                    LISTEN
tcp6       0      0 :::22                   :::*                    LISTEN
tcp6       0      0 :::5355                 :::*                    LISTEN
udp        0      0 127.0.0.54:53           0.0.0.0:*
udp        0      0 127.0.0.53:53           0.0.0.0:*
udp        0      0 172.31.13.174:68        0.0.0.0:*
udp        0      0 0.0.0.0:5355            0.0.0.0:*
udp6       0      0 :::5355                 :::*
```
