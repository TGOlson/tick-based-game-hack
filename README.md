Quick hack to build out scaffolding for a tick based game.

General flow:

```
1. Set initial state
2. Wait for action
3. Find ticks since last action
4. Derive current game state from ticks
5. Apply action to derived game state
6. Return new game state
```
