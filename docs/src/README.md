# Post-Quantum Cryptography

This mdbook represents my research on Post-Quantum Cryptography during the Spring and Summer of 2024, intending to map out the general space and see what could be useful as an introduction for one or two lecture sessions.

Specifically, I looked at the [Specification Process of Post-Quantum Cryptography by NIST](nist.md), their [accepted algorithms](nist-2022.md) as of the date of writing, and [Kyber (ML-KEM)](kyber.md) in detail.

As part of this, I wrote a [small simplified Kyber ("Baby Kyber")](babykyber.md) implementation for playing around and illustration purposes.
For further understanding, I documented the [path from Kyber to the Lattice problems it is based on](mlwe.md) and specifically wrote out a [security reduction from MLWE to Kyber](kyber-reduction.md).

For my curiosity, I also looked briefly into [BGV (Fully Homomorphic Cryptography) and how similar it looks to Kyber](bgv.md).

This concludes with the short [lecture draft](lecture.md) and [presentable 1-bit LWE based systems](1bit.md).

During the research, I mostly used this page as an assistance during presentations, so some graphics might make less sense without my narration than I think they do. Additionally, there might be (hopefully only smaller) mistakes around. While I don’t intend to actively maintain or expand on this, feel free to mail me for clarification or for me to correct mistakes at contact@bytecode.re

## Literature


- [J. Bos et al - 2017 ] [CRYSTALS - Kyber: a CCA-secure module-lattice-based KEM](https://eprint.iacr.org/2017/634.pdf) 
- [A. Langlois, D. Stehlé - 2012] [Worst-Case to Average-Case Reductions for Module Lattices](https://eprint.iacr.org/2012/090.pdf)
- [O. Regev - 2005] [On Lattices, Learning with Errors, Random Linear Codes, and Cryptography](https://arxiv.org/pdf/2401.03703)
- [C. Peikert - 2008] [Public-Key Cryptosystems from the Worst-Case Shortest Vector Problem](https://eprint.iacr.org/2008/481.pdf)
- [O. Regev - 2010] [The Learning with Errors Problem](https://cims.nyu.edu/~regev/papers/lwesurvey.pdf)
- [Z. Brakerski, C. Gentry, and V. Vaikuntanathan - 2011] [Fully Homomorphic Encryption without Bootstrapping](https://eprint.iacr.org/2011/277.pdf)
- [R. Lindner, C. Peikert - 2010] [Better Key Sizes (and Attacks) for LWE-Based Encryption](https://eprint.iacr.org/2010/613.pdf)
- [C. Peikert - 2014] [Lattice Cryptography for the Internet](https://eprint.iacr.org/2014/070.pdf)

## Links

- [CRYSTALS-Kyber - Round 3 Specifications](https://pq-crystals.org/kyber/data/kyber-specification-round3-20210804.pdf)
- [NIST Post-Quantum Cryptography Project Size](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [BSI Post-Quantum Cryptography Page](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Quantentechnologien-und-Post-Quanten-Kryptografie/Post-Quanten-Kryptografie/post-quanten-kryptografie_node.html)
- [CRYSTALS Suite Website](https://pq-crystals.org/index.shtml)
- [FIPS 203 Draft: CRYSTALS Kyber / ML-KEM](https://csrc.nist.gov/pubs/fips/203/ipd)
- [Kyber - How does it work? (Baby Kyber)](https://cryptopedia.dev/posts/kyber/)
- [Lecture on Post-Quantum Cryptography - Chris Peikert - 3/6/2022](https://www.youtube.com/watch?v=dbP2cgTsrRo)