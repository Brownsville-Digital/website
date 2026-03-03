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

You can do the same thing with any base for example base-16 you'd divide by 16 and get the remainder:

```python
>>> 325 / 16; 325 % 16
20.3125
5
>>> 20 / 16; 20 % 16
1.25
4
>>> 1 / 16; 1 % 16
0.0625
1
>>> 0x145
325
```

Or to hide the unwieldy remaining decimals
```python
>>> int(325 / 16);325 % 16
20
5
#etc...
```

Or cleaner yet:

```python
>>> divmod(325,16)
(20, 5)
>>> divmod(20,16)
(1, 4)
>>> divmod(1,16)
(0, 1)
```

Without the handy modulo operator (`%`) you can calculate the remainder mathematically thus:

```numerator - (quotient * denominator) = remainder```

For example `20 - (16 * 1) = 4`.

Floats are by their nature binary, Rosuav tells me:

Python
```python
>>> (2.75).as_integer_ratio()
(11, 4)
>>> 11/4
2.75
```

And that "You'll always find that the denominator of the fraction is a power of two.":

```python
>>> (0.2).as_integer_ratio()
(3602879701896397, 18014398509481984)
# checking
>>> bin(18014398509481984)
'0b1000000000000000000000000000000000000000000000000000000'
```

A power of two in binary has exactly one bit set to 1.

The following fragment uses bitwise AND to check if a number is a power of 2:

```python
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

# Example Usage
number = int(input("Enter a number: "))
if is_power_of_two(number):
    print(f"{number} is a power of two.")
else:
    print(f"{number} is not a power of two.")
```

Apparently subtracting 1 from a number flips all the bits after the rightmost set bit (including the set bit itself), making the result 0 when ANDed with the original number. Let's check that:

```python
>>> bin(128)
'0b10000000'
>>> bin(128-1)
'0b1111111'
>>> bin(8)
'0b1000'
>>> bin(8-1)
'0b111'
>>> bin(2)
'0b10'
>>> bin(2-1)
'0b1'
```

Ah yes that makes sense because when the value goes down by one from the initial value of a right-most column the result is one less column and each of the remaining ones at max. So the values associated with each of the byte columns themselves (`1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024` etc...) are the successive powers of 2.

Nerd out!
