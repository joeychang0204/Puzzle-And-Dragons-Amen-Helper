
        var first_two_col = pickColor(count, 5, 2);
        var found = false;
        for(var i=0; i<first_two_col.length; i++){
            //ignore similar permutations
            if(found)
                break;
            var remain = count.slice(0);
            //update the picked color's remain num
            for(var j=0; j<2; j++)
                remain[first_two_col[i][j]] -= 5;
            var first_two_row = pickColor(remain, 4, 2);
            for(var j=0; j<first_two_row.length; j++){
                //ignore similar permutations
                if(found)
                    break;
                for(var k=0; k<2; k++){
                    remain[first_two_row[j][k]] -= 4;
                }
                if(Math.min(...remain) < 0 || remain[first_two_row[j][1]] >3){
                    //restore remain
                    remain = count.slice(0);
                    continue;
                }
                var last_three_col = pickColor(remain, 3, 3);
                for(var k=0; k<last_three_col.length; k++){
                    //ignore similar permutations
                    if(found)
                        break;
                    for(var l=0; l<3; l++){
                        remain[last_three_col[k][l]] -= 3;
                    }
                    if(Math.min(...remain) < 0 || first_two_col[i][1] == last_three_col[k][0]){
                        //restore remain
                        remain = count.slice(0);
                        continue;
                    }
                    //else: found the answer
                    found = true;
                    var curAns = new Array();
                    for(var z=0; z<30; z++){
                        if(z%6 == 5 && z < 18)
                            curAns.push(0);
                        else if(z%6 < 2)
                            curAns.push(first_two_col[i][z%6]);
                        else if(Math.floor(z/6) > 2)
                            curAns.push(first_two_row[j][4 - Math.floor(z/6)]);
                        else{
                            curAns.push(last_three_col[k][(z%6)-2]);
                        }
                    }
                    for(var last3=0; last3<3; last3++){
                        let most = remain.indexOf(Math.max(...remain));
                        curAns[last3 * 6 + 5] = most;
                        remain[most] -= 1;
                    }
                    answers.push(curAns);
                    alert(curAns);
                    remain = count.slice(0);
                }
            }
        }


function pickColor(remain, len, wanted){
    var curRemain = remain.slice(0);
    var permutations = new Array();
    function backtrack(curAns){
        if(curAns.length == wanted){
            permutations.push(curAns);
            return;
        }
        for(var i=0; i<curRemain.length; i++){
            if(curAns.length==0 || i != curAns[curAns.length-1]){
                if(curRemain[i] >= len){
                    curRemain[i] -= len;
                    backtrack(curAns.concat([i]))
                    curRemain[i] += len;
                }
            }
        }
    }
    backtrack([]);
    return permutations;
}


    
    
    /*
    // find the 3 color and their count
    var colors = new Array(-1, -1, -1);
    var counts = new Array(0, 0, 0);
    for(var i=0; i<6; i++){
        if(count[i] != 0){
            if(colors[0] == -1){
                colors[0] = i;
                counts[0] = count[i];
            }
            else if(colors[1] == -1){
                colors[1] = i;
                counts[1] = count[i];
            }
            else{
                colors[2] = i;
                counts[2] = count[i];
            }
        }
    }
    
    // first make 4 combo at buttom
    // i, j ,k, l = 0 -> colors[0] ; 1->colors[1]; 2->colors[2]
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            for(var k = 0; k < 3; k++){
                for(var l = 0; l < 3; l++){
                    if(i == j || i == k || k == l || j == l)
                        continue;
                    var used = new Array(0,0,0);
                    used[i]++;
                    used[j]++;
                    used[k]++;
                    used[l]++;
                    var remain= new Array(counts[0] - 3*used[0], counts[1] - 3*used[1], counts[2] - 3*used[2]);
                    var thirdRowColor = 3 - k - l;
                    // doesn't have enough drop to cover second level
                    if(remain[thirdRowColor] < 6){
                        continue;
                    }
                    if(Math.min(...remain)<3){
                        continue;
                    }
                    var cur_ans = new Array();
                    if(remain[k] > remain[l])
                        var firstRowColor = k;
                    else
                        var firstRowColor = l;
                    var secondRowColor = 3 - firstRowColor - thirdRowColor;
                    remain[thirdRowColor] -= 6;
                    
                    for(var painted=0; painted<30; painted++){
                        if(painted < 6){
                            if(remain[firstRowColor] > 0){
                                remain[firstRowColor]--;
                                cur_ans.push(colors[firstRowColor]);
                            }
                            else if(remain[secondRowColor] > 6){
                                remain[secondRowColor]--;
                                cur_ans.push(colors[secondRowColor]);
                            }
                            else if(remain[thirdRowColor]>0){
                                remain[thirdRowColor]--;
                                cur_ans.push(colors[thirdRowColor]);
                            }
                            
                        }
                        else if(painted >= 6 && painted < 12){
                            if(remain[secondRowColor] > 0){
                                remain[secondRowColor]--;
                                cur_ans.push(colors[secondRowColor]);
                            }
                            else if(remain[firstRowColor] > 0){
                                remain[firstRowColor]--;
                                cur_ans.push(colors[firstRowColor]);
                            }
                            else if(remain[thirdRowColor]>0){
                                remain[thirdRowColor]--;
                                cur_ans.push(colors[thirdRowColor]);
                            }
                        }
                        else if(painted >= 12 && painted < 18)
                            cur_ans.push(colors[thirdRowColor]);
                        else if(painted >= 18 && painted < 21)
                            cur_ans.push(colors[k]);
                        else if(painted >= 21 && painted < 24)
                            cur_ans.push(colors[l]);
                        else if(painted >= 24 && painted < 27)
                            cur_ans.push(colors[i]);
                        else if(painted >= 27 && painted < 30)
                            cur_ans.push(colors[j]);
                    }
                    answers.push(cur_ans);
                }
            }
        }
    }*/
