---
title: The journey of a chat message
date: 2026-04-30
author: 'Mike iLL Kilmer'
layout: post
permalink: /2026/04/30/journey-of-a-chat-message
categories:
    - 'Uncategorized'
---

# The journey of a chat message

Hi, I'm How'dy.

I'm a message someone sent to a friend through a website with a chat feature and this is my life story.

I was formed when Sender pressed some keys on a keyboard generating the relevant scancode for each key. Somewhere between the NetBios or Network Basic Input Output System and my host of origin's Operating System (aka OS) the six characters I'm composed of which may be familiar to you as, uppercase h, lowercase o, w, apostrophe, d and y-by the way the terms uppercase and lowercase come from back in the days of manual type setting when the uppercase letter blocks were kept in the higher drawers in the print shops-but my true form is binary and since each one of my characters is included in the ASCII character set (by the way that's the American Standard Code for Information Interchange dating back to 1961 with an engineer named Bob Bemer who worked at IBM) it only takes one byte (that's a single octet or eight bits) to represent each of Sender's intended characters. Uppercase h for example is number seventy-two in the ASCII table which of course is `0100 1000` (Two to the power of six plus two pow three).

Did you know that you can manually calculate the binary value of a decimal number by repeatedly dividing it in two and building up the binary value from the remainder, right to left. So for example the number `four` you can divide it evenly twice with zero remainders-two zeroes-halving from `four` to `two` to `one` which `two` doesn't "go into" so you have it as a remainder: `100`, binary `4`. Two raised to a power for each of three columns: zero, one, two.

I'm sure you are aware the the word **bit** was proposed back in 1948 by the magnetic, attractive and brilliant Claude Shannon, the father of information theory, in a paper titled "A Mathematical Theory of Communication". A bit is a single unit of information: true/false, on/off, yes/no. It's a portmanteau (or blend) of binary and digit. Bit.

At any rate here I am. How'dy. `72 111 119 39 100 121`.

- `0100 1000`
- `0110 1111`
- `0111 0111`
- `0010 0111`
- `0110 0100`
- `0111 1001`

In the mouth it's a bit much.

So here I mean there I sat in the web browser (User Agent Mozilla/5.0 bla bla bla Chrome bla bla etc...) in a **document object model** (that's **DOM**) object called a _form input_. I mean, _I_ didn't sit there I was sitting in the random access memory of Sender's computer and an ascii _representation_ of me was there being rendered on Sender's screen (I'm a little unclear on how that works).

In the **Open Sources Interconnect** or **OSI** reference model (thank you International Organization for Standardization and it's voluntary members) this is considered the seventh layer; the highest layer; the Application layer.

Now if you're anything like me you might look around sometimes and wonder, where am I? Like, what is this? And you might turn to books and stuff like a Bible or Koran some Sanscrit texts talking about Brahma. But my understanding of the world I came into goes something like this:

The browser got a string of words or numbers signifying a destination like _example.com_ or an Internet Protocol address which would-if a version 4 address-have been four sets of one to three numbers each representing a binary value between one and two hundred and fifty-six and then Return telling the browser to go ahead and begin a request. Before that it was just some default nothing and nothing and nothing in this OSI seventh layer application world.

There's all kinds of activity that could go on up here in Layer Seven the Application layer.

Secure Shell Protocol (otherwise known as SSH) for connecting remote computer terminals using first _asymmetric_ encryption (where they use different keys for encryption and decryption) to agree on a _shared_ key and then the less processing-intensive _symmetric_ encryption to continue discourse using the same shared secret key to _en-_ and _de-crypt_ the messages.

User Datagram Protocol and Telnet which are not encrypted are considered as Layer Seven protocols as well, along with POP3, IMAP and SMTP for email, File Transfer protocol and others. The Domain Name System (hey it doesn't end in "protocol") is -if there's a domain name as opposed to IP address-going to be consulted in which case a very small request will be composed and its data sent down to Layer Six the Presentation Layer aka the _syntax_ layer where the app data is translated to a network format: encryption, formatting, compression and facilitating interoperability between different systems. As Claude Shannon explained, "The fundamental problem of communication is that of reproducing at one point either exactly or approximately a message selected at another point."

Do you know what a packet-switching network is? A packet is a block of data that includes the information needed to deliver it. A header and a payload. Kind of like a postal letter. And the format for one of these packets is known as a Datagram (a combination of the words _data_ and _telegram_).

But I'm getting a bit ahead of myself. Figuratively, this request moves down through the layers. Remember, Sender hit the return key? How'dy.

One the Sixth Layer, the Presentation layer, the Transport Layer Security or TLS handshake occurs if it's a secure browser connection.

Then down to layer five the Session Layer: domain of a lot of Local Area Network activity like file sharing, printer connections and other Network Basic Input/Output System or NetBIOS and Server Message Block (SMB) activity. Remote Procedure Call is in layer five as well. The Session Layer manages and controls the connections between computers. It establishes, maintains, and terminates connections, ensuring that data exchanges occur efficiently and in an organized manner. This layer is responsible for session checkpointing and recovery, which allows sessions to resume after interruptions, which is why you don't have the login to a website again every time you visit a new page. Thank you Session layer.

Down at the fourth layer you could say we reach the atmosphere and can begin to make out solid features on the ground. The most well-known Transport Layer protocols are TCP-yes as in **TCP/IP**-and UDP, Transmission Control and User Datagram protocol respectively. The Transport Layer provides end-to-end communication services for applications. It ensures complete data transfer, error recovery, and flow control between hosts. Here in the fourth layer is where we say the aforementioned Datagram is formed.

## Datagram.

The datagram consists of a header (like the address info on an envelope) and the data (like the love letter inside). Here in the Transportation Layer the Maximum Transmission Unit is considered and data like for example a large image or video is broken into Segments and each of those Datagrams includes the *segment sequence*. There's a specific specification (a _specification_ is _specific_ isn't it?) for the datagram header you can look up. In Craig Hunt's fantastic <u>TCP/IP Network Administration</u> book he describes it utilizing a diagram of six thirty-two bit layers, each described as a "word", with various _length_ and _starting location_ specifications for information like _protocol_, _version_, _checksum_ and other details as mentioned earlier in this creation myth.

And as this datagram moves down through the _routers_ in the Internet or Network Layer, managed and unmanaged _switches_ in the Data Link layer all the way to  _cables_ and _hubs_ way down in the bedrock of Layer One, the Physical Layer, information is added to the datagram header to provide the next layer with the information it needs to continue delivery. The fancy word for this process is _encapsulation_.

As this encapsulation occurs, each segment from layer four becomes a _packet_ in layer three, a _frame_ in two and finally _bits_ or _symbols_ in layer one. You may hear the terms packet and datagram used interchangeably.

In the Cisco community forum, one of their employees, Peter Paluch writes:

> As for datagram, this term has a much wider and less strict meaning [than packet]. I personally consider the term "datagram" to stand for "message of a certain type". In other words, frame is an L2 datagram, packet is an L3 datagram, segment is an L4 datagram. The "datagram" itself does not have the connotation of any particular layer; instead, it just describes a well formed message originated by one of the layers.

Not sure how I know that. You're probably thinking this is all... a bit much.

So yeah then each packet aka datagram finds the quickest route to its destination, they meet up on the other side in Layer Four the Transport Layer where they are reassembled and passed up toward the Application layer. Used up headers are discarded along the way. In a way it's like how the post office takes your letter and puts it in a bag of other letters and puts that bag in a truck with other bags and on the other end the lover (in the Application Layer) receives only the the original envelope.

Back to our story. Now the browser knows who it's talking to. In a secure TLS connection, sending and receiving hosts have a couple of SYNchronization and ACKnowledgement exchanges over TCP, determine a cipher specification they both support, make a TLS handshake-you you should look up the Diffie-Helman algorithm it's so dope-and ultimately some HTML arrives and my window of birth comes into existence. End of creation story.

You probably know this but my hexidecimal representation is `48` `6f` `77` `27` `64` `79`. That's "How'dy" in hex. In my case Sender and Receiver are the same nerd, Mike iLL. He sent me to himself over a **websocket**, which is similar to an http **socket** except that it is a _persistent bidirectional low-overhead_ connection like you'd see in an interactive game or chat.

Both http and websocket are a type of _network socket_: a software structure that serves as an endpoint for sending and receiving data.

If you were to inspect the history of my life in, say the Wireshark application you'd see that frame 28 contains a packet with 80 bytes. Both the server and the browser are running on the same local host so the source and destination are represented by a bunch of zeroes. Then there's a hex `0800` indicating IPv4 I won't bore you with _all_ the details it's... it's a bit much. After the header, in the last few bytes of the frame datagram is me: `48 6f 77 27 64 79`.

Life is short. It's been fun. Adios, or rather

- `0100 0001`
- `0110 0100`
- `0110 1001`
- `0110 1111`
- `0111 0011`

Bigendian.

## resources:
- https://www.imperva.com/learn/application-security/what-is-mtu-mss/
- https://www.themarginalian.org/2016/09/06/james-gleick-the-information-claude-shannon/
- https://en.wikipedia.org/wiki/Bit
- https://www.geeksforgeeks.org/computer-networks/difference-between-segments-packets-and-frames/
- https://en.wikipedia.org/wiki/Network_socket
- https://en.wikipedia.org/wiki/Domain_Name_System
- https://en.wikipedia.org/wiki/List_of_network_protocols_(OSI_model)
- https://www.auvik.com/franklyit/blog/layer-3-switches-layer-2/
- https://en.wikipedia.org/wiki/OSI_model
- https://www.imperva.com/learn/application-security/osi-model/
- https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
- https://gist.github.com/MikeiLL/3e9ed57162e27038f591f9923349ce34


```python
' '.join([bin(ord(c)) for c in list("How'dy")])
```

```sh
pandoc lesson.md -o howdy.pdf
```

```sh
C:\Users\847333\sharevmware>cmd /c mklink /d path\2\linkdir path\2\sourcedir
```
