---
title: Segments Packets Frames
date: 2026-05-01
author: 'Mike iLL Kilmer'
layout: post
permalink: /2026/05/01/segments-packets-frames
categories:
    - 'Uncategorized'
---

# Great table from an ad-riddled resource:

https://www.geeksforgeeks.org/computer-networks/difference-between-segments-packets-and-frames

| Feature|Segments|Packets|Frames|
|--------|--------|--------|-----------|
| Layer|Transport Layer (Layer 4)|Network Layer (Layer 3)|Data Link Layer (Layer 2)|
| Contains|Only raw data|Data + Source and Destination IP Addresses|Data + IP Addresses + MAC (hardware) Addresses|
| Used In|Organizing data before sending|Routing data between different networks|Transferring data directly between connected devices|
| Size|Can vary in size|Usually smaller, broken down for easier routing|Fixed size based on the network type (e.g., Ethernet)|
| Header|Basic header with port numbers|More complex header with IP addresses|Most detailed header with MAC addresses|
| Main Job|Splitting data into manageable pieces|Routing data across networks|Handling actual physical transmission of data|
| Addressing|No addressing information|Uses IP addresses for routing|Uses MAC addresses for direct device communication|
