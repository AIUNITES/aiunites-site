# Human Movement Notation (HMN) — System Specification

**Version:** 1.1.0
**Date:** March 16, 2026
**Author:** Tom / AIUNITES LLC
**Copyright:** © 2026 AIUNITES LLC. All rights reserved.
**License:** This specification is published for prior art and copyright registration purposes. Use of the notation system for personal training, vocal practice, or research is permitted. Commercial implementations, software products, machine firmware integration, AI training datasets, and derivative specification documents require written permission from AIUNITES LLC.
**Contact:** AIUNITES LLC, Tulsa, Oklahoma, USA

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

The result is that a clinically complete description of a movement — "this person's left shoulder was at 25° internal rotation, 90° flexion, contracting the sternal pec via the medial pectoral nerve at high activation, with a mid-height cable providing resistance at 0°" — cannot be expressed in any single, portable, human-readable format that works across all of these contexts. Data stays inside vendor formats. It doesn't travel with the person.

HMN exists because that description should be writable as:

```
[Con:Pec.S+++] → MedPec [Pos:L.Sh(IR:25,Flex:90)] [Vec:H:Mid,A:0°,Src:Cable]
```

...and that string should work in a gym log, a clinical record, a game engine, a cable rig controller, and a research paper without conversion, without proprietary software, and without paying anyone for the privilege of reading your own data.

### 1.2 The Three Sub-Protocols

```
HMN — Human Movement Notation
│
├── MNN — Muscular Neuro Notation
│         Domain: body movement — muscles, nerves, joints, resistance
│         Use cases: gym, rehab, avatar posing, cable rigs, robotics
│         Spec: MNN_SPEC_v1.md (bodspas-site)
│         Status: v1.5.1 — production
│
├── VRN — Vocal Resonance Notation
│         Domain: vocal production — larynx, articulation, resonance, breath
│         Use cases: vocal training, singing pedagogy, speech therapy, AI synthesis
│         Spec: VRN_SPEC_v1.md (voicestry-site)
│         Status: v1.0.0 — this document
│
└── VNN — Voice Neural Notation
          Domain: neural control of vocal production — cranial nerves, pathways, balance
          Use cases: clinical assessment, vocal neurology, AI voice research, SLP
          Spec: VNN_SPEC_v1.md (voicestry-site)
          Status: v1.0.0 — this document
```

### 1.3 Why These Three Are a Family

MNN, VRN, and VNN are not independently designed systems that were later grouped together. They share a common origin in the same question: *how do you encode what a human body does in a format that any system can use?*

- **MNN** answers this for physical movement of the musculoskeletal system
- **VRN** answers this for the mechanical act of vocal production
- **VNN** answers this for the neural control layer that drives both

All three are applications of the same underlying principle. The vocal folds are muscles. The larynx is a joint complex. Breath support is a resistance vector. VRN is, at the deepest level, a specialized application of the same encoding approach as MNN — applied to the vocal apparatus specifically, with its own parameter vocabulary because vocal production requires different descriptors than a shoulder press.

VNN extends this one layer deeper: the cranial nerves that fire to execute a VRN state are the vocal equivalent of MNN's nerve tags. The antagonist balance between cricothyroid and thyroarytenoid is the vocal equivalent of MNN's agonist/synergist notation. The three sub-protocols are the same idea at three levels of the same system.

---

## 2. Design Principles

These principles apply to all three sub-protocols. They are design constraints, not suggestions. Any implementation claiming HMN compliance must respect all of them.

### 2.1 Plain Text

HMN strings are plain text. No binary formats. No proprietary readers. No special software required. A person with a text editor can read, write, and edit any HMN record. This constraint is non-negotiable.

The choice of plain text is deliberate and consequential. It means HMN data can live in a journal, a CSV, a database field, a JSON document, a source code comment, a clinical note, a chat message, or a game engine script without any conversion step. It means the notation belongs to the person who writes it — not to the software they used to write it.

### 2.2 Human-Authored

HMN is designed to be written by a person, not generated by a sensor. This distinguishes it from motion capture formats (BVH, C3D), electromyography data, and AI voice synthesis outputs — all of which are machine-generated. A trainer writes MNN. A vocal coach writes VRN. A clinician writes VNN. The notation serves the human practitioner as the primary author.

This does not prevent machines from generating HMN strings. A cable rig that logs its own operation, a biosensor that detects muscle activity, an AI that produces a vocal gesture description — all of these can produce valid HMN. But the design target is human authoring, and that shapes the notation's vocabulary, verbosity, and ergonomics.

### 2.3 Machine-Parseable

HMN strings use consistent syntax with tagged segments, defined delimiters, and structured key-value pairs. Any programming language with basic string parsing can read a valid HMN string without a dedicated library. The formal EBNF grammar in each sub-spec defines exactly what a valid string looks like.

This principle coexists with human-authorship through the same mechanism used in programming languages: a syntax simple enough to write by hand, formal enough for a machine to parse reliably.

### 2.4 Semantically Meaningful

Every element of an HMN string maps to a real anatomical or physiological referent. `Pec.S` means the sternal head of pectoralis major. `MedPec` means the medial pectoral nerve. `CT:TA 65:35` means the cricothyroid is 65% activated relative to the thyroarytenoid's 35%. The notation is not a code system — it is a structured description of physical reality.

This is the property that makes HMN more than a file format. A system that understands HMN understands anatomy. A system that can generate HMN can describe what a body is doing at a level of specificity that enables clinical decision-making, avatar posing, AI training, and robotic control — from the same string.

### 2.5 Portable Across Domains

The same HMN string must be usable in multiple contexts without modification. The MNN string for a cable fly is simultaneously:
- A gym log entry a human can read
- A machine instruction that could drive a cable rig
- A clinical record of neuromuscular activation with joint angles
- A VR/game engine command for avatar posing

VRN's description of a tenor's high note is simultaneously:
- Vocal pedagogy notation a teacher can read and teach from
- A parameter set for physically-informed voice synthesis
- Clinical documentation for a speech-language pathologist
- A training record for AI voice modeling

The notation does not change between contexts. The implementation does. This is the core design principle of HMN: *write once, use everywhere.*

### 2.6 Anatomically Grounded

HMN vocabulary is anchored in established anatomical and physiological nomenclature. Muscle names follow standard anatomical terminology. Nerve names follow clinical convention. Joint axes follow the ISB Joint Coordinate System (Wu et al., 2002/2005). Vocal parameters follow the source-filter model of speech production. Cranial nerve designations follow standard clinical numbering.

This grounding means HMN can be read by a clinician, a researcher, or a developer without a proprietary glossary. It also ensures that HMN prior art is clearly distinguishable from both informal vocabulary and competing encoding systems.

### 2.7 Compositional and Additive

Every element of an HMN string is optional. A minimum valid MNN string is a single tag. A minimum valid VRN record is a single parameter. Adding more tags adds information — it does not require rewriting what was already there. This makes HMN appropriate for contexts ranging from a quick gym log to a comprehensive clinical assessment, using the same syntax at different levels of completeness.

### 2.8 Forward Compatible

HMN parsers must preserve unknown tags and symbols without error. New symbols and tags introduced in future versions of any sub-spec must not break parsers written for earlier versions. The forward compatibility rule applies across the entire HMN family: an MNN v1.5 string is valid in a parser written for MNN v1.0.

---

## 3. Shared Grammar

All three sub-protocols use a common structural grammar. This section defines the shared structural elements. Sub-protocol grammars extend this with their own tag vocabularies.

### 3.1 Tag Structure

An HMN string is a sequence of tagged segments. Each segment has one of three forms:

**Bracket tag:**
```
[TAG_ID:content]
```

**Brace tag (movement/pattern):**
```
{PATTERN_ID}
```

**Arrow tag (pathway/nerve):**
```
→ TARGET_ID[/TARGET_ID...]
```

Segments are separated by whitespace. Order is flexible — parsers identify segments by tag, not position.

### 3.2 Key-Value Content

Content inside bracket tags uses key:value pairs separated by commas:

```
[TAG_ID:Key1:value1,Key2:value2,Key3:value3]
```

For multi-entry tags (lists of muscles, lists of joints), entries are separated by commas with an optional space:

```
[Con:Pec.S+++, Dlt.A+, Tri++]
[Pos:L.Sh(Flex:90,IR:25) R.Hip(Abd:20)]
```

### 3.3 Activation Levels

The `+` activation scale is shared across all three sub-protocols:

| Symbol | Level | Meaning |
|--------|-------|---------|
| `+` | 1 | Low activation — stabilizer, mild engagement |
| `++` | 2 | Moderate activation — synergist, secondary |
| `+++` | 3 | High activation — prime mover, dominant |
| `++++` | 4 | Maximum activation — 1RM effort, peak |
| `0` | 0 | Explicit absence of activation (clinical use only) |

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

Identifiers are case-sensitive. `Pec.S` and `pec.s` are distinct. Dot-separated identifiers indicate anatomical hierarchy: `Pec.S` (pectoralis, sternal head), `Quad.RF` (quadriceps, rectus femoris), `CT.SLN` (cricothyroid, superior laryngeal nerve branch).

### 3.6 Formal EBNF (Shared Layer)

```ebnf
HMNString     := Segment*
Segment       := BraceTag | BracketTag | ArrowTag
BraceTag      := "{" Identifier ["." Identifier] "}"
BracketTag    := "[" TagId ":" TagContent "]"
ArrowTag      := "→" Identifier ("/" Identifier)*

TagId         := Identifier
TagContent    := TagEntry ("," " "? TagEntry)*
TagEntry      := Identifier ActivLevel?
               | Identifier "(" AxisList ")"
               | KVPair
ActivLevel    := "+"+ | "0"
AxisList      := AxisEntry ("," AxisEntry)*
AxisEntry     := Identifier ":" Number
KVPair        := Identifier ":" Value

Identifier    := Letter (Letter | Digit | "." | "_")*
Value         := (Letter | Digit | "." | "-" | "°" | ":")+
Number        := "-"? Digit+ ("." Digit+)?
Letter        := [A-Za-z]
Digit         := [0-9]
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
| `{Pattern}` | `{Push.H}`, `{Squat}` | Movement pattern category |
| `[Con:...]` | `[Con:Pec.S+++, Dlt.A+]` | Muscle contractions with activation levels |
| `→ Nerve` | `→ MedPec/Axil` | Nerve innervation pathway |
| `[Pos:...]` | `[Pos:L.Sh(IR:25,Flex:90)]` | Joint positions in degrees |
| `[Vec:...]` | `[Vec:H:Mid,A:0°,Src:Cable]` | Resistance vector |
| `[Comp:...]` | `[Comp:Bic for Lat]` | Compensation pattern observed |
| `[Nerve:...]` | `[Nerve:C5-C6]` | Nerve status / symptomatic levels |
| `[Meta:...]` | `[Meta:Sets:3,Reps:12,Load:20lb]` | Training dose metadata |

### 4.3 Complete Example

```
[Nerve:C5-C6]
{Push.H} [Con:Pec.S+++, Dlt.A+] → MedPec/Axil
[Pos:L.Sh(IR:25,Flex:90,Abd:10)] [Vec:H:Mid,A:0°,Src:Cable]
[Meta:Sets:3,Reps:12,Load:20lb,RPE:7]
```

**Reading:** On a day when C5-C6 was symptomatic, performed a horizontal push. Sternal pec was primary mover at high activation, anterior delt was secondary. Medial pectoral and axillary nerves were active. Left shoulder at 25° internal rotation, 90° flexion, 10° abduction. Cable at mid height, straight ahead, from a cable stack. 3 sets of 12 at 20 lbs, RPE 7.

### 4.4 Three-Domain Portability

The same MNN string is simultaneously valid as:
- A **gym log entry** a human can read and understand
- A **clinical record** capturing neuromuscular activation with joint angles
- An **avatar pose command** a game engine can parse to position a character
- A **machine instruction** a cable rig can actuate to reproduce the resistance setup

The notation does not change between these contexts. The parser and actuator do.

### 4.5 Transition Notation (MNN v1.6)

Static `[Pos:]` tags describe a body at a single instant. Transition notation extends MNN to describe **movement between states** — encoding duration, easing curve, sequence chaining, and cycle behavior. This is the layer that maps to the cerebellum’s role in motor control: timing, coordination, and smooth interpolation between intended positions.

Without transition notation, an MNN consumer (avatar engine, cable rig, rehabilitation robot) must either snap instantly between poses or invent its own interpolation. Transition notation standardizes this so the same string produces biologically plausible motion on any compliant renderer.

#### 4.5.1 The Transition Operator

The transition operator `~Nms` appears between two pose states and specifies the duration of the interpolation:

```
[Pos:A] ~800ms [Pos:B]
```

This means: move from pose A to pose B over 800 milliseconds. The operator is directional — left side is origin state, right side is target state.

Supported time units: `ms` (milliseconds), `s` (seconds), `bpm:N` (beat-relative, e.g. `~bpm:120`).

#### 4.5.2 Easing Curves

The easing modifier follows the duration, separated by a dot:

```
[Pos:A] ~800ms.ease-bio [Pos:B]
```

Human movement does not travel at constant velocity. The cerebellum produces a characteristic bell-shaped velocity profile — acceleration at onset, peak velocity at midpoint, deceleration at arrival. This is `ease-bio`. It is the default for all biological movement.

| Curve | Symbol | Description | Use case |
|-------|--------|-------------|----------|
| Biological | `ease-bio` | Bell-shaped velocity curve | **Default for all human movement** |
| Linear | `ease-linear` | Constant velocity | Mechanical systems, cable rigs |
| Snap | `ease-snap` | Ballistic — fast onset, abrupt stop | Reflexes, ballistic throws |
| Ease-in | `ease-in` | Slow start, fast arrival | Reaching, extending |
| Ease-out | `ease-out` | Fast start, slow arrival | Catching, landing |
| Spring | `ease-spring` | Overshoot and return | Fine motor tremor, springy joints |

If no easing is specified, `ease-bio` is assumed by all v1.6-compliant parsers.

#### 4.5.3 Sequence Chaining

Multiple transitions are chained with `→` between pose-transition pairs:

```
{Curl}
[Pos:L.El(Flex:0)] ~400ms.ease-in
→ [Pos:L.El(Flex:130)] ~600ms.ease-out
→ [Pos:L.El(Flex:0)]
```

Each `→` continues the timeline from where the previous transition ended. One full bicep curl rep.

#### 4.5.4 Simultaneous Joint Transitions

All joints within one `[Pos:]` tag transition simultaneously over the same duration:

```
{Squat}
[Pos:L.Hip(Flex:0) R.Hip(Flex:0) L.Kn(Flex:0) R.Kn(Flex:0)] ~800ms.ease-bio
→ [Pos:L.Hip(Flex:90) R.Hip(Flex:90) L.Kn(Flex:100) R.Kn(Flex:100)]
→ [Pos:L.Hip(Flex:0) R.Hip(Flex:0) L.Kn(Flex:0) R.Kn(Flex:0)] ~900ms.ease-bio
```

#### 4.5.5 Muscle Activation Over Transitions

`[Con:]` tags in a transition sequence describe peak activation at the midpoint — the moment of maximum muscular effort. Activation ramps up from origin and ramps down to target:

```
{Curl}
[Pos:L.El(Flex:0)] ~400ms.ease-in [Con:Bic+++, Dlt.A+]
→ [Pos:L.El(Flex:130)] ~600ms.ease-out [Con:Bic+]
→ [Pos:L.El(Flex:0)]
```

#### 4.5.6 Loop and Cycle Tags

Repetitive movements use loop and cycle tags:

```
@loop           — repeat indefinitely
@loop:N         — repeat N times
@cycle:Nms      — set the period of one complete cycle
@phase:N        — offset start point (0–1, for out-of-phase bilateral movement)
```

Walk cycle example:
```
{Walk} @loop @cycle:800ms
[Pos:L.Hip(Flex:30) R.Hip(Flex:-10)] ~400ms.ease-bio
→ [Pos:L.Hip(Flex:-10) R.Hip(Flex:30)] ~400ms.ease-bio @phase:0.5
```

Idle breathing example:
```
{Breathe} @loop @cycle:4000ms
[Pos:Sp.T(Flex:2)] ~1800ms.ease-in
→ [Pos:Sp.T(Flex:0)] ~2200ms.ease-out
```

#### 4.5.7 Neuroscience Basis

The three-layer structure of transition notation maps to the brain’s motor control hierarchy:

| Neural layer | Role | MNN equivalent |
|---|---|---|
| Motor cortex | Intent — target joint angle | `[Pos:]` tag pair |
| Cerebellum | Timing + easing — smooth interpolation | `~Nms.ease-bio` |
| Alpha motor neurons | Peak muscle activation at midpoint | `[Con:]` on transition |
| Proprioceptive loop | Cycle period, phase offset | `@cycle`, `@phase` |

The `ease-bio` curve encodes the cerebellar minimum-jerk trajectory that distinguishes biological movement from mechanical actuation. Parsers rendering without `ease-bio` produce mechanically accurate but biologically implausible motion.

#### 4.5.8 Compatibility

Transition tags are additive. A static `[Pos:]` string without transition operators remains valid MNN. v1.5 parsers must preserve transition operators as unknown tokens (forward compatibility rule). v1.6 compliance requires implementing all operators in this section. Declare with `[Meta:MNN:1.6]`.

### 4.6 Reference Implementation

Full MNN specification including complete muscle symbol tables (149 muscles across 4 LOD levels), nerve symbol tables, joint taxonomy (139+ DOF), formal EBNF grammar, prior art analysis, and version history:

→ `MNN_SPEC_v1.md` (bodspas-site repository, current version: v1.5.1)
→ `mnn-avatar.html` (inthisworld-site) — reference implementation of transition rendering with lerp engine

---

## 4.5 MNN Transition & Animation Notation

### 4.5.1 Overview

Static MNN strings describe a snapshot — a single pose at a single moment. Real movement is a sequence of poses changing over time. MNN v1.1 adds transition syntax that allows authors to describe movement as a timed sequence of pose states with interpolation instructions.

The design follows the same plain-text, human-authorable principle as the rest of MNN: a physical therapist, animator, or trainer should be able to write an animation sequence without software.

### 4.5.2 The Transition Operator

Transitions between two MNN pose states are expressed with the `~` operator followed by a duration in milliseconds:

```
[Pos:L.Sh(Abd:0)] ~500ms [Pos:L.Sh(Abd:90)]
```

This means: "transition from shoulder at 0° abduction to 90° abduction over 500 milliseconds."

The transition operator applies to all tags in the preceding pose state that differ from the following pose state. Tags that do not change are held constant.

### 4.5.3 Easing Curves

An optional easing qualifier follows the duration:

```
~500ms:ease-bio
```

| Easing Tag | Description | Neuroscience Basis |
|---|---|---|
| `ease-bio` | Biological default — slow start, fast middle, slow end | Motor cortex ramp-up + cerebellar correction at end of range |
| `ease-linear` | Constant velocity throughout | Mechanical/robotic baseline |
| `ease-snap` | Fast start, fast end, minimal time at extremes | Ballistic motor program (basal ganglia chunked movement) |
| `ease-in` | Slow start, fast end | Recruitment buildup |
| `ease-out` | Fast start, slow end | Deceleration/braking by antagonist muscles |
| `ease-spring` | Overshoot and return | Stretch-shortening cycle with elastic rebound |

Default when no easing specified: `ease-bio`.

### 4.5.4 Sequence Chaining

Multiple transitions chain with `→`:

```
[Pos:L.El(Flex:0)] ~400ms:ease-in → [Pos:L.El(Flex:135)] ~600ms:ease-out → [Pos:L.El(Flex:0)]
```

This is a complete bicep curl: extend over 400ms accelerating → flex over 600ms decelerating.

Multiple joints transition simultaneously when grouped in the same pose state:

```
[Pos:L.Hip(Flex:90) L.Kn(Flex:100)] ~800ms:ease-bio → [Pos:L.Hip(Flex:0) L.Kn(Flex:0)]
```

### 4.5.5 Muscle Activation Over Transitions

`[Con:]` tags apply to the movement between two states, not to static endpoints. A muscle tag placed between two pose states describes which muscles are active during that transition:

```
[Pos:L.El(Flex:0)] [Con:Bic+++] ~400ms:ease-in → [Pos:L.El(Flex:135)]
```

### 4.5.6 Loop and Cycle Tags

Sequences may be marked for repetition using loop tags placed after the full sequence:

| Tag | Meaning |
|---|---|
| `[Loop:inf]` | Repeat indefinitely |
| `[Loop:N]` | Repeat N times |
| `[Cycle:bilateral]` | Mirror sequence for opposite limb on repeat |
| `[Phase:Nms]` | Offset start time for bilateral or multi-avatar synchronization |

Example — walk cycle:

```
{Walk.H}
[Pos:L.Hip(Flex:35) R.Hip(Flex:0) L.Kn(Flex:10) R.Kn(Flex:45)] [Con:Quad.RF++ Gas+++]
~500ms:ease-bio →
[Pos:L.Hip(Flex:0) R.Hip(Flex:35) L.Kn(Flex:45) R.Kn(Flex:10)] [Con:Quad.RF++ Gas+++]
~500ms:ease-bio →
[Loop:inf] [Cycle:bilateral]
```

### 4.5.7 Named Sequences — the `[Seq:]` Tag

A named, reusable sequence is declared with a `[Seq:]` tag:

```
[Seq:curl_L_single]
{Pull.V} [Pos:L.El(Flex:0)] [Con:Bic+++] ~400ms:ease-in → [Pos:L.El(Flex:135)] ~600ms:ease-out → [Pos:L.El(Flex:0)]
[/Seq]
```

A declared sequence may be referenced by name elsewhere:

```
[Play:curl_L_single] [Loop:12]
```

### 4.5.8 Timing Reference Table

Typical human movement durations for implementation reference:

| Movement | Typical Duration |
|---|---|
| Blink | 100–400ms |
| Fast reach | 200–400ms |
| Bicep curl (concentric) | 400–800ms |
| Squat descent | 1500–2500ms |
| Step (single) | 400–600ms |
| Full breath cycle | 4000–6000ms |
| Facial expression onset | 200–500ms |

### 4.5.9 Neuroscience Basis

The easing curve design maps directly to the motor control hierarchy:

- `ease-bio` mirrors the velocity profile produced by the motor cortex + cerebellum for voluntary skilled movement (bell-shaped velocity curve)
- `ease-snap` represents basal ganglia-mediated ballistic movement where a chunked motor program fires without mid-course correction
- `ease-spring` models stretch-shortening cycles (SSC) where elastic energy stored in muscle-tendon units produces an overshoot-rebound pattern
- `ease-out` models antagonist braking — the final deceleration phase where the antagonist muscle fires to arrest the limb

Implementations that render physically plausible movement should use `ease-bio` as the default for all voluntary joint transitions.

---

## 5. VRN — Vocal Resonance Notation

### 5.1 Purpose

VRN is the HMN sub-protocol for vocal production. It encodes the physical configuration of the vocal apparatus — not what a voice sounds like, but what the body is doing to produce it. This is the critical distinction: VRN describes the **mechanical state** of vocal production, not the acoustic output.

VRN addresses a gap in existing vocal notation systems. Western staff notation captures pitch and duration but not the physical production mechanism. IPA captures acoustic/articulatory phonetic categories but not the continuous parameters (larynx height, breath pressure, formant targets) that define vocal quality. Vocal pedagogy uses metaphor ("place the sound forward") with no parametric grounding. VRN provides a structured parameter space that maps to real physiology.

### 5.2 Three-Layer Model

VRN is organized around the source-filter model of vocal production:

```
SOURCE  — what the vocal folds are doing (phonation mode, frequency, vibrato)
FILTER  — how the vocal tract shapes the sound (larynx, tongue, jaw, lips, palate, formants)
DRIVE   — the breath system powering it (subglottal pressure, airflow management)
```

This maps to the theoretical framework used in acoustic phonetics and speech synthesis research (Fant, 1960; Liljencrants & Lindblom, 1972; Klatt, 1980). VRN gives this framework a practical notation system.

### 5.3 Tag Vocabulary

#### Source Layer

| Tag | Values | Description |
|-----|--------|-------------|
| `[VF:...]` | `modal`, `breathy`, `pressed`, `falsetto`, `fry`, `cry`, `twang` | Vocal fold phonation mode |
| `[Hz:...]` | number | Fundamental frequency in Hz |
| `[Vib:...]` | `rate:N,ext:N` | Vibrato: rate in Hz, extent in cents |
| `[Reg:...]` | `chest`, `mix`, `head`, `falsetto`, `fry` | Register |
| `[Squil]` | — | Squillo / singer's formant present |

#### Filter Layer

| Tag | Values | Description |
|-----|--------|-------------|
| `[Lx:...]` | `low`, `neutral`, `high` | Larynx height |
| `[SP:...]` | `raised`, `lowered`, `partial` | Soft palate (velopharyngeal port) |
| `[Tg:...]` | `high.front`, `mid.central`, `low.back`, `alveolar`, `velar`, etc. | Tongue body position |
| `[Jw:...]` | degrees 0–60 | Jaw opening angle |
| `[Lp:...]` | 0.0–1.0 | Lip rounding (0 = spread, 1 = fully rounded) |
| `[F1:...]` | Hz | First formant target |
| `[F2:...]` | Hz | Second formant target |
| `[F3:...]` | Hz | Third formant target |
| `[Cov]` | — | Covered / chiaroscuro tone quality present |
| `[Zy]` | — | Zygomatic lift / smiling embouchure |
| `[Ey]` | — | Eyebrow raise (engagement, high notes) |

#### Drive Layer

| Tag | Values | Description |
|-----|--------|-------------|
| `[BP:...]` | 0–100 | Breath pressure (subglottal, relative scale) |
| `[BF:...]` | 0–100 | Breath flow rate (relative scale) |
| `[App]` | — | Appoggio (trained breath-body resistance active) |
| `[D:...]` | `+` to `+++` | Diaphragm engagement level |
| `[IC:...]` | `+` to `+++` | Intercostal engagement level |
| `[dur:...]` | milliseconds | Duration of vocal gesture |

### 5.4 Activation Levels in VRN

The standard HMN `+` scale applies to articulatory and breath elements:
- `[D+++]` — maximum diaphragmatic engagement
- `[Tg+]` — slight tongue body shift
- `[SP++]` — moderate soft palate elevation
- `[Zy+++]` — full zygomatic lift

For formants, actual Hz values are used rather than activation levels: `[F1:500,F2:1800,F3:2600]`

### 5.5 Complete Examples

**Classical soprano high C (C6):**
```
[VF:modal] [Hz:1047] [Reg:head] [Squil]
[Lx:low] [SP:raised] [Tg:high.back] [Jw:50] [Lp:0.4] [Zy]
[F1:1000,F2:3200,F3:3400]
[BP:85] [D+++] [App]
```

**Spoken English vowel /æ/ (as in "cat"):**
```
[VF:modal] [Hz:150]
[Lx:neutral] [SP:raised] [Tg:low.front] [Jw:35] [Lp:0.0]
[F1:800,F2:1800,F3:2600]
[BP:40] [D++]
```

**Stage whisper:**
```
[VF:breathy] [Hz:120]
[Lx:neutral] [SP:raised] [Tg:mid.front] [Jw:25] [Lp:0.1]
[BP:70] [BF:85] [D++]
```

**VRN with annotation (vocal coach instruction format):**
```
Target: Classical tenor high A (A4, 440Hz)
[VF:modal] [Hz:440] [Reg:mix] [Cov] [Squil]
[Lx:low] [SP:raised] [Tg:mid.back] [Jw:40] [Lp:0.5]
[F1:550,F2:1100,F3:3200]
[BP:75] [D+++] [App]
```

### 5.6 VRN and AI Voice Synthesis

Current AI voice synthesis systems model voice as an acoustic waveform transformation. They have no model of physical vocal production — no concept of larynx height, fold phonation mode, or tongue position. This means they can produce convincing speech but cannot answer: "What is the larynx doing during this vowel?"

VRN provides the missing parameter space for physically-informed synthesis — a model that generates speech from vocal tract configuration rather than from acoustic pattern-matching alone. This is an open research direction with applications in voice training, speech therapy, accent coaching, operatic singing synthesis, and accessible voice technology.

A complete voice synthesis pipeline using VRN would operate:
```
Intent → VRN record → VNN neural command → physical simulation → acoustic output
```

Rather than:
```
Text → acoustic model → waveform output
```

The VRN layer is the bridge between human vocal intent and machine generation. It makes vocal production describable, teachable, transferable, and reproducible across systems.

### 5.7 Origin

VRN was created to notate specific vocal techniques for operatic performance in COSMOS the Opera — a musical work by Tom / AIUNITES LLC. The notation needed to capture what a singer's body does to produce specific sounds, not just the notes on a staff. COSMOS remains the creative testbed for VRN features before they generalize to VoiceStry and the broader HMN system.

---

## 6. VNN — Voice Neural Notation

### 6.1 Purpose

VNN is the HMN sub-protocol for the neural control layer of vocal production. Where VRN describes what the vocal apparatus is doing mechanically, VNN describes what fires to make it happen — cranial nerves, motor pathways, antagonist muscle balance, and clinical status.

VNN is designed for three audiences:
- **Level 1 — Singers and vocal athletes:** Core VRN-to-nerve mapping. Understanding which nerves drive which vocal behaviors supports more precise technique development.
- **Level 2 — Teachers and coaches:** Articulatory position codes, antagonist balance notation, intensity ratios. Enables instruction that goes below the mechanical layer to the neural command level.
- **Level 3 — Clinicians, ENTs, SLPs, AI researchers:** Clinical status codes, pathological markers, compensation patterns, recovery tracking. The vocal equivalent of a clinical MNN record.

### 6.2 The Six Cranial Nerves of Singing

Six cranial nerves form the primary neural wiring of the vocal instrument. Every VRN symbol traces back to one or more of these:

| Nerve | Name | Primary Role |
|-------|------|-------------|
| `CN V` | Trigeminal | Jaw positioning — temporalis, masseter, pterygoids |
| `CN VII` | Facial | Lips, cheeks, embouchure — orbicularis oris, zygomaticus |
| `CN IX` | Glossopharyngeal | Pharynx elevation — stylopharyngeus |
| `CN X` | Vagus | Master controller — all fold behavior via RLN and SLN branches |
| `CN XI` | Accessory | Posture support — sternocleidomastoid, trapezius, laryngeal stability |
| `CN XII` | Hypoglossal | Sole motor nerve to tongue — all intrinsic and extrinsic tongue muscles |

Additional motor sources:
- **Phrenic nerve (C3–C5)** — diaphragm (primary breathing muscle)
- **Intercostal nerves (T1–T11)** — external and internal intercostals
- **Ansa cervicalis (C1–C3)** — infrahyoid muscles (larynx depressors)

### 6.3 Vagus Nerve Branch Architecture

The vagus nerve (CN X) controls vocal fold function through two branches that divide the work of phonation:

```
Vagus Nerve (CN X)
├── Recurrent Laryngeal Nerve (RLN) → 4 muscles
│   ├── Thyroarytenoid (TA)       → fold body mass and tension    [VRN: Th]
│   ├── Lateral Cricoarytenoid (LCA) → fold adduction (closure)  [VRN: Prs, Fl]
│   ├── Posterior Cricoarytenoid (PCA) → fold abduction (opening) [VRN: Br]
│   └── Interarytenoid (IA)       → posterior fold closure        [VRN: Gl]
│
└── Superior Laryngeal Nerve (SLN) → 1 muscle
    └── Cricothyroid (CT)         → fold stretch/thinning = pitch  [VRN: Tn, Hz]
```

Every register transition involves a shift in RLN vs SLN dominance. CT-dominant = head register (thin, stretched folds). TA-dominant = chest register (thick, shortened folds). The balance between them is the primary mechanism of register control.

### 6.4 VRN → VNN Mapping

Every VRN symbol maps to a neural command chain. The core mapping:

```
VRN [C]   Chest resonance    → CN X (RLN)      → Thyroarytenoid (TA)
VRN [H]   Head resonance     → CN X (SLN)      → Cricothyroid (CT)
VRN [N]   Nasal resonance    → CN X (pharyn.)  → Levator veli palatini
VRN [O]   Oral resonance     → CN XII + VII    → Tongue body + lips
VRN [P]   Pharyngeal space   → CN IX + X       → Stylopharyngeus
VRN [Th]  Thick fold         → CN X (RLN/TA)   → Thyroarytenoid
VRN [Tn]  Thin fold          → CN X (SLN/CT)   → Cricothyroid
VRN [Fl]  Flow phonation     → CN X (RLN)      → Balanced IA + LCA
VRN [Prs] Pressed phonation  → CN X (RLN/LCA)  → LCA hyperadduction
VRN [Br]  Breathy phonation  → CN X (RLN/PCA)  → PCA partial abduction
VRN [D]   Diaphragm          → Phrenic C3–C5   → Diaphragm
VRN [App] Appoggio           → Phrenic + IC    → Diaphragm / intercostal antagonism
VRN [Tg]  Tongue             → CN XII          → Genioglossus, styloglossus
VRN [SP]  Soft palate        → CN X (pharyn.)  → Levator veli palatini
VRN [Jw]  Jaw                → CN V (motor)    → Temporalis, masseter
VRN [Lp]  Lips               → CN VII          → Orbicularis oris
VRN [Zy]  Zygomatic lift     → CN VII          → Zygomaticus major
```

### 6.5 Antagonist Balance Notation

Vocal production depends on muscle pairs that oppose each other. The balance point between them determines the register, tone quality, and resonance. VNN uses a ratio notation to express these balances:

```
CT:TA ratio — fold length vs mass (pitch and register)
  CT:TA 70:30  → CT-dominant — head mix
  CT:TA 30:70  → TA-dominant — chest belt
  CT:TA 50:50  → balanced — speech-quality phonation

LCA:PCA ratio — fold adduction vs abduction (closure/openness)
  LCA:PCA 80:20 → firm adduction — pressed phonation
  LCA:PCA 40:60 → loose adduction — breathy phonation
  LCA:PCA 65:35 → modal phonation — standard speaking voice

Elev:Depr ratio — larynx height (register color)
  Elev:Depr 70:30 → elevated larynx — belt, twang
  Elev:Depr 30:70 → lowered larynx — covered, operatic
  Elev:Depr 50:50 → neutral larynx — conversational

D:IC ratio — breath antagonism (appoggio)
  D:IC 60:40   → diaphragm-dominant — strong appoggio
  D:IC 40:60   → intercostal-dominant — shallow breath
  D:IC 50:50   → balanced appoggio
```

**Complete VNN annotation — Classical tenor high A (A4):**
```
VRN: [VF:modal] [Hz:440] [Reg:mix] [Cov] [Squil] [Lx:low] [SP:raised]
     [F1:550,F2:1100,F3:3200] [BP:75] [D+++] [App]

VNN: CT:TA 65:35, LCA:PCA 70:30, Elev:Depr 30:70, D:IC 60:40
     Phrenic C3-C5 (strong), CN X SLN (CT dominant), CN X RLN (LCA moderate)
     CN X pharyngeal (SP elevated), CN XII (tongue retracted/mid)
```

### 6.6 Clinical Status Codes

For Level 3 clinical documentation:

| Symbol | Status | Example |
|--------|--------|---------|
| `❌` | Paralysis / no activation | `[Fold.L❌] → RLN` — left fold paralysis |
| `Par:` | Paresis (partial weakness) | `[Par:Fold.L–]` — reduced adduction |
| `Atr:` | Atrophy present | `[Atr:Fold.R]` — fold bowing |
| `Spas:` | Spasmodic contraction | `[Spas:LCA]` — adductor spasmodic dysphonia |
| `Trem:` | Tremor | `[Trem:CT]` — cricothyroid tremor |
| `Comp:` | Compensation pattern | `[Comp:FVF for Fold.L❌]` — false folds compensating |
| `Rec↑` | Recovery / reinnervation | `[Rec↑:Fold.L+]` — improving |
| `Les:` | Lesion present | `[Les:Fold.R.ant⅓]` — nodule location |
| `Gap:` | Glottal gap | `[Gap:Post, Br++]` — incomplete closure |

**Clinical documentation example — post-thyroidectomy day 14:**
```
[Par:Fold.L–, Gap:Post, Br++, Comp:Trp.U++] → RLN (left)
[Rec↑:Fold.L, LCA:PCA 45:55]
CT:TA 40:60, D:IC 50:50
```

---

## 7. Cross-Protocol Interoperability

### 7.1 The Shared Namespace

All three sub-protocols occupy the same string namespace. A valid HMN string may contain tags from multiple sub-protocols. When MNN and VRN tags appear in the same string, the string describes a combined physical and vocal state simultaneously.

This is intentional. A performer singing while executing a physical movement — a martial artist shouting, an opera singer supported by BODWAVE breath technique, a physical therapist describing a patient's compensatory breathing pattern — produces a state that requires both sub-protocols to describe completely.

### 7.2 Tag Disambiguation

Tags from different sub-protocols do not conflict because they use distinct tag identifiers:
- MNN: `[Con:...]`, `[Pos:...]`, `[Vec:...]`, `{Pattern}`, `→ Nerve`
- VRN: `[VF:...]`, `[Hz:...]`, `[Lx:...]`, `[F1:...]`, `[BP:...]`
- VNN: antagonist ratios `CT:TA N:N`, clinical codes `[Par:...]`

A parser implementing only MNN compliance ignores VRN and VNN tags (forward compatibility rule). A parser implementing full HMN compliance handles all three.

### 7.3 The Neural Unity of MNN and VNN

MNN's nerve tags (`→ MedPec`, `→ Axil`, `→ Sci.T`) and VNN's cranial nerve annotations (`→ CN X`, `→ CN VII`) use the same arrow tag syntax and the same nerve naming convention. A clinician familiar with MNN's nerve tags will find VNN's structure immediately readable. The vocal apparatus is a specialized region of the musculoskeletal system, and VNN's nerve notation treats it as such.

The cricothyroid is a muscle. The vagus nerve is a peripheral nerve. A VNN annotation of the cricothyroid is structurally identical to an MNN annotation of the biceps:

```
MNN: [Con:Bic+++] → MusCut        (biceps, musculocutaneous nerve)
VNN: [VF:modal, CT+++] → CN X SLN (cricothyroid, superior laryngeal nerve)
```

This structural parallel is deliberate. HMN is one system.

---

## 8. The Three-Domain Architecture

HMN protocols operate across three domains simultaneously. This is the central architectural claim of HMN — the same notation, different consumers.

### Domain 1: Exercise, Rehabilitation, and Clinical Practice

In this domain, HMN strings are written by trainers, physical therapists, and clinicians. They document what a patient or athlete did, what muscles were active, what compensation occurred, and what the clinical context was. The notation lives in training logs, clinical records, rehabilitation plans, and research databases.

**MNN** handles body movement — the shoulder press, the squat, the nerve flare-up. **VRN/VNN** handles vocal exercises — the breathing pattern, the singer's formant, the post-surgery fold assessment.

### Domain 2: Virtual Worlds, Avatars, and Animation

In this domain, HMN strings are consumed by game engines, virtual world platforms, and animation systems. The `[Pos:]` tag drives avatar joint angles. The `[VRN:]` parameter space drives facial animation and synthetic voice. The same string a physiotherapist writes to document a movement drives a digital human to perform that movement in a virtual environment.

The bridge is exact: joint angles in degrees map to Euler rotations in a 3D engine. Formant targets in Hz map to voice synthesis parameters. The notation does not need to be translated — it needs only to be parsed.

### Domain 3: Remote Control, Robotics, and AI Systems

In this domain, HMN strings drive hardware and AI systems. A cable rig reads `[Vec:H:Mid,A:0°,Src:Cable]` and sets its pulley. An exoskeleton reads `[Pos:L.Sh(Flex:90,IR:25)]` and positions its actuators. An AI voice synthesis system reads a VRN record and generates audio from vocal tract simulation. An AI training pipeline reads thousands of annotated MNN/VRN strings and learns to predict movement patterns.

This domain makes HMN's machine-parseability requirement non-negotiable. When a string drives a motor, the parser cannot be ambiguous.

---

## 9. Consumer Site Registry

The following AIUNITES sites are the current registered HMN consumers. Each site implements one or more sub-protocols and one or more domains.

| Site | Sub-Protocols | Domains | Role |
|------|--------------|---------|------|
| **BodSpas** (BODWAVE) | MNN full | Domain 1, Domain 3 | Primary MNN consumer. Workout logging, BODWAVE equipment integration, MNN Builder tool |
| **InThisWorld** (inthisworld.com) | MNN (Pos layer) | Domain 2 | Avatar posing. Translates `[Pos:]` tags to Three.js joint rotations. LSL bridge for Second Life/OpenSim |
| **VoiceStry** | VRN, VNN | Domain 1, Domain 2 | Primary VRN/VNN consumer. Vocal training platform, sight-reading, VNN reference |
| **COSMOS the Opera** | VRN | Domain 1 | VRN origin site. Operatic performance notation. VRN creative testbed |
| **Gameatica** | MNN (reference) | Domain 1 | Educational reference. Anatomy games use MNN muscle/nerve naming |
| **AIUNITES** (aiunites-site) | All (specification host) | All | Holds specifications. movement.html, spec.html, builder.html. HMN authority site |

---

## 10. Prior Art and Relationship to Existing Standards

### 10.1 What HMN Is Not

HMN is not a replacement for existing standards in their native domains. It is an integration layer. C3D remains the right format for full-body motion capture time-series. EMG remains the right tool for continuous muscle activity measurement. IPA remains the right framework for phonetic classification. BVH remains compatible with game engine animation pipelines.

HMN is the format you write *instead of prose* when you want to describe what a body did in a way that travels across all of these domains. It sits above the sensor layer and below the application layer.

### 10.2 MNN Prior Art Gap

No existing system combines neuromuscular activation (which muscles, which nerves, from which spinal roots), joint position (ISB-compatible degrees per axis), resistance vector (source, height, angle), and compensation tracking into a single human-readable, machine-parseable text format.

| System | Closest to | Lacks |
|--------|-----------|-------|
| ISB JCS | MNN `[Pos:]` | No muscle/nerve, no text format |
| BVH / C3D | MNN `[Pos:]` | No semantic layer, not human-authored |
| SENIAM / EMG | MNN `[Con:]` | No standard symbol table, no nerve mapping |
| Labanotation | MNN `{Pattern}` | No neuromuscular data |
| Eshkol-Wachman | MNN `[Pos:]` | Proprietary system, not machine-parseable |
| HamNoSys / SiGML | MNN `[Pos:]` (arms/hands) | Hands/arms only, no muscle activation |

### 10.3 VRN Prior Art Gap

No existing system provides a parametric, machine-parseable notation for the physical state of vocal production that is simultaneously usable for vocal pedagogy, clinical assessment, and AI synthesis.

| System | Closest to | Lacks |
|--------|-----------|-------|
| IPA | VRN `[Tg:]`, `[Lp:]` | No continuous parameters, no breath/fold data |
| Laban Efforts | VRN `[BP:]`, `[BF:]` | Not vocal-specific, no anatomy |
| Source-filter model | VRN architecture | Academic framework only, no notation |
| ElevenLabs / TTS style params | VRN acoustic outputs | No physical production model |

### 10.4 VNN Prior Art Gap

No existing system formalizes a notation for the neural control pathways of vocal production that maps to clinical assessment, vocal pedagogy, and AI training simultaneously.

| System | Closest to | Lacks |
|--------|-----------|-------|
| Clinical neurology charts | VNN Level 3 | Not machine-parseable, not vocal-pedagogy readable |
| Vocal neurology research | VNN architecture | Descriptive literature, not a notation system |
| MNN nerve tags | VNN syntax | Body-only, not vocal-specific |

### 10.5 The HMN Contribution

HMN's original contribution is not any individual symbol table or parameter vocabulary. Those draw heavily on established anatomical nomenclature and existing research frameworks. HMN's contribution is:

1. **The architecture** — identifying that body movement, vocal production, and neural control of voice are applications of the same encoding principle, and designing a unified system that treats them as sub-protocols of one family
2. **The cross-domain design** — the deliberate requirement that each notation work simultaneously in clinical, educational, virtual-world, and robotic contexts
3. **The integration** — the shared grammar, the shared activation scale, the structural parallel between MNN nerve tags and VNN cranial nerve annotations, the composability of all three in a single string
4. **The middleware positioning** — the explicit framing of HMN as a protocol layer between domain-specific applications that don't normally communicate

---

## 11. Implementation Requirements

### 11.1 MNN Compliance

A system claiming MNN compliance MUST:
1. Accept tags in any order within a string
2. Treat all tags as optional
3. Preserve unknown tags without error (forward compatibility)
4. Parse muscle symbols case-sensitively
5. Accept both `→` (U+2192) and `->` as the nerve arrow
6. Validate joint angles against physiological range limits before actuating
7. Require explicit side specification for paired joints
8. Support both compact (symbol) and full anatomy (expanded name) display modes

### 11.2 VRN Compliance

A system claiming VRN compliance MUST:
1. Accept the three-layer structure (Source, Filter, Drive) as optional-additive
2. Treat all parameters as optional
3. Support Hz values for pitch and formants
4. Accept the activation `+` scale for non-numeric parameters
5. Preserve unknown tags without error

### 11.3 VNN Compliance

A system claiming VNN compliance MUST:
1. Implement VRN compliance as a prerequisite
2. Support the six cranial nerve designations (CN V, VII, IX, X, XI, XII)
3. Support the antagonist balance ratio notation
4. Support at minimum the Level 1 VRN → VNN mapping table
5. Not produce antagonist ratios that sum to a value other than 100

### 11.4 Full HMN Compliance

A system claiming full HMN compliance MUST implement all three sub-protocol compliance tiers above, plus:
1. Parse tags from all three sub-protocols in a single string without conflict
2. Support cross-protocol strings without error
3. Implement forward compatibility for all three sub-protocols

### 11.5 Display Modes

All HMN implementations SHOULD support two display modes per sub-protocol:
- **Compact:** Symbol notation (`Pec.S`, `MedPec`, `CT:TA`, `CN X`)
- **Full:** Expanded anatomical names (`Pectoralis Major (Sternal)`, `Medial Pectoral Nerve`, `Cricothyroid:Thyroarytenoid`, `Vagus Nerve`)

---

## 12. Versioning and Compatibility

### 12.1 Version Scheme

HMN and all sub-protocols follow semantic versioning: MAJOR.MINOR.PATCH

- **MAJOR** — breaking changes to tag syntax or fundamental grammar
- **MINOR** — new symbols, new tags, extended parameter space (backward compatible)
- **PATCH** — documentation, clarification, prior art additions (no syntax changes)

### 12.2 Cross-Version Compatibility

The forward compatibility rule applies across versions: a parser written for version N must accept strings written for version N+M without error. Unknown symbols must be preserved, not rejected.

A string's version may be declared using optional metadata:
```
[Meta:HMN:1.0,MNN:1.5,VRN:1.0]
```

If version metadata is absent, parsers should assume the most recent version they implement.

### 12.3 Sub-Protocol Independence

Sub-protocol versions are independent. MNN v1.5 and VRN v1.0 may coexist in the same HMN v1.0 deployment. Each sub-protocol's version history is tracked in its own spec document.

---

## 13. Intellectual Property

### 13.1 Copyright

Human Movement Notation (HMN) and its sub-protocols MNN, VRN, and VNN are original works created by Tom and published by AIUNITES LLC. This specification document and all companion specification documents constitute original literary works protected by copyright from the date of first publication.

**Protected works:**
- `HMN_SPEC_v1.md` (this document) — the architecture, design principles, cross-protocol integration, shared grammar, implementation requirements
- `MNN_SPEC_v1.md` — the full MNN formal specification
- `spec.html` — the web-published specification pages
- Reference implementations: `builder.html`, `mnn-avatar.html`

Copyright in these works is automatic from the date of authorship. AIUNITES LLC intends to register each work with the United States Copyright Office.

### 13.2 Trademark Strategy

**BODWAVE™** is the primary consumer-facing trademark for the MNN product line and the mark planned for federal trademark registration first. BODWAVE is an arbitrary coined mark with no descriptive meaning in the relevant class.

**MNN™, VRN™, VNN™, HMN™** are planned acronym word mark registrations. As acronyms these are arbitrary relative to their expanded forms and registrable independent of the descriptive nature of the underlying phrases.

The phrases "Human Movement Notation," "Muscular Neuro Notation," "Vocal Resonance Notation," and "Voice Neural Notation" are used as descriptive names for the systems. They are protected by prior art and copyright, not as trademarks.

### 13.3 Prior Art Record

This specification, the MNN_SPEC_v1.md document, the spec.html web publication, and the GitHub commit history of the AIUNITES repositories collectively establish a dated prior art record for:
- The HMN three-protocol family architecture
- The cross-domain design (same string → clinical + avatar + robotic)
- The neuromuscular encoding approach (muscle + nerve + joint + vector in single string)
- The physically-grounded vocal production notation (VRN)
- The neural control mapping for vocal production (VNN)
- The antagonist balance ratio notation
- The Level 1/2/3 tiered audience design for VNN
- The source-filter model implementation as a practical notation system

### 13.4 License

The notation format and specification are published for interoperability and prior art purposes. Personal use, research, and educational use of the notation are permitted without restriction. Commercial use requires a license from AIUNITES LLC.

---

## 14. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1.0 | March 16, 2026 | Added MNN Transition & Animation Notation (Section 4.5): transition operator `~Nms`, easing curves (`ease-bio`, `ease-linear`, `ease-snap`, `ease-in`, `ease-out`, `ease-spring`), sequence chaining, simultaneous joint transitions, muscle activation over transitions, loop/cycle/phase tags, `[Seq:]` named sequence declarations, `[Play:]` sequence references, timing reference table, neuroscience basis mapping to motor cortex/cerebellum/basal ganglia/SSC hierarchy. Updated reference implementation notes. |
| 1.0.0 | March 15, 2026 | Initial HMN umbrella specification. Establishes three-protocol family architecture (MNN/VRN/VNN), shared grammar, design principles, cross-protocol interoperability, three-domain architecture, consumer site registry, prior art analysis, implementation requirements, versioning policy, IP section. Incorporates VRN specification (source-filter model, full parameter space, complete examples) and VNN specification (six cranial nerves of singing, vagus nerve branch architecture, VRN-to-VNN mapping, antagonist balance notation, clinical status codes). References MNN_SPEC_v1.5.1 for full MNN symbol tables. |

---

*HMN Specification v1.1.0 — © 2026 AIUNITES LLC*
*Published: March 16, 2026*
*AIUNITES LLC, Tulsa, Oklahoma, USA*
*For licensing inquiries: see aiunites.github.io/aiunites-site*
