class Solution():
    def arrangeColor(self, remain, combo, rules):
        self.remain = remain
        self.permutes = []
        def dfs(curAns, curCombo):
            if min(self.remain) < 0:
                return
            # check neighbors in rules
            for rule in rules:
                if curCombo > max(rule[0], rule[1]):
                    if curAns[rule[0]] == curAns[rule[1]]:
                        return
            if curCombo== len(combo):
                # use the remain drops
                for i, r in enumerate(self.remain):
                    while r > 0:
                        curAns += [i]
                        r -= 1
                self.permutes.append(curAns)
                return
            for i, r in enumerate(self.remain):
                if r >= combo[curCombo]:
                    self.remain[i] -= combo[curCombo]
                    dfs(curAns + [i], curCombo+1)
                    self.remain[i] += combo[curCombo]
        dfs([], 0)
        print(self.permutes)
        print(len(self.permutes))
                



Solution().arrangeColor([4,4,5,7,5,5], [5,5,5,3,3,3,3], [[0,1], [1,2], [2,3], [2,4], [2,5],[2,6], [3,4], [4,5], [5,6]])
