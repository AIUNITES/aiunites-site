# FNN — Facial Neuro Notation
## Specification v1.0.0

**Protocol family:** HMN (Human Movement Notation)
**Maintained by:** AIUNITES LLC
**Published:** 2026-04-03
**Status:** ACTIVE
**Sister protocols:** MNN v2.0 (body), VRN (voice), VNN (AI voice), VMN (vehicle)

© 2026 AIUNITES LLC. All Rights Reserved. DMCA Protected.
FNN and the FNN Symbol Set are original works of AIUNITES LLC.
Published freely for educational and professional use.

---

## 1. Overview

FNN (Facial Neuro Notation) is the AIUNITES open protocol for encoding facial muscle
activation, cranial nerve routing, and expression state as plain text. It is the facial
extension of the HMN (Human Movement Notation) family.

FNN gives every facial muscle a short symbol, maps each symbol to the cranial nerve
branch that innervates it, and uses the same @TAG() syntax as MNN v2.0 for consistency
across the entire HMN protocol family.

### 1.1 What FNN encodes

- Which facial muscle(s) are active and at what intensity (:1–:4)
- The cranial nerve branch delivering the signal
- Bilateral or unilateral involvement (L:/R:/Bi:)
- Clinical status (paralysis, spasticity, recovery, compensation)
- Expression macros (named compound activations: @EXPR())
- FACS Action Unit equivalents (for interoperability with emotion AI datasets)
- Avatar morph target mappings (for game engines and virtual worlds)

### 1.2 What FNN does NOT encode

- Vocal production (use VRN / VNN)
- Eye movement and gaze direction (reserved for ENN — Eye Neuro Notation, planned)
- Jaw/TMJ movement beyond basic open/close (use MNN for TMJ)
- Skin/wrinkle physics (rendering engine responsibility, informed by FNN activation levels)

---

## 2. Design Principles

FNN follows the same three design principles as MNN v2.0:

**2.1 @TAG() syntax** — All tags use the @TAGNAME(params) format. Parameters use
key=value pairs or positional values. Multiple tags on one line describe a single
state. This is identical to MNN, VMN, and all other HMN-family protocols.

**2.2 Composability** — FNN strings can be concatenated with MNN and VMN strings
in a single line to describe a full scene (avatar face + body + vehicle).

    // Actor performing a scene: smiling while reaching for something
    @FNN(Zyg.Mj:3, Orb.Oc:2) >> CNVII/Zyg
    @MOV(Pull.H) @ACT(Dlt.A:2, Bic:1) @JNT(R.Sh:Flex=45)

**2.3 Graceful degradation** — A parser receiving an FNN string it does not fully
understand should process the tokens it recognizes and skip the rest. An LOD 1
avatar engine that cannot render CN-level detail still renders the muscle activations.

---

## 3. Syntax Reference

### 3.1 Core tags

| Tag | Meaning | Format | Example |
|-----|---------|--------|---------|
| @FNN() | Facial activation | Symbol:level pairs | @FNN(Zyg.Mj:3, Orb.Oc:2) |
| @EXPR() | Named expression macro | Expression name | @EXPR(Smile.D) |
| @SIDE() | Laterality override | L / R / Bi | @SIDE(R) |
| @NERV() | Nerve routing | Branch code | >> CNVII/Zyg |
| @FACS() | FACS AU equivalent | AU number | @FACS(AU6+AU12) |
| @CLIN() | Clinical status flag | Status code | @CLIN(Pars:R.Zyg.Mj) |
| @MORPH() | Avatar morph weight | Symbol:weight | @MORPH(Zyg.Mj:0.85) |
| @DUR() | Duration in ms | ms value | @DUR(400ms) |
| @EASE() | Temporal curve | Curve name | @EASE(ease-bio) |

### 3.2 Activation levels

Consistent with MNN v2.0. Appended after the colon inside @FNN():

| Level | Meaning | Muscle state |
|-------|---------|--------------|
| :1 | Trace | Barely visible, resting tone shift, stabilizer |
| :2 | Moderate | Clearly visible, social expression, partial contraction |
| :3 | Strong | Full expressive contraction, performance, peak effort |
| :4 | Maximum | Maximal voluntary contraction, grimace, clinical test |
| :- | Weak/deficit | Below baseline, paresis, clinical finding |
| :0 | Absent | No activation detectable (clinical: paralysis) |

### 3.3 Laterality

Prefix any symbol inside @FNN() with L: or R: for unilateral:

    @FNN(R:Zyg.Mj:3, L:Zyg.Mj:1)   // asymmetric smile, right dominant
    @FNN(Bi:Orb.Oc:2)                  // bilateral orbicularis oculi, equal

Default (no prefix) = bilateral equal activation.

### 3.4 Nerve arrow

The >> operator (inherited from MNN v2.0) routes the activation to its nerve:

    @FNN(Zyg.Mj:3) >> CNVII/Zyg      // CN VII, zygomatic branch
    @FNN(Mass:3) >> CNV3               // CN V mandibular, masseter

---

## 4. Muscle Symbol Set

### 4.1 Upper face — Forehead and brow

| Symbol | Muscle | Nerve | FACS AU | Notes |
|--------|--------|-------|---------|-------|
| Front | Frontalis | CNVII/Temp | AU1, AU2 | Raises brow. AU1=inner, AU2=outer |
| Corr | Corrugator supercilii | CNVII/Temp | AU4 | Draws brows together and down |
| Proc | Procerus | CNVII/Temp | AU9 | Pulls brow medially downward, bunny lines |
| Dep.Sup | Depressor supercilii | CNVII/Temp | AU4 | Depresses medial brow |

**Brow region examples:**

    @FNN(Front:3, Corr:0) >> CNVII/Temp       // pure surprise, no furrowing
    @FNN(Corr:3, Proc:2, Front:-) >> CNVII    // anger brow, frontalis suppressed
    @FNN(Front.L:3, Front.R:1) >> CNVII/Temp  // unilateral brow raise (skeptical)

### 4.2 Eye region — Periorbital

| Symbol | Muscle | Nerve | FACS AU | Notes |
|--------|--------|-------|---------|-------|
| Orb.Oc | Orbicularis oculi | CNVII/Zyg | AU46 blink, AU6 squint | Orbital, palpebral, lacrimal parts |
| Orb.Oc.P | Orbicularis oculi (palpebral) | CNVII/Zyg | AU46 | Blink — involuntary and voluntary |
| Orb.Oc.O | Orbicularis oculi (orbital) | CNVII/Zyg | AU6 | Squinting, Duchenne marker |
| Lev.Pal | Levator palpebrae superioris | CNIII | -- | Opens upper eyelid (not CN VII) |
| Zyg.Mi | Zygomaticus minor | CNVII/Zyg | AU15 neg | Raises upper lip, sneer component |

**Eye region examples:**

    @FNN(Orb.Oc.O:2) >> CNVII/Zyg             // Duchenne marker — genuine smile marker
    @FNN(Orb.Oc.P:4) >> CNVII/Zyg             // forceful blink or wince
    @FNN(Lev.Pal:-) >> CNIII                   // ptosis — levator weakness, CN III issue

### 4.3 Mid-face — Nose and cheeks

| Symbol | Muscle | Nerve | FACS AU | Notes |
|--------|--------|-------|---------|-------|
| Nas | Nasalis (transverse) | CNVII/Buc | AU9 | Compresses nostril bridge |
| Nas.A | Nasalis (alar) | CNVII/Buc | AU38 | Flares nostrils |
| Dep.Nas | Depressor septi nasi | CNVII/Buc | AU9 | Pulls nasal tip down |
| Lev.Lab | Levator labii superioris | CNVII/Zyg | AU10 | Raises upper lip |
| Lev.Lab.Alq | Levator labii superioris alaeque nasi | CNVII/Zyg | AU9 | Raises lip + flares nostril, sneer |
| Zyg.Mj | Zygomaticus major | CNVII/Zyg | AU12 | Primary smile muscle |
| Zyg.Mi | Zygomaticus minor | CNVII/Zyg | AU11 | Deepens nasolabial fold |
| Lev.Ang | Levator anguli oris (caninus) | CNVII/Buc | AU13 | Pulls mouth corner up |
| Buc | Buccinator | CNVII/Buc | AU28 | Compresses cheek, sucking |

**Mid-face examples:**

    @FNN(Zyg.Mj:3, Orb.Oc.O:2) >> CNVII/Zyg  // Duchenne smile (genuine)
    @FNN(Zyg.Mj:3, Orb.Oc.O:0) >> CNVII/Zyg  // Non-Duchenne smile (social/posed)
    @FNN(Nas.A:3, Lev.Lab.Alq:2) >> CNVII     // disgust sneer + nostril flare

### 4.4 Mouth and perioral

| Symbol | Muscle | Nerve | FACS AU | Notes |
|--------|--------|-------|---------|-------|
| Orb.Or | Orbicularis oris | CNVII/Buc+Mand | AU18, AU20, AU22, AU25 | Closes/purses lips |
| Orb.Or.S | Orbicularis oris (superficial) | CNVII/Buc | AU22 | Lip puckering |
| Orb.Or.D | Orbicularis oris (deep) | CNVII/Buc | AU18 | Lip compression |
| Dep.Ang | Depressor anguli oris | CNVII/Mand | AU15 | Pulls mouth corner down, frown |
| Dep.Lab | Depressor labii inferioris | CNVII/Mand | AU16 | Lowers lower lip |
| Ment | Mentalis | CNVII/Mand | AU17 | Raises chin skin, lip pout |
| Ris | Risorius | CNVII/Buc | AU14 | Pulls corner laterally, dimple |
| Buc | Buccinator | CNVII/Buc | AU28 | (see mid-face) |

**Mouth examples:**

    @FNN(Orb.Or.S:3) >> CNVII/Buc              // kiss pucker
    @FNN(Dep.Ang:3, Dep.Lab:2, Ment:2) >> CNVII/Mand  // full frown/distress
    @FNN(Ris:2, Zyg.Mj:2) >> CNVII/Buc        // broad grin with dimples

### 4.5 Lower face — Jaw and chin

| Symbol | Muscle | Nerve | FACS AU | Notes |
|--------|--------|-------|---------|-------|
| Mass | Masseter | CNV3 | AU28 jaw | Primary chewing muscle |
| Temp | Temporalis | CNV3 | -- | Closes jaw, retracts mandible |
| Med.Pter | Medial pterygoid | CNV3 | -- | Closes jaw, moves jaw side to side |
| Lat.Pter | Lateral pterygoid | CNV3 | AU26, AU27 | Opens jaw, protrudes mandible |
| Plat | Platysma | CNVII/Cerv | AU21 | Neck/chin tension, grimace |

**Jaw examples:**

    @FNN(Mass:4, Temp:3) >> CNV3                // jaw clench, bruxism
    @FNN(Lat.Pter:3) >> CNV3                    // jaw opening, yawn component
    @FNN(Plat:3) >> CNVII/Cerv                  // neck grimace, extreme effort

### 4.6 Complete muscle count by region

| Region | Muscles | CN primary |
|--------|---------|-----------|
| Forehead/brow | 4 | CN VII temporal |
| Periorbital | 5 | CN VII zygomatic + CN III |
| Mid-face/nose | 9 | CN VII zygomatic + buccal |
| Perioral/mouth | 8 | CN VII buccal + mandibular |
| Jaw/mastication | 5 | CN V3 + CN VII cervical |
| **Total** | **31 primary** | |

*Note: Full 43-muscle count includes bilateral variants of symmetric muscles.
Clinical notation uses L:/R: prefixes for each side individually.*

---

## 5. Cranial Nerve Reference

### 5.1 CN VII — Facial Nerve (primary FNN nerve)

The facial nerve has five main branches from the parotid plexus. Each branch name
maps to a suffix after CNVII/:

| Branch code | Branch name | Primary muscles |
|-------------|-------------|----------------|
| CNVII/Temp | Temporal | Front, Corr, Proc, Dep.Sup, Orb.Oc (upper) |
| CNVII/Zyg | Zygomatic | Orb.Oc (lower), Zyg.Mj, Zyg.Mi, Lev.Lab, Lev.Ang |
| CNVII/Buc | Buccal | Buc, Nas, Nas.A, Orb.Or, Ris, Lev.Lab, Lev.Ang |
| CNVII/Mand | Marginal mandibular | Dep.Ang, Dep.Lab, Ment, Orb.Or (lower) |
| CNVII/Cerv | Cervical | Plat |

**Clinical significance:** Each branch can be independently damaged in Bell's palsy,
parotid surgery, or facial trauma. FNN branch codes map directly to clinical localization
of CN VII lesions.

### 5.2 CN V — Trigeminal Nerve (mastication)

| Branch code | Branch name | Primary muscles |
|-------------|-------------|----------------|
| CNV1 | Ophthalmic | Sensation only (no motor in FNN scope) |
| CNV2 | Maxillary | Sensation only (no motor in FNN scope) |
| CNV3 | Mandibular | Mass, Temp, Med.Pter, Lat.Pter |

### 5.3 CN III — Oculomotor (levator palpebrae)

| Branch code | Muscle | Note |
|-------------|--------|------|
| CNIII | Lev.Pal | Eyelid elevation. NOT CN VII. Key for ptosis diagnosis. |

### 5.4 CN XI — Accessory (via platysma)

Platysma is primarily CNVII/Cerv but may receive minor contributions from CN XI
in some individuals. Use CNVII/Cerv as the default.

---

## 6. Expression Macros — @EXPR()

Named compound activations for common expressions. Macros expand to their constituent
@FNN() strings. They are convenience shortcuts — not the canonical encoding.
Always use explicit @FNN() strings in clinical and research contexts.

### 6.1 Standard expression set

| Macro | Expands to | Description |
|-------|-----------|-------------|
| @EXPR(Smile.D) | @FNN(Zyg.Mj:3, Orb.Oc.O:2) | Duchenne smile (genuine) |
| @EXPR(Smile.S) | @FNN(Zyg.Mj:3, Orb.Oc.O:0) | Social smile (non-Duchenne) |
| @EXPR(Smile.Sm) | @FNN(Zyg.Mj:1, Orb.Oc.O:1) | Subtle/micro smile |
| @EXPR(Frown) | @FNN(Dep.Ang:3, Corr:2, Dep.Lab:1) | Sadness frown |
| @EXPR(Angry) | @FNN(Corr:3, Proc:2, Dep.Ang:2) | Anger brow + mouth |
| @EXPR(Surprise) | @FNN(Front:3, Orb.Oc.O:3, Lat.Pter:2) | Brow raise + eye wide + jaw |
| @EXPR(Fear) | @FNN(Front:2, Corr:2, Orb.Or.S:3, Plat:2) | Fear brow + lip retraction |
| @EXPR(Disgust) | @FNN(Nas.A:3, Lev.Lab.Alq:2, Dep.Ang:2) | Nose wrinkle + lip raise + frown |
| @EXPR(Contempt) | @FNN(R:Zyg.Mj:2, R:Ris:2) | Unilateral (usually right) smirk |
| @EXPR(Neutral) | @FNN() | Default resting state, no activation |
| @EXPR(Pain) | @FNN(Corr:3, Orb.Oc.O:3, Nas.A:2, Dep.Lab:2, Plat:2) | PSPI-based pain expression |
| @EXPR(Concentration) | @FNN(Corr:2, Proc:1, Nas:1) | Cognitive effort brow |
| @EXPR(Laugh) | @FNN(Zyg.Mj:4, Orb.Oc.O:3, Orb.Or:1, Dep.Lab:2) | Full laughter |

### 6.2 Compound/blended expressions

Macros can be combined to produce blended states:

    @EXPR(Smile.D) + @EXPR(Concentration)   // thinking while genuinely happy
    @EXPR(Surprise) + @FNN(Orb.Or.S:2)      // surprised with slight pucker

### 6.3 Intensity scaling

Macros can take an optional intensity multiplier:

    @EXPR(Smile.D:0.5)    // half-intensity Duchenne smile (subtle)
    @EXPR(Angry:1.0)      // full-intensity anger (default)

---

## 7. FACS Interoperability

FNN is designed to interoperate with the Facial Action Coding System (FACS) without
being bound by it. FACS AUs describe *observable surface deformation*, while FNN
describes *the muscle activation that causes it*. They are complementary, not competing.

### 7.1 FNN to FACS translation table

| FNN muscle | FACS AUs | Notes |
|-----------|----------|-------|
| Front | AU1 (inner), AU2 (outer) | Medial vs lateral frontalis |
| Corr | AU4 | Brow lowerer |
| Proc | AU9 | Nose wrinkler (upper) |
| Orb.Oc.O | AU6 | Cheek raiser — Duchenne marker |
| Orb.Oc.P | AU46 | Blink |
| Zyg.Mj | AU12 | Lip corner puller — primary smile |
| Zyg.Mi | AU11 | Nasolabial deepener |
| Lev.Lab | AU10 | Upper lip raiser |
| Lev.Lab.Alq | AU9 | Nose wrinkler (lower) |
| Lev.Ang | AU13 | Cheek puffer |
| Nas.A | AU38 | Nostril flarer |
| Dep.Ang | AU15 | Lip corner depressor |
| Dep.Lab | AU16 | Lower lip depressor |
| Ment | AU17 | Chin raiser |
| Ris | AU14 | Dimpler |
| Orb.Or | AU18, AU20, AU22, AU25 | Multiple AUs for different lip postures |
| Mass/Temp | AU28 (jaw) | Chewing, jaw clench |
| Lat.Pter | AU26 (jaw drop), AU27 (mouth stretch) | Jaw opening |
| Plat | AU21 | Neck tightener |

### 7.2 Encoding FACS in FNN

    @FACS(AU6+AU12)   // signals Duchenne smile to FACS-native systems
                      // equivalent to @EXPR(Smile.D) in FNN

The @FACS() tag is informational — for interoperability with emotion AI datasets
(AffectNet, DISFA, BP4D) that use FACS as ground truth.

---

## 8. Clinical Notation

### 8.1 Clinical status flags (inside @CLIN())

| Flag | Meaning | Example |
|------|---------|---------|
| Pars: | Paresis — reduced activation | @CLIN(Pars:R.Zyg.Mj) |
| Pars0: | Paralysis — no activation | @CLIN(Pars0:R.CNVII/Buc) — all buccal branch muscles |
| Spas: | Spasticity — involuntary contraction | @CLIN(Spas:L.Orb.Oc) |
| Syn: | Synkinesis — abnormal co-contraction | @CLIN(Syn:R.Zyg.Mj+Orb.Oc) |
| Rec+: | Recovery — improving | @CLIN(Rec+:R.Zyg.Mj:1) |
| Comp: | Compensation | @CLIN(Comp:L.Plat/R.Zyg.Mj) |
| Atr: | Atrophy | @CLIN(Atr:R.Mass) |
| Fib: | Fibrillation | @CLIN(Fib:L.Orb.Oc) |

### 8.2 Bell's palsy documentation example

Right-sided Bell's palsy, day 7:

    // Clinical FNN string
    @CLIN(Pars0:R.CNVII/Temp)    // right temporal branch — no brow movement
    @CLIN(Pars0:R.CNVII/Zyg)     // right zygomatic branch — no smile, no eye squint
    @CLIN(Pars0:R.CNVII/Buc)     // right buccal branch — no cheek, lip movement
    @CLIN(Pars0:R.CNVII/Mand)    // right marginal mandibular — no lip depression
    @FNN(L:Zyg.Mj:3)             // left side intact, compensatory smile
    @FNN(L:Front:3, R:Front:0)   // asymmetric brow raise

### 8.3 Recovery progression example

    // Week 1
    @CLIN(Pars0:R.Zyg.Mj) @FNN(R:Zyg.Mj:0)

    // Week 4
    @CLIN(Rec+:R.Zyg.Mj) @FNN(R:Zyg.Mj:1)  // trace activation returning

    // Week 8
    @FNN(R:Zyg.Mj:2)                          // moderate — clinical flags no longer needed

### 8.4 Synkinesis (abnormal co-contraction after reinnervation)

A common Bell's palsy sequela — attempting to smile triggers eye closure:

    @FNN(R:Zyg.Mj:2)                          // intended: smile
    @CLIN(Syn:R.Zyg.Mj+Orb.Oc)               // actual: smile fires orbicularis too
    @FNN(R:Orb.Oc.P:3)                        // unintended eye closure during smile

### 8.5 Parkinson's hypomimia (masked face)

    @CLIN(Pars:Bi.Zyg.Mj) @FNN(Zyg.Mj:-)    // bilateral zygomaticus hypoactivation
    @CLIN(Pars:Bi.Front)   @FNN(Front:-)      // reduced brow movement
    @EXPR(Neutral) // apparent resting expression despite normal intended affect

---

## 9. Temporal Notation

FNN inherits the transition operator from MNN v2.0. For animated expressions:

### 9.1 Expression transitions

    // Neutral to smile over 400ms with biological easing:
    @EXPR(Neutral) ~400ms.ease-bio >> @EXPR(Smile.D)

    // Surprise flash (quick onset, slower offset):
    @EXPR(Neutral) ~150ms.ease-snap >> @EXPR(Surprise) ~600ms.ease-out >> @EXPR(Neutral)

    // Micro-expression (barely visible, <250ms):
    @EXPR(Neutral) ~80ms.ease-snap >> @EXPR(Fear:0.3) ~180ms.ease-out >> @EXPR(Neutral)

### 9.2 Easing curves (same as MNN)

| Curve | Meaning | FNN use case |
|-------|---------|-------------|
| ease-bio | Bell-shaped velocity profile | Natural expressions |
| ease-snap | Fast onset, immediate | Startle, micro-expressions |
| ease-in | Slow start | Gradual emotional reveal |
| ease-out | Fast start, decelerate | Expression offset/recovery |
| ease-linear | Constant speed | Mechanical/robotic faces |
| ease-spring | Overshoot + return | Exaggerated performance |

### 9.3 Looped expressions

    // Continuous subtle smile (idle state):
    @EXPR(Smile.Sm) @loop @cycle:8000ms @EASE(ease-bio)

    // Blinking at normal rate (~15 blinks/min = once per 4s):
    @FNN(Orb.Oc.P:4) @loop @cycle:4000ms @DUR(200ms)

---

## 10. Avatar Rendering

### 10.1 Default morph target mapping

FNN activation levels map to morph target weights identically to MNN v2.0:

| Level | Morph weight |
|-------|-------------|
| :1 | 0.25 |
| :2 | 0.50 |
| :3 | 0.75 |
| :4 | 1.00 |
| :- | 0.10 (sub-baseline) |
| :0 | 0.00 |

### 10.2 Morph target naming convention

FNN symbols map directly to morph target names in rigged avatars:

    @FNN(Zyg.Mj:3)          // morph target: "FNN_Zyg.Mj" at weight 0.75
    @FNN(R:Dep.Ang:2)        // morph target: "FNN_R_Dep.Ang" at weight 0.50

For bilateral expressions, engines may use symmetry or individual targets:
    "FNN_Zyg.Mj"     // bilateral (default)
    "FNN_L_Zyg.Mj"   // left side only
    "FNN_R_Zyg.Mj"   // right side only

### 10.3 LOD levels for avatar rendering

| LOD | Muscles | Suitable for |
|-----|---------|-------------|
| LOD 0 | @EXPR() macros only | Simple chat avatars, low-poly heads |
| LOD 1 | 12 primary FNN muscles | Social VR, game NPCs |
| LOD 2 | 31 FNN muscles (full set) | Film, clinical simulation |
| LOD 3 | 31 muscles + CLIN + Syn | Medical training, rehabilitation software |

### 10.4 Second Life / OpenSim (InThisWorld)

FNN expressions can be applied to SL avatars via animation overriders and LSL scripts.
The FNN@LOD0 @EXPR() macros map to standard SL animation names:

    @EXPR(Smile.D)    → animation: "express_smile"
    @EXPR(Frown)      → animation: "express_sad"
    @EXPR(Surprise)   → animation: "express_surprise"
    @EXPR(Angry)      → animation: "express_anger"
    @EXPR(Laugh)      → animation: "express_laugh_emote"
    @EXPR(Neutral)    → animation: "express_open_mouth" (idle/neutral)

For LOD 1+ with custom rigs, FNN symbols map to individual face bone rotations
or shape key parameters in the avatar mesh.

---

## 11. Compound Scene Strings

FNN composes with MNN, VMN, and VRN in a single string for complete scene description:

### 11.1 Speaking avatar

    @FNN(Orb.Or.S:2, Zyg.Mj:1) >> CNVII/Buc   // slight smile while speaking
    @VRN(H:3, Zy:2, Fl:1, Sp3)                 // bright mask resonance (VRN)
    @MOV(Stab) @ACT(Dia:2) >> Phr               // diaphragmatic support (MNN)

### 11.2 Pilot with expression

    // InThisWorld scene: pilot turning to speak, slight smile
    @VMN(Air) @ATT(Pit=2,Rol=5,Yaw=270) @VEL(Fwd=95)   // aircraft state
    @FNN(Zyg.Mj:2, Orb.Oc.O:1) >> CNVII/Zyg            // pilot's expression
    @JNT(Sp.C:Rot=30) @JNT(R.Sh:Flex=20)                // head turn + arm reach

### 11.3 Workout log with effort expression

    @MOV(Push.H) @ACT(Pec.S:3, Tri:2) >> MedPec/Rad    // bench press (MNN)
    @FNN(Corr:2, Orb.Oc.O:3, Plat:2) >> CNVII           // exertion grimace (FNN)

---

## 12. Prior Art and Differentiation

FNN is the first system to combine all of the following in one portable text notation:

| System | Muscle-level | Nerve-level | Machine-parseable | Clinical | Avatar |
|--------|-------------|-------------|------------------|----------|--------|
| FACS (Ekman) | Partial (AUs) | No | No (observer-coded) | No | Partial |
| EMFACS | Partial | No | No | No | No |
| OpenFace 2.0 | AU output | No | CSV/binary | No | No |
| FACSHuman | AU-based | No | Proprietary | No | Game-only |
| MimicMe / ARKit | Blendshapes | No | Proprietary | No | iOS only |
| **FNN v1.0** | **Full 31-muscle** | **Yes (CN VII/V/III)** | **Yes (open text)** | **Yes** | **Yes (any engine)** |

FACS describes what you see. FNN describes what causes it.

---

## 13. Versioning

This document is FNN_SPEC_v1.md — version 1.0.0.

Version format: MAJOR.MINOR.PATCH (semantic versioning)
- MAJOR: breaking syntax changes
- MINOR: new muscles, macros, tags added (backward compatible)
- PATCH: clarifications, corrections, examples

---

## 14. Full Examples

### 14.1 Basic emotion set

    Genuine happiness:
    @EXPR(Smile.D) >> CNVII/Zyg
    // @FNN(Zyg.Mj:3, Orb.Oc.O:2)

    Contempt (right-sided):
    @EXPR(Contempt) >> CNVII/Zyg+Buc
    // @FNN(R:Zyg.Mj:2, R:Ris:2)

    Disgust:
    @FNN(Nas.A:3, Lev.Lab.Alq:2, Dep.Ang:2, Orb.Or.D:1) >> CNVII

    Pain (PSPI-based):
    @EXPR(Pain) >> CNVII
    // @FNN(Corr:3, Orb.Oc.O:3, Nas.A:2, Dep.Lab:2, Plat:2)

### 14.2 Clinical assessment

    // Initial Bell's palsy assessment — right side complete paralysis
    @CLIN(Pars0:R.CNVII)
    @FNN(L:Zyg.Mj:3, R:Zyg.Mj:0)   // smile attempt
    @FNN(L:Front:3, R:Front:0)        // brow raise attempt
    @FNN(R:Orb.Oc.P:0)               // cannot close right eye
    @CLIN(Risk:Cornea)                // corneal exposure risk — cannot blink

    // 6 weeks later — recovering
    @CLIN(Rec+:R.CNVII) @FNN(R:Zyg.Mj:1, R:Front:1)
    @CLIN(Syn:R.Zyg.Mj+Orb.Oc)      // synkinesis developing

### 14.3 Emotion AI annotation

    // Ground truth annotation for training data
    @EXPR(Smile.D) @FACS(AU6+AU12) @FNN(Zyg.Mj:3, Orb.Oc.O:2)
    // All three: FNN canonical + FACS for legacy systems + macro for readability

### 14.4 Avatar idle animation sequence

    // Looping neutral with natural blink and subtle smile variation
    @EXPR(Smile.Sm) @loop @cycle:6000ms
    @FNN(Orb.Oc.P:4) @loop @cycle:3500ms @DUR(180ms) @EASE(ease-snap)

---

## 15. Intellectual Property

FNN (Facial Neuro Notation), the FNN Symbol Set (31 primary facial muscle symbols
and bilateral variants), the FNN expression macro set (@EXPR()), the FACS-to-FNN
translation table, the CN VII branch notation (CNVII/Temp, CNVII/Zyg, CNVII/Buc,
CNVII/Mand, CNVII/Cerv), the LOD tier definitions, the avatar morph mapping
conventions, and all original frameworks in this document are © 2026 AIUNITES LLC.
All Rights Reserved. DMCA Protected.

Published freely for educational and professional use. No permission required to
implement FNN in software, hardware, or research. Attribution appreciated.

Sister protocols: MNN (body) at BodSpas/BODWAVE, VRN (voice) at VoiceStry,
VMN (vehicle) at InThisWorld. All under the HMN umbrella at aiunites.com.

---

*FNN_SPEC_v1.md*
*Version 1.0.0 — 2026-04-03*
*AIUNITES LLC*
