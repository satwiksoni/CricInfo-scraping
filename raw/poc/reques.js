let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
fs.
//let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results"
request(url,cb);
function cb(error,response,html){

    let cheerioselector=cheerio.load(html);

    ///To see all bowlers and there wickets
    // let tables=cheerioselector(".table.bowler");
    // console.log(tables.length);
    // let btable="";
    // for(let i=0;i<tables.length;i++)
    // {
    //     let AllBowler=cheerioselector(tables[i]).find("tr");
    //     let temp="";
    //     for(let j=0;j<AllBowler.length;j++)
    //     {   
    //         let eachBowler=cheerioselector(AllBowler[j]).find("td");
    //         let name=cheerioselector(eachBowler[0]).text();
    //         let wkt=cheerioselector(eachBowler[4]).text();
    //         console.log(name,"   ",wkt);   
    //     }
    // }sss



/////////////////Highest scoreing batsmen
//     let battingTable=cheerioselector(".table.batsman");
//    // console.log(battingTable.length);
//     //console.log(battingTable.html());
//     let maxRun=0;
//     let maxScorer="";
//     for(let i=0;i<battingTable.length;i++)
//     {
//         let ithTable=cheerioselector(battingTable[i]).find("tr");
//                 for(let j=0;j<ithTable.length;j++)
//             {
//                 let batsMan=cheerioselector(ithTable[j]).find("td");
//                 if(batsMan.length==8)
//                 {
//                     let name=cheerioselector(batsMan[0]).text();
//                 if(name=="Extras")
//                 break;
//                 let runs=cheerioselector(batsMan[2]).text();
//                 if(maxRun<parseInt(runs))
//                 {
//                     maxRun=parseInt(runs);
//                     maxScorer=name;
//                 }

//                 }
//             }
        
//     }

//     console.log(maxScorer,"     ",maxRun);
    

    let allBoxes=cheerioselector(".match-cta-container");
    console.log(allBoxes.length);
    let link="";
    for(let i=0;i<allBoxes.length;i++)
    {
        let allSubAnchors=cheerioselector(allBoxes[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        
        link="https://www.espncricinfo.com"+cheerioselector(allSubAnchors[2]).attr("href");
        request(link,cb1);
    //    console.log("--------------------------------\n");
    
    }


    //console.log(link);
   
}

function cb1(err,response,html)
{
    //.team.team-gray .score-detail .score
    let $=cheerio.load(html);
    let loosingTeam=$(".match-info.match-info-MATCH .team.team-gray .name");
    let loosingTeamName= $(loosingTeam).text();
    
    let allTeamsTable=$(".card.content-block.match-scorecard-table .Collapsible");
   // console.log(allTeamsTable.length,loosingTeamName);
    for(let i=0;i<allTeamsTable.length;i++)
    {
        let team=$(allTeamsTable[i]).find(".col .header-title.label").text();
        let teamName=team.split(" ");
        teamName=teamName[0]+" "+teamName[1];
        //console.log(teamName);
        if(teamName!=loosingTeamName)
        {
            
           console.log("--------------------------------\n");
           console.log("---------------------------------------");

           console.log(teamName," Won the match :)");
            let stats=[];
        
            let battingTable=$(allTeamsTable[i]).find(".table.batsman tr");
            for(let j=0;j<battingTable.length;j++)
            {
                let oneBatsmen=$(battingTable[j]).find("td");
                if(oneBatsmen.length==8)
                {
                    stats.push({
                        Name:$(oneBatsmen[0]).text(),
                        Runs:$(oneBatsmen[2]).text(),
                        Fours:$(oneBatsmen[5]).text(),
                        Sixes:$(oneBatsmen[6]).text()
                    })
                   
                }

            }
            console.table(stats);


        }
        


    }




}
