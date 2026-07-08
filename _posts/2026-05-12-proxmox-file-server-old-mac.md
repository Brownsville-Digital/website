---
title: Making a Proxmox Fileserver on an old macbook
date: 2026-05-02
author: 'Mike iLL Kilmer'
layout: post
permalink: /2026/05/02/proxmox-copyparty-fileserver-old-macbook
categories:
    - 'Uncategorized'
---

## NOTE don't follow along without reading full post as some failed attempts are also documented.

### First make a bootable Debian usb:

- download an ISO from Debian.
- format the USB if not already formatted I used ExFat to be crossplatform friendly. With a GUID partition scheme.
- `df -h` to identify device idenifier in `/dev`
- - `/dev/disk4s2 15Gi  2.9Mi   15Gi  1%  94  481794  0%  /Volumes/Debian`
- unmount the disc `diskutil unmount {identifier}` eg `/dev/disk4s2`
- `system_profiler SPUSBDataType` is also interesting
- - however [this](https://stackoverflow.com/a/78235224/2223106) was not working for me
- - The output of the above command I will post below this list with commentary
- `dd if=debian-live-13.4.0-amd64-xfce.iso of=/dev/disk4s2 bs=4M; sync` where `if` is the input file, `of` is the output file pointer, `bs` is the block size and `sync` is a directive to "Pad every input block to the input buffer size.  Spaces are used for pad bytes if a block oriented conversion value is specified, otherwise NUL bytes are used."
- - time for a meal break (at least at `4M` block sizes).

```
Cruzer U:

          Product ID: 0x55a5
          Vendor ID: 0x0781  (SanDisk Corporation)
          Version: 1.00
          Serial Number: 4C530005940904114024
          Speed: Up to 480 Mb/s
          Manufacturer: SanDisk
          Location ID: 0x14200000 / 16
          Current Available (mA): 500
          Current Required (mA): 224
          Extra Operating Current (mA): 0
          Media:
            Cruzer U:
              Capacity: 16.01 GB (16,005,464,064 bytes)
              Removable Media: Yes
              BSD Name: disk4
              Logical Unit: 0
              Partition Map Type: GPT (GUID Partition Table)
              S.M.A.R.T. status: Verified
              USB Interface: 0
              Volumes:
                EFI:
                  Capacity: 209.7 MB (209,715,200 bytes)
                  File System: MS-DOS FAT32
                  BSD Name: disk4s1
                  Content: EFI
                  Volume UUID: 0E239BC6-F960-3107-89CF-1C97F78BB46B
                disk4s2:
                  Capacity: 15.79 GB (15,793,651,712 bytes)
                  File System: MS-DOS
                  BSD Name: disk4s2
                  Content: Microsoft Basic Data
                  ```
The section labeled `disk4s2` at the bottom seems to correspond to the file pointer at `/dev/`

### more later...

So the ExFat disk format was not legible to the late 2013 Powerbook so second attempt used Mac Extended (journaled) which apparently _can_ be read also by Linux.

Sure is slow. Bigger block size next time perhaps:

> The recommended block size for the dd command typically ranges from 64K to 16M, depending on your specific hardware and use case. It's best to start with a block size that is a multiple of your disk's physical block size for optimal performance.

There is some further discussion [here](https://superuser.com/questions/234199/good-block-size-for-disk-cloning-with-diskdump-dd). UPDATE tried `32m` block size as well and still a slow process.
