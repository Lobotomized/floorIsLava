const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const newG = require('./globby').newIOServer;

console.log(io)

app.use('/static', express.static('public'))

newG({
    map:[[{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5}],
         [{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5}],
         [{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5}],
         [{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5}],
         [{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5}],
         [{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5}],
         [{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5}],
         [{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5}],
         [{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5}],
         [{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5},{health:5}]],
    players:[
      {player:'player1', position:{x:0,y:0},death:false},
      {player:'player2', position:{x:5,y:5},death:false},
      {player:'player3', position:{x:7,y:7},death:false},
      {player:'player4', position:{x:3,y:3},death:false},
      {player:'player5', position:{x:9,y:9},death:false},
    ],
    breakTimer= 20
},
function(player,move,state){
  switch(move){
    case 'left': 
      let pl = players.find((pl) => {
        pl.player == player;
      })

      if(pl.position.x > 0){
        let freePosCheck = true;
        players.forEach((innerPl) => {
          if(innerPl.position.x == pl.position.x-1 && innerPl.position.y == pl.position.y){
            freePosCheck = false;
          }
        })
        if(freePosCheck){
          pl.position.x -=1;
        }
      }
    case 'right': 
      let pl = players.find((pl) => {
        pl.player == player;
      })

      if(pl.position.x > 0){
        let freePosCheck = true;
        players.forEach((innerPl) => {
          if(innerPl.position.x == pl.position.x+1 && innerPl.position.y == pl.position.y){
            freePosCheck = false;
          }
        })
        if(freePosCheck){
          pl.position.x +=1;
        }
      }
    case 'down': 
      let pl = players.find((pl) => {
        pl.player == player;
      })

      if(pl.position.y > 0){
        let freePosCheck = true;
        players.forEach((innerPl) => {
          if(innerPl.position.y == pl.position.y+1 && innerPl.position.x == pl.position.x){
            freePosCheck = false;
          }
        })
        if(freePosCheck){
          pl.position.y +=1;
        }
      }
      case 'up': 
        let pl = players.find((pl) => {
          pl.player == player;
        })

        if(pl.position.y > 0){
          let freePosCheck = true;
          players.forEach((innerPl) => {
            if(innerPl.position.y == pl.position.y-1 && innerPl.position.x == pl.position.x){
              freePosCheck = false;
            }
          })
          if(freePosCheck){
            pl.position.y -=1;
          }
        }

        if(state.map[pl.position.x][pl.position.y].health <=0){
          pl.death = true;
        }
  }
    //State Change on Move
},
2, // Number Of Players
function(state){
    //State Change on Time
    if(breakTimer < 0) {
      breakTimer = 20;
      const row = state.map[Math.floor(Math.random()*state.map.length)];
      const col = row[Math.floor(Math.random()*row.length)]

      if(col.health > 0){
        col.health -=1;
      }
    }
},
io
)



app.get('/', function(req, res){
    return res.status(200).sendFile(__dirname + '/index.html');
  });




http.listen(3000, function(){
  console.log('listening on *:3000');
});