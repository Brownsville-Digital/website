---
layout: post
title:  "What's Up with IPv4 and IPv6 DNS"
---

## Scape away some some ignorance, fill in some knowledge, reveal more ignorance.

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
- - on the far right, `A` is `10` units (`16**0 = 1` `* 10`)
- - next column leftwards is `0` sets of `16`
- - third from right is `zero` again
- - fourth column also `zero`
- - now the fifth column indicates some number of `16 * 16 * 16`, or `16**3` in this case `8` of them (`32,768`)
- - then sixteen to the fifth power times `A` or `10` (`10,485,760`)
- - and `16**6` times zero
- - finally `16**7` `*` `12` or `3,221,225,472`
- - add all of those together and they accumulate to `3,232,235,530`

The highest IPv4 number is `255.255.255.255` which comes to:
- `16**8 - 1` (`4,294,967,295`), the number of slots being, in decimal is `4,294,967,296`
- - one higher since we start at zero.
- - not every IP address is available to utilize
- that was a big number back when IPv4 came into effect.
- the new IPv6 addresses (eg `2403:5803:bf48:0001:0000:0000:0000:0107`) have room for expontentially increased addresses.
- I think perhaps `16**32 - 1` or `340,282,366,920,938,463,463,374,607,431,768,211,455` (`2**256 - 1` with `2**256` potential slots)
- - That's 340 undecillion, 282 decillion, 366 nonillion, 920 octillion, 938 septillion, 463 sextillion, 463 quintillion, 374 quadrillion, 607 trillion, 431 billion, 768 million, 211 thousand and 456

At this time, twenty twenty-five, IPv6 is nearing 50% adoption/support worldwide.

This is managed by the [International Assigned Numbers Authority](https://www.iana.org), an affiliate of the [Internet Corporation of Assigned Names and Numbers](https://www.icann.org).

Thank you [Rosuav](https://rosuav.com) for insights and explanations.
