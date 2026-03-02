---
title: Networking School
date: 2026-03-02
author: 'Mike iLL Kilmer'
layout: post
permalink: /2026/03/02/networking-school
categories:
    - 'Uncategorized'
---

Received a Pell grant to study. I'd like to know more about networking. Enrolled in the program with a local institution called George Stone Technical College and am in a course under Derrick Beaird called Network Systems Support.

Accumulating some certificates which are ultimately intended to include one called CompTIA which is apparently fairly comprehensive.

Learned that to manually convert from decimal to binary a decimal integer can be continually divided by two and the appending the remainders from the left.

For example the binary representation of 127:

```
127 / 2 = 63 (126) remainder 1
63 / 2 = 31 (62) remainder 1
31 / 2 = 15 (30) remainder 1
15 / 2 = 7 (14) remainder 1
7 / 2 = 3 (6) remainder 1
3 / 2 = 1 (2) remainder 1
1 / 2 = 0 remainder 1
```

result: `111111`

Python ever the fantastic tool:

`$ Python`
```python
>>> bin(127)
'0b1111111'
```

That is going from right to left `2**0 + 2**1 + 2**2 + 2**3 + 2**4 + 2**5 + 2**6`.

Going the other direction using Python:

```python
>>> 0b1111111
127
```

Another great trick I learned in a Kahn Academy course on hex and binary is that a set of four bits converts to a single hexidecimal value. Four bits can count up to 15, or one less than the five bit starting value. The max value of four bits is `1111` which is hex `f`.

In Python:
```python
>>> 0xf == 0b1111
True
>>> 0xe == 0b1110
True
0x8 == 0b1000
True
```
