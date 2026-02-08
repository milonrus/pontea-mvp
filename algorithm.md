# Roadmap Generator Algorithm Spec (Sprint-based, deterministic)

## 1) Purpose & Non-goals

### Purpose

Define a deterministic, implementable algorithm for generating a **2-week sprint exam-prep roadmap** from:

-   student levels (1–5) per course section,
    
-   weeks to exam,
    
-   hours per week,
    
-   course JSON (`course_modular_overview.sections[].submodules[].stats`).
    

The output roadmap must contain, per sprint:

-   a goal (1–2 sentences),
    
-   ranked focus exam parts,
    
-   **exact course items** to cover (`section.title → submodule.name` only),
    
-   estimated hours per item and totals,
    
-   planned practice volumes (questions) sourced from JSON,
    
-   a checkpoint definition and deterministic rules for how checkpoint results adjust the next sprint.
    

### Non-goals

-   No daily schedules or micro-tasks (no per-day breakdown).
    
-   No invented topics; only schedule modules present in JSON.
    
-   No probabilistic “intuition”; no LLM-like creative wording beyond deterministic templates.
    
-   No external resources or curriculum beyond the provided course JSON.
    
-   No prediction of exam score; only workload-based planning and adaptive reweighting rules.
    

----------

## 2) Inputs

### Required

1.  `weeks_to_exam: int`
    

-   Constraints: `weeks_to_exam >= 1`
    

2.  `hours_per_week: float`
    

-   Constraints: `hours_per_week > 0`
    

3.  `levels_by_section: dict[str -> int]`
    

-   Keys: `section.title` values (case-insensitive match after normalization)
    
-   Values: integer level in `[1..5]`
    
-   Meaning:
    
    -   1 = knows nothing
        
    -   5 = mastery; can solve under ~2 minutes consistently
        

4.  `course_modular_overview: object`
    

-   Structure:
    
    -   `sections[]`:
        
        -   `title: string`
            
        -   `submodules[]`:
            
            -   `name: string`
                
            -   `stats`:
                
                -   `lessons_video_minutes: float`
                    
                -   `timed_text_minutes: float`
                    
                -   `untimed_text_items: int`
                    
                -   `questions_total: int`
                    

### Optional

5.  `checkpoint_history: list[CheckpointResult]`
    

-   May be empty/missing. If missing, the roadmap is produced with **no adaptation**, i.e., baseline + backlog/level allocation only (still deterministic).
    

6.  `config_overrides: dict`
    

-   Overrides defaults listed in Section 3. Any missing config uses defaults.
    

----------

## 3) Configurable Parameters

All parameters below must be read from defaults then overridden by `config_overrides`.

### 3.1 Time/Workload estimation knobs

Parameter

Meaning

Default

Allowed range

Used in

`UNTIMED_TEXT_MIN_PER_ITEM`

Minutes per untimed text item

8

1–30

Workload estimation

`BASE_MIN_PER_QUESTION`

Base minutes per question attempt (excluding multipliers, excluding review overhead)

2.5

1–5

Workload estimation

`PRACTICE_REVIEW_OVERHEAD_PCT`

Extra fraction of practice time for error review/notes

0.20

0–1

Workload estimation

`SPRINT_BUFFER_PCT`

Sprint time reserved as buffer (not scheduled)

0.05

0–0.25

Sprint capacity

### 3.2 Subject multipliers for question time

Applied per **section** (not per exam part). Case-insensitive match on `section.title`.

Section title

`SUBJECT_MULTIPLIER` default

Text Comprehension

1.10

Logical reasoning

1.00

Drawing & Representation

1.30

Math

1.40

Physics

1.50

General culture

1.00

History

1.00

History of Art & Architecture

1.00

Config object: `SUBJECT_MULTIPLIER_BY_SECTION_TITLE: dict[str -> float]`  
Allowed values: `[0.5 .. 3.0]`

### 3.3 Level → time multipliers and learning/practice shares

All are deterministic tables.

**Level time multiplier** for question-time scaling (lower level = slower to solve):

Level

`LEVEL_TIME_MULTIPLIER`

Default

1

1.80

(largest)

2

1.55

3

1.30

4

1.10

5

1.00

(smallest)

**Learning vs practice share** (desired split of allocated minutes inside a section):

Level

`LEVEL_LEARNING_SHARE`

`LEVEL_PRACTICE_SHARE`

1

0.70

0.30

2

0.60

0.40

3

0.50

0.50

4

0.35

0.65

5

0.20

0.80

Constraints: shares must be in `[0..1]` and sum to 1.

### 3.4 Exam-part allocation knobs (equal-weight constraint with caps)

Parameter

Meaning

Default

Allowed range

`BASELINE_PART_SHARE`

Baseline share per exam part (5 equal parts)

0.20

fixed unless exam changes

`TARGET_LEVEL_FOR_GAP`

Target proficiency for “gap” computations

4

2–5

`ALLOC_GAP_WEIGHT`

Strength of level-gap adjustments

0.25

0–1

`ALLOC_BACKLOG_WEIGHT`

Strength of backlog-volume adjustments

0.25

0–1

`MIN_PART_SHARE`

Minimum share for any exam part

0.12

0–0.20

`MAX_PART_SHARE`

Maximum share for any exam part

0.30

0.20–0.60

`MAX_SHARE_CHANGE_PER_SPRINT`

Max absolute share change allowed per part between consecutive sprints

0.05

0–0.20

Validation constraints:

-   `5 * MIN_PART_SHARE <= 1.0`
    
-   `MAX_PART_SHARE >= BASELINE_PART_SHARE`
    
-   `MIN_PART_SHARE <= BASELINE_PART_SHARE`
    

### 3.5 Final-phase behavior knobs

Parameter

Meaning

Default

Allowed range

Used in

`FINAL_PRACTICE_WEEKS`

Last N weeks treated as “final phase”

3

0–8

Sprint phase logic

`FINAL_PHASE_LEARNING_MULTIPLIER`

Multiply learning share by this in final phase (shifts time to practice)

0.50

0–1

Section budget split

`ALLOW_NEW_LEARNING_IN_FINAL_PHASE`

Whether to schedule new learning minutes in final phase if backlog remains

true

boolean

Module selection

### 3.6 Keyword-based ordering rules

All are case-insensitive substring or regex matches. Pattern precedence is deterministic (first match wins).

Config object: `NAME_CATEGORY_PATTERNS` with ordered list (highest precedence first):

1.  `EXAM_PRACTICE`: `["old exam", "old exams", "practice test", "practice tests", "mock", "real exam"]`
    
2.  `PRACTICE_REVISION`: `["practice & revision", "practice and revision", "revision", "practice"]`
    
3.  `INTRO`: `["intro", "overview", "method", "guidance", "terminology", "references"]`
    
4.  `ADVANCED_HINT`: `["part 2", "final", "systems", "advanced", "ii", "iii"]`
    
5.  `MISC`: `["misc", "misplaced"]`
    
6.  `CORE`: fallback if no match
    

Category rank order (within each section’s sequence):

1.  INTRO
    
2.  CORE
    
3.  ADVANCED_HINT
    
4.  PRACTICE_REVISION
    
5.  EXAM_PRACTICE
    
6.  MISC (optional/last)
    

### 3.7 Defaults for missing/unknown input handling

Parameter

Meaning

Default

`DEFAULT_LEVEL_IF_MISSING`

Used when `levels_by_section` has no entry for a course section

3

`IGNORE_UNKNOWN_LEVEL_KEYS`

Unknown keys in `levels_by_section`

true

`MINUTES_ROUNDING`

Rounding strategy for reporting

`"nearest_5"`

Allowed rounding modes (deterministic):

-   `"none"` (keep floats)
    
-   `"ceil"` (integer ceil minutes)
    
-   `"floor"` (integer floor minutes)
    
-   `"nearest_1"`, `"nearest_5"`, `"nearest_15"`
    

----------

## 4) Data Model & Mappings

### 4.1 Canonical normalization

All section-title matching is done with:

-   `normalize(s) = lower(trim(s))` and collapse internal whitespace to single spaces.
    

### 4.2 Exam parts (fixed)

Define exactly 5 exam parts, equal weight:

1.  `READING` (Reading Comprehension)
    
2.  `LOGIC` (Logical Reasoning)
    
3.  `DRAWING` (Drawing & Representation)
    
4.  `MATH_PHYSICS` (Math & Physics combined)
    
5.  `GENERAL_KNOWLEDGE` (General Knowledge/Humanities combined)
    

### 4.3 Fixed mapping: course sections → exam parts

Deterministic mapping by normalized `section.title`:

-   `READING` ← `"text comprehension"`
    
-   `LOGIC` ← `"logical reasoning"`
    
-   `DRAWING` ← `"drawing & representation"`
    
-   `MATH_PHYSICS` ← `"math"`, `"physics"`
    
-   `GENERAL_KNOWLEDGE` ← `"general culture"`, `"history"`, `"history of art & architecture"`
    

If a section title is not in this mapping:

-   If `config_overrides` provides an explicit mapping entry, use it.
    
-   Else: classify as `UNMAPPED` and **exclude from scheduling**, but record a warning in output.
    

### 4.4 Section-level and part-level level values

**Input level is per section.** A part may contain multiple sections (Math+Physics; Humanities).

Compute `part_level` with a configurable method:

Config: `PART_LEVEL_COMBINE_METHOD` ∈ {`"workload_weighted"`, `"equal_weighted"`}  
Default: `"workload_weighted"`

Definitions:

-   Let `L_s` be section level (1–5).
    
-   Let `W_s` be estimated total minutes for the section (computed by workload estimation, Section 5) **for the selected mode** (Full or Minimal candidate set).
    
-   Let `S_p` be the set of sections belonging to part `p`.
    

**workload_weighted**  
[  
part_level(p) = \text{round}\left(\frac{\sum_{s \in S_p} L_s \cdot W_s}{\sum_{s \in S_p} W_s}\right)  
]  
Rounding: standard nearest integer, ties to higher integer (deterministic).

**equal_weighted**  
[  
part_level(p) = \text{round}\left(\frac{1}{|S_p|}\sum_{s \in S_p} L_s\right)  
]

If `S_p` is empty (no mapped sections):

-   Mark part as `inactive`, set `part_level = 5`, `part_backlog = 0`.
    

----------

## 5) Workload Estimation Model

### 5.1 Submodule workload components (minutes)

For each submodule `m` in section `s`:

**Learning minutes (fixed content time)**  
[  
learn_min(m) = video_min + timed_text_min + (untimed_items \cdot UNTIMED_TEXT_MIN_PER_ITEM)  
]  
Where:

-   `video_min = stats.lessons_video_minutes`
    
-   `timed_text_min = stats.timed_text_minutes`
    
-   `untimed_items = stats.untimed_text_items`
    

**Practice minutes (questions)**  
Let:

-   `Q = stats.questions_total`
    
-   `subj_mult = SUBJECT_MULTIPLIER_BY_SECTION_TITLE[section.title]`
    
-   `lvl_mult = LEVEL_TIME_MULTIPLIER[level_of_section]`
    

Raw attempt minutes:  
[  
practice_raw_min(m) = Q \cdot BASE_MIN_PER_QUESTION \cdot subj_mult \cdot lvl_mult  
]

Add review overhead:  
[  
practice_min(m) = practice_raw_min(m) \cdot (1 + PRACTICE_REVIEW_OVERHEAD_PCT)  
]

**Total submodule estimate**  
[  
total_min(m) = learn_min(m) + practice_min(m)  
]

### 5.2 Derived per-question cost (used for partial allocation)

For a section `s`:  
[  
cost_per_q_min(s) = BASE_MIN_PER_QUESTION \cdot subj_mult(s) \cdot lvl_mult(L_s) \cdot (1 + PRACTICE_REVIEW_OVERHEAD_PCT)  
]  
This is deterministic and constant within a section.

### 5.3 Aggregations

-   Section totals:
    
    -   `section_total_min(s) = sum_m total_min(m)`
        
    -   `section_learn_min(s) = sum_m learn_min(m)`
        
    -   `section_practice_min(s) = sum_m practice_min(m)`
        
    -   `section_questions(s) = sum_m Q(m)`
        
-   Exam part totals:
    
    -   `part_total_min(p) = sum_{s in S_p} section_total_min(s)`
        

### 5.4 Rounding for reporting (not for internal planning)

Internal planning should use float minutes; reporting uses `MINUTES_ROUNDING`:

-   `"nearest_5"`: round to nearest 5 minutes, ties up.
    

----------

## 6) Prioritization Model

Prioritization is used for:

-   ranking focus parts in a sprint,
    
-   tie-breaking minute allocation remainders,
    
-   minimal-plan cutting decisions.
    

### 6.1 Mastery gap score (0..1)

For a section level `L`:  
[  
gap(L) = clamp\left(\frac{TARGET_LEVEL_FOR_GAP - L}{TARGET_LEVEL_FOR_GAP - 1}, 0, 1\right)  
]

-   If `L >= TARGET_LEVEL_FOR_GAP`, gap = 0.
    

For a part `p`, use `part_level(p)`:  
[  
gap_part(p) = gap(part_level(p))  
]

### 6.2 Backlog share score (0..1)

At any moment in planning, each part has remaining backlog minutes `rem_min(p)`. Define:  
[  
backlog_share(p) =  
\begin{cases}  
\frac_toggle>< \frac{rem_min(p)}{\sum_{p'} rem_min(p')} & \text{if sum > 0}\  
0 & \text{otherwise}  
\end{cases}  
]

### 6.3 Urgency score (optional but deterministic)

Let `remaining_sprints` = number of sprints including current sprint. Define:  
[  
urgency(p) = \frac{rem_min(p)}{remaining_sprints}  
]  
Use it only as a tie-breaker (default), unless explicitly configured.

### 6.4 Part priority score (for ranking focus and tie-breaks)

Default:  
[  
priority(p) = 1.0\cdot gap_part(p) + 1.0\cdot backlog_share(p)  
]  
Tie-breakers (deterministic):

1.  higher `priority(p)`
    
2.  higher `rem_min(p)`
    
3.  fixed part order: READING, LOGIC, DRAWING, MATH_PHYSICS, GENERAL_KNOWLEDGE
    

----------

## 7) Time Allocation Across Exam Parts (equal-weight constraint)

### 7.1 Baseline per sprint

Start from equal weights:

-   `BASELINE_PART_SHARE = 0.20` for each of 5 parts.
    

### 7.2 Share computation per sprint (deterministic)

At the start of each sprint planning step, compute `share_raw(p)`:

1.  Compute mean gap across active parts:  
    [  
    mean_gap = \frac{1}{|P_active|}\sum_{p \in P_active} gap_part(p)  
    ]
    
2.  Compute:  
    [  
    share_raw(p) = BASELINE_PART_SHARE
    

-   ALLOC_GAP_WEIGHT\cdot (gap_part(p) - mean_gap)
    
-   ALLOC_BACKLOG_WEIGHT\cdot (backlog_share(p) - BASELINE_PART_SHARE)  
    ]
    

3.  Clamp:  
    [  
    share_clamped(p) = clamp(share_raw(p), MIN_PART_SHARE, MAX_PART_SHARE)  
    ]
    
4.  Renormalize to sum to 1 with bounds (deterministic algorithm):
    

-   Let `free_parts` = parts not at min/max after clamping.
    
-   Let `fixed_parts` = parts at min or max.
    
-   Compute `sum_fixed = sum(share_clamped(fixed_parts))`.
    
-   Set `target_free_sum = 1 - sum_fixed`.
    

If `free_parts` is empty:

-   If `sum_fixed == 1`, done.
    
-   Else: config invalid → raise error.
    

Else:

-   Let `sum_free = sum(share_clamped(free_parts))`.
    
-   Scale each free part:  
    [  
    share(p) = share_clamped(p)\cdot \frac{target_free_sum}{sum_free}  
    ]
    
-   If scaling pushes any free part outside bounds, move it to fixed and repeat (iterate until stable). Iteration order is deterministic using fixed part order.
    

### 7.3 Adaptive adjustment from checkpoint data (if available)

If `checkpoint_history` contains results for the immediate previous sprint, compute an adjustment `delta(p)` and apply before clamping/renormalization.

Performance index (per part):

-   Inputs from checkpoint: `accuracy` (0..1), `avg_time_per_question_min` (float), `completion_rate` (0..1)
    

Config:

-   `TARGET_ACCURACY = 0.70`
    
-   `TARGET_TIME_PER_Q_BY_PART` defaults:
    
    -   READING 2.0, LOGIC 2.0, DRAWING 2.5, MATH_PHYSICS 2.5, GENERAL_KNOWLEDGE 2.0
        
-   `ADAPT_W_ACCURACY = 0.7`
    
-   `ADAPT_W_TIME = 0.3`
    
-   `PERFORMANCE_EMA_ALPHA = 0.5`
    
-   `ADAPT_STEP = 0.04` (max ~4pp change before clamp)
    

Compute normalized scores:  
[  
acc_score = clamp(\frac{accuracy}{TARGET_ACCURACY}, 0, 1.25)  
]  
[  
time_score = clamp(\frac{TARGET_TIME(p)}{avg_time_per_q}, 0, 1.25)  
]  
[  
perf = ADAPT_W_{ACCURACY}\cdot acc_score + ADAPT_W_{TIME}\cdot time_score  
]

EMA smoothing:

-   Maintain `perf_ema(p)`:
    
    -   If previous exists: `perf_ema = alpha*perf + (1-alpha)*perf_ema_prev`
        
    -   Else: `perf_ema = perf`
        

Deterministic delta rule:

-   If `perf_ema(p) < 1.0`: underperform → increase share  
    [  
    delta(p) = +ADAPT_STEP \cdot (1.0 - perf_ema(p))  
    ]
    
-   Else if `perf_ema(p) > 1.10`: overperform → can decrease share  
    [  
    delta(p) = -ADAPT_STEP \cdot (perf_ema(p) - 1.10)  
    ]
    
-   Else: `delta(p) = 0`
    

Cap change per sprint:  
[  
delta(p) = clamp(delta(p), -MAX_SHARE_CHANGE_PER_SPRINT, +MAX_SHARE_CHANGE_PER_SPRINT)  
]

Apply:  
[  
share_raw(p) \leftarrow share_raw(p) + delta(p)  
]  
Then clamp + renormalize (Section 7.2).

If checkpoint data missing for a part or sprint:

-   Treat `delta(p)=0` (no change).
    

----------

## 8) Sprint Construction Rules (2-week sprints)

### 8.1 Sprint count and lengths

Let:

-   `N_full = weeks_to_exam // 2`
    
-   `has_last_short = (weeks_to_exam % 2 == 1)`
    
-   Total sprints:
    
    -   `N = N_full + (1 if has_last_short else 0)`
        

Sprint `i` (1-indexed):

-   If `i <= N_full`: sprint length = 2 weeks
    
-   Else (last sprint only, if odd): sprint length = 1 week
    

### 8.2 Sprint capacity (minutes)

For sprint `i`:

-   `sprint_weeks(i)` ∈ {1,2}
    
-   `available_min(i) = sprint_weeks(i) * hours_per_week * 60`
    
-   `planning_min(i) = floor(available_min(i) * (1 - SPRINT_BUFFER_PCT))`
    
-   `buffer_min(i) = available_min(i) - planning_min(i)`
    

The roadmap must not schedule more than `planning_min(i)`.

### 8.3 Final phase identification

Define:

-   `final_phase_weeks = FINAL_PRACTICE_WEEKS`
    
-   `final_phase_sprints = ceil(final_phase_weeks / 2)`
    
-   Final phase sprints are the last `final_phase_sprints` sprints (if `final_phase_sprints > N`, then all sprints are final phase).
    

----------

## 9) Module Selection & Ordering Heuristics

### 9.1 Build ordered submodule list per section (deterministic)

For each section `s`, assign each submodule `m` a category using `NAME_CATEGORY_PATTERNS` precedence (Section 3.6).  
Define:

-   `category_rank(m)` ∈ {1..6} according to the rank order:
    
    -   INTRO=1, CORE=2, ADVANCED_HINT=3, PRACTICE_REVISION=4, EXAM_PRACTICE=5, MISC=6
        

Define a stable ordering key:

1.  `category_rank(m)` ascending
    
2.  `json_index(m)` ascending (original order in JSON within section)
    

Ordered list = sort by this key.

### 9.2 Task decomposition inside a submodule

Each submodule `m` is represented as a **work unit** with mutable remaining quantities:

-   `learn_min_remaining(m)` (float, initialized to `learn_min(m)`)
    
-   `questions_remaining_unique(m)` (int, initialized to `questions_total(m)`)
    
-   `questions_remaining_retake(m)` (int, initialized to 0 unless extra-practice stage creates it)
    

A sprint can schedule partial amounts:

-   `learn_min_planned` ≤ `learn_min_remaining`
    
-   `questions_planned_unique` ≤ `questions_remaining_unique`
    
-   `questions_planned_retake` arbitrary ≥0 but only if retakes enabled (Section 11)
    

### 9.3 Practice eligibility gating (to preserve progression)

Config: `PRACTICE_UNLOCK_PCT` default 1.0 (i.e., unlock practice after full learning for that submodule), allowed range 0–1.

For a submodule `m`:

-   If `learn_min(m) == 0`: practice is always eligible.
    
-   Else practice is eligible if:  
    [  
    1 - \frac{learn_min_remaining(m)}{learn_min(m)} \ge PRACTICE_UNLOCK_PCT  
    ]
    

### 9.4 Section selection within a combined exam part

For parts with multiple sections (MATH_PHYSICS, GENERAL_KNOWLEDGE), split part budget across constituent sections deterministically:

For each section `s` inside part `p`, compute:

-   `rem_min_section(s)` = remaining estimated minutes for that section (learn + unique practice not yet scheduled in plan mode).
    
-   `gap_section(s) = gap(level_s)`
    
-   Section need score:  
    [  
    need(s) = 0.5\cdot gap_section(s) + 0.5\cdot \frac{rem_min_section(s)}{\sum_{s' \in S_p} rem_min_section(s')}  
    ]  
    If denominator is 0, set the fraction to 0.
    

Then `section_share(s)` = normalize `need(s)` across sections of the part (sum to 1).  
Allocate minutes using **largest remainder** (Section 8.2 minute allocation rule), tie-break by higher `need(s)`, then JSON order.

### 9.5 Deterministic filling algorithm per sprint

For sprint `i`:

1.  Compute `share(p)` per exam part (Section 7) using remaining backlog at start of sprint.
    
2.  Allocate `planning_min(i)` across 5 parts using largest remainder:
    
    -   `part_budget_exact(p) = share(p) * planning_min(i)`
        
    -   `part_budget_min(p) = floor(part_budget_exact)`
        
    -   Distribute remaining minutes by descending remainder, tie by `priority(p)` then fixed part order.
        
3.  For each part `p`, allocate its minutes across its sections (Section 9.4).
    
4.  For each section `s`, split its budget into learning/practice:
    
    -   `learning_share = LEVEL_LEARNING_SHARE[level_s]`
        
    -   If sprint `i` is final phase: `learning_share *= FINAL_PHASE_LEARNING_MULTIPLIER`
        
    -   Clamp `learning_share` to `[0,1]`
        
    -   `learn_budget = round_to_int(section_budget * learning_share)` using floor
        
    -   `practice_budget = section_budget - learn_budget`
        
5.  Fill learning budget for section `s`:
    
    -   Iterate ordered submodules `m` of `s` from start.
        
    -   For each `m` with `learn_min_remaining(m) > 0`:
        
        -   If final phase and `ALLOW_NEW_LEARNING_IN_FINAL_PHASE == false`, skip.
            
        -   Allocate:
            
            -   `x = min(learn_budget_remaining, learn_min_remaining(m))`
                
        -   If `x > 0`:
            
            -   schedule `learn_min_planned(m) += x`
                
            -   `learn_min_remaining(m) -= x`
                
            -   `learn_budget_remaining -= x`
                
        -   Stop when `learn_budget_remaining == 0`.
            
6.  Fill practice budget for section `s`:
    
    -   Determine eligible submodules in this order:
        
        1.  If final phase: EXAM_PRACTICE then PRACTICE_REVISION then others
            
        2.  Else: PRACTICE_REVISION then others; EXAM_PRACTICE only if no other eligible practice remains
            
    -   Within each category: preserve the section’s ordered list order.
        
    -   For each eligible submodule `m` with remaining questions:
        
        -   Per-question cost = `cost_per_q_min(s)` (Section 5.2)
            
        -   `max_q = floor(practice_budget_remaining / cost_per_q_min(s))`
            
        -   Allocate unique first:
            
            -   `q_unique = min(max_q, questions_remaining_unique(m))`
                
        -   If `q_unique > 0`:
            
            -   schedule and decrement remaining
                
            -   reduce practice budget by `q_unique * cost_per_q_min(s)`
                
        -   If `max_q` still allows and unique is exhausted, allocate retakes only if enabled (Section 11).
            
    -   Stop when practice budget exhausted or no eligible questions remain.
        
7.  Any unused minutes remain as sprint slack (in buffer + unfilled planning minutes). Do not reassign across parts unless explicitly configured; default is no reassignment for determinism.
    

----------

## 10) Practice & Checkpoint Rules

### 10.1 Practice volume reporting

For each scheduled submodule item in a sprint, report:

-   `practice_questions_unique_planned`
    
-   `practice_questions_retake_planned` (usually 0 unless extra practice)
    
-   computed practice minutes using section per-question cost
    
-   review minutes implicitly included via cost model (Section 5.2)
    

### 10.2 Checkpoint definition per sprint (no extra modules)

Each sprint must include a checkpoint specification referencing only scheduled practice in that sprint.

Config:

-   `CHECKPOINT_SAMPLE_QUESTIONS_PER_PART = 15` (range 5–40)
    
-   `CHECKPOINT_MIN_QUESTIONS_PER_PART = 8` (range 3–20)
    

For sprint `i`, for each active exam part `p`:

1.  Let `practice_list(p,i)` be the ordered list of practice-bearing scheduled items in that sprint for that part (in the order they appear in the sprint output).
    
2.  Select checkpoint source item deterministically:
    
    -   If any EXAM_PRACTICE item exists in `practice_list`, choose the **first** EXAM_PRACTICE item.
        
    -   Else choose the **last** practice-bearing item in `practice_list`.
        
3.  Let `Q_scheduled(p,i)` = total unique questions scheduled for the part in the sprint (sum).
    
4.  Set:
    
    -   `Q_checkpoint(p,i) = min(CHECKPOINT_SAMPLE_QUESTIONS_PER_PART, Q_scheduled(p,i))`
        
5.  If `Q_checkpoint(p,i) < CHECKPOINT_MIN_QUESTIONS_PER_PART`, mark checkpoint confidence as `"low_sample"`.
    

### 10.3 Metrics to collect (deterministic set)

For each part `p` at checkpoint:

-   `accuracy`: correct / attempted
    
-   `avg_time_per_question_min`: total time / attempted
    
-   `completion_rate`: attempted / planned_checkpoint_questions
    

If the system cannot capture time:

-   store `avg_time_per_question_min = null`, and adaptation uses accuracy only (set `ADAPT_W_TIME = 0` effectively for that part).
    

### 10.4 Deterministic adjustment rule

Use adaptation described in Section 7.3. If no checkpoint data exists for sprint `i`, `delta(p)=0` for all parts.

----------

## 11) Plan Feasibility & Fallback Modes (Full vs Minimal)

### 11.1 Compute available planning time

Total available minutes:  
[  
avail_min = weeks_to_exam \cdot hours_per_week \cdot 60  
]  
Total planning minutes (after buffer):  
[  
avail_plan_min = \sum_{sprint\ i} planning_min(i)  
]  
(`avail_plan_min` is the only capacity the plan can schedule.)

### 11.2 Compute required time for Full Coverage

Full coverage requires scheduling **all**:

-   learning minutes for all submodules,
    
-   all unique questions (`questions_total`) for all submodules.
    

Compute:  
[  
required_full_min = \sum_{all\ submodules\ m} total_min(m)  
]

Also compute per-part required minutes `required_part_min(p)`.

**Cap-induced feasibility check (equal-weight constraint):**  
Even if `required_full_min <= avail_plan_min`, Full coverage may be impossible under `MAX_PART_SHARE`.

For each part:  
[  
cap_budget(p) = MAX_PART_SHARE \cdot avail_plan_min  
]  
If `required_part_min(p) > cap_budget(p)`, mark `cap_infeasible = true`.

### 11.3 Feasibility decision

-   If `required_full_min <= avail_plan_min` **and** `cap_infeasible == false`: produce **Full roadmap only**.
    
-   Else: produce **two roadmaps**:  
    A) **Full coverage attempt roadmap** (still uses the same share caps; will report remaining backlog at end)  
    B) **Minimal sufficient roadmap** (fits within `avail_plan_min`)
    

### 11.4 Full coverage attempt mode (A)

Run the sprint construction algorithm (Sections 7–10) with the complete set of submodules and unique questions as backlog.  
Output must include:

-   `unscheduled_minutes_by_part` at end (remaining backlog) if not completed.
    
-   a feasibility note indicating whether the shortfall is caused by overall time vs cap constraints.
    

### 11.5 Minimal sufficient mode (B): deterministic cuts

Goal: Fit within `avail_plan_min` while preserving highest ROI and ensuring all 5 exam parts get meaningful time.

#### 11.5.1 Mandatory preservation rules

Always include (do not cut):

1.  Any submodule categorized as `EXAM_PRACTICE` (Old exams / Practice tests / Real exam texts).
    
2.  Any submodule categorized as `PRACTICE_REVISION`.
    
3.  For any section with level ≤ `LOW_LEVEL_THRESHOLD` (default 2): include enough INTRO+CORE learning minutes to reach:
    
    -   `MIN_LOW_LEVEL_LEARNING_MIN = 120` minutes per such section (config, 60–240), by taking earliest eligible learning in section order.
        
    -   If the section has fewer learning minutes total, include all.
        
4.  Ensure each exam part has at least:
    
    -   `MIN_PART_PRACTICE_QUESTIONS_TOTAL = 40` unique questions across the whole plan (config, 10–100), selected from available question-bearing submodules in that part using the ordering rules (prefer EXAM_PRACTICE, then PRACTICE_REVISION, then others).
        

If any mandatory set already exceeds `avail_plan_min`, the minimal plan must still output but mark `"minimal_infeasible": true` and schedule mandatory items in priority order until capacity is exhausted.

#### 11.5.2 ROI score for non-mandatory items

For each submodule `m` not mandatory, compute:

-   `q = questions_total(m)`
    
-   `t = total_min(m)` (estimated)
    
-   `density = q / max(t, 1)` (questions per minute)
    
-   `gap_section = gap(level_section)`
    
-   `keyword_bonus`:
    
    -   EXAM_PRACTICE: +1.0 (but already mandatory by default)
        
    -   PRACTICE_REVISION: +0.7 (also mandatory by default)
        
    -   INTRO: +0.2
        
    -   CORE/ADVANCED: +0.0
        
    -   MISC: -0.5
        

Default ROI:  
[  
ROI(m) = 0.5\cdot density + 0.4\cdot gap_section + 0.1\cdot keyword_bonus  
]

Tie-breakers:

1.  higher `ROI(m)`
    
2.  higher `gap_section`
    
3.  higher `questions_total(m)`
    
4.  earlier in section ordered list (lower `category_rank`, then lower `json_index`)
    

#### 11.5.3 Deterministic selection procedure

1.  Start with mandatory items set `M`.
    
2.  Build candidate list `C` = all remaining items sorted by ROI descending (with tie-breaks).
    
3.  Add items from `C` to `M` in order while:
    
    -   sum of estimated minutes of selected items ≤ `avail_plan_min`
        
4.  If adding an item would exceed capacity:
    
    -   If it has questions: include a **partial** amount of its questions to fill remaining minutes (learning minutes excluded unless already mandatory by low-level learning rule).
        
    -   Else: skip.
        

The minimal plan then schedules only selected items using the same sprint planner.

----------

## 12) Edge Cases & Validation

### 12.1 Input validation (must fail fast with explicit errors)

-   `weeks_to_exam < 1` → error
    
-   `hours_per_week <= 0` → error
    
-   Any section level not in `[1..5]` → error (unless explicitly configured to clamp)
    
-   `MIN_PART_SHARE * 5 > 1` → config error
    
-   `MAX_PART_SHARE < BASELINE_PART_SHARE` → config error
    
-   Negative minutes or negative question counts in JSON → error (or clamp to 0 if configured)
    

### 12.2 Missing levels

If `levels_by_section` lacks an entry for a mapped section:

-   Use `DEFAULT_LEVEL_IF_MISSING`
    
-   Record warning: `"missing_level_for_section": section.title`
    

### 12.3 Sections with zero workload

If a mapped section has:

-   `sum(lessons_video_minutes + timed_text_minutes + untimed_text_items) == 0` and `questions_total == 0` across all submodules:
    
    -   section backlog = 0, skip scheduling it
        
    -   record `"empty_section": section.title`
        

### 12.4 Odd number of weeks

-   Last sprint is 1 week (Section 8.1).
    
-   All budgets scale by sprint length automatically.
    

### 12.5 Rounding and determinism requirements

-   All sorting must use explicit tie-breaks (defined above).
    
-   All minute allocations that require integerization must use:
    
    -   floor + largest remainder distribution with deterministic tie-breaking.
        
-   Goal text must use deterministic templates (Section 13.2).
    

----------

## 13) Output Schema (what the roadmap JSON/text should look like)

The generator must output either:

-   a JSON object matching the schema below, and/or
    
-   a text rendering of that object.  
    This spec defines the canonical JSON schema.
    

### 13.1 Roadmap output JSON schema (canonical)

```json
{
  "metadata": {
    "weeks_to_exam": 20,
    "hours_per_week": 10,
    "sprint_length_weeks_default": 2,
    "generated_mode": "full|full_attempt|minimal",
    "feasibility": {
      "available_minutes_total": 12000,
      "available_minutes_planning": 11400,
      "required_minutes_full_coverage": 9600,
      "cap_infeasible": false,
      "overall_infeasible": false,
      "notes": ["string", "string"]
    },
    "config_used": {
      "UNTIMED_TEXT_MIN_PER_ITEM": 8,
      "BASE_MIN_PER_QUESTION": 2.5,
      "PRACTICE_REVIEW_OVERHEAD_PCT": 0.2,
      "SPRINT_BUFFER_PCT": 0.05,
      "LEVEL_TIME_MULTIPLIER": {"1":1.8,"2":1.55,"3":1.3,"4":1.1,"5":1.0},
      "LEVEL_LEARNING_SHARE": {"1":0.7,"2":0.6,"3":0.5,"4":0.35,"5":0.2},
      "allocation": {
        "BASELINE_PART_SHARE": 0.2,
        "ALLOC_GAP_WEIGHT": 0.25,
        "ALLOC_BACKLOG_WEIGHT": 0.25,
        "MIN_PART_SHARE": 0.12,
        "MAX_PART_SHARE": 0.3,
        "MAX_SHARE_CHANGE_PER_SPRINT": 0.05
      },
      "final_phase": {
        "FINAL_PRACTICE_WEEKS": 3,
        "FINAL_PHASE_LEARNING_MULTIPLIER": 0.5,
        "ALLOW_NEW_LEARNING_IN_FINAL_PHASE": true
      }
    },
    "warnings": [
      {"type":"missing_level_for_section","section_title":"History","used_level":3},
      {"type":"unmapped_section_excluded","section_title":"..." }
    ]
  },

  "exam_parts_summary": [
    {
      "exam_part": "READING|LOGIC|DRAWING|MATH_PHYSICS|GENERAL_KNOWLEDGE",
      "mapped_sections": ["Text Comprehension"],
      "part_level": 2,
      "required_minutes_full": 1234.5,
      "allocated_minutes_plan": 1400.0,
      "allocated_share_avg": 0.21,
      "focus_reason": ["low_level_gap", "large_backlog", "final_phase_practice"]
    }
  ],

  "sprints": [
    {
      "sprint_number": 1,
      "week_start_index": 1,
      "week_end_index": 2,
      "sprint_weeks": 2,
      "available_minutes": 1200,
      "planning_minutes": 1140,
      "buffer_minutes": 60,

      "sprint_goal": "string (deterministic template)",
      "focus_exam_parts_ranked": ["MATH_PHYSICS","GENERAL_KNOWLEDGE","READING","DRAWING","LOGIC"],
      "part_budgets_minutes": {
        "READING": 210,
        "LOGIC": 180,
        "DRAWING": 220,
        "MATH_PHYSICS": 280,
        "GENERAL_KNOWLEDGE": 250
      },

      "items": [
        {
          "exam_part": "MATH_PHYSICS",
          "section_title": "Math",
          "submodule_name": "Intro & math terminology",

          "planned_learning_minutes": 25,
          "planned_practice_questions_unique": 10,
          "planned_practice_questions_retake": 0,

          "practice_minutes_est": 55.0,
          "total_minutes_est": 80.0,

          "is_partial": true,
          "remaining_after_sprint": {
            "learning_minutes_remaining": 0.0,
            "questions_remaining_unique": 4
          }
        }
      ],

      "checkpoint": {
        "definition_by_part": [
          {
            "exam_part": "MATH_PHYSICS",
            "source_item": {"section_title":"Math","submodule_name":"Intro & math terminology"},
            "checkpoint_questions": 15,
            "target_metrics": {"accuracy":0.7,"avg_time_per_question_min":2.5},
            "confidence": "ok|low_sample"
          }
        ],
        "adaptation_rule_reference": "Section 7.3"
      },

      "totals": {
        "planned_minutes_sum": 1135,
        "slack_minutes_unfilled": 5
      }
    }
  ],

  "end_state": {
    "remaining_backlog_minutes_by_exam_part": {
      "READING": 0,
      "LOGIC": 120,
      "DRAWING": 0,
      "MATH_PHYSICS": 60,
      "GENERAL_KNOWLEDGE": 0
    }
  }
}

```

### 13.2 Deterministic sprint goal templates

Goal text must be generated from fixed templates using sprint context.

Define templates:

-   If sprint is in final phase:
    
    -   `"Final-phase consolidation: prioritize {top2_parts}; complete exam-style practice and error review; close remaining gaps."`
        
-   Else:
    
    -   `"Progress core learning and first-pass practice: prioritize {top2_parts}; maintain baseline coverage in all parts; start/continue highest-backlog part {top_backlog_part}."`
        

Deterministic substitutions:

-   `top2_parts`: two highest `part_budgets_minutes` (tie by priority then fixed order)
    
-   `top_backlog_part`: highest `rem_min(p)` at start of sprint (tie by fixed order)
    

----------

## 14) Worked Example (with small numbers, demonstrate calculations)

### 14.1 Tiny course JSON (illustrative)

Assume 6 sections exist (mapped as specified), with **one submodule each**:

-   Text Comprehension → `"Real exam texts"`
    
    -   video 0, timed 0, untimed 0, questions 10
        
-   Logical reasoning → `"Verbal logic"`
    
    -   video 10, timed 0, untimed 0, questions 10
        
-   Drawing & Representation → `"Perspective"`
    
    -   video 20, timed 0, untimed 0, questions 5
        
-   Math → `"Numbers (part 1)"`
    
    -   video 15, timed 0, untimed 0, questions 5
        
-   Physics → `"Kinematics"`
    
    -   video 15, timed 0, untimed 0, questions 5
        
-   History → `"20th century"`
    
    -   video 30, timed 0, untimed 0, questions 10
        

Inputs:

-   `weeks_to_exam = 3` → Sprint 1 (weeks 1–2), Sprint 2 (week 3)
    
-   `hours_per_week = 10`
    
-   `SPRINT_BUFFER_PCT = 0.05`
    

Levels by section:

-   Text 2, Logical 4, Drawing 3, Math 1, Physics 2, History 3  
    (General culture and Art not present in this tiny example; General Knowledge part uses History only.)
    

### 14.2 Step 1: Sprint capacities

Total available minutes:

-   `avail_min = 3 * 10 * 60 = 1800`
    

Sprint 1:

-   `available = 2*10*60 = 1200`
    
-   `planning = floor(1200*0.95)=1140`
    

Sprint 2:

-   `available = 1*10*60 = 600`
    
-   `planning = floor(600*0.95)=570`
    

### 14.3 Step 2: Estimate submodule minutes

Use defaults:

-   `BASE_MIN_PER_QUESTION=2.5`
    
-   `PRACTICE_REVIEW_OVERHEAD_PCT=0.20`
    
-   Level multipliers: L1=1.8, L2=1.55, L3=1.3, L4=1.1, L5=1.0
    
-   Subject multipliers: Text 1.1, Logic 1.0, Drawing 1.3, Math 1.4, Physics 1.5, History 1.0
    

Per-section per-question cost (includes overhead):

-   Text (L2): `2.5*1.1*1.55*1.2 = 5.115` min/q
    
-   Logic (L4): `2.5*1.0*1.1*1.2 = 3.30` min/q
    
-   Drawing (L3): `2.5*1.3*1.3*1.2 = 5.07` min/q
    
-   Math (L1): `2.5*1.4*1.8*1.2 = 7.56` min/q
    
-   Physics (L2): `2.5*1.5*1.55*1.2 = 6.975` min/q
    
-   History (L3): `2.5*1.0*1.3*1.2 = 3.90` min/q
    

Now total minutes per submodule:

-   Text: learn 0 + practice `10*5.115=51.15` → **51.15**
    
-   Logic: learn 10 + practice `10*3.30=33.0` → **43.0**
    
-   Drawing: learn 20 + practice `5*5.07=25.35` → **45.35**
    
-   Math: learn 15 + practice `5*7.56=37.8` → **52.8**
    
-   Physics: learn 15 + practice `5*6.975=34.875` → **49.875**
    
-   History: learn 30 + practice `10*3.90=39.0` → **69.0**
    

Part totals (5 parts):

-   READING: 51.15
    
-   LOGIC: 43.0
    
-   DRAWING: 45.35
    
-   MATH_PHYSICS: 52.8 + 49.875 = 102.675
    
-   GENERAL_KNOWLEDGE: 69.0
    

Total required full: `51.15+43+45.35+102.675+69 = 311.175 min`  
Available planning: `1140+570=1710 min` → feasible with large extra practice room.

### 14.4 Step 3: Compute part levels (workload_weighted default)

-   MATH_PHYSICS combines Math (L1, 52.8) + Physics (L2, 49.875):  
    [  
    part_level = round((1\cdot52.8 + 2\cdot49.875)/(102.675)) = round(1.486) = 1  
    ]
    
-   GENERAL_KNOWLEDGE uses History only → level 3  
    Others are their section levels.
    

### 14.5 Step 4: Sprint 1 part shares (baseline + adjustments)

Compute gaps (TARGET_LEVEL_FOR_GAP=4):

-   gap(L2)= (4-2)/(4-1)=2/3=0.6667
    
-   gap(L4)=0
    
-   gap(L3)= (4-3)/3=0.3333
    
-   gap(MATH_PHYSICS L1)= (4-1)/3=1
    
-   gap(GEN_KNOW L3)=0.3333
    

Mean gap:  
[  
mean = (0.6667 + 0 + 0.3333 + 1 + 0.3333)/5 = 0.4667  
]

Backlog shares (use required minutes as remaining at start):

-   READING: 51.15/311.175=0.1643
    
-   LOGIC: 43/311.175=0.1382
    
-   DRAWING: 45.35/311.175=0.1457
    
-   MATH_PHYSICS: 102.675/311.175=0.3298
    
-   GEN_KNOW: 69/311.175=0.2218
    

Now compute raw shares:  
[  
share_raw = 0.20

-   0.25\cdot(gap-mean)
    
-   0.25\cdot(backlog_share-0.20)  
    ]
    

Example for MATH_PHYSICS:

-   gap-mean = 1 - 0.4667 = 0.5333
    
-   backlog_share-0.20 = 0.3298 - 0.20 = 0.1298  
    [  
    share_raw = 0.20 + 0.25_0.5333 + 0.25_0.1298  
    = 0.20 + 0.1333 + 0.03245  
    = 0.36575  
    ]  
    Clamp to MAX_PART_SHARE=0.30 → 0.30.
    

Compute others similarly, clamp to [0.12,0.30], then renormalize to sum 1 (Section 7.2).  
Outcome (illustrative after renormalization) could be:

-   MATH_PHYSICS = 0.30 (clamped max)
    
-   READING ≈ 0.22
    
-   GENERAL_KNOW ≈ 0.20
    
-   DRAWING ≈ 0.15
    
-   LOGIC ≈ 0.13  
    (Sums to 1, respects caps/floors.)
    

### 14.6 Step 5: Convert shares to Sprint 1 minute budgets

Sprint 1 planning minutes = 1140.

Budgets (example):

-   MATH_PHYSICS: floor(1140*0.30)=342
    
-   READING: floor(1140*0.22)=250
    
-   GENERAL_KNOW: floor(1140*0.20)=228
    
-   DRAWING: floor(1140*0.15)=171
    
-   LOGIC: floor(1140*0.13)=148  
    Sum = 1139; allocate 1 leftover minute to highest remainder deterministically.
    

### 14.7 Step 6: Fill Sprint 1 with ordered modules and splits

-   MATH_PHYSICS: split between Math and Physics by need score (Math level 1 has higher gap; both similar backlog) → more minutes to Math early.
    
-   Apply learning/practice split by section level:
    
    -   Math (L1): learning 70%, practice 30% (shifted if final phase; Sprint 1 is not final)
        
    -   Physics (L2): learning 60%, practice 40%
        
-   Fill learning minutes first (video), then practice questions as budget allows.
    

Example scheduled items (partial illustration):

-   Math → Numbers (part 1): allocate 15 learning min (complete), then 4 questions (≈30 min), etc.
    
-   Physics → Kinematics: allocate learning min, then questions.
    
-   Reading: Text → Real exam texts: allocate 10 questions if budget allows (or partial).
    
-   General knowledge: History → 20th century: allocate learning minutes + questions.
    
-   etc.
    

Checkpoint per part: pick first EXAM_PRACTICE if present; else last practice-bearing item scheduled in that part.

This example demonstrates the deterministic flow:

1.  estimate workload,
    
2.  compute shares from baseline + gap + backlog with caps,
    
3.  allocate minutes per sprint,
    
4.  select modules using ordering + eligibility,
    
5.  define checkpoints and adaptation hooks.
