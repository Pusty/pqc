# [Module Learning With Errors](https://eprint.iacr.org/2012/090.pdf)

The LWE (Learning With Errors) problem and variants are instantiated with a prime \\( q \\) and an error distribution \\( \\chi \\) and provide the LWE sample distribution \\( A_{s, \\chi} \\) for a fixed secret \\( s \\) .

The LWE problem has a search and decision variant.

An algorithm solves Search-LWE for a \\( q \\) and \\( \\chi \\) if, for any \\( s \\) with an arbitrary number of independent LWE samples it outputs \\( s \\) (with high probability).

An algorithm solves Decision-LWE for a \\( q \\) and \\( \\chi \\) if, for any \\( s \\) with an arbitrary number of independent LWE samples it can distinguish the LWE samples from uniformly random samples (with high probability).

If \\( q \\) is bound by some polynomial in \\( n \\) then Search-LWE and Decision-LWE [are equivalent](https://arxiv.org/pdf/2401.03703).

An algorithm that solves LWE for a non-negligible fraction of all possible \\( s \\) can be used to efficiently solve LWE for all \\( s \\). [(Average-case to Worst-case)](https://arxiv.org/pdf/2401.03703)

{{#include ../svg/lwe/lwe-to-gapsvp.svg}}

[Average-case Decision-LWE to Worst-case Search - Shortest Vector Problem.](https://eprint.iacr.org/2008/481.pdf)



## [Learning With Errors](https://cims.nyu.edu/~regev/papers/lwesurvey.pdf)

{{#include ../svg/lwe/lwe-lwe.svg}}

## LWE as a Lattice Problem

Consider for \\( n \\) samples of \\( A_{s, \\chi} \\) we have have 

\\[ A =  [ a_0, ... , a_{n-1} ]^T  \\in \\mathbb{Z}_q^{n \\times n} \\]

which can express a full-rank lattice with the basis \\( A \\):
 
\\[ \\mathcal{L}(A) = \\{ Az \\mod q : z \\in \\mathbb{Z}^n_q \\} \\]

with this, we have:

\\[ b_i = e_i + \\sum_{j=0}^n A_{i,j} \\cdot s_j \\]

So \\( b \\) is a point on the lattice \\( \\mathcal{L}(A) \\) with an error applied on each coordinate.

If we somehow find the point \\( A s \\) (which is \\( b \\) without noise and the closest lattice point from \\( b \\)) we can recover \\( s \\) (as it is the coefficient vector of the lattice point) which would break LWE.

{{#include ../svg/lwe/lattice.svg}}

Problems that tackle this are the [Closest Vector Problem](https://en.wikipedia.org/wiki/Lattice_problem#Closest_vector_problem_(CVP)) and the Bounded Distance Decoding problem.

## [RLWE](https://cims.nyu.edu/~regev/papers/lwesurvey.pdf)

{{#include ../svg/lwe/lwe-rlwe.svg}}

## [MLWE (GLWE)](https://eprint.iacr.org/2011/277.pdf)

RLWE is a special case of MLWE / GLWE with \\( k = 1 \\).

The paper introducing MLWE introduced it as General-Learning With Errors and used it for Fully Homomorphic Encryption without Bootstrapping.

{{#include ../svg/lwe/lwe-mlwe.svg}}

## MLWE in Kyber

The key generation of Kyber is exactly like MLWE for \\( k \\) samples with the secret \\( s \\):

\\[ t = A s + e \\]

\\[ t_i = ( \\Sigma^n_{j=1} A_{i, j} \\cdot s_j ) + e_i \\]

\\[ t_i = \\langle A_{i}, s \\rangle + e_i \\]

Now in the encryption we are first generating the randomizer polynomial \\( r \\) which acts as a secret for LWE sampling during the encryption.

\\( u \\) consists of \\( k \\) samples with the secret \\( r \\) and uses  \\( A^T \\) as the uniformly random \\( a \\), which is also uniformly random.

Because deciding if \\( t \\) is uniformly random or not is hard without knowledge of \\( s \\) it is possible to treat \\( t \\) like a uniformly random value for computing \\( v \\).

So \\( v \\) is exactly one sample with the secret \\( r \\), using \\( t \\) as the uniformly random \\( a \\) and adding the encoded message on top.

As adding a constant value \\( m \\) to a uniformly random sample within a Ring is indistinguishable from just a uniformly random sample, \\( v \\) without knowledge of \\( s \\) or \\( r \\) is also indistinguishable from just a uniformly random sample (under the assumed hardness of LWE). 

{{#include ../svg/lwe/lwe-kyber.svg}}

From this we know that the public key and the ciphertext both are indistinguishable from uniform random values.

This gives us Ciphertext Indistinguishability under CPA  (IND-CPA).