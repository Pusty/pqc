# [KYBER](https://pq-crystals.org/kyber/index.shtml) [(ML-KEM)](https://csrc.nist.gov/pubs/fips/203/ipd)

Simplified KYBER:

{{#include ../svg/kyber/kyber.svg}}

Compression, Encoding and Number Theoretic Transforms (used for efficient multiplication of polynomials modulo \\(q\\) ) are ignored here.

{{#include ../svg/kyber/kyber-math.svg}}

For each coefficient the noise introduced by \\( e_2 + e^T r - s^T e_1 \\) is smaller than \\( q / 4 \\) so if the coefficient is closer to \\( q / 2 \\) than \\( 0 \\) the decrypted bit is \\( 1 \\) and \\( 0 \\) otherwise.

{{#include ../svg/kyber/kyber-circle.svg}}

KYBER as a public-key encryption scheme is IND-CPA-secure for encrypting messages of a fixed length of 32 byte.
This is also referenced as Kyber.CPAPKE.

Based on this Kyber.CCAKEM (usually just referenced as KYBER) is build as a IND-CCA2-secure KEM using a "slightly tweaked" [Fujisaki–Okamoto](https://link.springer.com/chapter/10.1007/3-540-48405-1_34) transform:

{{#include ../svg/kyber/kyber-kem-overview.svg}}

Here is an illustration of Alice and Bob negotiating a shared key with annotation on the design:

{{#include ../svg/kyber/kyber-kem-annotated.svg}}


## Noise Selection

Kyber uses the centered binomial distribution instead of a discrete Gaussian distribution.

For e.g. \\( \\eta = 2 \\) it looks like this:

{{#include ../svg/kyber/kyber-eta2.svg}}

The reasoning behind this is that sampling the cbd is significantly faster than a Gaussian distribution and they behave [similar](https://cryptojedi.org/papers/#newhope) enough.

The main reason for choosing a Gaussian distribution is that only for them a rigorous reduction of LWE to hard lattice problems is known.
Specifically for the secret \\( s \\) the distribution doesn't matter [as long as it has sufficient entropy](https://eprint.iacr.org/2020/119.pdf).
The KYBER specifications also argue that for the best known attacks that use the noise, the error distribution itself doesn't matter, only the standard deviation and entropy.


- [StackOverflow - LWE and Distributions](https://crypto.stackexchange.com/questions/107234/lwe-and-distributions)
- [StackOverflow - Any advantage of generating s from normal distribution](https://crypto.stackexchange.com/questions/42475/in-r-lwe-is-there-any-advantage-to-generate-secret-from-normal-distribution-ins)






## Notes:

- [Python Implementation](https://github.com/GiacomoPope/kyber-py/tree/main)

- [Original paper](https://eprint.iacr.org/2017/634.pdf)
- \\(s\\) and \\(e\\) both are error vectors generated same way (from centered binomial distribution) using \\(\\eta_1\\)
- Operations on \\(A\\), \\(s\\) \\(e\\) happen in NTT domain [(Number Theoretic Transform)](https://electricdusk.com/ntt.html)
- \\(pk = (As + e) || seed_A\\)
- \\(sk = s\\)
- For encryption: \\(r\\) is an error vector samples with \\(\\eta_1\\), \\(e_1\\) with \\(\\eta_2\\), \\(e_2\\) is individually sampled like the vectors using \\(\\eta_2\\).
- Similar to [LPR encryption system](https://eprint.iacr.org/2012/230.pdf) which operates over Ring LWE

- Kyber.CPAPKE is malleable (Dec(Enc(a) + Enc(b)) = a xor b)