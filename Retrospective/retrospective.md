# TEMPLATE FOR RETROSPECTIVE (Team ##)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done
  - Committed: 5
  - Done: 4
- Total points committed vs. done
  - Committed: 13
  - Done: 12
- Nr of hours planned vs. spent (as a team)
  - Planned: 106h 15m
  - Spent: 98h 20m

**Remember**a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics 

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 28      |        | 83h 25m    | 82h 55m      |
| _#1_  | 2       | 3      | 6h         | 5h 45m       |
| _#2_  | 2       | 5      | 6h         | 3h           |
| _#3_  | 2       | 1      | 1h         | 30m          |
| _#5_  | 2       | 1      | 6h         | 3h           |
| _#6_  | 2       | 3      | 4h         | 3h 10m       |

> story `#0` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  - Average (estimate): 2.80 hours per task
  - Average (actual): 2.59 hours per task
- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

  $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$

  - -0.0745

- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

  $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$

  - 0.00196

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 34h 10m
  - Total hours spent: 26h 20m
  - Nr of automated unit test cases: 33
  - Coverage (if available)
- E2E testing:
  - Total hours estimated: 0
  - Total hours spent: 0
- Code review
  - Total hours estimated: 1h 30m
  - Total hours spent: 2h 10m

## ASSESSMENT

- What caused your errors in estimation (if any)?  
  Most of the errors we commited in estimations were due to the limited knowledge we had about each other. In particular, we didn't know the ability of our colleagues both in programming and managing big projects in git. We tried to guess and to make assumptions, but it turned out we were (partially) wrong.
- What lessons did you learn (both positive and negative) in this sprint?  
  There are many take aways in this first sprint!
  - We learnt that we need to plan more meetings and set internal deadlines to better guide the development.
  - We also understood that parallelizing too much is not a good idea, in case problems arises at the end there is not time left to solve them.
  - Moreover, if noticing that a new technology must be learnt, plan to leave more time to really understand it and integrate it.
  - We were able to better get to know each other and fit into our roles in the team and will be able to carry out our parts in a better way in the next sprint.
  - This first sprint gave us an opportunity to understand and setup a general workflow to smoothly carry out future tasks.
- Which improvement goals set in the previous retrospective were you able to achieve?  
  Since it was our first sprint, we had not set any goal.
- Which ones you were not able to achieve? Why?  
  The same as the previous point. Not applicable.
- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - Plan at least 2/3 meetings a week (in the form of daily scrums).
  - Try to better organize the work in a way that everybody has an idea of the flow: Which APIs? How do they interact with the frontend? What is the flow to be followed in the final product we want to deliver? Organize a longer initial meeting to set all of these details.
  - Ensure that everybody follows the git workflow planned: it decreases the number of conflicts and it allows less time losses because of git management.
  - Set internal deadlines for tasks that are more critical.

- One thing you are proud of as a Team!!  
  Even if at the beginning although communication was limited, we discovered at the end that we were able to work very well as a team! Each team member has received and given as much help as possible to each other.
