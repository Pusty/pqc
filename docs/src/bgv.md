# [BGV](https://eprint.iacr.org/2011/277.pdf)

A broad overview of a GLWE-variant of the BGV scheme (following the GLWE-Based Encryption Scheme construction without Bootstrapping in Chapter 3) adjusted to highlight the similarities to Kyber:

{{#include ../svg/bgv/overview.svg}}

Notable is that the key generation, encryption and decryption can be expressed very similar to Kyper.CPAPKE.
Differences are that for Kyber \\( N = 2 \\) (which does not fullfil the requirement of the BGV scheme) and \\( p = 2 \\), also the encoding and decoding of the plaintext in relation to the errors differs between the schemes.

The actual BGV schemes without Bootstrapping additionally propose methods for reducing the noise like Key Switching and Modulus Switching.

## Further Links

- Great blog posts about BGV and BFV [[1]](https://www.inferati.com/blog/fhe-schemes-bgv) [[2]](https://www.inferati.com/blog/fhe-schemes-bfv)
- [Blog post](https://bit-ml.github.io/blog/post/bgv-fully-homomorphic-encryption-scheme-in-python/) and [Implementation](https://github.com/zademn/EverythingCrypto/blob/master/E3-Homomorphic-Encryption/BGV.ipynb) for the RLWE based scheme
- [Python Implementation for p=2](https://github.com/Jyun-Neng/PyFHE/tree/master)