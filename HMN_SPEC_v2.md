# Human Movement Notation (HMN) — System Specification

**Version:** 2.0.0
**Date:** April 3, 2026
**Author:** Tom / AIUNITES LLC
**Copyright:** © 2026 AIUNITES LLC. All rights reserved.
**License:** This specification is published for prior art and copyright registration purposes. Use of the notation system for personal training, vocal practice, or research is permitted. Commercial implementations, software products, machine firmware integration, AI training datasets, and derivative specification documents require written permission from AIUNITES LLC.
**Contact:** AIUNITES LLC, Tulsa, Oklahoma, USA

---

## Syntax Change Notice (v1.x → v2.0)

Version 2.0 unifies all three HMN sub-protocols (MNN, VRN, VNN) on the **@TAG(...)** annotation style. The shared grammar in Section 3 now defines `@TAG(...)` as the canonical form.

| Element | v1.x | v2.0 |
|---------|------|------|
| Movement pattern | `{Push.H}` | `@MOV(Push.H)` |
| Contraction | `[Con:Pec.S+++]` | `@ACT(Pec.S:3)` |
| Nerve output | `→ MedPec` | `>> MedPec` |
| Joint position | `[Pos:L.Sh(IR:25,Flex:90)]` | `@JNT(L.Sh:IR=25,Flex=90)` |
| Resistance vector | `[Vec:H:Mid,A:0°,Src:Cable]` | `@VEC(Ht=Mid,Ang=0°,Src=Cable)` |
| Compensation | `[Comp:A for B]` | `@COMP(A/B)` |
| VRN tag | `[VF:modal]` | `@VF(modal)` |
| VRN formants | `[F1:500,F2:1800]` | `@F(1:500,2:1800)` |
| Nerve status | `[Nerve:C5-C6]` | `@NERV(C5-C6)` |

Activation levels: `+/++/+++/++++` → `:1/:2/:3/:4`

v1.x strings remain valid. Compliant v2.0 parsers MUST accept both syntaxes. The unambiguous MNN/HMN string identifier is the `@` prefix — no other biomechanical notation system uses this convention.

---

## Disambiguation

**MNN (Muscular Neuro Notation)** is the AIUNITES notation protocol for encoding human body movement as plain text. It is distinct from "MNN" as used in computer vision and machine learning literature, where the acronym denotes *Motion Neural Network* — a class of ML architectures that predict body pose from sensor or video data. These are unrelated systems: AIUNITES MNN is a human-authored text notation; Motion Neural Network models are machine learning inference systems.

The primary consumer-facing trademark for the AIUNITES MNN product line is **BODWAVE™**. The full protocol name **Muscular Neuro Notation** is the authoritative designation. MNN is the abbreviation.

---

## Abstract

Human Movement Notation (HMN) is an open protocol family for encoding human movement as portable, human-readable, machine-parseable plain text. HMN is organized as an umbrella architecture with three sub-protocols:

- **MNN** (Muscular Neuro Notation) — body movement: muscles, nerves, joints, resistance vectors
- **VRN** (Vocal Resonance Notation) — vocal production: larynx, articulation, resonance, breath
- **VNN** (Voice Neural Notation) — neural control: cranial nerves, motor pathways, antagonist balance

All three sub-protocols share the same design principle: describe what the human body does in plain text that works in a gym log, a clinical record, a game engine, an AI training pipeline, and a cable rig controller — without conversion, without proprietary software, and without vendor lock-in.

HMN is developed and published by AIUNITES LLC. The notation systems are the middleware layer. The sites that consume them are the endpoints.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Design Principles](#2-design-principles)
3. [Shared Grammar](#3-shared-grammar)
4. [MNN — Muscular Neuro Notation](#4-mnn--muscular-neuro-notation)
5. [VRN — Vocal Resonance Notation](#5-vrn--vocal-resonance-notation)
6. [VNN — Voice Neural Notation](#6-vnn--voice-neural-notation)
7. [Cross-Protocol Interoperability](#7-cross-protocol-interoperability)
8. [The Three-Domain Architecture](#8-the-three-domain-architecture)
9. [Consumer Site Registry](#9-consumer-site-registry)
10. [Prior Art and Relationship to Existing Standards](#10-prior-art-and-relationship-to-existing-standards)
11. [Implementation Requirements](#11-implementation-requirements)
12. [Versioning and Compatibility](#12-versioning-and-compatibility)
13. [Intellectual Property](#13-intellectual-property)
14. [Version History](#14-version-history)

---

## 1. Architecture Overview

### 1.1 The Problem HMN Solves

Every field that involves human movement built its own notation silo:

- Biomechanics labs use C3D and BVH files only their software can read
- Gym equipment stores joint angles in proprietary firmware
- Physical therapy clinics document exercises in prose no system can parse
- Game studios use motion capture formats that encode skeleton motion but not muscle intent
- Vocal pedagogy uses metaphor ("place the sound forward") with no underlying parametric system
- AI voice synthesis models acoustic waveforms with no model of physical vocal production

The result is that a clinically complete description of a movement — "this person's left shoulder was at 25° internal rotation, 90° flexion, contracting the sternal pec via the medial pectoral nerve at high activation, with a mid-height cable providing resistance at 0°" — cannot be expressed in any single, portable, human-readable format that works across all of these contexts.

HMN exists because that description should be writable as:

```
@ACT(Pec.S:3) >> MedPec @JNT(L.Sh:IR=25,Flex=90) @VEC(Ht=Mid,Ang=0°,Src=Cable)
```

...and that string should work in a gym log, a clinical record, a game engine, a cable rig controller, and a research paper without conversion, without proprietary software, and without paying anyone for the privilege of reading your own data.

### 1.2 The Three Sub-Protocols

```
HMN -- Human Movement Notation
|
+-- MNN -- Muscular Neuro Notation
|         Domain: body movement -- muscles, nerves, joints, resistance
|         Use cases: gym, rehab, avatar posing, cable rigs, robotics
|         Spec: MNN_SPEC_v2.md (bodspas-site)
|         Status: v2.0.0 -- production
|
+-- VRN -- Vocal Resonance Notation
|         Domain: vocal production -- larynx, articulation, resonance, breath
|         Use cases: vocal training, singing pedagogy, speech therapy, AI synthesis
|         Spec: VRN_SPEC_v1.md (voicestry-site)
|         Status: v1.0.0
|
+-- VNN -- Voice Neural Notation
          Domain: neural control of vocal production -- cranial nerves, pathways, balance
          Use cases: clinical assessment, vocal neurology, AI voice research, SLP
          Spec: VNN_SPEC_v1.md (voicestry-site)
          Status: v1.0.0
```

### 1.3 Why These Three Are a Family

MNN, VRN, and VNN are not independently designed systems that were later grouped together. They share a common origin in the same question: *how do you encode what a human body does in a format that any system can use?*

- **MNN** answers this for physical movement of the musculoskeletal system
- **VRN** answers this for the mechanical act of vocal production
- **VNN** answers this for the neural control layer that drives both

All three are applications of the same underlying principle. The vocal folds are muscles. The larynx is a joint complex. Breath support is a resistance vector. VRN is, at the deepest level, a specialized application of the same encoding approach as MNN — applied to the vocal apparatus specifically, with its own parameter vocabulary because vocal production requires different descriptors than a shoulder press.

VNN extends this one layer deeper: the cranial nerves that fire to execute a VRN state are the vocal equivalent of MNN's nerve tags. The three sub-protocols are the same idea at three levels of the same system.

---

## 2. Design Principles

These principles apply to all three sub-protocols. They are design constraints, not suggestions. Any implementation claiming HMN compliance must respect all of them.

### 2.1 Plain Text

HMN strings are plain text. No binary formats. No proprietary readers. No special software required. A person with a text editor can read, write, and edit any HMN record. This constraint is non-negotiable.

### 2.2 Human-Authored

HMN is designed to be written by a person, not generated by a sensor. This distinguishes it from motion capture formats (BVH, C3D), electromyography data, and AI voice synthesis outputs — all of which are machine-generated. A trainer writes MNN. A vocal coach writes VRN. A clinician writes VNN.

This does not prevent machines from generating HMN strings. A cable rig that logs its own operation, a biosensor that detects muscle activity, an AI that produces a vocal gesture description — all of these can produce valid HMN. But the design target is human authoring.

### 2.3 Machine-Parseable

HMN v2.0 strings use the `@TAG(...)` annotation style: consistent prefix, parenthetical content, and `=` for key-value assignment. Any programming language with basic regex can identify and parse HMN tags without a dedicated library. The formal EBNF grammar in each sub-spec defines exactly what a valid string looks like.

**MNN string identification:** A string containing at least one `@MOV`, `@ACT`, `@JNT`, `@VEC`, `@COMP`, `@NERV`, `@MORPH`, or `@BODY` tag, or containing the `>>` nerve arrow, is identifiable as an MNN string. This is the unambiguous HMN fingerprint.

### 2.4 Semantically Meaningful

Every element of an HMN string maps to a real anatomical or physiological referent. `Pec.S` means the sternal head of pectoralis major. `MedPec` means the medial pectoral nerve. `CT:TA 65:35` means the cricothyroid is 65% activated relative to the thyroarytenoid's 35%. The notation is not a code system — it is a structured description of physical reality.

### 2.5 Portable Across Domains

The same HMN string must be usable in multiple contexts without modification. The MNN string for a cable fly is simultaneously:
- A gym log entry a human can read
- A machine instruction that could drive a cable rig
- A clinical record of neuromuscular activation with joint angles
- A VR/game engine command for avatar posing

The notation does not change between contexts. The implementation does. This is the core design principle of HMN: *write once, use everywhere.*

### 2.6 Anatomically Grounded

HMN vocabulary is anchored in established anatomical and physiological nomenclature. Muscle names follow standard anatomical terminology. Nerve names follow clinical convention. Joint axes follow the ISB Joint Coordinate System (Wu et al., 2002/2005). Vocal parameters follow the source-filter model of speech production. Cranial nerve designations follow standard clinical numbering.

### 2.7 Compositional and Additive

Every element of an HMN string is optional. A minimum valid MNN string is a single tag. Adding more tags adds information — it does not require rewriting what was already there.

### 2.8 Forward Compatible

HMN parsers must preserve unknown tags and symbols without error. New symbols and tags introduced in future versions of any sub-spec must not break parsers written for earlier versions.

---

## 3. Shared Grammar

All three sub-protocols use a common structural grammar. This section defines the shared structural elements. Sub-protocol grammars extend this with their own tag vocabularies.

### 3.1 Tag Structure (v2.0)

An HMN string is a sequence of tagged segments. All tags in v2.0 use the `@TAG(...)` annotation form:

```
@TAG_ID(content)
```

Tags are separated by whitespace. Order is flexible — parsers identify segments by tag, not position. Every HMN tag begins with `@`, making HMN strings unambiguously identifiable by the presence of the `@` prefix.

**The nerve output operator** `>>` is the one structural exception — it is not wrapped in a tag because it marks a directional relationship between contraction and innervation:

```
@ACT(Pec.S:3, Dlt.A:1) >> MedPec/Axil
```

### 3.2 Key-Value Content

Content inside `@TAG(...)` uses `key=value` pairs separated by commas:

```
@TAG(Key1=value1,Key2=value2,Key3=value3)
```

For multi-entry tags (lists of muscles, lists of joint axes), entries are separated by commas:

```
@ACT(Pec.S:3, Dlt.A:1, Tri:2)
@JNT(L.Sh:IR=25,Flex=90 R.Hip:Abd=20)
```

Note the two separator patterns:
- **Between tag items**: comma (`,`)
- **Between joints in @JNT**: space (` `)
- **Between axis name and value inside a joint**: `=`
- **Between muscle name and activation level in @ACT**: `:`

### 3.3 Activation Levels

The numeric activation scale is shared across all three sub-protocols:

| Symbol | Level | Meaning |
|--------|-------|---------|
| `:1` | 1 | Low activation — stabilizer, mild engagement |
| `:2` | 2 | Moderate activation — synergist, secondary |
| `:3` | 3 | High activation — prime mover, dominant |
| `:4` | 4 | Maximum activation — MVC effort, peak |
| `:0` | 0 | Explicit absence (clinical use only — genital structures, sphincters) |

### 3.4 Side Identifiers

For paired structures (bilateral anatomy), side is always specified:

| Symbol | Meaning |
|--------|---------|
| `L.` | Left |
| `R.` | Right |
| `Bi.` | Bilateral (both sides equally) |
| *(omitted)* | Unspecified — permissible only for midline structures |

### 3.5 Identifier Format

All symbol identifiers follow this format:
```
Identifier := Letter (Letter | Digit | "." | "_")*
```

Identifiers are case-sensitive. `Pec.S` and `pec.s` are distinct. Dot-separated identifiers indicate anatomical hierarchy: `Pec.S` (pectoralis, sternal head), `Quad.RF` (quadriceps, rectus femoris), `Sp.C` (cervical spine).

### 3.6 Formal EBNF (v2.0 Shared Layer)

```ebnf
HMNString     := Segment*
Segment       := AtTag | NerveArrow
AtTag         := "@" TagId "(" TagContent ")"
NerveArrow    := ">>" Identifier ("/" Identifier)*

TagId         := Identifier
TagContent    := TagEntry ("," " "? TagEntry)*
TagEntry      := Identifier ":" ActivLevel          (* activation entry *)
               | Identifier ":" AxisList            (* joint entry *)
               | KVPair                             (* key=value entry *)
               | Identifier                         (* bare identifier *)
ActivLevel    := "1" | "2" | "3" | "4" | "0"
AxisList      := AxisEntry ("," AxisEntry)*
AxisEntry     := Identifier "=" Number
KVPair        := Identifier "=" Value

Identifier    := Letter (Letter | Digit | "." | "_")*
Value         := (Letter | Digit | "." | "-" | "°" | "%" | ":" | "/")+
Number        := "-"? Digit+ ("." Digit+)?
Letter        := [A-Za-z]
Digit         := [0-9]
```

### 3.7 Legacy v1.x Grammar (accepted for backward compatibility)

```ebnf
LegacySegment  := BraceTag | BracketTag | LegacyArrow
BraceTag       := "{" Identifier ["." Identifier] "}"
BracketTag     := "[" Identifier ":" TagContent_v1 "]"
LegacyArrow    := (U+2192 | "->") Identifier ("/" Identifier)*
TagContent_v1  := LegacyEntry ("," " "? LegacyEntry)*
LegacyEntry    := Identifier LegacyActivLevel?
               | Identifier "(" LegacyAxis ("," LegacyAxis)* ")"
               | Identifier ":" Value
LegacyActivLevel := ("+" | "++" | "+++" | "++++") | "0"
LegacyAxis     := Identifier ":" Number
```

---

## 4. MNN — Muscular Neuro Notation

### 4.1 Purpose

MNN is the HMN sub-protocol for physical movement of the musculoskeletal system. It encodes:

1. Which muscles contracted and at what activation level
2. Which nerves drove them and from which spinal roots
3. Which movement pattern was performed
4. What joint positions were held (degrees per axis per joint)
5. What resistance vector was applied (source, height, angle)
6. Whether compensation occurred

### 4.2 Tag Vocabulary

| Tag | Format | Description |
|-----|--------|-------------|
| `@MOV(...)` | `@MOV(Push.H)`, `@MOV(Squat)` | Movement pattern category |
| `@ACT(...)` | `@ACT(Pec.S:3, Dlt.A:1)` | Muscle contractions with activation levels |
| `>> Nerve` | `>> MedPec/Axil` | Nerve innervation pathway + target region |
| `@JNT(...)` | `@JNT(L.Sh:IR=25,Flex=90)` | Joint positions in degrees |
| `@VEC(...)` | `@VEC(Ht=Mid,Ang=0°,Src=Cable)` | Resistance vector |
| `@COMP(...)` | `@COMP(Bic/Lat)` | Compensation pattern observed |
| `@NERV(...)` | `@NERV(C5-C6)` | Nerve status / symptomatic levels |
| `@MORPH(...)` | `@MORPH(Bic=0.8)` | Avatar morph target overrides |
| `@BODY(...)` | `@BODY(Mass=82kg,BF=14%)` | Avatar baseline morphology |

### 4.3 Complete Example

```
@NERV(C5-C6)
@MOV(Push.H) @ACT(Pec.S:3, Dlt.A:1) >> MedPec/Axil
@JNT(L.Sh:IR=25,Flex=90,Abd=10) @VEC(Ht=Mid,Ang=0°,Src=Cable)
```

**Reading:** On a day when C5-C6 was symptomatic, performed a horizontal push. Sternal pec was primary mover at high activation, anterior delt was secondary. Medial pectoral and axillary nerves were active. Left shoulder at 25° internal rotation, 90° flexion, 10° abduction. Cable at mid height, straight ahead, from a cable stack.

**Legacy v1.x equivalent (still accepted):**
```
[Nerve:C5-C6]
{Push.H} [Con:Pec.S+++, Dlt.A+] → MedPec/Axil
[Pos:L.Sh(IR:25,Flex:90,Abd:10)] [Vec:H:Mid,A:0°,Src:Cable]
```

### 4.4 Three-Domain Portability

The same MNN string is simultaneously valid as:
- A **gym log entry** a human can read and understand
- A **clinical record** capturing neuromuscular activation with joint angles
- An **avatar pose command** a game engine can parse to position a character
- A **machine instruction** a cable rig can actuate to reproduce the resistance setup

The notation does not change between these contexts. The parser and actuator do.

### 4.5 Transition Notation

Static `@JNT(...)` tags describe a body at a single instant. Transition notation extends MNN to describe **movement between states** — encoding duration, easing curve, sequence chaining, and cycle behavior.

```
@JNT(L.El:Flex=0) ~400ms.ease-in >> @JNT(L.El:Flex=130) ~600ms.ease-out >> @JNT(L.El:Flex=0)
```

Loop and cycle tags:
```
@loop           -- repeat indefinitely
@loop:N         -- repeat N times
@cycle:Nms      -- set the period of one complete cycle
@phase:N        -- offset start point (0-1)
```

Easing curves: `ease-bio` (default, biological bell-curve), `ease-linear`, `ease-snap`, `ease-in`, `ease-out`, `ease-spring`.

### 4.6 Avatar Surface Layer

Two optional tags for surface rendering in avatar implementations:

**`@MORPH(...)`** — explicit morph target weights:
```
@MORPH(Bic.Long=0.95, Bic.Vasc=0.6, Quad.VM.Atr=0.7)
```

**`@BODY(...)`** — baseline morphology:
```
@BODY(Mass=82kg,BF=14%,Frame=L,Height=178cm)
```

Default activation-to-morph mapping:
| Activation | Morph Weight |
|---|---|
| *(absent)* | 0.0 |
| `:1` | 0.25 |
| `:2` | 0.50 |
| `:3` | 0.75 |
| `:4` | 1.00 |

### 4.7 Reference Implementation

Full MNN specification including complete muscle symbol tables (149 muscles across 4 LOD levels), nerve symbol tables, joint taxonomy (139+ DOF), formal EBNF grammar, prior art analysis:

- `MNN_SPEC_v2.md` (bodspas-site repository, current version: v2.0.0)

---

## 5. VRN — Vocal Resonance Notation

### 5.1 Purpose

VRN is the HMN sub-protocol for vocal production. It encodes the physical configuration of the vocal apparatus — not what a voice sounds like, but what the body is doing to produce it.

VRN addresses a gap in existing vocal notation systems. Western staff notation captures pitch and duration but not the physical production mechanism. IPA captures acoustic/articulatory phonetic categories but not the continuous parameters that define vocal quality. VRN provides a structured parameter space that maps to real physiology.

### 5.2 Three-Layer Model

VRN is organized around the source-filter model of vocal production:

```
SOURCE  -- what the vocal folds are doing (phonation mode, frequency, vibrato)
FILTER  -- how the vocal tract shapes the sound (larynx, tongue, jaw, lips, formants)
DRIVE   -- the breath system powering it (subglottal pressure, airflow)
```

### 5.3 Tag Vocabulary (v2.0)

#### Source Layer

| Tag | Values | Description |
|-----|--------|-------------|
| `@VF(...)` | `modal`, `breathy`, `pressed`, `falsetto`, `fry`, `cry`, `twang` | Vocal fold phonation mode |
| `@Hz(...)` | number | Fundamental frequency |
| `@Vib(...)` | `rate=N,ext=N` | Vibrato: rate in Hz, extent in cents |
| `@Reg(...)` | `chest`, `mix`, `head`, `falsetto`, `fry` | Register |
| `@Squil` | — | Squillo / singer's formant present |

#### Filter Layer

| Tag | Values | Description |
|-----|--------|-------------|
| `@Lx(...)` | `low`, `neutral`, `high` | Larynx height |
| `@SP(...)` | `raised`, `lowered`, `partial` | Soft palate |
| `@Tg(...)` | `high.front`, `mid.central`, `low.back`, etc. | Tongue body position |
| `@Jw(...)` | degrees 0-60 | Jaw opening angle |
| `@Lp(...)` | 0.0-1.0 | Lip rounding |
| `@F(...)` | `1:Hz,2:Hz,3:Hz` | Formant targets |
| `@Cov` | — | Covered / chiaroscuro tone quality |
| `@Zy` | — | Zygomatic lift |
| `@Ey` | — | Eyebrow raise |

#### Drive Layer

| Tag | Values | Description |
|-----|--------|-------------|
| `@BP(...)` | 0-100 | Breath pressure (subglottal, relative) |
| `@BF(...)` | 0-100 | Breath flow rate (relative) |
| `@App` | — | Appoggio (trained breath-body resistance) |
| `@D(...)` | `:1` to `:3` | Diaphragm engagement level |
| `@IC(...)` | `:1` to `:3` | Intercostal engagement level |
| `@dur(...)` | milliseconds | Duration of vocal gesture |

### 5.4 Complete Examples (v2.0)

**Classical soprano high C (C6):**
```
@VF(modal) @Hz(1047) @Reg(head) @Squil
@Lx(low) @SP(raised) @Tg(high.back) @Jw(50) @Lp(0.4) @Zy
@F(1:1000,2:3200,3:3400)
@BP(85) @D(:3) @App
```

**Spoken English vowel /æ/ (as in "cat"):**
```
@VF(modal) @Hz(150)
@Lx(neutral) @SP(raised) @Tg(low.front) @Jw(35) @Lp(0.0)
@F(1:800,2:1800,3:2600)
@BP(40) @D(:2)
```

**Stage whisper:**
```
@VF(breathy) @Hz(120)
@Lx(neutral) @SP(raised) @Tg(mid.front) @Jw(25) @Lp(0.1)
@BP(70) @BF(85) @D(:2)
```

### 5.5 Legacy v1.x VRN (accepted for backward compatibility)

```
[VF:modal] [Hz:1047] [Reg:head] [Squil]
[Lx:low] [SP:raised] [Tg:high.back] [Jw:50] [Lp:0.4] [Zy]
[F1:1000,F2:3200,F3:3400]
[BP:85] [D+++] [App]
```

---

## 6. VNN — Voice Neural Notation

### 6.1 Purpose

VNN is the HMN sub-protocol for the neural control layer of vocal production. Where VRN describes what the vocal apparatus is doing mechanically, VNN describes what fires to make it happen — cranial nerves, motor pathways, antagonist muscle balance, and clinical status.

### 6.2 The Six Cranial Nerves of Singing

| Nerve | Name | Primary Role |
|-------|------|-------------|
| `CN V` | Trigeminal | Jaw positioning |
| `CN VII` | Facial | Lips, cheeks, embouchure |
| `CN IX` | Glossopharyngeal | Pharynx elevation |
| `CN X` | Vagus | Master controller — all fold behavior via RLN and SLN |
| `CN XI` | Accessory | Posture support |
| `CN XII` | Hypoglossal | Sole motor nerve to tongue |

Additional: Phrenic nerve (C3-C5) for diaphragm; Intercostal nerves (T1-T11); Ansa cervicalis (C1-C3) for larynx depressors.

### 6.3 Vagus Nerve Branch Architecture

```
Vagus Nerve (CN X)
+-- Recurrent Laryngeal Nerve (RLN)
|   +-- Thyroarytenoid (TA)        -- fold body mass and tension
|   +-- Lateral Cricoarytenoid (LCA) -- fold adduction (closure)
|   +-- Posterior Cricoarytenoid (PCA) -- fold abduction (opening)
|   +-- Interarytenoid (IA)        -- posterior fold closure
|
+-- Superior Laryngeal Nerve (SLN)
    +-- Cricothyroid (CT)          -- fold stretch/thinning = pitch
```

### 6.4 Antagonist Balance Notation

```
CT:TA 65:35   -- CT-dominant, head mix
CT:TA 30:70   -- TA-dominant, chest belt
LCA:PCA 80:20 -- firm adduction, pressed phonation
D:IC 60:40    -- diaphragm-dominant appoggio
```

### 6.5 Clinical Status Codes

| Symbol | Status |
|--------|--------|
| `[Fold.L X]` | Paralysis |
| `[Par:Fold.L-]` | Paresis (partial) |
| `[Atr:Fold.R]` | Atrophy |
| `[Spas:LCA]` | Spasmodic contraction |
| `[Comp:FVF for Fold.L]` | Compensation pattern |

**Complete VNN annotation — Classical tenor high A (A4):**
```
@VF(modal) @Hz(440) @Reg(mix) @Cov @Squil @Lx(low) @SP(raised)
@F(1:550,2:1100,3:3200) @BP(75) @D(:3) @App

VNN: CT:TA 65:35, LCA:PCA 70:30, Elev:Depr 30:70, D:IC 60:40
     Phrenic C3-C5 (strong), CN X SLN (CT dominant), CN X RLN (LCA moderate)
```

---

## 7. Cross-Protocol Interoperability

### 7.1 The Shared Namespace

All three sub-protocols occupy the same string namespace. A valid HMN string may contain tags from multiple sub-protocols. When MNN and VRN tags appear in the same string, the string describes a combined physical and vocal state simultaneously.

### 7.2 Tag Disambiguation

Tags from different sub-protocols do not conflict because they use distinct tag identifiers:
- MNN: `@MOV`, `@ACT`, `@JNT`, `@VEC`, `@COMP`, `@NERV`, `>>` nerve arrow
- VRN: `@VF`, `@Hz`, `@Lx`, `@F`, `@BP`
- VNN: antagonist ratios `CT:TA N:N`, clinical codes `[Par:...]`

A parser implementing only MNN compliance ignores VRN and VNN tags (forward compatibility rule).

### 7.3 The Neural Unity of MNN and VNN

MNN's nerve output (`>> MedPec`, `>> Axil`) and VNN's cranial nerve annotations (`>> CN X`, `>> CN VII`) use the same `>>` arrow syntax and the same nerve naming convention.

```
MNN: @ACT(Bic:3) >> MusCut        (biceps, musculocutaneous nerve)
VNN: @VF(modal) @CT(:3) >> CN X SLN (cricothyroid, superior laryngeal nerve)
```

This structural parallel is deliberate. HMN is one system.

---

## 8. The Three-Domain Architecture

HMN protocols operate across three domains simultaneously. The same notation, different consumers.

### Domain 1: Exercise, Rehabilitation, and Clinical Practice

MNN handles body movement — the shoulder press, the squat, the nerve flare-up. VRN/VNN handles vocal exercises — the breathing pattern, the singer's formant, the post-surgery fold assessment.

### Domain 2: Virtual Worlds, Avatars, and Animation

The `@JNT(...)` tag drives avatar joint angles. The VRN parameter space drives facial animation and synthetic voice. The same string a physiotherapist writes to document a movement drives a digital human to perform that movement in a virtual environment.

### Domain 3: Remote Control, Robotics, and AI Systems

A cable rig reads `@VEC(Ht=Mid,Ang=0°,Src=Cable)` and sets its pulley. An exoskeleton reads `@JNT(L.Sh:Flex=90,IR=25)` and positions its actuators. An AI voice synthesis system reads a VRN record and generates audio from vocal tract simulation.

---

## 9. Consumer Site Registry

| Site | Sub-Protocols | Domains | Role |
|------|--------------|---------|------|
| **BodSpas** (BODWAVE) | MNN full | Domain 1, Domain 3 | Primary MNN consumer. Workout logging, BODWAVE equipment integration, MNN Builder tool |
| **InThisWorld** (inthisworld.com) | MNN (@JNT layer) | Domain 2 | Avatar posing. Translates `@JNT(...)` tags to Three.js joint rotations |
| **VoiceStry** | VRN, VNN | Domain 1, Domain 2 | Primary VRN/VNN consumer |
| **COSMOS the Opera** | VRN | Domain 1 | VRN origin site. Operatic performance notation |
| **AIUNITES** (aiunites-site) | All (specification host) | All | Holds specifications. HMN authority site |

---

## 10. Prior Art and Relationship to Existing Standards

### 10.1 MNN Prior Art Gap

No existing system combines neuromuscular activation, joint position, resistance vector, and compensation tracking into a single human-readable, machine-parseable text format.

| System | Closest to | Lacks |
|--------|-----------|-------|
| ISB JCS | MNN `@JNT(...)` | No muscle/nerve, no text format |
| BVH / C3D | MNN `@JNT(...)` | No semantic layer, not human-authored |
| SENIAM / EMG | MNN `@ACT(...)` | No standard symbol table, no nerve mapping |
| Labanotation | MNN `@MOV(...)` | No neuromuscular data |
| Eshkol-Wachman | MNN `@JNT(...)` | Proprietary system, not machine-parseable |
| HamNoSys / SiGML | MNN `@JNT(...)` (arms/hands) | Hands/arms only, no muscle activation |

### 10.2 The HMN Contribution

HMN's original contribution is:
1. **The architecture** — identifying that body movement, vocal production, and neural control of voice are applications of the same encoding principle
2. **The cross-domain design** — the deliberate requirement that each notation work simultaneously in clinical, educational, virtual-world, and robotic contexts
3. **The integration** — the shared grammar, shared activation scale, structural parallel between MNN nerve output and VNN cranial nerve annotations
4. **The middleware positioning** — the explicit framing of HMN as a protocol layer between domain-specific applications

---

## 11. Implementation Requirements

### 11.1 MNN Compliance

A system claiming MNN compliance MUST:
1. Accept `@TAG(...)` tags in any order
2. Treat all tags as optional
3. Preserve unknown tags without error (forward compatibility)
4. Parse muscle symbols case-sensitively
5. Accept `>>` as the v2.0 nerve arrow
6. Accept both `→` (U+2192) and `->` as legacy nerve arrows
7. Accept both v2.0 `@TAG(...)` syntax and v1.x `[TAG:...]` / `{...}` syntax

### 11.2 VRN Compliance

A system claiming VRN compliance MUST:
1. Accept the three-layer structure (Source, Filter, Drive) as optional-additive
2. Treat all parameters as optional
3. Support Hz values for pitch and formants
4. Accept the `:N` activation scale for non-numeric parameters
5. Preserve unknown tags without error

### 11.3 Full HMN Compliance

A system claiming full HMN compliance MUST implement all three sub-protocol compliance tiers and:
1. Parse tags from all three sub-protocols in a single string without conflict
2. Support cross-protocol strings without error
3. Implement forward compatibility for all three sub-protocols

### 11.4 Display Modes

All HMN implementations SHOULD support two display modes:
- **Compact:** Symbol notation (`Pec.S`, `MedPec`, `CT:TA`)
- **Full:** Expanded anatomical names (`Pectoralis Major (Sternal)`, `Medial Pectoral Nerve`, `Cricothyroid:Thyroarytenoid`)

---

## 12. Versioning and Compatibility

### 12.1 Version Scheme

HMN and all sub-protocols follow semantic versioning: MAJOR.MINOR.PATCH

- **MAJOR** — breaking changes to tag syntax or fundamental grammar
- **MINOR** — new symbols, new tags, extended parameter space (backward compatible)
- **PATCH** — documentation, clarification (no syntax changes)

### 12.2 Sub-Protocol Independence

Sub-protocol versions are independent. MNN v2.0 and VRN v1.0 may coexist in the same HMN v2.0 deployment. Version metadata:

```
@META(HMN=2.0,MNN=2.0,VRN=1.0)
```

---

## 13. Intellectual Property

### 13.1 Copyright

Human Movement Notation (HMN) and its sub-protocols MNN, VRN, and VNN are original works created by Tom and published by AIUNITES LLC.

**Protected works:**
- `HMN_SPEC_v2.md` (this document) — the architecture, design principles, cross-protocol integration, shared grammar, implementation requirements
- `MNN_SPEC_v2.md` — the full MNN formal specification with v2.0 @TAG syntax
- `spec.html` — the web-published specification pages
- Reference implementations: `builder.html` (log.html MNN builder), `mnn-avatar.html`

The MNN v2.0 notation format — specifically the `@TAG(...)` annotation syntax, `>>` nerve output arrow, numeric activation levels (`:1/:2/:3/:4`), `=` axis assignment within joint tags, and `/` compensation separator — constitutes the original creative expression of this specification and is the intellectual property of AIUNITES LLC.

AIUNITES LLC intends to register each work with the United States Copyright Office.

### 13.2 Trademark Strategy

**BODWAVE™** is the primary consumer-facing trademark for the MNN product line and the mark planned for federal trademark registration first.

**MNN™, VRN™, VNN™, HMN™** are planned acronym word mark registrations.

### 13.3 License

The notation format and specification are published for interoperability and prior art purposes. Personal use, research, and educational use of the notation are permitted without restriction. Commercial use requires a license from AIUNITES LLC.

---

## 14. Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | April 3, 2026 | Complete syntax redesign. All tags migrated from `[TAG:...]` / `{...}` / `+` style to `@TAG(...)` / `>>` / `:N` annotation style across all three sub-protocols. Updated Shared Grammar (Section 3) to define `@TAG(...)` as canonical v2.0 form with full EBNF. Updated MNN tag vocabulary table (Section 4.2). Updated all examples throughout. Added legacy v1.x grammar to Section 3.7. VRN tag vocabulary updated (Section 5.3). Added v2.0 VRN examples (Section 5.4). Defined MNN string identifier fingerprint (`@` prefix). Updated IP section to cover v2.0 syntax as protectable creative expression. |
| 1.2.0 | March 18, 2026 | Added Section 4.6 — Avatar Surface Layer: `[Morph:]` and `[Body:]` tags. |
| 1.1.0 | March 16, 2026 | Added MNN Transition and Animation Notation. |
| 1.0.0 | March 15, 2026 | Initial HMN umbrella specification. |

---

*HMN Specification v2.0.0 -- (C) 2026 AIUNITES LLC*
*Published: April 3, 2026*
*AIUNITES LLC, Tulsa, Oklahoma, USA*
*For licensing inquiries: see aiunites.github.io/aiunites-site*
