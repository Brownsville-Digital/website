---
title: Making a Proxmox Fileserver on an old macbook
date: 2026-05-02
author: 'Mike iLL Kilmer'
layout: post
permalink: /2026/05/02/proxmox-copyparty-fileserver-old-macbook
categories:
    - 'Uncategorized'
---

## First make a bootable Debian usb:

- download an ISO from Debian.
- format the USB if not already formatted I used ExFat to be crossplatform friendly. With a GUID partition scheme.
- `df -h` to identify device idenifier in `/dev`
- - `/dev/disk4s2 15Gi  2.9Mi   15Gi  1%  94  481794  0%  /Volumes/Debian`
- unmount the disc `diskutil unmount {identifier}` eg `/dev/disk4s2`
- `system_profiler SPUSBDataType` is also interesting
- - however [this](https://stackoverflow.com/a/78235224/2223106) was not working for me
- `dd if=debian-live-13.4.0-amd64-xfce.iso of=/dev/disk4s2 bs=4M; sync` where `if` is the input file and `of` is the output file pointer. `bs` is the block size.

To be continued...
