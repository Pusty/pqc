# Lecture Draft

- PQC Intro
- Algebraic Lattice Basics
- LWE (decision vs. search, average to worst case)
- LWE and Lattices (BDD sketch)

- Variants of LWE  (RLWE, MLWE)

- Kyber PKE
- Kyber KEM


## Post-Quantum Crypto

Current Public-Key Cryptography (RSA, Elliptic-curve cryptography) have efficient attacks against them by using Shor's algorithm on (large) Quantum Computers.

While these large Quantum-Computers do not exist right now (and may not for a long time) transitioning to new algorithm historically takes a long time so we are slowly starting now.

Also:
- Harvest Now, Decrypt Later
- Rewriting History (with forged timestamps)

In 2016 NIST started the Standardization process to find good candidates for Asymmetric Encryption that are Post-Quantum / Quantum-Resistent / Quantum-Safe.

This in particular means Cryptography that can be run on (current) classical computers while being secure against (future) quantum attacks.

In 2022 announced the first group of winners that are now in the process of standartization.

{{#include ../svg/nist/nist.svg}}

In general current approaches of Post-Quantum Cryptograhpy are: 

- Lattice-based
- Isongeny-based
- Code-based
- Hash-based
- Multivariant-based

Most of the schemes currently in the process of standardization are Lattice based.

## Algebraic Lattice Intro

A Lattice is a periodic grid in \\( \\mathbb{Z}^m \\).

So with a basis \\( B \\) out of \\( m \\) linearly independent vectors  \\( b_1, ..., b_m \\) out of \\( \\mathbb{Z}^{\ge m} \\).

\\[ \\mathcal{L}(B) = \\{  \\sum^n_{i=1} x_i b_i : x_i \\in \\mathbb{Z} \\} \\]

// Explain SVP and that it is hard

## LWE

The LWE (Learning With Errors) problem and variants are instantiated with a prime \\( q \\) and an error distribution \\( \\chi \\) and provide the LWE sample distribution \\( A_{s, \\chi} \\) for a fixed secret \\( s \\) .

{{#include ../svg/lwe/lwe-lwe.svg}}

- Search-LWE
- Decision-LWE

If \\( q \\) is bound by some polynomial in \\( n \\) then Search-LWE and Decision-LWE [are equivalent](https://arxiv.org/pdf/2401.03703).

An algorithm that solves LWE for a non-negligible fraction of all possible \\( s \\) can be used to efficiently solve LWE for all \\( s \\). [(Average-case to Worst-case)](https://arxiv.org/pdf/2401.03703)


## LWE and Lattices

// LWE to BDD sketch here and roughly how it relates to SVP

## Variants of LWE

LWE in a Polynomial Ring <reason why this makes it much more efficient for cryptographic schemes>:

{{#include ../svg/lwe/lwe-rlwe.svg}}

RLWE is a special case of MLWE / GLWE with \\( k = 1 \\).

The paper introducing MLWE introduced it as General-Learning With Errors and used it for Fully Homomorphic Encryption without Bootstrapping.

{{#include ../svg/lwe/lwe-mlwe.svg}}

// Explain that previous reductions to general lattices doesn't work when we work in a polynomial ring and is only true for a subset of lattices with a specific structure

## Kyber PKE

Simplified KYBER:

{{#include ../svg/kyber/kyber.svg}}

// Explain why this works (graphics in kyber.md)

// Explain how this relates to MLWE / where hardness comes from

KYBER as MLWE instances:

{{#include ../svg/lwe/lwe-kyber.svg}}

// security reducation on KYBER as MLWE

## Kyber KEM / ML-KEM

{{#include ../svg/kyber/kyber-kem-overview.svg}}

with annotation:

{{#include ../svg/kyber/kyber-kem-annotated.svg}}

// explain difference between kyber-kem-fo and "normal" fo

## References / Structure based on

- [Chris Peikert Lecture Video](https://www.youtube.com/watch?v=dbP2cgTsrRo)