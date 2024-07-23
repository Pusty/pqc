# [1-bit LWE Encryption Scheme](https://eprint.iacr.org/2012/090.pdf)

A very basic cryptosystem  based on LWE:

{{#include ../svg/1bit/regev.svg}}

Note that the security proof requires a statistical argument (in particular the [Leftover Hash Lemma](https://en.wikipedia.org/wiki/Leftover_hash_lemma)). 

# [1-bit "Kyber-like" LWE Encryption Scheme](https://eprint.iacr.org/2010/613.pdf)

A cryptosystem that looks more similar to Kyber and does not require statistical distances in the security reduction:

{{#include ../svg/1bit/lp.svg}}

The reduction itself is [the same as for Kyber](kyber-reduction.md) except that we are reducing to LWE instead of MLWE.