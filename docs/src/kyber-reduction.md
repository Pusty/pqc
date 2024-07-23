# [MLWE to KYBER Security Reduction](https://eprint.iacr.org/2017/634.pdf)

This page shows a reduction of MLWE (with \\( k + 1 \\) samples) to Kyber.

Starting with expressing KYBER as MLWE sampling:

{{#include ../svg/lwe/lwe-kyber.svg}}

The CPA Adavantage / Semantic Security Advantage of an adversary \\( A \\) on Kyber is modeled as the following:

{{#include ../svg/kyber-reduction/kyberadv.svg}}

\\[ \\text{Adv}^{\\text{Kyber}}(A) = | Pr[\\mathcal{C}(0) || A] - Pr[\\mathcal{C}(1) || A] | \\]

The Advantage of an adversary \\( B \\) on MLWE is modeled as the following:

{{#include ../svg/kyber-reduction/mlweadv.svg}}

\\[ \\text{Adv}^{\\text{MLWE}}_{x, k, \\chi }(B) = | Pr[\\mathcal{C}(0) || B] - Pr[\\mathcal{C}(1) || B] | \\]

Reducing MLWE to Kyber requires a case distinction:

- Either the construction of public key part \\( t \\) is used in \\( A \\)
- or \\( A \\) treats \\( t \\) like a uniformly random value

Using both cases we get an advantage against MLWE with \\( k+1 \\) samples of at least \\(  \\text{Adv}^{\\text{Kyber}}(A) \\).


## Case 1: Using the structure of the public key

If the construction of \\( t \\) is relevant we observe the following reduction:

{{#include ../svg/kyber-reduction/t-used.svg}}

The \\( k \\) samples of MLWE \\( _{k, \\eta} \\) build a public key for a random private key out of \\( \\mathcal{B}\\eta \\).

We know that if we can solve MLWE for a non-negligible fraction of \\( s \\) we can solve MLWE for all \\( s \\), so fixing the set to the subset is without loss of generality on MLWE.

In \\( \\mathcal{C}(0) \\), the behavior of \\( B \\) is exactly like in the Kyber Semantic Security situation.
In \\( \\mathcal{C}(1) \\), \\( t \\) is uniformly randomly chosen and has no structure.

If \\( A \\) uses the structure of \\( t \\) against Kyber then this means that \\( A \\) can distinguish between a MLWE sample and a uniformly random sample (and as such can be used as an adversary against the MLWE decision problem).


\\[ \\text{Adv}^{\\text{MLWE}}_{k, k, \\eta }(B) = | Pr[\\hat{b} = \\hat{b}^* \\text{ in } \\mathcal{C}(0) || B] -  Pr[\\hat{b} = \\hat{b}^* \\text{ in } \\mathcal{C}(1) || B] \\]
\\[ = | (\\text{Adv}^{\\text{Kyber}}(A) + 1/2) - (\\text{Adv}^{\\text{Kyber}}(A) - \\mu + 1/2) | \\]
\\[ = \\mu \\]

\\( \\text{Adv}^{\\text{Kyber}}(A) - \\mu \\) here expresses how the advantage of \\( A \\) behaves when there is no structure in \\( t \\) and it is actually uniformly randomly chosen.
This puts \\( \\mu \\) itself in the range of \\( 0 \\) (\\(A \\) does not depend on the pseudo-randomness of \\(t \\) at all) to \\( \text{Adv}^{\\text{Kyber}}(A) \\) ( \\(A \\) fully depends on the structure of \\( t \\)).


## Case 2: The Public key as uniformly random samples

If the construction of \\( t \\) is not relevant in \\( A \\) and it is treated like a uniformly random choosen value, we look at the following reduction:

{{#include ../svg/kyber-reduction/t-not-used.svg}}

In this construction for \\( B' \\) we build the public key entirely out of uniformly random values, and use the noisy inner products from the \\( k + 1 \\) MLWE samples for  \\( u \\) and \\( v \\) of the Kyber encryption.
Then in \\( B \\) we add the randomly chosen message to the sample we chose for \\( v \\).

In \\( \\mathcal{C}(0) \\), the behavior of \\( B' \\) is like in the Kyber Semantic Security situation but without structure in \\( t \\). This means the advantage we work with is \\( \text{Adv}^{\\text{Kyber}}(A) - \\mu \\).
In \\( \\mathcal{C}(1) \\), all MLWE samples are entirely uniformly random sampled, which means there is no structure in \\( u \\) or \\( v \\).
Adding either \\( m_b \\) to \\( v \\) makes no difference here as the uniformly random distribution plus a constant in a ring is indistinguishable from the uniformly random distribution.
This means that in \\( \\mathcal{C}(1) \\) no adversary \\( A \\) can guess better than \\( 1/2 \\) and the advantage must be \\( 0 \\).

\\[ \\text{Adv}^{\\text{MLWE}}_{k+1, k, \\eta }(B') = | Pr[\\hat{b} = \\hat{b}^* \\text{ in } \\mathcal{C}(0) || B] -  Pr[\\hat{b} = \\hat{b}^* \\text{ in } \\mathcal{C}(1) || B] \\]
\\[ = | (\\text{Adv}^{\\text{Kyber}}(A) - \\mu  + 1/2) - 1/2 | \\]
\\[ = \\text{Adv}^{\\text{Kyber}}(A) - \\mu \\]

