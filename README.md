# Puzzle-And-Dragons-Amen-Helper
## About
This is a tool applying JavaScript, Node.js, and MongoDB to help you use one of the most challenging leaders in the game Puzzle &amp; Dragons.  
  
Puzzle &amp; Dragons is a 7 years old mobile puzzle game. There are 30 orbs inside a 6*5 board. If you connect three or more identical orbs together, they'll form a combo.  
![10 Combo example](https://github.com/joeychang0204/Puzzle-And-Dragons-Amen-Helper/blob/master/public/images/10C.png)
  
Meanwhile, Amen is one of the most difficult character in this game. You can get insane damage if you manage to achieve it's leader skill requirement: 7 combo AND the number of remaining orbs <= 3. You can destroy almost everything in the game as long as you activate this leader skill, but it's really hard for normal players to do this.  
![Damage reaching integer max](https://github.com/joeychang0204/Puzzle-And-Dragons-Amen-Helper/blob/master/public/images/intMax.png)

So I came up with this tool helping people to play with Amen. I referred to some tutorials in order to find general solutions for Amen puzzles. Finally, I found that I can solve this problem quite easily. For bicolor board, I can simply print out the solutions since there are only a few possible situations. And for tricolor or multi-color board, I can use backtracking to assign the color of each combo. There are 7 combos in total, I only have to check that the neighboring combos don't have identical color. And at the end, check the number of remaining orbs is not greater than three. That's it!  

<details><summary>backtracking code</summary>
<p>

```javascript
function pickColor(remain, combo, rules){
    function dfs(curAns, curCombo){
        if (Math.min(...remain) < 0)
            return;
        // check the neighbors spcified in rules to be different
        for(var i=0; i<rules.length; i++){
            if(curCombo > Math.max(rules[i][0], rules[i][1])){
                if(curAns[rules[i][0]] == curAns[rules[i][1]])
                    return;
            }
        }
        // found a valid solution
        if(curCombo == combo.length){
            // use the remain drops
            for(var i=0; i<remain.length; i++){
                for(var r=remain[i]; r>0; r--)
                    curAns.push(i);
            }
            permutes.push(curAns);
            return;
        }
        // backtracking
        for(var i=0; i<remain.length; i++){
            if(remain[i] >= combo[curCombo]){
                remain[i] -= combo[curCombo];
                dfs(curAns.concat([i]), curCombo+1);
                remain[i] += combo[curCombo];
            }
        }
    }
    dfs([], 0);
}
```
</p></details>
  
The tool is deployed on Heroku since 7/6/2019. It got more than 4000 views within one week, and it has about 150 views per day. Feel free to use it and please contact me if you have any suggestion!   
[Link](https://puzzle-and-dragons-amen-helper.herokuapp.com/)  
![GUI of the tool](https://github.com/joeychang0204/Puzzle-And-Dragons-Amen-Helper/blob/master/public/images/GUI.png)  
  

## References
[Website Template](https://github.com/google/web-starter-kit)  
[JQuery Session](https://github.com/AlexChittock/JQuery-Session-Plugin)  
[View Counter](https://bootsnipp.com/snippets/5K6WW)  
[Bicolor](http://h-pon.doorblog.jp/archives/51705365.html)  
[Tricolor - by 二アさん](https://www.youtube.com/watch?v=EN_84_OdjqI)  
[General Multi Color - by ダチョーさん](https://www.youtube.com/watch?v=Yv5w9u-qlhI)

