# NIST Post-Quantum Cryptography

The standardization of Post-Quantum Cryptography by NIST started in [2016](https://www.nist.gov/blogs/taking-measure/future-now-spreading-word-about-post-quantum-cryptography) by announcing the respective challenge.
So far 3 rounds of proposal submissions have finished. A [4th round](https://csrc.nist.gov/Projects/post-quantum-cryptography/round-4-submissions) started on July 5, 2022.

On July 5, 2022, [NIST announced](https://www.nist.gov/news-events/news/2022/07/nist-announces-first-four-quantum-resistant-cryptographic-algorithms) the first group of winners for standardization from Round 3.

{{#include ../svg/nist/nist.svg}}

In this graphic [SIKE](http://sike.org/) was not included because it has been broken. [("The SIKE team acknowledges that SIKE and SIDH are insecure and should not be used.")](https://csrc.nist.gov/csrc/media/Projects/post-quantum-cryptography/documents/round-4/submissions/sike-team-note-insecure.pdf)
Furthermore algorithms of other types/categories submitted to Round 3, but not chosen nor resubmitted in Round 4 were not included.

## [Selected Algorithms 2022](https://csrc.nist.gov/Projects/post-quantum-cryptography/selected-algorithms-2022)

### Public-key Encryption and Key-establishment Algorithms

- [CRYSTALS-KYBER](https://pq-crystals.org/)

### Digital Signature Algorithms

- [CRYSTALS-DILITHIUM](https://pq-crystals.org/)
- [FALCON](https://falcon-sign.info/)
- [SPHINCS+](https://sphincs.org/)

## [Round 3](https://csrc.nist.gov/Projects/post-quantum-cryptography/post-quantum-cryptography-standardization/round-3-submissions)

### Round 3 Finalists: Public-key Encryption and Key-establishment Algorithms

- [Classic McEliece](https://classic.mceliece.org/) [(Recommended by BSI)](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TG02102/BSI-TR-02102-1.pdf?__blob=publicationFile&v=7)
- [CRYSTALS-KYBER](https://pq-crystals.org/)
- [NTRU](https://ntru.org/)
- [SABER](https://www.esat.kuleuven.be/cosic/pqcrypto/saber/)

### Round 3 Finalists: Digital Signature Algorithms

- [CRYSTALS-DILITHIUM](https://pq-crystals.org/)
- [FALCON](https://falcon-sign.info/)
- [Rainbow](https://www.pqcrainbow.org/)

### Alternate Candidates: Public-key Encryption and Key-establishment Algorithms

- [BIKE](http://bikesuite.org/)
- [FrodoKEM](http://frodokem.org/) [(Recommended by BSI)](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TG02102/BSI-TR-02102-1.pdf?__blob=publicationFile&v=7)
- [HQC](http://pqc-hqc.org/)
- [NTRU Prime](https://ntruprime.cr.yp.to/)
- [SIKE](http://sike.org/)

### Alternate Candidates: Digital Signature Algorithms

- [GeMSS](https://www-polsys.lip6.fr/Links/NIST/GeMSS.html)
- [Picnic](https://microsoft.github.io/Picnic/)
- [SPHINCS+](https://sphincs.org/)


## Notes to Lattice-Based Candidates

{{#include ../svg/nist/nist-lattice.svg}}

- CRYSTALS: Module Learning with Error
- NTRU: NTRU Assumption (Reduces to original [NTRUEncrypt](https://www.ntru.org/f/hps98.pdf), based on Shortest Vector Problem), variant reduced to Ring Learning with Error [[1]](https://eprint.iacr.org/2013/004) exists
- SABER: Module Learning with Error
- FrodoKEM: Decision Learning With Error (very detailed reduction)
- NTRU Prime: (improved NTRU) NTRU Assumption / Ring LWE
- FALCON: Short Integer Solution (SIS) problem over NTRU lattices

"Essential linear-time reduction from RLWE to MLWE" [[1]](https://link.springer.com/chapter/10.1007/978-3-030-36030-6_1)

## Notes on Code-Based Candidates

- Classic McEliece: binary Goppa codes / decoding general linear code
- BIKE: Quasi-Cyclic Moderate Density Parity-Check (QC-MDPC) codes 
- HQC:  Decoding random quasi-cyclic codes in Hamming metric