# Lecture Draft

- PQC Intro
- LWE (decision vs. search, average to worst case)
- 1-bit LWE Encryption
- 1-bit LWE Reduction
- LWE and Lattices (BDD sketch)


## Post-Quantum Crypto

Current Public-Key Cryptography (RSA, Elliptic-curve cryptography) has efficient attacks against them by using Shor's algorithm on (large) Quantum Computers.

While these large Quantum-Computers do not exist right now (and may not for a long time) transitioning to a new algorithm historically takes a long time so we are slowly starting now.

Also:
- Harvest Now, Decrypt Later
- Rewriting History (with forged timestamps)

In 2016 NIST started the Standardization process to find good candidates for Asymmetric Encryption that are Post-Quantum / Quantum-Resistent / Quantum-Safe.

This in particular means Cryptography that can be run on (current) classical computers while being secure against (future) quantum attacks.

In 2022 NIST announced the first group of winners that are now in the process of standardization.

{{#include ../svg/nist/nist.svg}}

In general current approaches to Post-Quantum Cryptography are: 

- Lattice-based
- Isongeny-based
- Code-based
- Hash-based
- Multivariant-based

Most of the schemes currently in the process of standardization are Lattice-based.

## LWE

The LWE (Learning With Errors) problem and variants are instantiated with a prime \\( q \\) and an error distribution \\( \\chi \\) and provide the LWE sample distribution \\( A_{s, \\chi} \\) for a fixed secret \\( s \\) .

{{#include ../svg/lwe/lwe-lwe.svg}}

- Search-LWE
- Decision-LWE

If \\( q \\) is bound by some polynomial in \\( n \\) then Search-LWE and Decision-LWE [are equivalent](https://arxiv.org/pdf/2401.03703).

An algorithm that solves LWE for a non-negligible fraction of all possible \\( s \\) can be used to efficiently solve LWE for all \\( s \\). [(Average-case to Worst-case)](https://arxiv.org/pdf/2401.03703)


# [1-bit "Kyber-like" LWE Encryption Scheme](https://eprint.iacr.org/2010/613.pdf)

A 1-bit cryptosystem that looks more similar to Kyber and does not require statistical distances in the security reduction:

{{#include ../svg/1bit/lp.svg}}

The reduction itself is [the same as for Kyber](kyber-reduction.md) except that we are reducing to LWE instead of MLWE (and not working in a polynomial ring).

## LWE as a Lattice Problem

Consider for \\( n \\) samples of \\( A_{s, \\chi} \\) we have have 

\\[ A =  [ a_0, ... , a_{n-1} ]^T  \\in \\mathbb{Z}_q^{n \\times n} \\]

which can express a full-rank lattice with the basis \\( A \\):
 
\\[ \\mathcal{L}(A) = \\{ Az \\mod q : z \\in \\mathbb{Z}^n_q \\} \\]

with this we have:

\\[ b_i = e_i + \\sum_{j=0}^n A_{i,j} \\cdot s_j \\]

So \\( b \\) is a point on the lattice \\( \\mathcal{L}(A) \\) with an error applied on each coordinate.

If we somehow find the point \\( A s \\) (which is \\( b \\) without noise and the closest lattice point from \\( b \\)) we can recover \\( s \\) (as it is the coefficient vector of the lattice point) which would break LWE.

{{#include ../svg/lwe/lattice.svg}}

Problems that tackle this are the [Closest Vector Problem](https://en.wikipedia.org/wiki/Lattice_problem#Closest_vector_problem_(CVP)) and the Bounded Distance Decoding problem.


## Variants of LWE

LWE in a Polynomial Ring <reason why this makes it much more efficient for cryptographic schemes>:

{{#include ../svg/lwe/lwe-rlwe.svg}}

RLWE is a special case of MLWE / GLWE with \\( k = 1 \\).

The paper introducing MLWE introduced it as General-Learning With Errors and used it for Fully Homomorphic Encryption without Bootstrapping.

{{#include ../svg/lwe/lwe-mlwe.svg}}

The previous reductions for general lattices only work partially when we work in a polynomial ring and are only true for a subset of lattices with a specific structure.
It is not known whether this subset of lattices is generalizable to lattices or if this subset opens up the possibility of specialized attacks.


## References for Structure

- [Chris Peikert Lecture Video](https://www.youtube.com/watch?v=dbP2cgTsrRo)