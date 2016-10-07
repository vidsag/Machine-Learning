var natural =require('natural')
var qapair=require('./question_answer_pair.json')

var questioncount=71
//finds matching count on the questions,calls findIndex and returns Index of the match.
var algorithm= {
    findCountAndIndex: function (tokens) {
        var questionzerocount = []
        var questiononecount = []
        for (j = 0; j < questioncount; j++) {
            zerocount = 0
            onecount = 0
            for (k = 0; k < qapair.question_answer[j]['question'].length; k++) {
                for (l = 0; l < tokens.length; l++) {
                    value = natural.LevenshteinDistance(tokens[l], qapair.question_answer[j]['question'][k])
                    if (value == 0)
                        zerocount++;
                    else if (value == 1)
                        onecount++;
                }
            }
            questionzerocount.push(zerocount)
            questiononecount.push(onecount)


        }
        index = algorithm.findIndex(questionzerocount, questiononecount)
        return index
    },

        findIndex: function(questionzerocount, questiononecount)
       {

        maxzerocount = -99999
        maxonecount = -99999
        maxindex = -1
        tieflag = 0
        for (j = 0; j < questioncount; j++) {
            if (questionzerocount[j] > maxzerocount) {
                maxzerocount = questionzerocount[j]
                maxindex = j
                maxonecount = questiononecount[j]
                tieflag = 0
            }
            else if (questionzerocount[j] == maxzerocount) {
                if (questiononecount[j] > maxonecount) {
                    maxonecount = questiononecount[j]
                    maxindex = j
                    tieflag = 0
                }
                else if (questiononecount[j] == maxonecount) {
                    tieflag = 1
                }
            }


        }
        if (tieflag == 1)
            return -1
        else
            return maxindex
    }

    }

module.exports=algorithm
