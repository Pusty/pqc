# [KYBER](https://pq-crystals.org/kyber/index.shtml) [(ML-KEM)](https://csrc.nist.gov/pubs/fips/203/ipd)

Simplified Kyber:

![](kyber.svg)

Compression, Encoding and Number Theoretic Transforms (used for efficient multiplication of polynomials modulo \\(q\\) ) are ignored here.

![](kyber-math.svg)

For each coefficient the noise introduced by \\( e_2 + e^T r - s^T e_1 \\) is smaller than \\( q / 4 \\) so if the coefficient is closer to \\( q / 2 \\) than \\( 0 \\) the decrypted bit is \\( 1 \\) and \\( 0 \\) otherwise.

![](kyber-circle.svg)


## Notes:

- [Python Implementation](https://github.com/GiacomoPope/kyber-py/tree/main)

- \\(s\\) and \\(e\\) both are error vectors generated same way (from centered binomial distribution) using \\(\\eta_1\\)
- Operations on \\(A\\), \\(s\\) \\(e\\) happen in NTT domain [(Number Theoretic Transform)](https://electricdusk.com/ntt.html)
- \\(pk = (As + e) || seed_A\\)
- \\(sk = s\\)
- For encryption: \\(r\\) is an error vector samples with \\(\\eta_1\\), \\(e_1\\) with \\(\\eta_2\\), \\(e_2\\) is individually sampled like the vectors using \\(\\eta_2\\).
- Similar to [LPR encryption system](https://eprint.iacr.org/2012/230.pdf) which operates over Ring LWE