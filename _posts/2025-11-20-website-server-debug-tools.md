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

## Additional fun

IPv4 DNS addresses are converted to hexidecimal so:

(And forgive me if any of the math is off 'cause it could be)

- `192.168.0.10` = `0xC0A8000A`
- because
- - `192` = `C0` = (`12 x 16`)
- - `168` = `A8` = (`(10 x 16) + 8`)
- - `0` = `00` = (`0 x 16`)
- - `10` = `0A` = (`(0 x 16) + 10`)

And considering the columnar value:

- each column from right to left indicates another exponential power
- - on the far right, `A` is `10` units
- - next column is `0` sets of `16`
- - third from right is `zero` again
- - fourth column also `zero`
- - now the fifth column indicates some number of `16 * 16 * 16`, or `16**3` in this case `8` of them (`32,768`)
- - then sixteen to the fifth power times `A` or `10` (`10,485,760`)
- - and `16**6` times zero
- - finally `16**7` `*` `12` or `3,221,225,472`
- - add all of those together and they accumulate to `3,232,235,530`

The highest IPv4 number is `255.255.255.255` which comes to:
- `16**8 - 1 + 16**7 - 1 + 16**6 - 1 + 16**5 - 1 + 16**4 - 1 + 16**3 - 1 + 16**2 - 1 + 16**1 - 1 + 15`
- (The minus 1 in each case is because the count begins at zero so the "ones", column tops out at `15`
- - the next column at `255` - where `16**2` is `256`)
- which in decimal is `4,581,298,455`
- that was a big number back in the 1960's when IPv4 came into effect.
- the new IPv6 addresses (eg `2403:5803:bf48:0001:0000:0000:0000:0107`) have room for expontentially increased addresses.
- I think perhaps `16**32 - 1` or `340,282,366,920,938,463,463,374,607,431,768,211,455` (`2**256`)
- - That's 340 undecillion, 282 decillion, 366 nonillion, 920 octillion, 938 septillion, 463 sextillion, 463 quintillion, 374 quadrillion, 607 trillion, 431 billion, 768 million, 211 thousand and 456

Thank you as always [Rosuav](https://rosuav.com) for the insights and explanations.
