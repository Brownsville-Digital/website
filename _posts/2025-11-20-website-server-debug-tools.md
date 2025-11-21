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

## Systemctl, Journalctl
If the browser returns a "Connection refused" message (get into the server and) check
`journalctl -fu [someservice]` (eg `mysql`, `postgresql`, `nginx`), `systemctl status nginx` (or `systemctl status httpd2` for Apache);
check log files, generally located in `/var/log/service/type-of-log`.

## SSH
Can you connect at all? Maybe the server isn't running.

## Firewall
Do you have a tool like `fail2ban` running.

## GeoPeeker
[Geopeeker](geopeeker.com) is a web-based tool to inspect how the site is served from various global points.

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
- `traceroute 192.168.0.1`
- `traceroute6 2403:5803:bf48:1::1`
- `traceroute6 jabberwocky.rosuav.com` (Try it [here](https://lg.twelve99.net))
- `traceroute6 aboatbeneath.rosuav.com`

```
# traceroute6 aboatbeneath.rosuav.com
traceroute6 to aboatbeneath.rosuav.com (2403:5803:bf48:1::2) from 2001:579:1930:3f00:5044:f84a:c327:5e4a, 64 hops max, 12 byte packets
 1  *
    2001:579:1930:3f00:9ec9:ebff:fe82:a6a2  4.168 ms  4.253 ms
 2  2001:579:1933:ffff::1111  860.295 ms  100.280 ms  24.154 ms
 3  2001:578:1c00:5:f:0:1:8004  11.991 ms  11.496 ms  10.033 ms
 4  2001:578:1c00:0:100:122:109:64  15.728 ms  10.699 ms  11.623 ms
 5  2001:578:1:0:172:17:248:216  34.705 ms  26.124 ms  25.783 ms
 6  atl-b24-link.ip.twelve99.net  26.409 ms  27.790 ms  30.453 ms
 7  dls-b7-v6.ip.twelve99.net  44.798 ms
    atl-bb1-v6.ip.twelve99.net  26.988 ms
    dls-b7-v6.ip.twelve99.net  45.392 ms
 8  *
    nash-bb1-v6.ip.twelve99.net  35.876 ms *
 9  lax-b22-link.ip.twelve99.net  74.498 ms  77.659 ms
    dls-bb1-v6.ip.twelve99.net  44.145 ms
10  lax-bb1-v6.ip.twelve99.net  77.815 ms
    aussiebroadband-ic-383862.ip.twelve99-cust.net  74.769 ms  72.657 ms
11  lax-b22-link.ip.twelve99.net  102.352 ms
    hundredgige0-0-0-21.bng3.578lor.vic.aussiebb.net  221.757 ms  226.577 ms
12  aussiebroadband-ic-383862.ip.twelve99-cust.net  79.275 ms  76.726 ms  76.744 ms
13  hundredgige0-0-0-20.bng3.578lor.vic.aussiebb.net  224.615 ms
    hundredgige0-0-0-21.bng3.578lor.vic.aussiebb.net  220.816 ms
    lingering.onward.dreamily  224.118 ms
14  in.an.evening.of.july  222.077 ms  224.920 ms
    a.boat.beneath.a.sunny.sky  225.999 ms
15  children.three.that.nestle.near  221.984 ms
    lingering.onward.dreamily  221.785 ms
    children.three.that.nestle.near  222.140 ms
16  eager.eye.and.willing.ear  221.932 ms  221.238 ms  222.946 ms
17  pleased.a.simple.tale.to.hear  221.665 ms  220.928 ms  219.896 ms
18  eager.eye.and.willing.ear  223.254 ms
    long.had.paled.that.sunny.sky  222.859 ms  221.403 ms
19  pleased.a.simple.tale.to.hear  230.815 ms
    echoes.fade.and.memories.die  224.046 ms
    pleased.a.simple.tale.to.hear  223.887 ms
20  autumn.frosts.have.slain.july  221.365 ms  222.249 ms  221.475 ms
21  still.she.haunts.me.phantomwise  222.209 ms  231.682 ms  222.120 ms
22  alice.moving.under.skies  221.373 ms  225.394 ms  222.745 ms
23  still.she.haunts.me.phantomwise  221.765 ms
    never.seen.by.waking.eyes  221.371 ms  225.691 ms
24  children.yet.the.tale.to.hear  221.292 ms  222.177 ms  224.214 ms
25  eager.eye.and.willing.ear  224.559 ms
    never.seen.by.waking.eyes  221.807 ms  221.327 ms
26  children.yet.the.tale.to.hear  222.323 ms
    lovingly.shall.nestle.near  223.514 ms  221.623 ms
27  in.a.wonderland.they.lie  220.931 ms  221.803 ms  220.746 ms
28  dreaming.as.the.days.go.by  223.453 ms
    lovingly.shall.nestle.near  222.182 ms
    dreaming.as.the.days.go.by  220.330 ms
29  dreaming.as.the.summers.die  221.153 ms  222.265 ms  222.166 ms
30  * *
    dreaming.as.the.days.go.by  223.862 ms
31  lingering.in.the.golden.gleam  222.894 ms  220.928 ms  221.203 ms
32  aboatbeneath.rosuav.com  222.895 ms  223.806 ms
    ever.drifting.down.the.stream  223.485 ms
```

Traceroute sends out a whole bunch of IP (Internet Protocol) packets with various Time to Lives, represented by the number in the
leftmost column (so `1` through `32` in the above case, below it reaches the destination at `19`).

Here's a shorter, IPv4 traceroute:
```
traceroute rosuav.com
traceroute to rosuav.com (37.61.205.138), 64 hops max, 52 byte packets
 1  192.168.0.1 (192.168.0.1)  2.149 ms  2.909 ms  1.414 ms
 2  10.3.216.1 (10.3.216.1)  10.955 ms  9.544 ms  10.554 ms
 3  100.122.109.214 (100.122.109.214)  15.636 ms  18.747 ms  10.934 ms
 4  100.122.109.64 (100.122.109.64)  10.844 ms  10.225 ms  8.746 ms
 5  maribprj01-ae1.rd.at.cox.net (68.1.1.215)  23.945 ms  24.808 ms  24.915 ms
 6  atl-b24-link.ip.twelve99.net (62.115.167.68)  24.841 ms  25.215 ms  25.826 ms
 7  atl-bb1-link.ip.twelve99.net (62.115.134.246)  28.029 ms  26.125 ms *
 8  ash-bb2-link.ip.twelve99.net (62.115.137.132)  38.559 ms  39.665 ms  38.417 ms
 9  prs-bb2-link.ip.twelve99.net (62.115.140.106)  122.705 ms
    prs-bb1-link.ip.twelve99.net (62.115.140.104)  199.273 ms  117.639 ms
10  prs-b3-link.ip.twelve99.net (62.115.118.63)  121.798 ms
    prs-b3-link.ip.twelve99.net (62.115.118.59)  142.422 ms  121.439 ms
11  ae5.sxb1-ibr-tarazed.bb.godaddy.com (80.239.192.122)  126.875 ms  126.426 ms  161.959 ms
12  ae30.sxb1-cr-vega.bb.gdinf.net (87.230.112.17)  125.362 ms  149.360 ms  124.654 ms
13  * * *
14  * * *
15  * * *
16  * * *
17  * * *
18  * * *
19  gideon.rosuav.com (37.61.205.138)  129.553 ms  125.164 ms  125.402 ms
```

Each of three packets sent for each set of hops contains an incrementing TTL (time to live), beginning with just 1, so at the
first line (hop) you see the IPv4 address of my local router, `192.168.0.1`, where after `2.149`, `2.909` and `1.414` milliseconds the router says this one is expired, I'll throw it away for you.

Then Traceroute sends out (`3`) packets with a TTL of `2` and so on up to `64` (`64 hops max`).

Between steps `5` and `6` my internet provider, Cox (`maribprj01-ae1.rd.at.cox.net`) hands it off to `twelve99.net`

And you can see the locations for the various routers the packets hit along the way. All three of the `6` TTL packets landed in Atlanta
at `atl-b24-link.ip.twelve99.net` (and were disposed of because they had a "short" lifespan).

At hop `9` one packet ended at `prs-bb2-link.ip.twelve99.net` and the other two at `prs-bb1-link.ip.twelve99.net`. All three reached the destination in Australia on the 19th hop.

## dig
- `dig -x 2403:5803:bf48::1 +trace`
- `dig -x 64.225.60.217 +trace`
- `dig -x example.com +trace`
- `dig maps.google.com +trace`
- `dig example.com a` for the IPv4 address
- `dig example.com aaaa` for the IPv6 address (if there is an `AAAA` record)


## CDN

Dig and Traceroute above may be revealing if it is an issue with a Content Delivery Network like CloudFlare.

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

Thank you as always [Rosuav](https://rosuav.com) for the insights and explanations.
